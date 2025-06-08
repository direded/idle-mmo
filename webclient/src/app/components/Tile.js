export default function Tile({ children, title, className }) {
	return (
		<div className={`bg-gray-800 border-gray-700 ${className} flex flex-col`}>
			<h2 className="text-l font-semibold m-2 mb-1 mt-1 text-white">{title}</h2>
			<div className="flex-1 overflow-auto scrollbar-a">
				{children}
			</div>
		</div>
	);
}