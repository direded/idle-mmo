package direded.game.server.game.events;

import direded.game.server.game.UserClient;
import direded.game.server.network.clientpacket.UserProfileCl;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserJoinEvent extends GameEvent {

	private UserClient user;

	public void innerProcess() {
//		var packet = new UserProfileCl(user.getModel());
//		user.send(packet);
	}

}
