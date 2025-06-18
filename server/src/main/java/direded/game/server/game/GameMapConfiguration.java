package direded.game.server.game;

import direded.game.server.game.activity.AbstractActivity;
import direded.game.server.game.activity.WoodGatherActivity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.UUID;

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
		var tile = MapTile.create(UUID.fromString("7c3fcc1d-3423-400b-8aa1-814dd4c33d98"));
		tile.setLabel("woods");
		tile.setName("Whisperwood");
		tile.getActivities().add(
			register(
				WoodGatherActivity.create(UUID.fromString("5751a3aa-e382-499e-aedf-368abcda7e44"))
			)
		);
		return tile;
	}

	private MapTile createTownTile() {
		var tile = MapTile.create(UUID.fromString("dac9c446-a480-403a-9de6-dd2e86d68a8a"));
		tile.setLabel("river");
		tile.setName("Ironpeak Hold");
		return tile;
	}

	private MapTile createRiverTile() {
		var tile = MapTile.create(UUID.fromString("75910a59-e760-4539-855a-803bd4b8955d"));
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
			gameMap.getTiles().put(tile.getId(), tile);
			gameMap.getTilesLabel().put(tile.getLabel(), tile);
		}
	}

	private AbstractActivity register(AbstractActivity activity) {
		Game.activityStorage().addActivity(activity);
		return activity;
	}
}
