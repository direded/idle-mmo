package direded.game.server;

import direded.game.server.game.items.ItemType;
import direded.game.server.game.items.Items;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;

import java.util.HashSet;

public class ItemsTests {

	@Test
	void allItemsInitialized() {
		var registeredItems = Items.items.keySet();

		for (var itemType : ItemType.values()) {
			Assert.isTrue(registeredItems.contains(itemType), "All items must be registered");
		}
	}
}
