package direded.game.server.game.controller;

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

	private final CharacterController characterController;
	public String targetTile;

	protected final StorageService storage;
	protected final GameMap gameMap = new GameMap();
	protected final GameMapConfiguration gameMapConfiguration;
	private final GameObjectFactory gameObjectFactory;

	protected CharacterObject character;

	public void init() {
		gameMapConfiguration.setup(gameMap);

		character = storage.findFirstCharacter();
		if (character == null) {
			character = gameObjectFactory.newCharacter();
			character.setName("Dima");
			character.setCurrentMapTile(gameMap.getTileByLabel("town"));
			storage.registerCharacter(character);
		}
	}

	public void finish() {
		storage.savePlayer(character);
	}

	public void tick(double delta) {
		character.getProcess().tick(delta);
	}

	public void processInput() {
		if (targetTile != null) {
			characterController.moveToTile(character, gameMap.getTileByLabel(targetTile));
			targetTile = null;
		}
	}
}
