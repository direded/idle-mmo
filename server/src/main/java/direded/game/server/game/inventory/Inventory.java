package direded.game.server.game.inventory;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import direded.game.server.game.items.Item;
import direded.game.server.game.items.ItemStack;
import direded.game.server.game.items.ItemType;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class Inventory extends ArrayList<ItemStack> {

	public JsonObject serialize(JsonObject json) {
		var contentJson = new JsonArray();
		for (var item : this) {
			contentJson.add(item.serialize(new JsonObject()));
		}
		json.add("content", contentJson);
		return json;
	}

	public ItemStack get(ItemType itemType) {
		for (var itemStack : this) {
			if (itemStack.getItem().getType().equals(itemType)) {
				return itemStack;
			}
		}
		return null;
	}
}
