package direded.game.server.game.process;

import com.google.gson.JsonObject;
import direded.game.server.game.gameobject.CharacterObject;

public abstract class CharacterProcess {

	protected CharacterObject character;

	public abstract String getName();
	public abstract CharacterProcessType getType();
	public abstract void tick(double delta);
	public JsonObject serialize(JsonObject json) {
		json.addProperty("type", getType().toString());
		return json;
	}

	public void deserialize(JsonObject json) {
	}

	public void init() {}
	public void finish() {}


	public static CharacterProcess deserialize(CharacterObject character, JsonObject json) {
		var type = CharacterProcessType.valueOf(json.get("type").getAsString());

		CharacterProcess process = switch (type) {
			case CharacterProcessType.LUMBERJACK -> new LumberjackProcess();
			case CharacterProcessType.MOVE_TO_TILE -> new MoveToTileProcess();
			case CharacterProcessType.IDLE -> IdleProcess.get();
			default -> null;
		};

		process.character = character;
		process.deserialize(json);

		return process;
	}

}
