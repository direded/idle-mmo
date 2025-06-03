package direded.game.server.game;

import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Getter
@Setter
public class GameMap {

	private final Map<UUID, MapTile> tiles = new HashMap<>();
	private final Map<String, MapTile> tilesLabel = new HashMap<>();

	public MapTile getTileByLabel(String label) {
		return tilesLabel.get(label);
	}
}
