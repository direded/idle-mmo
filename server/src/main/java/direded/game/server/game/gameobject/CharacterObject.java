package direded.game.server.game.gameobject;

import com.google.gson.JsonObject;
import direded.game.server.game.MapTile;
import direded.game.server.game.ResourceType;
import direded.game.server.game.UserClient;
import direded.game.server.game.inventory.Inventory;
import direded.game.server.game.process.CharacterProcess;
import direded.game.server.model.UserModel;
import direded.game.server.network.NetworkController;
import direded.game.server.network.clientpacket.ClientPacket;
import io.netty.channel.Channel;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
public class CharacterObject extends GameObject {

	private String name;

	private CharacterProcess process;
	private MapTile currentMapTile;
	private Inventory inventory = new Inventory();

	private UserModel user;
	private UserClient client;

	public static CharacterObject create() {
		CharacterObject player = new CharacterObject();

		return player;
	}

	public CharacterObject() {}

	public double getMoveSpeed() {
		return 1;
	}

	public void send(ClientPacket packet) {
		if (client == null) {
			System.out.println("client is null");
			return;
		}
		NetworkController.instance.send(client.getChannel(), packet);
	}
}