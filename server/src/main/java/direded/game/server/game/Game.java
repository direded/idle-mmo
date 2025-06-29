package direded.game.server.game;

import direded.game.server.game.activity.AbstractActivity;
import direded.game.server.game.controller.CharacterController;
import direded.game.server.game.controller.GameController;
import direded.game.server.game.controller.TimeController;
import direded.game.server.game.gameobject.CharacterObject;
import direded.game.server.storage.ActivityStorage;
import direded.game.server.storage.CharacterStorage;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public class Game {

	public static CharacterStorage characterStorage() {
		return CharacterStorage.instance;
	}

	public static ActivityStorage activityStorage() {
		return ActivityStorage.instance;
	}

	public static GameController gameController() {
		return GameController.instance;
	}

	public static CharacterController characterController() {
		return CharacterController.instance;
	}

	public static List<CharacterObject> getCharacters() {
		return CharacterStorage.instance.getCharacters();
	}

	public static Map<UUID, AbstractActivity> getActivities() {
		return ActivityStorage.instance.getActivities();
	}

	public static GameMap getMap() {
		return GameMap.instance;
	}

	public static TimeController timeController() {
		return TimeController.instance;
	}
}
