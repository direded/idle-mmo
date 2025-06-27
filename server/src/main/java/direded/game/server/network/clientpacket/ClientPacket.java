package direded.game.server.network.clientpacket;

import com.google.gson.JsonObject;
import direded.game.server.game.UserClient;
import direded.game.server.network.NetworkController;
import direded.game.server.network.PacketType;
import io.netty.channel.Channel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public abstract class ClientPacket {

	protected final PacketType packetType;

	public void send(UserClient user) {
		NetworkController.instance.sendPacket(user, this);
	}

	public void send(Channel channel) {
		NetworkController.instance.sendPacket(channel, this);
	}

	public abstract JsonObject serialize();

	public Integer getPacketResponseId() {
		return null;
	}
}
