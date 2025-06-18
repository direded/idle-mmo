package direded.game.server.network.clientpacket;

import com.google.gson.JsonObject;
import direded.game.server.game.gameobject.CharacterObject;
import direded.game.server.network.PacketType;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CharacterDataCl extends ClientPacket {

	public CharacterDataCl(CharacterObject character) {
		super(PacketType.UPDATE_CHARACTER_CL);
		this.character = character;
	}

	private CharacterObject character;
	private String name;

	@Override
	public JsonObject serialize() {

		var json = new JsonObject();
		var c = character;
		json.addProperty("id", c.getId().toString());
		json.addProperty("owner", c.getUser().getId().toString());
		json.addProperty("name", c.getName());
		json.addProperty("tile", c.getCurrentMapTile().getId().toString());

		json.add("inventory", c.getInventory().serialize(new JsonObject()));
		json.add("process", c.getProcess().serialize(new JsonObject()));

		if (name != null)
			json.addProperty("name", name);
		return json;
	}
}
