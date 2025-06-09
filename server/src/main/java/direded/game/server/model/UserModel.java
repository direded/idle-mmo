package direded.game.server.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "`user`")
public class UserModel {

	@Id
	@Column(name = "user_id")
	private UUID id;

	@Column(name = "name")
	private String name;

	@OneToOne
	@JoinColumn(name = "session_id")
	private UserSessionModel session;

	@OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
	private Set<CharacterModel> characters;

}
