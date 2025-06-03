package direded.game.server.game.controller;

import direded.game.server.DemoComponent;
import direded.game.server.game.GameMap;
import direded.game.server.game.GameMapConfiguration;
import direded.game.server.game.gameobject.CharacterObject;
import direded.game.server.game.gameobject.GameObjectFactory;
import direded.game.server.storage.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class GameController {

	private final DemoComponent demo;

	protected final StorageService storage;
	protected final GameMap gameMap = new GameMap();
	protected final GameMapConfiguration gameMapConfiguration;
	private final GameObjectFactory gameObjectFactory;

	public void init() {
		gameMapConfiguration.setup(gameMap);

		demo.init();
	}

	public void finish() {
		demo.finish();
	}

	public void tick(double delta) {
		demo.tick(delta);
	}

	public void processInput() {
		demo.processInput();
	}
}
