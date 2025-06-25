'use client';

import { useState, useRef, useEffect } from 'react';

export default function PlayerItems({ gameViewModel }) {
  const [menu, setMenu] = useState({ show: false, x: 0, y: 0, item: null });
  const [playerItems, setPlayerItems] = useState([]);
  const rowRefs = useRef({});

  useEffect(() => {
    if (gameViewModel) {
      // Subscribe to state changes
      const unsubscribe = gameViewModel.subscribe((state) => {
        setPlayerItems(state.inventory.items);
      });

      // Initialize with current data
      setPlayerItems(gameViewModel.getInventoryItems());

      return unsubscribe;
    }
  }, [gameViewModel]);

  useEffect(() => {
    document.addEventListener('click', handlePanelClick);
  }, []);

  // Hide menu on click outside
  const handlePanelClick = (e) => {
    setMenu((menu) => menu.show ? { show: false, x: 0, y: 0, item: null } : menu);
  };

  const handleRowClick = (e, item) => {
    e.preventDefault();
    setMenu({ show: true, x: e.clientX, y: e.clientY, item });
  };

  const handleMenuAction = (action) => {
    if (menu.item && gameViewModel) {
      console.log(`${action} action for item:`, menu.item.name);
      
      // Log the action
      gameViewModel.addLog(`${action} ${menu.item.name}`, 'inventory');
      
      // Handle different actions
      switch (action) {
        case 'use':
          if (menu.item.name.toLowerCase().includes('potion')) {
            gameViewModel.updateItemCount(menu.item.id, menu.item.count - 1);
            gameViewModel.addLog(`Used ${menu.item.name}`, 'action');
          }
          break;
        case 'equip':
          gameViewModel.addLog(`Equipped ${menu.item.name}`, 'equipment');
          break;
        case 'drop':
          gameViewModel.updateItemCount(menu.item.id, menu.item.count - 1);
          gameViewModel.addLog(`Dropped ${menu.item.name}`, 'action');
          break;
        case 'drop-all':
          gameViewModel.removeInventoryItem(menu.item.id);
          gameViewModel.addLog(`Dropped all ${menu.item.name}`, 'action');
          break;
        default:
          break;
      }
    }
    setMenu({ show: false, x: 0, y: 0, item: null });
  };

  const closeMenu = () => {
    setMenu({ show: false, x: 0, y: 0, item: null });
  };

  const rarityColors = {
    normal: 'text-gray-300',
    magic: 'text-blue-400',
    rare: 'text-yellow-400',
    unique: 'text-orange-400'
  };

  const ItemRow = ({ item }) => (
    <tr
      ref={el => rowRefs.current[item.id] = el}
      className="hover:bg-gray-600 cursor-pointer"
      onContextMenu={e => handleRowClick(e, item)}
    >
      <td className="py-0.5 px-1 w-6">
        <img
          src={item.icon}
          alt={item.name}
          className="w-4 h-4"
        />
      </td>
      <td className="py-0.5 px-1">
        <div className={`text-xs ${rarityColors[item.rarity]} truncate`}>
          {item.name}
        </div>
      </td>
      <td className="py-0.5 px-1 text-right">
        <span className="text-gray-400 text-[10px]">{item.weight}kg</span>
      </td>
      <td className="py-0.5 px-1 text-right">
        <span className="text-gray-400 text-[10px]">{item.count}</span>
      </td>
    </tr>
  );

  const MenuWindow = () => {
    if (!menu.show || !menu.item) return null;
    const item = menu.item;
    const isConsumable = item.name.toLowerCase().includes('potion');
    const isEquipment = item.name.toLowerCase().includes('sword') ||
      item.name.toLowerCase().includes('armor') ||
      item.name.toLowerCase().includes('dagger') ||
      item.name.toLowerCase().includes('mail');
    return (
			<div
				className="fixed z-[9999] bg-gray-800 border border-gray-600 rounded p-2 shadow-lg flex text-left"
				style={{ left: menu.x + 4, top: menu.y + 4 }}
			>
				{/* Left: Tooltip/info */}
				<div className="pr-2 border-r border-gray-700 min-w-[90px] flex flex-col items-start justify-center z-[9999]">
					<div className="flex items-center mb-1">
						<img
							src={item.icon}
							alt={item.name}
							className="w-6 h-6 mr-1"
						/>
						<h4 className={`font-bold text-xs ${rarityColors[item.rarity]}`}>{item.name}</h4>
					</div>
					<div className="space-y-0.5">
						<div className="text-gray-300 text-xs">Count: {item.count}</div>
						<div className="text-gray-300 text-xs">Weight: {item.weight}kg</div>
						<div className="text-gray-400 text-xs capitalize">Rarity: {item.rarity}</div>
					</div>
				</div>
				{/* Right: Actions */}
				<div className="pl-1 flex flex-col items-start justify-center min-w-[90px] z-[9999]">
					{isConsumable && (
						<button
							onClick={() => handleMenuAction('use')}
							className="w-full px-1 py-1 text-left text-xs text-gray-300 hover:bg-gray-600 hover:cursor-pointer"
						>
							Use
						</button>
					)}
					{isEquipment && (
						<button
							onClick={() => handleMenuAction('equip')}
							className="w-full px-1 py-1 text-left text-xs text-gray-300 hover:bg-gray-600 hover:cursor-pointer"
						>
							Equip
						</button>
					)}
					<button
						onClick={() => handleMenuAction('examine')}
						className="w-full px-1 py-1 text-left text-xs text-gray-300 hover:bg-gray-600 hover:cursor-pointer"
					>
						Examine
					</button>
					<button
						onClick={() => handleMenuAction('drop')}
						className="w-full px-1 py-1 text-left text-xs text-red-400 hover:bg-gray-600 hover:cursor-pointer"
					>
						Drop
					</button>
					{item.count > 1 && (
						<button
							onClick={() => handleMenuAction('drop-all')}
							className="w-full px-1 py-1 text-left text-xs text-red-400 hover:bg-gray-600 hover:cursor-pointer"
						>
							Drop All
						</button>
					)}
				</div>
			</div>
    );
  };

  return (
    <div
      className="flex-1 flex flex-col h-full min-h-0"
    >
      <div className="flex-shrink-0 p-1">
        <h2 className="text-sm font-bold text-white mb-1">Inventory</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="py-0.5 px-1 text-left w-6"></th>
              <th className="py-0.5 px-1 text-left">
                <span className="text-gray-400 text-[9px] font-bold">Name</span>
              </th>
              <th className="py-0.5 px-1 text-right">
                <span className="text-gray-400 text-[9px] font-bold">Weight</span>
              </th>
              <th className="py-0.5 px-1 text-right">
                <span className="text-gray-400 text-[9px] font-bold">Count</span>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="flex-1 overflow-y-auto p-1 min-h-0">
        <table className="w-full">
          <tbody>
            {playerItems.map(item => (
              <ItemRow key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
      {/* Combined Tooltip/Action Menu */}
      <MenuWindow />
    </div>
  );
} 