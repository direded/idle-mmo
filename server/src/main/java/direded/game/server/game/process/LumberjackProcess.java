package direded.game.server.game.process;

import com.google.gson.JsonObject;
import direded.game.server.game.GameUtils;
import direded.game.server.game.ResourceType;
import direded.game.server.game.gameobject.CharacterObject;
import direded.game.server.network.clientpacket.UpdateCharacterCl;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LumberjackProcess extends CharacterProcess {

	private final String name = "lumberjack";
	private double time = 0;

	public LumberjackProcess(CharacterObject owner) {
		super(owner);
	}

	@Override
	public void tick(double delta) {
		GameUtils.logger.info(name);
		time += delta;
		if (time >= 2) {
			GameUtils.logger.info("lumberjack inc");
			character.incResource(ResourceType.WOOD, 10);

			var packet = new UpdateCharacterCl(character);
			var data = packet.getData();
			var resourcesJson = new JsonObject();
			resourcesJson.addProperty("wood", character.getResource(ResourceType.WOOD));
			data.add("resources", resourcesJson);
			character.send(packet);

			time -= 2;
		}
		time %= 2;
	}

}
