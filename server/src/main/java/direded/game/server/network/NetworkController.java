package direded.game.server.network;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import direded.game.server.game.GameUtils;
import direded.game.server.game.UserClient;
import direded.game.server.game.events.UserJoinEvent;
import direded.game.server.game.events.UserLeaveEvent;
import direded.game.server.game.gameobject.CharacterObject;
import direded.game.server.model.UserModel;
import direded.game.server.network.clientpacket.ClientGameDataAggregator;
import direded.game.server.network.clientpacket.ClientPacket;
import direded.game.server.network.handler.ServerPacketHandler;
import direded.game.server.network.serverpacket.CommonSp;
import direded.game.server.network.serverpacket.ServerPacket;
import direded.game.server.network.serverpacket.TestSp;
import direded.game.server.repository.UserRepository;
import direded.game.server.repository.UserSessionRepository;
import io.netty.channel.Channel;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;
import jakarta.annotation.PostConstruct;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.net.InetSocketAddress;
import java.util.*;

@Getter
@Setter
@RequiredArgsConstructor
@Component
public class NetworkController {

	public static NetworkController instance;
	private static final String LOG_PREFIX = "NETWORK:";

	private final UserSessionRepository userSessionRepository;
	private final UserRepository userRepository;

	private final LinkedHashMap<Channel, UserClient> channelUserClientMap = new LinkedHashMap<>();
	private final Gson gson;

	private final Map<PacketType, ServerPacketHandler<?>> serverPacketHandlers = new HashMap<>();
	@Getter(AccessLevel.NONE)
	private final Queue<ServerPacket> receivedPackets = new LinkedList<>();
	private final ClientGameDataAggregator clientGameDataAggregator;

	@PostConstruct
	private void onPostConstruct() {
		instance = this;
		registerServerPacketHandlers();
	}

	private void registerServerPacketHandler(PacketType type, ServerPacketHandler<?> handler) {
		serverPacketHandlers.put(type, handler);
	}

	private void registerServerPacketHandlers() {
		registerServerPacketHandler(PacketType.TEST_SV, TestSp::parse);
		registerServerPacketHandler(PacketType.COMMON_SV, CommonSp::parse);
	}

	public UserClient registerClient(final Channel channel, String token) {
		GameUtils.logger.info("{} New connection {}, {}", LOG_PREFIX, channel.remoteAddress().toString(), token);
		var user = getUserByToken(token);
		if (user == null) {
			return null;
		}
		GameUtils.logger.info("{} User connecting {}, {}, {}", LOG_PREFIX, channel.remoteAddress().toString(), token, user);
		var client = new UserClient(user, channel);
		channelUserClientMap.put(channel, client);
		new UserJoinEvent(client).register();
		return client;
	}

	public void unregisterClient(final Channel channel) {
		var user = channelUserClientMap.remove(channel);
		GameUtils.logger.info("{} User disconnecting {}, {}", LOG_PREFIX, channel.remoteAddress().toString(), user);
		new UserLeaveEvent(user).register();
	}

	public SequencedCollection<UserClient> getClients() {
		return channelUserClientMap.sequencedValues();
	}

	private UserModel getUserByToken(String token) {
		var userSession = userSessionRepository.findByToken(token);
		if (userSession.isEmpty()) {
			return null;
		}

		var user = userRepository.findBySessionId(userSession.get().getId());
		return user.orElse(null);
	}


	public void receiveMessage(Channel channel, String message) {
		receiveMessage(channelUserClientMap.get(channel), message);
	}

	protected void receiveMessage(UserClient client, String message) {
		var json = gson.fromJson(message, JsonObject.class);
		if (!json.has("packet_type"))
			return;

		var handler = serverPacketHandlers.get(json.get("packet_type").getAsInt());
		if (handler == null) return;
		var packet = handler.parse(json);
		if (packet == null) return;
		packet.setUser(client);
		synchronized (receivedPackets) {
			receivedPackets.add(packet);
		}
	}

	public void sendPacket(UserClient user, ClientPacket packet) {
		sendPacket(user.getChannel(), packet);
	}

	public void sendPacket(Channel channel, ClientPacket packet) {
		var json = packet.serialize();
		json.addProperty("packet_type", packet.getPacketType().getValue());
		var responseId = packet.getPacketResponseId();
		json.addProperty("packet_id", responseId);
		channel.writeAndFlush(new TextWebSocketFrame(gson.toJson(json)));
	}

	public void processPackets() {
		ServerPacket packet;
		synchronized (receivedPackets) {
			packet = receivedPackets.poll();
		}
		while (packet != null) {
			packet.process();
			synchronized (receivedPackets) {
				packet = receivedPackets.poll();
			}
		}
	}
}
