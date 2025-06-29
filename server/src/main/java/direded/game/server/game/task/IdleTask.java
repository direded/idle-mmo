package direded.game.server.game.task;

import direded.game.server.game.gameobject.CharacterObject;
import direded.game.server.network.clientpacket.GameDataCp;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IdleTask extends CharacterTask {

	private final String name = "idle";
	private final CharacterTaskType type = CharacterTaskType.IDLE;

	public IdleTask(CharacterObject character) {
		super(character);
	}

	private double time = 0;

	@Override
	public void tick(double delta) {
		if (time > 5) {
			character.send(new GameDataCp(character));
			time = 0;
		}
		time += delta;
	}
}
