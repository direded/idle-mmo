package direded.game.server.game.task;

import com.google.gson.JsonObject;
import direded.game.server.game.GameUtils;
import direded.game.server.game.gameobject.CharacterObject;
import direded.game.server.game.items.ItemStack;
import direded.game.server.game.items.ItemType;
import direded.game.server.network.clientpacket.CharacterDataCp;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LumberjackTask extends CharacterTask {

	private final String name = "lumberjack";
	private final CharacterTaskType type = CharacterTaskType.LUMBERJACK;
	private double time = 0;

	public static LumberjackTask create(CharacterObject character) {
		var task = new LumberjackTask();
		task.character = character;
		return task;
	}

	@Override
	public void tick(double delta) {
		GameUtils.logger.info(name);
		time += delta;
		if (time >= 2) {

			var inventory = character.getInventory();
			var wood = inventory.get(ItemType.WOOD);
			if (wood == null) {
				wood = new ItemStack(ItemType.WOOD, 1);
			} else {
				wood.setCount(wood.getCount() + 1);
			}

			var packet = new CharacterDataCp(character);
			character.send(packet);

			time -= 2;
		}
		time %= 2;
	}

	@Override
	public JsonObject serialize(JsonObject json) {
		super.serialize(json);
		json.addProperty("time", time);
		return json;
	}

	@Override
	public void deserialize(JsonObject json) {
		super.deserialize(json);
		time = json.get("time").getAsDouble();
	}
}
