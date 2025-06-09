package direded.game.server.game.gameobject;

import direded.game.server.game.MapTile;
import direded.game.server.game.ResourceType;
import direded.game.server.game.process.CharacterProcess;
import direded.game.server.model.UserModel;
import direded.game.server.network.NetworkController;
import direded.game.server.network.clientpacket.ClientPacket;
import io.netty.channel.Channel;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
public class CharacterObject extends GameObject {

	private String name;

	private Map<ResourceType, Integer> resources = new HashMap<>();
	private CharacterProcess process;
	private MapTile currentMapTile;
	private UserModel user;
	private Channel channel;

	public static CharacterObject create() {
		CharacterObject player = new CharacterObject();

		var resources = player.resources;
		for (ResourceType type : ResourceType.values()) {
			resources.put(type, 0);
		}
		return player;
	}

	public CharacterObject() {}

	public int getResource(ResourceType type) {
		return resources.get(type);
	}

	public void setResource(ResourceType resourceType, int value) {
		resources.put(resourceType, value);
	}

	public void incResource(ResourceType resourceType, int value) {
		resources.put(resourceType, resources.get(resourceType) + value);
	}

	public double getMoveSpeed() {
		return 1;
	}

	public void send(ClientPacket packet) {
		if (channel == null || !channel.isActive()) return;
		NetworkController.instance.send(channel, packet);
	}
}