package direded.game.server.game.task;

import com.google.gson.JsonObject;
import direded.game.server.game.GameMap;
import direded.game.server.game.GameUtils;
import direded.game.server.game.MapTile;
import direded.game.server.game.controller.CharacterController;
import direded.game.server.game.gameobject.CharacterObject;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class MoveToTileTask extends CharacterTask {

	private final String name = "move_to_tile";
	private final CharacterTaskType type = CharacterTaskType.MOVE_TO_TILE;
	private double time = 0;
	private double totalTime = 0;
	private MapTile targetTile;

	public static MoveToTileTask create(CharacterObject character, MapTile tile) {
		var task = new MoveToTileTask();
		task.character = character;
		task.targetTile = tile;
		return task;
	}

	public static boolean canTask(CharacterObject c, MapTile tile) {
		var current = c.getCurrentMapTile();
		return !current.equals(tile) && current.getDistanceTo(tile) != null;
	}

	public void init() {
		time = 0;
		var distance = character.getCurrentMapTile().getDistanceTo(targetTile);
		var moveSpeed = character.getMoveSpeed();
		totalTime = distance / moveSpeed;
	}

	@Override
	public void tick(double delta) {
		GameUtils.logger.info(name);
		time += delta;
		if (time >= totalTime) {
			character.setCurrentMapTile(targetTile);
			CharacterController.instance.setTask(character, new IdleTask());
		}
	}

	@Override
	public JsonObject serialize(JsonObject json) {
		super.serialize(json);
		json.addProperty("time", time);
		json.addProperty("totalTime", totalTime);
		json.add("targetTile", targetTile.serialize(new JsonObject()));
		return json;
	}

	@Override
	public void deserialize(JsonObject json) {
		super.deserialize(json);
		time = json.get("time").getAsDouble();
		totalTime = json.get("totalTime").getAsDouble();
		UUID targetTileUuid = UUID.fromString(json.get("targetTile").getAsString());
		targetTile = GameMap.instance.getTiles().get(targetTileUuid);
	}
}
