package direded.game.server.repository;

import direded.game.server.model.UserSessionModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSessionRepository extends JpaRepository<UserSessionModel, Long> {
}
