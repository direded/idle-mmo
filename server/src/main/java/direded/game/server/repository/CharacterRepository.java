package direded.game.server.repository;

import direded.game.server.model.CharacterModel;
import direded.game.server.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CharacterRepository extends JpaRepository<CharacterModel, UUID> {
	List<CharacterModel> findByUser(UserModel model);
}
