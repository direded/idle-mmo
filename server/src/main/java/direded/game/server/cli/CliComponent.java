package direded.game.server.cli;

import direded.game.server.game.GameLoop;
import direded.game.server.game.controller.GameController;
import direded.game.server.network.NettyServerBootstrapper;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@AllArgsConstructor
@Component
public class CliComponent {

	protected final Logger logger = LoggerFactory.getLogger(this.getClass());

	protected final GameLoop gameLoop;
	protected final NettyServerBootstrapper nettyServer;
	private final GameController gameController;

	public void start() {
		var cliThread = new Thread(this::processLoop);
		cliThread.setName("cli_loop");
		cliThread.start();
	}

	private void onExitCommand() {
		gameLoop.stop();
		nettyServer.stop();
	}

	private void processLoop() {
		logger.info("Starting cli..");
		var sysin = new BufferedReader(new InputStreamReader(System.in));
		try {
			while (true) {
				var in = sysin.readLine();
				if (in.equals("exit")) {
					logger.info("command: exit");
					onExitCommand();
					break;
				}

				if (in.startsWith("move ")) {
					gameController.targetTile = in.substring(5);
				}
				Thread.sleep(350);
			}
		} catch (IOException | InterruptedException ignored) {

		}
	}
}
