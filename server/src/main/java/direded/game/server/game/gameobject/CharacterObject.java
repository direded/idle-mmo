package direded.game.server.game.gameobject;

import com.google.gson.JsonObject;
import direded.game.server.game.MapTile;
import direded.game.server.game.ResourceType;
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
	private Channel channel;

	public static CharacterObject create() {
		CharacterObject player = new CharacterObject();

		return player;
	}

	public CharacterObject() {}

	public double getMoveSpeed() {
		return 1;
	}

	public void send(ClientPacket packet) {
		if (channel == null || !channel.isActive()) return;
		NetworkController.instance.send(channel, packet);
	}

	public JsonObject serialize(JsonObject json) {
		json.addProperty("id", id.toString());
		json.addProperty("owner", user.getId().toString());
		json.addProperty("name", name);

		json.add("tile", currentMapTile.serialize(new JsonObject()));
		json.add("inventory", inventory.serialize(new JsonObject()));
		json.add("process", process.serialize(new JsonObject()));
		return json;
	}
}