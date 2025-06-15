package direded.game.server.game.process;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IdleProcess extends CharacterProcess {

	private final String name = "idle";
	private final CharacterProcessType type = CharacterProcessType.IDLE;

	@Override
	public void tick(double delta) {
	}

	private static IdleProcess process;

	public static IdleProcess get() {
		if (process == null) {
			process = new IdleProcess();
		}
		return process;
	}
}
