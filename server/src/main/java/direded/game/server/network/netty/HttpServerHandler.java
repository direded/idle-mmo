package direded.game.server.network.netty;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.handler.codec.http.HttpHeaderNames;
import io.netty.handler.codec.http.HttpHeaders;
import io.netty.handler.codec.http.HttpRequest;
import io.netty.handler.codec.http.websocketx.WebSocketServerHandshakerFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HttpServerHandler extends ChannelInboundHandlerAdapter {

	public static final Logger logger = LoggerFactory.getLogger(InitialWebSocketHandler.class);

	@Override
	public void channelRead(ChannelHandlerContext ctx, Object msg) {
		if (msg instanceof HttpRequest httpRequest) {

			logger.debug("Http Request Received");

			HttpHeaders headers = httpRequest.headers();
			logger.debug("Connection : " +headers.get("Connection"));
			logger.debug("Upgrade : " + headers.get("Upgrade"));

			if ("Upgrade".equalsIgnoreCase(headers.get(HttpHeaderNames.CONNECTION)) &&
					"WebSocket".equalsIgnoreCase(headers.get(HttpHeaderNames.UPGRADE))) {

				//Adding new handler to the existing pipeline to handle WebSocket Messages
				ctx.pipeline().replace(this, "initialWebsocketHandler", new InitialWebSocketHandler());

				logger.debug("WebSocketHandler added to the pipeline");
				logger.debug("Opened Channel : " + ctx.channel());
				logger.debug("Handshaking....");
				//Do the Handshake to upgrade connection from HTTP to WebSocket protocol
				handleHandshake(ctx, httpRequest);
				logger.debug("Handshake is done");
			}
		} else {
			logger.debug("Incoming request is unknown");
		}
	}

	/* Do the handshaking for WebSocket request */
	protected void handleHandshake(ChannelHandlerContext ctx, HttpRequest req) {
		WebSocketServerHandshakerFactory wsFactory =
				new WebSocketServerHandshakerFactory(getWebSocketURL(req), null, true);
		var handshaker = wsFactory.newHandshaker(req);
		if (handshaker == null) {
			WebSocketServerHandshakerFactory.sendUnsupportedVersionResponse(ctx.channel());
		} else {
			handshaker.handshake(ctx.channel(), req);
		}
	}

	protected String getWebSocketURL(HttpRequest req) {
		logger.debug("Req URI : " + req.getUri());
		String url =  "ws://" + req.headers().get("Host") + req.getUri() ;
		logger.debug("Constructed URL : " + url);
		return url;
	}
}