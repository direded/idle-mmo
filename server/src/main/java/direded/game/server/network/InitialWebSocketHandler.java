package direded.game.server.network;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import direded.game.server.game.UserClient;
import direded.game.server.network.clientpacket.TokenAcceptedCl;
import io.netty.channel.Channel;
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
			JsonObject json;
			try {
				System.out.println("Trying");
				json = gson.fromJson(jsonString, JsonObject.class);
			} catch(Exception ignored) {
				System.out.println("Exception: " + ignored);
				abortConnection(ctx.channel());
				return;
			}
			if (!json.has("token")) {
				abortConnection(ctx.channel());
				return;
			}
			var token = json.get("token").getAsString();
			var client = NetworkController.instance.registerClient(ctx.channel(), token);
			if (client != null) {
				System.out.println("Client registered!");
				new TokenAcceptedCl(client.getModel()).send(client);
				ctx.pipeline().replace(this, "websocketHandler", new WebSocketHandler());
			}
		}
	}

	private void abortConnection(Channel channel) {
		channel.close();
	}

	@Override
	public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
		cause.printStackTrace();
	}
}
