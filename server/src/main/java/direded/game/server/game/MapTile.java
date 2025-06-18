package direded.game.server.game;

import com.google.gson.JsonObject;
import direded.game.server.game.activity.AbstractActivity;
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

	public static MapTile create(UUID id) {
		var tile = new MapTile();
		tile.id = id;
		return tile;
	}

	private UUID id;
	private String label;
	private String name;
	private Map<MapTile, Double> neighbors = new HashMap<>();

	private List<AbstractActivity> activities = new ArrayList<>();

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

	public JsonObject serialize(JsonObject json) {
		json.addProperty("id", id.toString());
		json.addProperty("label", label);
		json.addProperty("name", name);
		
		JsonObject neighborsJson = new JsonObject();
		neighbors.forEach((tile, distance) -> {
			var neighborData = tile.serializeWithoutNeighbors(new JsonObject());
			neighborData.addProperty("distance", distance);
			neighborsJson.add(tile.getId().toString(), neighborData);
		});
		json.add("neighbors", neighborsJson);
		
		return json;
	}

	public JsonObject serializeWithoutNeighbors(JsonObject json) {
		json.addProperty("id", id.toString());
		json.addProperty("label", label);
		json.addProperty("name", name);
		return json;
	}
}
