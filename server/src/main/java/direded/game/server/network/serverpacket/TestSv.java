package direded.game.server.network.serverpacket;

import com.google.gson.JsonObject;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TestSv extends ServerPacket {

	@Override
	protected void innerProcess() {

	}

	public static TestSv parse(JsonObject json) {
		return null;
	}
}
