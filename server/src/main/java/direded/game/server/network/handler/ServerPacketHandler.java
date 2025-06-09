package direded.game.server.network.handler;

import com.google.gson.JsonObject;
import direded.game.server.network.serverpacket.ServerPacket;

public interface ServerPacketHandler<T extends ServerPacket> {

	T parse(JsonObject json);
}
