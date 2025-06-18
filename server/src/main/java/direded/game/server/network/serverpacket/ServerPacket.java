package direded.game.server.network.serverpacket;

import direded.game.server.game.UserClient;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class ServerPacket {

	protected UserClient user;

	protected abstract void process();


}
