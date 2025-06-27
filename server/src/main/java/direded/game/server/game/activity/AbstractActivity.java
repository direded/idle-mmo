package direded.game.server.game.activity;

import com.google.gson.JsonObject;
import direded.game.server.game.gameobject.CharacterObject;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public abstract class AbstractActivity {

    private final ActivityType type;
    private final UUID id;

    protected String name;

    protected AbstractActivity(ActivityType type, UUID id) {
        this.type = type;
        this.id = id;
    }

	public abstract void processRequest(CharacterObject character, JsonObject data);
}
