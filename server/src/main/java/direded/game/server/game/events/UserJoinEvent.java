package direded.game.server.game.events;

import direded.game.server.game.UserClient;
import direded.game.server.network.clientpacket.CharacterDataCl;
import direded.game.server.network.clientpacket.UserProfileCl;
import direded.game.server.repository.CharacterRepository;
import direded.game.server.storage.CharacterStorageService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserJoinEvent extends GameEvent {

	private UserClient user;

	public void innerProcess() {
		// Initialize characters for userclient
		var characters = CharacterStorageService.instance.findUserCharacters(user.getModel());
		user.setCharacters(characters);

		var packet = new CharacterDataCl(characters.get(0));
		packet.send(user);
	}

}
