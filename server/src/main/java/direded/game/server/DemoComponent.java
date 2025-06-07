package direded.game.server;

import direded.game.server.game.GameMap;
import direded.game.server.game.controller.CharacterController;
import direded.game.server.game.gameobject.CharacterObject;
import direded.game.server.game.process.CharacterProcessFactory;
import direded.game.server.model.UserModel;
import direded.game.server.model.UserSessionModel;
import direded.game.server.repository.UserRepository;
import direded.game.server.repository.UserSessionRepository;
import direded.game.server.storage.StorageService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@RequiredArgsConstructor
@Component
public class DemoComponent {

	public static DemoComponent instance;
	private final UserSessionRepository userSessionRepository;
	private final UserRepository userRepository;

	public String targetTile;

	protected final StorageService storage;
	protected final GameObjectFactory gameObjectFactory;
	protected final CharacterController characterController;

	protected CharacterObject character;

	@PostConstruct
	private void onPostConstruct() {
		instance = this;
	}

	public void init() {
		character = storage.findFirstCharacter();
		if (character != null)
			return;
		var user = createUser();
		character = createCharacter(user);
		var session = createUserSession(user);
		userSessionRepository.save(session);
		userRepository.save(user);
		storage.saveCharacter(character);
	}

	public void tick(double delta) {
		character.getProcess().tick(delta);
	}

	public void finish() {
		storage.saveCharacter(character);
	}

	public void processInput() {
		if (targetTile != null) {
			characterController.moveToTile(character, GameMap.instance.getTileByLabel(targetTile));
			targetTile = null;
		}
	}

	private UserModel createUser() {
		var a = new UserModel();
		a.setId(UUID.randomUUID());
		a.setName("direded");
		return a;
	}

	private CharacterObject createCharacter(UserModel user) {
		var c = CharacterObject.create();
		c.setId(UUID.randomUUID());
		c.setName("Dima");
		c.setProcess(CharacterProcessFactory.instance.emptyProcess());
		c.setCurrentMapTile(GameMap.instance.getTileByLabel("town"));
		c.setUser(user);
		return c;
	}

	private UserSessionModel createUserSession(UserModel user) {
		var s = new UserSessionModel();
//		s.setToken(RandomStringUtils.secure().nextAlphanumeric(64));
		s.setToken("test");
		user.setSession(s);
		return s;
	}
}
