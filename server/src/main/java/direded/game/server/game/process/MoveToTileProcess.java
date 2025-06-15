package direded.game.server.game.process;

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
public class MoveToTileProcess extends CharacterProcess {

	private final String name = "move_to_tile";
	private final CharacterProcessType type = CharacterProcessType.MOVE_TO_TILE;
	private double time = 0;
	private double totalTime = 0;
	private MapTile targetTile;

	public static MoveToTileProcess create(CharacterObject character, MapTile tile) {
		var process = new MoveToTileProcess();
		process.character = character;
		process.targetTile = tile;
		return process;
	}

	public static boolean canProcess(CharacterObject c, MapTile tile) {
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
			CharacterController.instance.setProcess(character, new IdleProcess());
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
