package direded.game.server.network.clientpacket;

import com.google.gson.JsonObject;
import direded.game.server.game.gameobject.CharacterObject;
import direded.game.server.network.PacketType;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UpdateCharacterCl extends ClientPacket {

	public UpdateCharacterCl(CharacterObject character) {
		super(PacketType.UPDATE_CHARACTER_CL);
		this.character = character;
	}

	private CharacterObject character;
	private JsonObject data = new JsonObject();

	@Override
	public JsonObject serialize() {
		JsonObject characterJson = new JsonObject();
		characterJson.addProperty("id", character.getId().toString());
		characterJson.addProperty("owner", character.getUser().getId().toString());
		return data;
	}
}
