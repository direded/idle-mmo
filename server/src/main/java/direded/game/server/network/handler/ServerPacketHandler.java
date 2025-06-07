package direded.game.server.network.handler;

import direded.game.server.game.UserClient;
import direded.game.server.network.packet.ServerPacket;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public abstract class ServerPacketHandler<T extends ServerPacket> {

	private final int typeId;
	public abstract T parse(String message);
}
