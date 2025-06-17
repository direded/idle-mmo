package direded.game.server.game.controller;

import direded.game.server.game.GameUtils;
import direded.game.server.game.MapTile;
import direded.game.server.game.gameobject.CharacterObject;
import direded.game.server.game.process.CharacterProcess;
import direded.game.server.game.process.MoveToTileProcess;
import direded.game.server.network.NetworkController;
import direded.game.server.network.clientpacket.CharacterDataCl;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Component;

@Component
public class CharacterController {

	double time = 0;
	public static CharacterController instance;

	public CharacterController() {
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
			setProcess(c, MoveToTileProcess.create(c, tile));
		}
	}

	public void tick(CharacterObject c, double delta) {
		c.getProcess().tick(delta);
		time = time + delta;
		if (time >= 3) {
			var packet = new CharacterDataCl(c);
			packet.setName(RandomStringUtils.insecure().next(5));
			c.send(packet);
			time = 0;
		}

	}
}
