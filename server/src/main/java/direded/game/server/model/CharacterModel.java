package direded.game.server.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@Table(name = "character")
public class CharacterModel {

	public CharacterModel(UUID id) {
		this.id = id;
	}

	@Id
	@Column(name = "character_id")
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;

	@Column(name = "name")
	private String name;

	@Column(name = "data")
	private String dataJson;
}
