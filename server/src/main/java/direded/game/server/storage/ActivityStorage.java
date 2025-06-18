package direded.game.server.storage;

import direded.game.server.game.activity.AbstractActivity;
import direded.game.server.game.gameobject.CharacterObject;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.*;

@RequiredArgsConstructor
@Component
public class ActivityStorage {

	public static ActivityStorage instance;

	@PostConstruct
	private void onPostConstruct() {
		instance = this;
	}

	@Getter
	private final Map<UUID, AbstractActivity> activities = new HashMap<>();

	public void addActivity(final AbstractActivity activity) {
		activities.put(activity.getId(), activity);
	}

}
