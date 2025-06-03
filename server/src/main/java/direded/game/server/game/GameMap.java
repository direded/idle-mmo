package direded.game.server.game;

import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Getter
@Setter
public class GameMap {

	public static GameMap instance;

	public GameMap() {
		instance = this;
	}

	private final Map<UUID, MapTile> tiles = new HashMap<>();
	private final Map<String, MapTile> tilesLabel = new HashMap<>();

	public MapTile getTileByLabel(String label) {
		return tilesLabel.get(label);
	}
}
