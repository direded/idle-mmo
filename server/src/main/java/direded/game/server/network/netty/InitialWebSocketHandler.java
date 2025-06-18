package direded.game.server.network.netty;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import direded.game.server.network.NetworkController;
import direded.game.server.network.clientpacket.TokenResponseCp;
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
				var packet = new TokenResponseCp(client.getModel(), true);
				var jsonRedirect = json.get("redirect");
				if (jsonRedirect.isJsonPrimitive() && jsonRedirect.getAsJsonPrimitive().isString()) {
					packet.setRedirect(json.get("redirect").getAsString());
				}
				packet.send(client);
				ctx.pipeline().replace(this, "websocketHandler", new WebSocketHandler());
			} else {
				new TokenResponseCp(null, false).send(ctx.channel());
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
