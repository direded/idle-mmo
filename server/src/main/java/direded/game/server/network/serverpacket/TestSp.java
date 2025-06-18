package direded.game.server.network.serverpacket;

import com.google.gson.JsonObject;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TestSp extends ServerPacket {

	@Override
	protected void process() {

	}

	public static TestSp parse(JsonObject json) {
		return null;
	}
}
