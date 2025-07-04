package direded.game.server.game.items;

import com.google.gson.JsonObject;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Item {

	protected ItemType type;
	protected String name;

	public Item(ItemType type) {
		this.type = type;
	}
}
