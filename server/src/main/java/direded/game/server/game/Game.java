package direded.game.server.game;

import direded.game.server.game.controller.CharacterController;
import direded.game.server.game.controller.GameController;
import direded.game.server.game.gameobject.CharacterObject;
import direded.game.server.storage.CharacterStorage;

import java.util.List;

public class Game {

    public static CharacterStorage characterStorage() {
        return CharacterStorage.instance;
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

    public static GameMap getMap() {
        return GameMap.instance;
    }
}
