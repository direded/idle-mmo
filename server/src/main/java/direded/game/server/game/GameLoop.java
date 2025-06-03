package direded.game.server.game;

import direded.game.server.game.controller.GameController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class GameLoop {

	protected final Logger logger = LoggerFactory.getLogger(this.getClass());

	protected GameController gameController;

	protected volatile GameStatus status;

	private Thread gameThread;

	public GameLoop(final GameController gameController) {
		status = GameStatus.STOPPED;
		this.gameController = gameController;
	}

	protected void onGameLoopStart() {
		logger.info("Initializing game");
		gameController.init();
	}

	protected void onGameLoopFinish() {
		logger.info("Finishing game");
		gameController.finish();
	}

	public void start() {
		logger.info("Starting game loop thread");
		status = GameStatus.RUNNING;
		gameThread = new Thread(this::processGameLoop);
		gameThread.setName("game_loop");
		gameThread.start();
	}

	public void stop() {
		logger.info("Stopping game loop");
		status = GameStatus.STOPPED;
	}

	public boolean isGameRunning() {
		return status == GameStatus.RUNNING;
	}

	protected void tick(double delta) {
		gameController.tick(delta);
	}

	protected void processInput() {
		gameController.processInput();
	}

	protected abstract void processGameLoop();
}
