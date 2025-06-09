package direded.game.server.network;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum PacketType {
	TOKEN_CL(-1),
	USER_PROFILE_CL(10),
	UPDATE_CHARACTER_CL(11),
	TEST_SV(10000),
	COMMON_SV(20000);

	@Getter
	private final int value;
}
