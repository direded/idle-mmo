package direded.game.server.network.serverpacket;

import com.google.gson.JsonObject;
import direded.game.server.game.Game;
import direded.game.server.game.activity.AbstractActivity;
import direded.game.server.game.gameobject.CharacterObject;

public class ActivitySp extends ServerPacket {

	private AbstractActivity activity;
	private JsonObject data;

	@Override
	public void process() {
		var character = getUser().getActiveCharacter();
		if (character == null) return;
		// TODO anticheat conditions

		activity.processRequest(character, data);
	}

	public static ActivitySp parse(JsonObject json) {
		var packet = new ActivitySp();
		var uuid = json.get("id").getAsString();
		var activities = Game.getActivities();
		var act = activities.get(uuid);
		if (act == null) return null;
		packet.activity = act;
		packet.data = json.get("data").getAsJsonObject();
		return packet;
	}
}
