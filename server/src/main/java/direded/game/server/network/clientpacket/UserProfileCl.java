package direded.game.server.network.clientpacket;

import com.google.gson.JsonObject;
import direded.game.server.model.UserModel;
import direded.game.server.network.PacketType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserProfileCl extends ClientPacket {

	protected UserModel user;

	public UserProfileCl(UserModel user) {
		super(PacketType.USER_PROFILE_CL);
		this.user = user;
	}

	protected UserProfileCl(PacketType type, UserModel user) {
		super(type);
		this.user = user;
	}

	@Override
	public JsonObject serialize() {
		var json = new JsonObject();
		json.addProperty("id", user.getId().toString());
		json.addProperty("name", user.getName());

		var charactersJson = new JsonObject();
		for (var character : user.getCharacters()) {
			charactersJson.addProperty("id", character.getId().toString());
			charactersJson.addProperty("name", character.getName());
		}
		json.add("characters", charactersJson);

		return json;
	}
}
