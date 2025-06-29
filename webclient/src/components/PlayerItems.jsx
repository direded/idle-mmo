'use client';

import { useState, useRef, useEffect } from 'react';

export default function PlayerItems({ gameViewModel }) {
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

  const handleRowClick = (e, item) => {
    e.preventDefault();
    // Add the ItemStackWindow to the windowModals
    if (gameViewModel) {
      gameViewModel.setWindowModal({
        type: 'itemStack',
        item: item,
        gameViewModel: gameViewModel
      });
    }
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
      onClick={(e) => handleRowClick(e, item)}
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
    </div>
  );
} 