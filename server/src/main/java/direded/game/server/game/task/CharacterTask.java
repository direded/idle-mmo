package direded.game.server.game.task;

import com.google.gson.JsonObject;
import direded.game.server.game.gameobject.CharacterObject;

public abstract class CharacterTask {

	protected CharacterObject character;

	public CharacterTask(CharacterObject character) {
		this.character = character;
	}

	public abstract String getName();
	public abstract CharacterTaskType getType();
	public abstract void tick(double delta);

	public JsonObject serialize(JsonObject json) {
		json.addProperty("type", getType().toString());
		return json;
	}

	public void deserialize(JsonObject json) {
	}

	public void init() {}
	public void finish() {}


	public static CharacterTask deserialize(CharacterObject character, JsonObject json) {
		var type = CharacterTaskType.valueOf(json.get("type").getAsString());

		CharacterTask task = switch (type) {
			case LUMBERJACK -> new LumberjackTask(character);
			case MOVE_TO_TILE -> new MoveToTileTask(character);
			case IDLE -> new IdleTask(character);
			default -> null;
		};

		task.deserialize(json);

		return task;
	}

	public String getDebugInfo() {
		return getType().name();
	}
}
