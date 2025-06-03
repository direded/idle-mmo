package direded.game.server.network;

import com.google.gson.JsonObject;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.nio.channels.Channel;
import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
@Component
public class NetworkController {

	private List<Channel> clients;

	public void sendMessage(String topic, String message) {

	}

	public void sendMessage(String topic, JsonObject json) {

	}

}
