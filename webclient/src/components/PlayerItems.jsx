'use client';

import { useState, useRef } from 'react';

export default function PlayerItems() {
  const [menu, setMenu] = useState({ show: false, x: 0, y: 0, item: null });
  const rowRefs = useRef({});

  // Sample player items data as a plain list
  const playerItems = [
    { id: 1, name: 'Iron Sword', icon: '/assets/items/sword.png', count: 1, weight: 2.5, rarity: 'normal' },
    { id: 2, name: 'Steel Dagger', icon: '/assets/items/sword.png', count: 1, weight: 1.2, rarity: 'magic' },
    { id: 3, name: 'Leather Armor', icon: '/assets/items/leather.png', count: 1, weight: 3.0, rarity: 'normal' },
    { id: 4, name: 'Chain Mail', icon: '/assets/items/leather.png', count: 1, weight: 4.5, rarity: 'rare' },
    { id: 5, name: 'Health Potion', icon: '/assets/items/potion.png', count: 15, weight: 0.5, rarity: 'normal' },
    { id: 6, name: 'Mana Potion', icon: '/assets/items/potion.png', count: 8, weight: 0.5, rarity: 'normal' },
    { id: 7, name: 'Greater Healing Potion', icon: '/assets/items/potion.png', count: 3, weight: 0.8, rarity: 'magic' },
    { id: 8, name: 'Leather Scraps', icon: '/assets/items/leather.png', count: 25, weight: 0.1, rarity: 'normal' },
    { id: 9, name: 'Iron Ore', icon: '/assets/items/sword.png', count: 12, weight: 1.0, rarity: 'normal' },
    { id: 10, name: 'Steel Ore', icon: '/assets/items/sword.png', count: 12, weight: 1.0, rarity: 'rare' },
    { id: 11, name: 'Void Ore', icon: '/assets/items/sword.png', count: 12, weight: 1.0, rarity: 'unique' },
    { id: 12, name: 'Void Ore', icon: '/assets/items/sword.png', count: 12, weight: 1.0, rarity: 'unique' },
    { id: 13, name: 'Void Ore', icon: '/assets/items/sword.png', count: 12, weight: 1.0, rarity: 'unique' },
    { id: 14, name: 'Void Ore', icon: '/assets/items/sword.png', count: 12, weight: 1.0, rarity: 'unique' },
    { id: 15, name: 'Void Ore', icon: '/assets/items/sword.png', count: 12, weight: 1.0, rarity: 'unique' },
    { id: 16, name: 'Void Ore', icon: '/assets/items/sword.png', count: 12, weight: 1.0, rarity: 'unique' },
    { id: 17, name: 'Void Ore', icon: '/assets/items/sword.png', count: 12, weight: 1.0, rarity: 'unique' },
    { id: 18, name: 'Void Ore', icon: '/assets/items/sword.png', count: 12, weight: 1.0, rarity: 'unique' },
    { id: 19, name: 'Void Ore', icon: '/assets/items/sword.png', count: 12, weight: 1.0, rarity: 'unique' },
    { id: 20, name: 'Void Ore', icon: '/assets/items/sword.png', count: 12, weight: 1.0, rarity: 'unique' },
    { id: 21, name: 'Void Ore', icon: '/assets/items/sword.png', count: 12, weight: 1.0, rarity: 'unique' },
    { id: 22, name: 'Void Ore', icon: '/assets/items/sword.png', count: 12, weight: 1.0, rarity: 'unique' },
    { id: 23, name: 'Void Ore', icon: '/assets/items/sword.png', count: 12, weight: 1.0, rarity: 'unique' },
    { id: 24, name: 'Void Ore', icon: '/assets/items/sword.png', count: 12, weight: 1.0, rarity: 'unique' },
    { id: 25, name: 'Void Ore', icon: '/assets/items/sword.png', count: 12, weight: 1.0, rarity: 'unique' },
    { id: 26, name: 'Void Ore', icon: '/assets/items/sword.png', count: 12, weight: 1.0, rarity: 'unique' },
    { id: 27, name: 'Void Ore', icon: '/assets/items/sword.png', count: 12, weight: 1.0, rarity: 'unique' },
    { id: 28, name: 'Void Ore', icon: '/assets/items/sword.png', count: 12, weight: 1.0, rarity: 'unique' },
    { id: 29, name: 'Void Ore', icon: '/assets/items/sword.png', count: 12, weight: 1.0, rarity: 'unique' },
    { id: 30, name: 'Void Ore', icon: '/assets/items/sword.png', count: 12, weight: 1.0, rarity: 'unique' },
    { id: 31, name: 'Void Ore', icon: '/assets/items/sword.png', count: 12, weight: 1.0, rarity: 'unique' },
    { id: 32, name: 'Void Ore', icon: '/assets/items/sword.png', count: 12, weight: 1.0, rarity: 'unique' },
    { id: 33, name: 'Void Ore', icon: '/assets/items/sword.png', count: 12, weight: 1.0, rarity: 'unique' },
    { id: 34, name: 'Void Ore', icon: '/assets/items/sword.png', count: 12, weight: 1.0, rarity: 'unique' },
    { id: 35, name: 'Void Ore', icon: '/assets/items/sword.png', count: 12, weight: 1.0, rarity: 'unique' },
    { id: 36, name: 'Void Ore', icon: '/assets/items/sword.png', count: 12, weight: 1.0, rarity: 'unique' },
    { id: 37, name: 'Void Ore', icon: '/assets/items/sword.png', count: 12, weight: 1.0, rarity: 'unique' },
    { id: 38, name: 'Void Ore', icon: '/assets/items/sword.png', count: 12, weight: 1.0, rarity: 'unique' },
    { id: 39, name: 'Void Ore', icon: '/assets/items/sword.png', count: 12, weight: 1.0, rarity: 'unique' },
    { id: 40, name: 'Void Ore', icon: '/assets/items/sword.png', count: 12, weight: 1.0, rarity: 'unique' },
  ];

  const rarityColors = {
    normal: 'text-gray-300',
    magic: 'text-blue-400',
    rare: 'text-yellow-400',
    unique: 'text-orange-400'
  };

  const handleRowClick = (e, item) => {
    e.preventDefault();
    setMenu({ show: true, x: e.clientX, y: e.clientY, item });
  };

  const handleMenuAction = (action) => {
    if (menu.item) {
      console.log(`${action} action for item:`, menu.item.name);
    }
    setMenu({ show: false, x: 0, y: 0, item: null });
  };

  const closeMenu = () => {
    setMenu({ show: false, x: 0, y: 0, item: null });
  };

  const ItemRow = ({ item }) => (
    <tr
      ref={el => rowRefs.current[item.id] = el}
      className="hover:bg-gray-600 cursor-pointer"
      onClick={e => handleRowClick(e, item)}
    >
      <td className="py-0.5 px-1 w-6">
        <img
          src={item.icon}
          alt={item.name}
          className="w-4 h-4"
        />
      </td>
      <td className="py-0.5 px-1">
        <div className={`text-[10px] ${rarityColors[item.rarity]} truncate`}>
          {item.name}
        </div>
      </td>
      <td className="py-0.5 px-1 text-right">
        <span className="text-gray-400 text-[9px]">{item.weight}kg</span>
      </td>
      <td className="py-0.5 px-1 text-right">
        <span className="text-gray-400 text-[9px]">{item.count}</span>
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
        className="fixed z-[9999] bg-gray-800 border border-gray-600 rounded p-3 shadow-lg flex text-left"
        style={{ left: menu.x + 4, top: menu.y + 4 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Left: Tooltip/info */}
        <div className="pr-2 border-r border-gray-700 min-w-[90px] flex flex-col items-start justify-center">
          <div className="flex items-center mb-1">
            <img
              src={item.icon}
              alt={item.name}
              className="w-6 h-6 mr-1"
            />
            <h4 className={`font-bold text-xs ${rarityColors[item.rarity]}`}>{item.name}</h4>
          </div>
          <div className="space-y-0.5">
            <div className="text-gray-300 text-[10px]">Count: {item.count}</div>
            <div className="text-gray-300 text-[10px]">Weight: {item.weight}kg</div>
            <div className="text-gray-400 text-[9px] capitalize">Rarity: {item.rarity}</div>
          </div>
        </div>
        {/* Right: Actions */}
        <div className="pl-1 flex flex-col items-start justify-center min-w-[90px]">
          {isConsumable && (
            <button
              onClick={() => handleMenuAction('use')}
              className="w-full px-1 py-1 text-left text-[10px] text-gray-300 hover:bg-gray-600"
            >
              Use
            </button>
          )}
          {isEquipment && (
            <button
              onClick={() => handleMenuAction('equip')}
              className="w-full px-1 py-1 text-left text-[10px] text-gray-300 hover:bg-gray-600"
            >
              Equip
            </button>
          )}
          <button
            onClick={() => handleMenuAction('examine')}
            className="w-full px-1 py-1 text-left text-[10px] text-gray-300 hover:bg-gray-600"
          >
            Examine
          </button>
          <button
            onClick={() => handleMenuAction('drop')}
            className="w-full px-1 py-1 text-left text-[10px] text-red-400 hover:bg-gray-600"
          >
            Drop
          </button>
          {item.count > 1 && (
            <button
              onClick={() => handleMenuAction('drop-all')}
              className="w-full px-1 py-1 text-left text-[10px] text-red-400 hover:bg-gray-600"
            >
              Drop All
            </button>
          )}
        </div>
      </div>
    );
  };

  // Hide menu on click outside
  const handlePanelClick = (e) => {
    if (menu.show) setMenu({ show: false, x: 0, y: 0, item: null });
  };

  return (
    <div
      className="flex-1 flex flex-col h-full min-h-0"
      onClick={handlePanelClick}
    >
      <div className="flex-shrink-0 p-1">
        <h2 className="text-xs font-bold text-orange-400 mb-1">Inventory</h2>
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