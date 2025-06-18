package direded.game.server.game;

import direded.game.server.game.gameobject.CharacterObject;
import direded.game.server.model.UserModel;
import direded.game.server.network.NetworkController;
import direded.game.server.network.clientpacket.ClientPacket;
import io.netty.channel.Channel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@RequiredArgsConstructor
public class UserClient {

	private final UserModel model;
	private final Channel channel;
	private List<CharacterObject> characters;

	public void send(ClientPacket packet) {
		NetworkController.instance.send(this, packet);
	}

	public CharacterObject getActiveCharacter() {
		return characters.isEmpty() ? null : characters.getFirst();
	}
}
