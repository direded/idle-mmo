package direded.game.server.game.events;

import direded.game.server.game.UserClient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserLeaveEvent extends GameEvent {

	private UserClient user;

	@Override
	public void innerProcess() {
		var name = user.getModel().getName();
		System.out.println(name + " has left");
		for (var character : user.getCharacters()) {
			character.setClient(null);
		}
	}
}
