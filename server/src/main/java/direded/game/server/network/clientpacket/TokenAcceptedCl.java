package direded.game.server.network.clientpacket;

import com.google.gson.JsonObject;
import direded.game.server.model.UserModel;
import direded.game.server.network.PacketType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TokenAcceptedCl extends UserProfileCl {

	private boolean success = true;

	public TokenAcceptedCl(UserModel user) {
		super(PacketType.TOKEN_CL, user);
	}

	@Override
	public JsonObject serialize() {
		var json = super.serialize();
		json.addProperty("sessionToken", user.getSession().getToken());
		json.addProperty("success", success);
		return json;
	}
}
