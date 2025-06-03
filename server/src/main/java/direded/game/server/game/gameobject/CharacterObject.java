package direded.game.server.game.gameobject;

import direded.game.server.game.MapTile;
import direded.game.server.game.ResourceType;
import direded.game.server.game.process.CharacterProcess;
import direded.game.server.game.process.CharacterProcessFactory;
import direded.game.server.game.process.EmptyProcess;
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

	public static CharacterObject create() {
		CharacterObject player = new CharacterObject();

		var resources = player.resources;
		for (ResourceType type : ResourceType.values()) {
			resources.put(type, 0);
		}

		return player;
	}

	public CharacterObject() {}

	public void setResource(ResourceType resourceType, int value) {
		resources.put(resourceType, value);
	}

	public void incResource(ResourceType resourceType, int value) {
		resources.put(resourceType, resources.get(resourceType) + value);
	}

	public double getMoveSpeed() {
		return 1;
	}
}