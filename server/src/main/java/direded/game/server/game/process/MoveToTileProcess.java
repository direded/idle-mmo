package direded.game.server.game.process;

import direded.game.server.game.GameUtils;
import direded.game.server.game.MapTile;
import direded.game.server.game.controller.CharacterController;
import direded.game.server.game.gameobject.CharacterObject;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MoveToTileProcess extends CharacterProcess {


	private String name = "move_to_tile";
	private double time = 0;
	private MapTile targetTile;
	private double totalTime = 0;

	public MoveToTileProcess(CharacterObject owner, MapTile tile) {
		super(owner);
		this.targetTile = tile;
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
			CharacterController.instance.setProcess(character, new EmptyProcess());
		}
	}
}
