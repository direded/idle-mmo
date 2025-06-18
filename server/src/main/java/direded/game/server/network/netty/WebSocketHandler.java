package direded.game.server.network.netty;

import com.google.gson.Gson;
import direded.game.server.network.NetworkController;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.handler.codec.http.websocketx.BinaryWebSocketFrame;
import io.netty.handler.codec.http.websocketx.CloseWebSocketFrame;
import io.netty.handler.codec.http.websocketx.PingWebSocketFrame;
import io.netty.handler.codec.http.websocketx.PongWebSocketFrame;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;
import io.netty.handler.codec.http.websocketx.WebSocketFrame;

public class WebSocketHandler extends ChannelInboundHandlerAdapter {

	Gson gson = new Gson();

	@Override
	public void channelRead(ChannelHandlerContext ctx, Object msg) {

		if (msg instanceof WebSocketFrame) {
			System.out.println("This is a WebSocket frame");
			System.out.println("Client Channel : " + ctx.channel());
			switch (msg) {
				case BinaryWebSocketFrame binaryWebSocketFrame -> {
					System.out.println("BinaryWebSocketFrame Received : ");
					System.out.println(binaryWebSocketFrame.content());
				}
				case TextWebSocketFrame textWebSocketFrame -> {
					System.out.println("TextWebSocketFrame Received : ");
					var message = textWebSocketFrame.text();
					ctx.channel().writeAndFlush(
							new TextWebSocketFrame("Message received : " + message)
					);

					NetworkController.instance.receiveMessage(ctx.channel(), message);
				}
				case PingWebSocketFrame pingWebSocketFrame -> {
					System.out.println("PingWebSocketFrame Received : ");
					System.out.println(pingWebSocketFrame.content());
				}
				case PongWebSocketFrame pongWebSocketFrame -> {
					System.out.println("PongWebSocketFrame Received : ");
					System.out.println(pongWebSocketFrame.content());
				}
				case CloseWebSocketFrame closeWebSocketFrame -> {
					System.out.println("CloseWebSocketFrame Received : ");
					System.out.println("ReasonText :" + closeWebSocketFrame.reasonText());
					System.out.println("StatusCode : " + closeWebSocketFrame.statusCode());
				}
				default -> System.out.println("Unsupported WebSocketFrame");
			}
		}
	}

	@Override
	public void channelUnregistered(ChannelHandlerContext ctx) throws Exception {
		NetworkController.instance.unregisterClient(ctx.channel());
	}

	@Override
	public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
		cause.printStackTrace();
	}
}