package direded.game.server.game.gameobject;

import direded.game.server.game.process.CharacterProcessFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GameObjectFactory {
	private final CharacterProcessFactory characterProcessFactory;

	public CharacterObject newCharacter() {
		var character = CharacterObject.create();
		character.setProcess(characterProcessFactory.emptyProcess());
		return character;
	}
}
