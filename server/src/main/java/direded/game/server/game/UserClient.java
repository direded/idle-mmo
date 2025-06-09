package direded.game.server.game;

import direded.game.server.model.UserModel;
import direded.game.server.network.NetworkController;
import direded.game.server.network.clientpacket.ClientPacket;
import io.netty.channel.Channel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserClient {

	private UserModel model;
	private Channel channel;

	public void send(ClientPacket packet) {
		NetworkController.instance.send(this, packet);
	}
}
