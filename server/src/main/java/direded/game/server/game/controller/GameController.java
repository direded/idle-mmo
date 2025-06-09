package direded.game.server.game.controller;

import direded.game.server.DemoComponent;
import direded.game.server.game.GameMap;
import direded.game.server.game.GameMapConfiguration;
import direded.game.server.game.gameobject.CharacterObject;
import direded.game.server.network.NetworkController;
import direded.game.server.repository.UserRepository;
import direded.game.server.repository.UserSessionRepository;
import direded.game.server.storage.CharacterStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Component
public class GameController {

	private final DemoComponent demo;

	protected final CharacterStorageService storage;
	protected final GameMap gameMap = new GameMap();
	protected final GameMapConfiguration gameMapConfiguration;

	private final List<CharacterObject> characters = new ArrayList<>();
	private final NetworkController networkController;
	private final CharacterStorageService storageService;

	private final UserSessionRepository userSessionRepository;
	private final UserRepository userRepository;
	private final CharacterController characterController;
	private final EventController eventController;

	public void init() {
		gameMapConfiguration.setup(gameMap);

		var character = storage.findFirstCharacter();
		if (character != null)
			return;
		var user = demo.createUser();
		character = demo.createCharacter(user);
		var session = demo.createUserSession(user);

		userSessionRepository.save(session);
		userRepository.save(user);
		storage.saveCharacter(character);

		characters.add(character);
	}

	public void tick(double delta) {
		for (var character : characters) {
			characterController.tick(character, delta);
		}

	}

	public void finish() {
		for (CharacterObject character : characters) {
			storageService.saveCharacter(character);
		}
	}

	public void processInput() {
		networkController.processPackets();
		eventController.processEvents();
	}
}
