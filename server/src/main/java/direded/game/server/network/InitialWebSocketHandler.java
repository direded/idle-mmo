package direded.game.server.network;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import direded.game.server.game.UserClient;
import direded.game.server.repository.UserSessionRepository;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.handler.codec.http.websocketx.*;

public class InitialWebSocketHandler extends ChannelInboundHandlerAdapter {

	Gson gson = new Gson();

	@Override
	public void channelRead(ChannelHandlerContext ctx, Object msg) {

		if (msg instanceof TextWebSocketFrame) {
			System.out.println("Registering client..");
			var jsonString = ((TextWebSocketFrame) msg).text();
			var json = gson.fromJson(jsonString, JsonObject.class);
			if (!json.has("token")) {
				return;
			}
			var token = json.get("token").getAsString();
			var client = NetworkController.instance.registerClient(ctx.channel(), token);
			if (client != null) {
				System.out.println("Client registered!");
				ctx.channel().writeAndFlush(new TextWebSocketFrame(createSuccessAnswer(client)));
				ctx.pipeline().replace(this, "websocketHandler", new WebSocketHandler());
			}
		}
	}

	private String createSuccessAnswer(UserClient client) {
		var username = client.getUser().getName();
		return "{\"success\":true,\"username\":\"" + username + "\"}";
	}
}
