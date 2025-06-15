package direded.game.server.game.items;

import java.util.HashMap;
import java.util.Map;

public class Items {
	public static Map<ItemType, Item> items = new HashMap<>();

	public static Item berry = register(ItemType.BERRY);
	public static Item herb = register(ItemType.HERB);
	public static Item wood = register(ItemType.WOOD);

	private static Item register(ItemType itemType) {
		var item = new Item(itemType);
		items.put(itemType, item);
		return item;
	}

	public static Item getByType(ItemType type) {
		return items.get(type);
	}
}
