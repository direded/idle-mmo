package direded.game.server.game.items;

public class ItemBuilder {

	public Item item;

	public ItemBuilder(ItemType type) {
		item = new Item(type);
	}

	public ItemBuilder name(String name) {
		item.name = name;
		return this;
	}

	public Item build() {
		return item;
	}

}
