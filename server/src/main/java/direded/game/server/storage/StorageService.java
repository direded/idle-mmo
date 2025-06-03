package direded.game.server.storage;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import direded.game.server.game.ResourceType;
import direded.game.server.game.gameobject.CharacterObject;
import direded.game.server.model.CharacterModel;
import direded.game.server.repository.CharacterRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class StorageService {

	public static final Logger logger = LoggerFactory.getLogger(StorageService.class);

	private final Gson gson;
	private final CharacterRepository playerRepository;

	public void registerCharacter(CharacterObject character) {
		var model = playerRepository.save(toCharacterModel(character));
		character.setId(model.getId());
	}

	public void savePlayer(CharacterObject character) {
		playerRepository.save(toCharacterModel(character));
	}

	public CharacterObject findFirstCharacter() {
		var characters = playerRepository.findAll();
		return characters.isEmpty() ? null : toCharacterObject(characters.getFirst());
	}

	private CharacterObject toCharacterObject(CharacterModel model) {
		var character = new CharacterObject();

		var data = gson.fromJson(model.getDataJson(), JsonObject.class);

		if (data.has("resources")) {
			var resourcesData = data.getAsJsonObject("resources");
			var resources = character.getResources();
			for (var resourceType : ResourceType.values()) {
				var resourceName = resourceType.toString();
				int value = 0;
				if (resourcesData.has(resourceName)) {
					value = data.get(resourceName).getAsInt();
				}
				resources.put(resourceType, value);
			}
		} else {
			logger.warn("Wrong character " + model.getId() + " json data: no \"resources\" key");
		}

		character.setName(model.getName());

		return character;
	}

	private CharacterModel toCharacterModel(CharacterObject character) {
		var model = new CharacterModel(character.getId());

		var data = new JsonObject();

		var resourcesData = new JsonObject();
		data.add("resources", resourcesData);
		for (var resource : character.getResources().entrySet()) {
			resourcesData.addProperty(resource.getKey().toString(), resource.getValue());
		}
		model.setDataJson(gson.toJson(resourcesData));

		model.setName(character.getName());

		return model;
	}

}
