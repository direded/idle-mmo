package direded.game.server.game.process;

import direded.game.server.game.MapTile;
import direded.game.server.game.gameobject.CharacterObject;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import org.springframework.stereotype.Component;

@Component
public class CharacterProcessFactory {

	public static CharacterProcessFactory instance;

	@PostConstruct
	private void onPostConstruct() {
		instance = this;
	}

	private final EmptyProcess _emptyProcess = new EmptyProcess();

	public EmptyProcess emptyProcess() {
		return _emptyProcess;
	}

	public LumberjackProcess lumberjackProcess(CharacterObject c) {
		return new LumberjackProcess(c);
	}

	public MoveToTileProcess moveToTileProcess(CharacterObject c, MapTile tile) {
		return new MoveToTileProcess(c, tile);
	}

}
