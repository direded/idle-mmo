package direded.game.server.network.clientpacket;

import com.google.gson.JsonObject;
import direded.game.server.game.UserClient;
import direded.game.server.network.NetworkController;
import direded.game.server.network.PacketType;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@RequiredArgsConstructor
public abstract class ClientPacket {

	protected final PacketType packetType;

	public void send(UserClient user) {
		NetworkController.instance.send(user, this);
	}

	public abstract JsonObject serialize();
}
