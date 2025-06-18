package direded.game.server.game.events;

import direded.game.server.game.Game;
import direded.game.server.game.UserClient;
import direded.game.server.game.controller.GameController;
import direded.game.server.game.gameobject.CharacterObject;
import direded.game.server.network.clientpacket.CharacterDataCl;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
@AllArgsConstructor
public class UserJoinEvent extends GameEvent {

	private UserClient user;

	public void innerProcess() {
		// Initialize characters for userclient
		var name = user.getModel().getName();
		System.out.println(name + " has joined");
		var userCharacters = new ArrayList<CharacterObject>();
		for (var character : Game.getCharacters()) {
			if (character.getUser().getId().equals(user.getModel().getId())) {
				userCharacters.add(character);
			}
		}
		user.setCharacters(userCharacters);
		for (var character : userCharacters) {
			character.setClient(user);
		}

		var packet = new CharacterDataCl(userCharacters.get(0));
		packet.send(user);
	}

}
