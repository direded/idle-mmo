package direded.game.server;

import direded.game.server.cli.CliComponent;
import direded.game.server.game.GameLoopImpl;
import direded.game.server.network.NettyServerBootstrapper;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StartupConfiguration {

	@Bean
	public ApplicationRunner componentInitializer(ApplicationContext ctx, CliComponent cliComponent, GameLoopImpl fixedStepGameLoop, NettyServerBootstrapper nettyServerBootstrapper) {
		return args -> {
			var logger = LoggerFactory.getLogger("componentInitializer");
			logger.info("Starting cli..");
			cliComponent.start();

			logger.info("Starting game loop..");
			fixedStepGameLoop.start();

			logger.info("Starting netty..");
			nettyServerBootstrapper.start();
		};
	}

}
