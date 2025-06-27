package direded.game.server.network.clientpacket;

import com.google.gson.JsonObject;
import direded.game.server.game.gameobject.CharacterObject;
import direded.game.server.network.PacketType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameDataCp extends ClientPacket {

	private CharacterObject character;

	public GameDataCp(CharacterObject character) {
		super(PacketType.GAME_DATA_CP);
		this.character = character;
	}

	@Override
	public JsonObject serialize() {
		var json = new JsonObject();
		ClientGameDataAggregator.populate(json, character);
		return json;
	}
}
