package direded.game.server.network.handler;

import direded.game.server.game.UserClient;
import direded.game.server.network.packet.TestPacket;
import lombok.Getter;

public class TestPacketHandler extends ServerPacketHandler<TestPacket> {

	public TestPacketHandler(int type) {
		super(type);
	}

	@Override
	public TestPacket parse(UserClient sender, String message) {

	}
}
