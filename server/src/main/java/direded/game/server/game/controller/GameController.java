package direded.game.server.game.controller;

import direded.game.server.DemoComponent;
import direded.game.server.game.Game;
import direded.game.server.game.GameMap;
import direded.game.server.game.GameMapConfiguration;
import direded.game.server.game.gameobject.CharacterObject;
import direded.game.server.network.NetworkController;
import direded.game.server.repository.UserRepository;
import direded.game.server.repository.UserSessionRepository;
import direded.game.server.storage.CharacterStorage;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Component
@Getter
@Setter
public class GameController {

	public static GameController instance;

	@PostConstruct
	private void onPostConstruct() {
		instance = this;
	}

	private final DemoComponent demo;

	protected final CharacterStorage storage;
	protected final GameMap gameMap = new GameMap();
	protected final GameMapConfiguration gameMapConfiguration;

	private final NetworkController networkController;
	private final EventController eventController;
	private final CharacterController characterController;
	private final TimeController timeController;

	private final UserSessionRepository userSessionRepository;
	private final UserRepository userRepository;

	public void init() {
		storage.load();
		gameMapConfiguration.setup(gameMap);

		var character = storage.getCharacters().isEmpty() ? null : storage.getCharacters().getFirst();
		if (character == null) {
			var user = demo.createUser();
			character = demo.createCharacter(user);
			var session = demo.createUserSession(user);

			userSessionRepository.save(session);
			userRepository.save(user);
			storage.addCharacter(character);
		}
	}

	public void tick(double delta) {
		// Update game time
		timeController.tick((float) delta);
		
		for (var character : Game.getCharacters()) {
			characterController.tick(character, delta);
		}

	}

	public void finish() {
		storage.save();
	}

	public void processInput() {
		networkController.processPackets();
		eventController.processEvents();
	}
}
