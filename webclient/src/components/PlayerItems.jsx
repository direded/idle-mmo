'use client';

import { useState } from 'react';

export default function PlayerItems() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0, item: null });

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

  const handleContextMenu = (e, item) => {
    e.preventDefault();
    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY,
      item: item
    });
  };

  const handleContextMenuAction = (action) => {
    console.log(`${action} action for item:`, contextMenu.item.name);
    // Here you would implement the actual action logic
    setContextMenu({ show: false, x: 0, y: 0, item: null });
  };

  const closeContextMenu = () => {
    setContextMenu({ show: false, x: 0, y: 0, item: null });
  };

  const ItemRow = ({ item }) => (
    <tr 
      className="hover:bg-gray-600"
      onMouseEnter={(e) => {
        setHoveredItem(item);
        setMousePosition({ x: e.clientX, y: e.clientY });
      }}
      onMouseLeave={() => {
        setHoveredItem(null);
        setMousePosition({ x: 0, y: 0 });
      }}
      onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
      onContextMenu={(e) => handleContextMenu(e, item)}
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

  const Tooltip = () => {
    if (!hoveredItem) return null;

    return (
      <div 
        className="fixed z-50 bg-gray-800 border border-gray-600 rounded p-2 shadow-lg max-w-xs pointer-events-none"
        style={{ left: `${mousePosition.x + 10}px`, top: `${mousePosition.y + 10}px` }}
      >
        <div className="flex items-center mb-1">
          <img 
            src={hoveredItem.icon} 
            alt={hoveredItem.name} 
            className="w-6 h-6 mr-2"
          />
          <h4 className={`font-bold text-xs ${rarityColors[hoveredItem.rarity]}`}>
            {hoveredItem.name}
          </h4>
        </div>
        <div className="space-y-0.5">
          <div className="text-gray-300 text-[10px]">
            Count: {hoveredItem.count}
          </div>
          <div className="text-gray-300 text-[10px]">
            Weight: {hoveredItem.weight}kg
          </div>
          <div className="text-gray-400 text-[9px] capitalize">
            Rarity: {hoveredItem.rarity}
          </div>
        </div>
      </div>
    );
  };

  const ContextMenu = () => {
    if (!contextMenu.show || !contextMenu.item) return null;

    const isConsumable = contextMenu.item.name.toLowerCase().includes('potion');
    const isEquipment = contextMenu.item.name.toLowerCase().includes('sword') || 
                       contextMenu.item.name.toLowerCase().includes('armor') ||
                       contextMenu.item.name.toLowerCase().includes('dagger') ||
                       contextMenu.item.name.toLowerCase().includes('mail');

    return (
      <div 
        className="fixed z-50 bg-gray-800 border border-gray-600 rounded shadow-lg min-w-32"
        style={{ left: `${contextMenu.x}px`, top: `${contextMenu.y}px` }}
      >
        <div className="py-1">
          {isConsumable && (
            <button
              onClick={() => handleContextMenuAction('use')}
              className="w-full px-3 py-1 text-left text-[10px] text-gray-300 hover:bg-gray-600"
            >
              Use
            </button>
          )}
          {isEquipment && (
            <button
              onClick={() => handleContextMenuAction('equip')}
              className="w-full px-3 py-1 text-left text-[10px] text-gray-300 hover:bg-gray-600"
            >
              Equip
            </button>
          )}
          <button
            onClick={() => handleContextMenuAction('examine')}
            className="w-full px-3 py-1 text-left text-[10px] text-gray-300 hover:bg-gray-600"
          >
            Examine
          </button>
          <button
            onClick={() => handleContextMenuAction('drop')}
            className="w-full px-3 py-1 text-left text-[10px] text-red-400 hover:bg-gray-600"
          >
            Drop
          </button>
          {contextMenu.item.count > 1 && (
            <button
              onClick={() => handleContextMenuAction('drop-all')}
              className="w-full px-3 py-1 text-left text-[10px] text-red-400 hover:bg-gray-600"
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
      className="flex-1 flex flex-col h-full"
      onMouseLeave={() => {
        setHoveredItem(null);
        setMousePosition({ x: 0, y: 0 });
      }}
      onClick={closeContextMenu}
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

      {/* Fixed Tooltip */}
      <Tooltip />
      
      {/* Context Menu */}
      <ContextMenu />
    </div>
  );
} 