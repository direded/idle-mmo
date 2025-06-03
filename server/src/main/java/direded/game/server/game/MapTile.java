package direded.game.server.game;

import lombok.Getter;
import lombok.Setter;

import java.util.*;

@Getter
@Setter
public class MapTile {

	public static MapTile create() {
		var tile = new MapTile();
		tile.id = UUID.randomUUID();
		return tile;
	}

	private UUID id;
	private String label;
	private String name;
	private GameMap gameMap;
	private Map<MapTile, Double> neighbors = new HashMap<>();

	public Double getDistanceTo(MapTile tile) {
		return neighbors.getOrDefault(tile, null);
	}

	@Override
	public int hashCode() {
		return id.hashCode();
	}

	@Override
	public boolean equals(Object obj) {
		return obj != null && obj.getClass() == this.getClass() && ((MapTile) obj).id.equals(id);
	}
}
