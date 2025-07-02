package direded.game.server.network.netty;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import direded.game.server.game.GameUtils;
import direded.game.server.network.NetworkController;
import direded.game.server.network.clientpacket.TokenResponseCp;
import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.handler.codec.http.websocketx.*;
import io.netty.util.ReferenceCountUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class InitialWebSocketHandler extends ChannelInboundHandlerAdapter {

	public static final Logger logger = LoggerFactory.getLogger(InitialWebSocketHandler.class);

	Gson gson = new Gson();

	@Override
	public void channelRead(ChannelHandlerContext ctx, Object msg) {
		try {
			if (msg instanceof TextWebSocketFrame) {
				logger.debug("Registering client..");
				var jsonString = ((TextWebSocketFrame) msg).text();
				JsonObject json;
				try {
					json = gson.fromJson(jsonString, JsonObject.class);
				} catch(Exception exception) {
					logger.error("Wrong json incoming", exception);
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
		} finally {
			ReferenceCountUtil.release(msg);
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
