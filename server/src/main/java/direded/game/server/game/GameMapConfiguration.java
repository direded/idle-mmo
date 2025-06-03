package direded.game.server.game;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class GameMapConfiguration {

	protected final Logger logger = LoggerFactory.getLogger(this.getClass());

	public void setup(GameMap gameMap) {
		var woods = createWoodsTile();
		var town = createTownTile();
		var river = createRiverTile();

		addToGameMap(gameMap, woods, town, river);

		setNeighbors(woods, town, 5);
		setNeighbors(town, river, 3);
		setNeighbors(river, woods, 3);
	}

	private MapTile createWoodsTile() {
		var tile = MapTile.create();
		tile.setLabel("woods");
		tile.setName("Whisperwood");
		return tile;
	}

	private MapTile createTownTile() {
		var tile = MapTile.create();
		tile.setLabel("river");
		tile.setName("Ironpeak Hold");
		return tile;
	}

	private MapTile createRiverTile() {
		var tile = MapTile.create();
		tile.setLabel("town");
		tile.setName("Ferryman’s Rest");
		return tile;
	}

	private void setNeighbors(MapTile a, MapTile b, double distance) {
		var aN = a.getNeighbors();
		var bN = b.getNeighbors();
		if (aN.containsKey(b) || bN.containsKey(a)) {
			logger.warn(String.format("Neighbors already exist %s-%s", a.getLabel(), b.getLabel()));
			return;
		}
		aN.put(b, distance);
		bN.put(a, distance);
	}

	private void addToGameMap(GameMap gameMap, MapTile... tiles) {
		for (MapTile tile : tiles) {
			tile.setGameMap(gameMap);
			gameMap.getTiles().put(tile.getId(), tile);
			gameMap.getTilesLabel().put(tile.getLabel(), tile);
		}
	}
}
