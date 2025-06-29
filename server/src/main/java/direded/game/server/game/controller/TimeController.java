package direded.game.server.game.controller;

import lombok.Getter;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Getter
@Component
public class TimeController {

	public static TimeController instance;

	// Game time tracking
	private Date time = new Date(0);
	
	// Time speed multiplier (how fast game time progresses)
	private float timeSpeed = 0.5f; // 1.0 = real time, 2.0 = 2x faster, etc.
	
	// Time accumulation for smooth progression
	private float timeAccumulator = 0.0f;

	public TimeController() {
		instance = this;
	}

	public void tick(float delta) {
		// Accumulate time based on delta and speed
		timeAccumulator += delta * timeSpeed;
		
		// Convert accumulated time to minutes (assuming 1 real second = 1 game minute at 1x speed)
		if (timeAccumulator >= 1.0f) {
			int gameMinutes = (int) (timeAccumulator);
			timeAccumulator -= gameMinutes;
			time.setTime(time.getTime() + (long) gameMinutes * 60 * 1000);
		}
	}
}
