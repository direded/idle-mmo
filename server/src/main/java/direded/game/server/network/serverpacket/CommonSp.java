package direded.game.server.network.serverpacket;

import com.google.gson.JsonObject;

public class CommonSp extends ServerPacket {

	String action;
	JsonObject json;

	@Override
	protected void process() {

	}

	public static CommonSp parse(JsonObject json) {
		var sp = new CommonSp();
		if (!json.has("action"))
			return null;
		sp.action = json.get("action").getAsString();
		sp.json = json;
		return sp;
	}
}
