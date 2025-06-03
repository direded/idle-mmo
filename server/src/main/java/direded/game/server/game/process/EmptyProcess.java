package direded.game.server.game.process;

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
