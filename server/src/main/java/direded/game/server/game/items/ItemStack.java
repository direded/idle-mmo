package direded.game.server.game.items;

import com.google.gson.JsonObject;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemStack {

	protected Item item;
	protected int count;

	public ItemStack(Item item, int count) {
		this.item = item;
		this.count = count;
	}

	public ItemStack(ItemType type, int count) {
		this.item = Items.getByType(type);
		this.count = count;
	}

	public JsonObject serialize(JsonObject json) {
		json.addProperty("type", item.type.toString());
		json.addProperty("count", count);
		return json;
	}

}
