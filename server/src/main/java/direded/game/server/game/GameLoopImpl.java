package direded.game.server.game;

import direded.game.server.game.controller.GameController;
import org.springframework.stereotype.Component;

/**
 * Fixed step game loop implementation
 */

@Component
public class GameLoopImpl extends GameLoop {

	/** 20 ms per frame = 50 FPS. */
	private static final long MS_PER_FRAME = 50;
	private static final double SEC_PER_FRAME = MS_PER_FRAME / 1000.d;

	public GameLoopImpl(GameController gameController) {
		super(gameController);
	}

	@Override
	protected void processGameLoop() {
		onGameLoopStart();
		var previousTime = System.currentTimeMillis();
		var lag = 0L;
		while (isGameRunning()) {
			var currentTime = System.currentTimeMillis();
			var elapsedTime = currentTime - previousTime;
			previousTime = currentTime;
			lag += elapsedTime;

			processInput();

			if (isGameRunning() && lag >= MS_PER_FRAME) {
				tick(SEC_PER_FRAME);
				lag -= MS_PER_FRAME;
			}

			lag = lag % MS_PER_FRAME;

		}
		onGameLoopFinish();
	}
}
