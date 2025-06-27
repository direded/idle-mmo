package direded.game.server.game.items;

import java.util.HashMap;
import java.util.Map;

public class Items {
	public static Map<ItemType, Item> items = new HashMap<>();

	public static Item berry = register(new ItemBuilder(ItemType.BERRY).name("Berry"));
	public static Item herb = register(new ItemBuilder(ItemType.HERB).name("Herb"));
	public static Item wood = register(new ItemBuilder(ItemType.WOOD).name("Wood"));
	public static Item axe = register(new ItemBuilder(ItemType.AXE).name("Axe"));

	private static Item register(ItemBuilder builder) {
		var item = builder.build();
		items.put(item.type, item);
		return item;
	}


	public static Item getByType(ItemType type) {
		return items.get(type);
	}
}
