package direded.game.server.game;

import direded.game.server.model.UserModel;
import io.netty.channel.Channel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class UserClient {

	private final UserModel user;
	private final Channel channel;
}
