package direded.game.server.network.serverpacket;

import direded.game.server.game.UserClient;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class ServerPacket {

	protected UserClient user;
	private boolean processed = false;

	public void process() {
		innerProcess();
		processed = true;
	}

	protected abstract void innerProcess();


}
