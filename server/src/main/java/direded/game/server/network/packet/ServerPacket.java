package direded.game.server.network.packet;

import direded.game.server.game.UserClient;
import lombok.Getter;
import lombok.Setter;

public abstract class ServerPacket {

	@Getter
	@Setter
	protected UserClient user;

	public abstract void process();
}
