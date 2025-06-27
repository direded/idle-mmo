package direded.game.server.game.controller;

import direded.game.server.game.GameUtils;
import direded.game.server.game.MapTile;
import direded.game.server.game.gameobject.CharacterObject;
import direded.game.server.game.task.CharacterTask;
import direded.game.server.game.task.MoveToTileTask;
import direded.game.server.network.clientpacket.CharacterDataCp;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Component;

@Component
public class CharacterController {

	public static CharacterController instance;
	private static final String LOG_PREFIX = "CHARACTER:";

	public CharacterController() {
		instance = this;
	}

	public void setTask(CharacterObject c, CharacterTask task) {
		GameUtils.logger.info("{} Set task {}, {}", LOG_PREFIX, c.getDebugInfo(), task.getDebugInfo());
		var prevTask = c.getTask();
		prevTask.finish();
		c.setTask(task);
		task.init();
	}

	public void moveToTile(CharacterObject c, MapTile tile) {
		GameUtils.logger.info("{} Move to tile {}, {}", LOG_PREFIX, c.getDebugInfo(), tile.getDebugInfo());
		if (MoveToTileTask.canTask(c, tile)) {
			setTask(c, MoveToTileTask.create(c, tile));
		}
	}

	public void tick(CharacterObject c, double delta) {
		c.getTask().tick(delta);
	}
}
