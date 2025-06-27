package direded.game.server.game.task;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IdleTask extends CharacterTask {

	private final String name = "idle";
	private final CharacterTaskType type = CharacterTaskType.IDLE;

	@Override
	public void tick(double delta) {
	}

	private static IdleTask task;

	public static IdleTask get() {
		if (task == null) {
			task = new IdleTask();
		}
		return task;
	}
}
