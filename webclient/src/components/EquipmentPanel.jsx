'use client';

import { useState } from 'react';

export default function EquipmentPanel({ equipment, onEquipmentChange }) {
  const [draggedItem, setDraggedItem] = useState(null);
  const [hoveredSlot, setHoveredSlot] = useState(null);

  const equipmentSlots = [
    { key: 'helmet', name: 'Helmet', position: 'top-4 left-1/2 transform -translate-x-1/2' },
    { key: 'amulet', name: 'Amulet', position: 'top-16 left-1/2 transform -translate-x-1/2' },
    { key: 'weapon', name: 'Weapon', position: 'top-32 left-4' },
    { key: 'offhand', name: 'Off Hand', position: 'top-32 right-4' },
    { key: 'body', name: 'Body Armour', position: 'top-48 left-1/2 transform -translate-x-1/2' },
    { key: 'gloves', name: 'Gloves', position: 'top-64 left-4' },
    { key: 'ring1', name: 'Ring 1', position: 'top-64 right-4' },
    { key: 'ring2', name: 'Ring 2', position: 'top-80 right-4' },
    { key: 'belt', name: 'Belt', position: 'top-96 left-1/2 transform -translate-x-1/2' },
    { key: 'boots', name: 'Boots', position: 'top-112 left-1/2 transform -translate-x-1/2' }
  ];

  const sampleItems = {
    helmet: { name: 'Steel Circlet', rarity: 'rare', level: 45, stats: ['+50 to Armour', '+20 to maximum Life', '+15% to Fire Resistance'] },
    weapon: { name: 'Void Axe', rarity: 'unique', level: 60, stats: ['+200 to Physical Damage', '25% chance to deal Double Damage', 'Attacks have 15% chance to cause Bleeding'] },
    body: { name: 'Plate Vest', rarity: 'magic', level: 30, stats: ['+100 to Armour', '+30 to maximum Life'] },
    gloves: { name: 'Leather Gloves', rarity: 'normal', level: 15, stats: ['+20 to Armour'] },
    boots: { name: 'Iron Greaves', rarity: 'rare', level: 25, stats: ['+40 to Armour', '+15% to Movement Speed', '+10% to Lightning Resistance'] }
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'normal': return 'text-white';
      case 'magic': return 'text-blue-400';
      case 'rare': return 'text-yellow-400';
      case 'unique': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const getRarityBg = (rarity) => {
    switch (rarity) {
      case 'normal': return 'bg-gray-600';
      case 'magic': return 'bg-blue-600';
      case 'rare': return 'bg-yellow-600';
      case 'unique': return 'bg-orange-600';
      default: return 'bg-gray-600';
    }
  };

  const EquipmentSlot = ({ slot, item }) => {
    const isHovered = hoveredSlot === slot.key;
    const isDraggingOver = draggedItem && hoveredSlot === slot.key;

    return (
      <div
        className={`absolute ${slot.position} w-16 h-16 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center transition-all duration-200 ${
          isHovered ? 'border-gray-400 bg-gray-700' : ''
        } ${isDraggingOver ? 'border-blue-400 bg-blue-900' : ''}`}
        onMouseEnter={() => setHoveredSlot(slot.key)}
        onMouseLeave={() => setHoveredSlot(null)}
        onDrop={(e) => {
          e.preventDefault();
          if (draggedItem) {
            onEquipmentChange(slot.key, draggedItem);
            setDraggedItem(null);
          }
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        {item ? (
          <div
            className={`w-12 h-12 ${getRarityBg(item.rarity)} rounded-lg flex items-center justify-center cursor-move relative group`}
            draggable
            onDragStart={(e) => {
              setDraggedItem(item);
              e.dataTransfer.effectAllowed = 'move';
            }}
            onDragEnd={() => setDraggedItem(null)}
          >
            <span className={`text-xs font-bold ${getRarityColor(item.rarity)} text-center leading-tight`}>
              {item.name.split(' ')[0]}
            </span>
            
            {/* Item tooltip */}
            <div className="absolute left-full ml-2 top-0 z-50 bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <h4 className={`font-bold ${getRarityColor(item.rarity)} mb-1`}>{item.name}</h4>
              <p className="text-gray-400 text-xs mb-2">Item Level: {item.level}</p>
              <div className="space-y-1">
                {item.stats.map((stat, index) => (
                  <div key={index} className="text-gray-300 text-xs">
                    {stat}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <span className="text-gray-500 text-xs text-center">{slot.name}</span>
        )}
      </div>
    );
  };

  return (
    <div className="p-2 h-full overflow-y-auto">
      <h2 className="text-sm font-bold text-orange-400 mb-2">Equipment</h2>
      
      {/* Character Paper Doll */}
      <div className="relative w-40 h-48 mx-auto mb-4 bg-gray-700 rounded">
        {/* Character silhouette placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-16 bg-gray-600 rounded-full opacity-20"></div>
        </div>
        
        {/* Equipment slots */}
        {equipmentSlots.map(slot => (
          <EquipmentSlot
            key={slot.key}
            slot={slot}
            item={equipment[slot.key] || sampleItems[slot.key]}
          />
        ))}
      </div>

      {/* Equipment List */}
      <div className="space-y-1">
        <h3 className="font-bold text-blue-400 mb-1 text-xs">Equipped Items</h3>
        {equipmentSlots.map(slot => {
          const item = equipment[slot.key] || sampleItems[slot.key];
          if (!item) return null;
          
          return (
            <div
              key={slot.key}
              className={`p-1 rounded ${getRarityBg(item.rarity)} cursor-move`}
              draggable
              onDragStart={(e) => {
                setDraggedItem(item);
                e.dataTransfer.effectAllowed = 'move';
              }}
              onDragEnd={() => setDraggedItem(null)}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold ${getRarityColor(item.rarity)}`}>
                  {item.name}
                </span>
                <button
                  onClick={() => onEquipmentChange(slot.key, null)}
                  className="text-red-400 hover:text-red-300 text-xs"
                >
                  ✕
                </button>
              </div>
              <div className="text-xs text-gray-300 mt-0.5">
                {item.stats.slice(0, 2).join(', ')}
                {item.stats.length > 2 && '...'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Item Stash */}
      <div className="mt-4">
        <h3 className="font-bold text-green-400 mb-1 text-xs">Item Stash</h3>
        <div className="grid grid-cols-2 gap-1">
          {Object.entries(sampleItems).map(([key, item]) => (
            <div
              key={key}
              className={`p-1 rounded ${getRarityBg(item.rarity)} cursor-move`}
              draggable
              onDragStart={(e) => {
                setDraggedItem(item);
                e.dataTransfer.effectAllowed = 'move';
              }}
              onDragEnd={() => setDraggedItem(null)}
            >
              <span className={`text-xs font-bold ${getRarityColor(item.rarity)}`}>
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 