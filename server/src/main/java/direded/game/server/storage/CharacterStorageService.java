package direded.game.server.storage;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import direded.game.server.game.GameMap;
import direded.game.server.game.gameobject.CharacterObject;
import direded.game.server.game.items.ItemStack;
import direded.game.server.game.items.ItemType;
import direded.game.server.game.process.*;
import direded.game.server.model.CharacterModel;
import direded.game.server.model.UserModel;
import direded.game.server.repository.CharacterRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Component
public class CharacterStorageService {

	public static CharacterStorageService instance;

	@PostConstruct
	private void onPostConstruct() {
		instance = this;
	}

	public static final Logger logger = LoggerFactory.getLogger(CharacterStorageService.class);

	private final Gson gson;
	private final CharacterRepository characterRepository;

	public void saveCharacter(CharacterObject character) {
		characterRepository.save(toCharacterModel(character));
	}

	public CharacterObject findFirstCharacter() {
		var characters = characterRepository.findAll();
		return characters.isEmpty() ? null : toCharacterObject(characters.getFirst());
	}

	public List<CharacterObject> findUserCharacters(UserModel user) {
		var models = characterRepository.findByUser(user);
		var list = new ArrayList<CharacterObject>();
		for (var model : models) {
			list.add(toCharacterObject(model));
		}
		return list;
	}

	private CharacterObject toCharacterObject(CharacterModel model) {
		var character = new CharacterObject();

		character.setId(model.getId());
		character.setName(model.getName());
		character.setUser(model.getUser());

		var data = gson.fromJson(model.getDataJson(), JsonObject.class);

		if (data.has("inventory")) {
			var inventoryJson = data.getAsJsonArray("inventory");
			for (var itemJsonElement : inventoryJson) {
				var itemJson = itemJsonElement.getAsJsonObject();
				character.getInventory().add(
					new ItemStack(
						ItemType.valueOf(itemJson.get("type").getAsString()),
						itemJson.get("count").getAsInt()
					)
				);
			}
		} else {
			logger.warn("Wrong character " + model.getId() + " json data: no \"inventory\" key");
		}


		if (data.has("currentTile")) {
			var tileUuid = UUID.fromString(data.get("currentTile").getAsString());
			var tile = GameMap.instance.getTiles().get(tileUuid);
			character.setCurrentMapTile(tile);
		} else {
			logger.warn("Wrong character " + model.getId() + " json data: no \"currentTile\" key");
		}

		if (data.has("process")) {
			var process = CharacterProcess.deserialize(character, data.get("process").getAsJsonObject());
			character.setProcess(process);
		} else {
			logger.warn("Wrong character " + model.getId() + " json data: no \"currentTile\" key");
		}

		return character;
	}

	private CharacterModel toCharacterModel(CharacterObject character) {
		var data = new JsonObject();

		var inventoryData = new JsonArray();
		data.add("inventory", inventoryData);
		for (var itemStack : character.getInventory()) {
			inventoryData.add(itemStack.serialize(new JsonObject()));
		}

		data.addProperty("currentTile", character.getCurrentMapTile().getId().toString());

		data.add("process", character.getProcess().serialize(new JsonObject()));

		var model = new CharacterModel(character.getId());
		model.setId(character.getId());
		model.setName(character.getName());
		model.setUser(character.getUser());
		model.setDataJson(gson.toJson(data));

		return model;
	}
}
