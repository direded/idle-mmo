package direded.game.server.game.events;

import direded.game.server.game.controller.EventController;
import lombok.Getter;

@Getter
public abstract class GameEvent {

	private boolean processed = false;

	public void register() {
		EventController.instance.addEvent(this);
	}

	public void process() {
		innerProcess();
		processed = true;
	}

	protected abstract void innerProcess();

}
