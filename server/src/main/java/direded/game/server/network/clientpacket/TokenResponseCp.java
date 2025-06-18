package direded.game.server.network.clientpacket;

import com.google.gson.JsonObject;
import direded.game.server.model.UserModel;
import direded.game.server.network.PacketType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TokenResponseCp extends UserProfileCp {

	private boolean success;
	private String redirect;

	public TokenResponseCp(UserModel user, boolean success) {
		super(PacketType.TOKEN_CL, user);
		this.success = success;
	}

	@Override
	public JsonObject serialize() {
		var json = success ? super.serialize() : new JsonObject();
		if (success) {
			json.addProperty("sessionToken", user.getSession().getToken());
		}
		json.addProperty("success", success);
		if (redirect != null) json.addProperty("redirect", redirect);
		return json;
	}
}
