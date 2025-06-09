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

	}
}
