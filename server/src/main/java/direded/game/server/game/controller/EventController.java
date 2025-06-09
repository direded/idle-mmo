package direded.game.server.game.controller;


import direded.game.server.game.events.GameEvent;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

@Getter
@Setter
@Component
@RequiredArgsConstructor
public class EventController {

	public static EventController instance;

	@PostConstruct
	private void onPostConstruct() {
		instance = this;
	}

	private final Queue<GameEvent> events = new LinkedList<>();

	public void addEvent(GameEvent event) {
		synchronized (events) {
			events.add(event);
		}
	}

	public void processEvents() {
		GameEvent event;
		synchronized (events) {
			event = events.poll();
		}
		while (event != null) {
			event.process();
			synchronized (events) {
				event = events.poll();
			}
		}
	}

}
