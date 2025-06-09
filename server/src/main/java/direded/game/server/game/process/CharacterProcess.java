package direded.game.server.game.process;

import direded.game.server.game.gameobject.CharacterObject;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public abstract class CharacterProcess {

	protected final CharacterObject character;

	public abstract String getName();
	public abstract void tick(double delta);
	public void init() {}
	public void finish() {}

}
