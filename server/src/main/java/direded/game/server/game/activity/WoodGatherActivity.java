package direded.game.server.game.activity;

import com.google.gson.JsonObject;
import direded.game.server.game.Game;
import direded.game.server.game.gameobject.CharacterObject;
import direded.game.server.game.items.ItemType;
import direded.game.server.game.process.LumberjackProcess;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class WoodGatherActivity extends AbstractActivity {

    private double gatherSpeed = 1;

    protected WoodGatherActivity(UUID id) {
        super(ActivityType.GATHER_WOOD, id);
    }

    public static WoodGatherActivity create(UUID id) {
        return new WoodGatherActivity(id);
    }

    public double getGatherSpeed(CharacterObject c) {
        return c.getInventory().contains(ItemType.AXE) ? gatherSpeed * 5 : gatherSpeed;
    }

	@Override
	public void processRequest(CharacterObject character, JsonObject data) {
		Game.characterController().setProcess(character, LumberjackProcess.create(character));
	}
}
