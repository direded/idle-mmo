package direded.game.server.game.gameobject;

import direded.game.server.game.MapTile;
import direded.game.server.game.UserClient;
import direded.game.server.game.inventory.Inventory;
import direded.game.server.game.task.CharacterTask;
import direded.game.server.model.UserModel;
import direded.game.server.network.NetworkController;
import direded.game.server.network.clientpacket.ClientPacket;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CharacterObject extends GameObject {

	private String name;

	private CharacterTask task;
	private MapTile currentMapTile;
	private Inventory inventory = new Inventory();

	private UserModel user;
	private UserClient client;

	public static CharacterObject create() {
		return new CharacterObject();
	}

	public CharacterObject() {}

	public double getMoveSpeed() {
		return 1;
	}

	public void send(ClientPacket packet) {
		if (client == null) {
			return;
		}
		NetworkController.instance.sendPacket(client.getChannel(), packet);
	}

	public String getDebugInfo() {
		return String.format("%s", id);
	}

	public CharacterTask getTask() {
		return task;
	}

	public void setTask(CharacterTask task) {
		this.task = task;
	}
}