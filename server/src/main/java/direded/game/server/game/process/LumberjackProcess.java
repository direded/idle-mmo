package direded.game.server.game.process;

import direded.game.server.game.GameUtils;
import direded.game.server.game.ResourceType;
import direded.game.server.game.gameobject.CharacterObject;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LumberjackProcess extends CharacterProcess {

	private final String name = "lumberjack";
	private double time = 0;

	public LumberjackProcess(CharacterObject owner) {
		super(owner);
	}

	@Override
	public void tick(double delta) {
		GameUtils.logger.info(name);
		time += delta;
		if (time >= 2) {
			GameUtils.logger.info("lumberjack inc");
			owner.incResource(ResourceType.WOOD, 10);
			time -= 2;
		}
	}

}
