import PacketType from './PacketType'

const PacketFactory = (() => {

	let builder = (packetId, message) => {
		message.packet_id = packetId
		return message
	}

	/**
	 * @param {string} uuid UUID of location character want to travel to 
	 */
	const travelTo = (uuid) => {
		return builder(PacketType.travelTo, {
			uuid
		})
	}

	return {
		travelTo
	}

})();

export default PacketFactory

