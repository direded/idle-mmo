package direded.game.server.network.serverpacket;

import com.google.gson.JsonObject;

public class CommonSv extends ServerPacket {

	String action;
	JsonObject json;

	@Override
	protected void innerProcess() {

	}

	public static CommonSv parse(JsonObject json) {
		var sp = new CommonSv();
		if (!json.has("action"))
			return null;
		sp.action = json.get("action").getAsString();
		sp.json = json;
		return sp;
	}
}
