package direded.game.server.game.controller;

import direded.game.server.game.GameUtils;
import direded.game.server.game.MapTile;
import direded.game.server.game.gameobject.CharacterObject;
import direded.game.server.game.process.CharacterProcess;
import direded.game.server.game.process.CharacterProcessFactory;
import direded.game.server.game.process.MoveToTileProcess;
import org.springframework.stereotype.Component;

@Component
public class CharacterController {

	public static CharacterController instance;

	private final CharacterProcessFactory characterProcessFactory;

	public CharacterController(CharacterProcessFactory characterProcessFactory) {
		this.characterProcessFactory = characterProcessFactory;
		instance = this;
	}

	public void setProcess(CharacterObject c, CharacterProcess process) {
		var prevProcess = c.getProcess();
		prevProcess.finish();
		c.setProcess(process);
		process.init();
	}

	public void moveToTile(CharacterObject c, MapTile tile) {
		GameUtils.logger.info("trying to move to " + tile.getName());
		if (MoveToTileProcess.canProcess(c, tile)) {
			GameUtils.logger.info("moving to " + tile.getName());
			setProcess(c, characterProcessFactory.newMoveToTileProcess(c, tile));
		}
	}
}
