package direded.game.server.game.process;

import direded.game.server.game.MapTile;
import direded.game.server.game.gameobject.CharacterObject;
import lombok.Getter;
import org.springframework.stereotype.Component;

@Component
public class CharacterProcessFactory {

	@Getter
	private final EmptyProcess emptyProcess = new EmptyProcess();

	public LumberjackProcess newLumberjackProcess(CharacterObject c) {
		return new LumberjackProcess(c);
	}

	public MoveToTileProcess newMoveToTileProcess(CharacterObject c, MapTile tile) {
		return new MoveToTileProcess(c, tile);
	}

}
