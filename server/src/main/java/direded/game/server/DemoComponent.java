package direded.game.server;

import direded.game.server.game.GameMap;
import direded.game.server.game.controller.CharacterController;
import direded.game.server.game.gameobject.CharacterObject;
import direded.game.server.game.process.IdleProcess;
import direded.game.server.model.UserModel;
import direded.game.server.model.UserSessionModel;
import direded.game.server.repository.UserRepository;
import direded.game.server.repository.UserSessionRepository;
import direded.game.server.storage.CharacterStorage;
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

	protected final CharacterStorage storage;
	protected final CharacterController characterController;

	protected CharacterObject character;

	@PostConstruct
	private void onPostConstruct() {
		instance = this;
	}

	public UserModel createUser() {
		var a = new UserModel();
		a.setId(UUID.randomUUID());
		a.setName("direded");
		return a;
	}

	public CharacterObject createCharacter(UserModel user) {
		var c = CharacterObject.create();
		c.setId(UUID.randomUUID());
		c.setName("Dima");
		c.setProcess(IdleProcess.get());
		c.setCurrentMapTile(GameMap.instance.getTileByLabel("town"));
		c.setUser(user);
		return c;
	}

	public UserSessionModel createUserSession(UserModel user) {
		var s = new UserSessionModel();
//		s.setToken(RandomStringUtils.secure().nextAlphanumeric(64));
		s.setToken("test");
		user.setSession(s);
		return s;
	}
}
