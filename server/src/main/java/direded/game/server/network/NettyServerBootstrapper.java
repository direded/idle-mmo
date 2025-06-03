package direded.game.server.network;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.Channel;
import io.netty.channel.ChannelOption;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.logging.LogLevel;
import io.netty.handler.logging.LoggingHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class NettyServerBootstrapper {
	private static final int PORT = 9000;

	protected final Logger logger = LoggerFactory.getLogger(this.getClass());

	private EventLoopGroup bossGroup;
	private EventLoopGroup workerGroup;

	public void start() {
		logger.info("Starting netty server..");
		bossGroup = new NioEventLoopGroup(1);
		workerGroup = new NioEventLoopGroup();
		try {
			ServerBootstrap b = new ServerBootstrap();
			b.option(ChannelOption.SO_BACKLOG, 1024);
			b.group(bossGroup, workerGroup)
					.channel(NioServerSocketChannel.class)
					.handler(new LoggingHandler(LogLevel.INFO))
					.childHandler(new HttpInitializer());

			Channel ch = b.bind(PORT).sync().channel();

			ch.closeFuture().sync();
		} catch (InterruptedException e) {
			e.printStackTrace();
		} finally {
			bossGroup.shutdownGracefully();
			workerGroup.shutdownGracefully();
		}
	}


	public void stop() {
		bossGroup.shutdownGracefully();
		workerGroup.shutdownGracefully();
	}
}
