package direded.game.server.game.process;

import direded.game.server.game.GameUtils;
import direded.game.server.game.gameobject.CharacterObject;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmptyProcess extends CharacterProcess {

	private final String name = "empty";

	public EmptyProcess() {
		super(null);
	}

	@Override
	public void tick(double delta) {
	}
}
