package direded.game.server.network.clientpacket;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import direded.game.server.game.MapTile;
import direded.game.server.game.activity.AbstractActivity;
import direded.game.server.game.gameobject.CharacterObject;
import direded.game.server.game.items.ItemStack;
import direded.game.server.game.items.ItemType;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.UUID;

@Component
public class ClientGameDataAggregator {

	private static JsonObject aggregate(CharacterObject character) {
		var json = new JsonObject();
		
		// Character data
		var characterJson = new JsonObject();

		characterJson.addProperty("uuid", character.getId().toString());
		characterJson.addProperty("name", character.getName());
		characterJson.addProperty("health", 100); // Default values
		characterJson.addProperty("maxHealth", 100);
		characterJson.addProperty("hunger", 75);
		characterJson.addProperty("maxHunger", 100);
		characterJson.addProperty("energy", 90);
		characterJson.addProperty("maxEnergy", 100);
		json.add("character", characterJson);

		// Inventory data
		var inventoryJson = new JsonObject();
		
		// Convert inventory items to the expected format
		var itemsArray = new JsonArray();
		for (int i = 0; i < character.getInventory().size(); i++) {
			var itemStack = character.getInventory().get(i);
			var itemJson = new JsonObject();
			itemJson.addProperty("id", i);
			itemJson.addProperty("name", itemStack.getItem().getName());
			itemJson.addProperty("icon", "/assets/items/" + itemStack.getItem().getType().name().toLowerCase() + ".png");
			itemJson.addProperty("count", itemStack.getCount());
			itemJson.addProperty("weight", 1.0); // Default weight
			itemJson.addProperty("rarity", "normal");
			itemsArray.add(itemJson);
		}
		inventoryJson.add("items", itemsArray);
		json.add("inventory", inventoryJson);
		
		// Current location
		var currentLocationJson = new JsonObject();
		var currentTile = character.getCurrentMapTile();
		currentLocationJson.addProperty("uuid", currentTile.getId().toString());
		currentLocationJson.addProperty("name", currentTile.getName());
		currentLocationJson.addProperty("description", "A location in the game world.");

		// Activities at current location
		var activitiesArray = new JsonArray();
		for (AbstractActivity activity : currentTile.getActivities()) {
			var activityJson = new JsonObject();
			activityJson.addProperty("uuid", activity.getId().toString());
			activityJson.addProperty("name", activity.getName());
			activitiesArray.add(activityJson);
		}
		currentLocationJson.add("activities", activitiesArray);
		json.add("currentLocation", currentLocationJson);
		
		// Nearby locations
		var nearbyLocationsArray = new JsonArray();
		for (Map.Entry<MapTile, Double> neighbor : currentTile.getNeighbors().entrySet()) {
			var neighborTile = neighbor.getKey();
			var distance = neighbor.getValue();
			var neighborJson = new JsonObject();
			neighborJson.addProperty("uuid", neighborTile.getId().toString());
			neighborJson.addProperty("name", neighborTile.getName());
			neighborJson.addProperty("description", "A nearby location.");
			neighborJson.addProperty("distance", distance + " km");
			neighborJson.addProperty("direction", "unknown"); // Default direction
			nearbyLocationsArray.add(neighborJson);
		}
		json.add("nearbyLocations", nearbyLocationsArray);
		
		// Task data
		var taskJson = new JsonObject();
		taskJson.addProperty("type", character.getTask().getType().name());
		json.add("task", taskJson);
		
		// Time data
		var timeJson = new JsonObject();
		var now = LocalDateTime.now();
		var formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm");
		timeJson.addProperty("day", now.getDayOfWeek().name());
		timeJson.addProperty("date", now.format(DateTimeFormatter.ofPattern("dd.MM.yyyy")));
		timeJson.addProperty("time", now.format(DateTimeFormatter.ofPattern("HH:mm")));
		timeJson.addProperty("formatted", now.format(formatter));
		json.add("time", timeJson);

		// Weather data
		var weatherJson = new JsonObject();
		weatherJson.addProperty("condition", "Sunny");
		weatherJson.addProperty("temperature", 22);
		weatherJson.addProperty("humidity", 65);
		weatherJson.addProperty("windSpeed", 5);
		json.add("weather", weatherJson);

		return json;
	}

	public static void populate(JsonObject json, CharacterObject character) {
		json.add("gameData", aggregate(character));
	}

}
