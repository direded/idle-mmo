package direded.game.server.network;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import direded.game.server.game.UserClient;
import direded.game.server.model.UserModel;
import direded.game.server.network.handler.ServerPacketHandler;
import direded.game.server.network.handler.TestPacketHandler;
import direded.game.server.network.packet.ServerPacket;
import direded.game.server.repository.UserRepository;
import direded.game.server.repository.UserSessionRepository;
import io.netty.channel.Channel;
import jakarta.annotation.PostConstruct;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.*;

@Getter
@Setter
@RequiredArgsConstructor
@Component
public class NetworkController {

	public static NetworkController instance;
	private final UserSessionRepository userSessionRepository;
	private final UserRepository userRepository;

	private final LinkedHashMap<Channel, UserClient> channelUserClientMap = new LinkedHashMap<>();
	private final Gson gson;

	private final Map<Integer, ServerPacketHandler<?>> serverPacketHandlers = new HashMap<>();
	@Getter(AccessLevel.NONE)
	private final List<ServerPacket> receivedPackets = new ArrayList<>();

	@PostConstruct
	private void onPostConstruct() {
		instance = this;
		registerServerPacketHandlers();
	}

	private void registerServerPacketHandler(ServerPacketHandler<?> handler) {
		serverPacketHandlers.put(handler.getTypeId(), handler);
	}

	private void registerServerPacketHandlers() {
		registerServerPacketHandler(new TestPacketHandler(100));
	}

	public UserClient registerClient(final Channel channel, String token) {
		var user = getUserByToken(token);
		if (user == null) {
			return null;
		}
		var client = new UserClient(user, channel);
		channelUserClientMap.put(channel, client);
		return client;
	}

	public void unregisterClient(final Channel channel) {
		channelUserClientMap.remove(channel);
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
		if (!json.has("type"))
			return;

		var handler = serverPacketHandlers.get(json.get("type").getAsInt());
		if (handler != null) {
			var packet = handler.parse(message);
			packet.setUser(client);
			synchronized (receivedPackets) {
				receivedPackets.add(packet);
			}
		}
	}

	public List<ServerPacket> getReceivedPackets() {
		synchronized (receivedPackets) {
			return new ArrayList<>(receivedPackets);
		}
	}
}
