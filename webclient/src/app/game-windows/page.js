'use client';

import { useState, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import Window from './components/Window';

// Mock data for demonstration
const initialCharacter = {
  name: 'Adventurer',
  level: 1,
  experience: 0,
  health: 100,
  gold: 50,
};

const initialInventory = [
  { id: 1, name: 'Wooden Sword', weight: 2, count: 1 },
  { id: 2, name: 'Health Potion', weight: 0.5, count: 3 },
  { id: 3, name: 'Leather Armor', weight: 3, count: 1 },
];

const availableActions = [
  { id: 1, name: 'Go to Moscow', description: 'Travel to Moscow to find better equipment' },
  { id: 2, name: 'Upgrade Equipment', description: 'Improve your current gear' },
  { id: 3, name: 'Hunt Monsters', description: 'Fight monsters to gain experience and loot' },
];

const SidebarItem = ({ title, isVisible, onClick }) => (
  <button
    onClick={onClick}
    className="w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between text-gray-400 hover:text-white hover:bg-gray-800"
  >
    <span>{title}</span>
    <div className={`w-2 h-2 rounded-full transition-colors ${isVisible ? 'bg-white' : 'bg-gray-500'}`} />
  </button>
);

export default function GameWindowsPage() {
  const [mounted, setMounted] = useState(false);
  const [character, setCharacter] = useState(initialCharacter);
  const [inventory, setInventory] = useState(initialInventory);
  const [selectedAction, setSelectedAction] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeWindow, setActiveWindow] = useState('character');
  
  // Window positions state
  const [windowPositions, setWindowPositions] = useState({
    character: { x: 20, y: 20 },
    inventory: { x: 340, y: 20 },
    actions: { x: 20, y: 300 }
  });

  // Window visibility state
  const [windowVisibility, setWindowVisibility] = useState({
    character: true,
    inventory: true,
    actions: true
  });

  // Window z-index state
  const [windowZIndices, setWindowZIndices] = useState({
    character: 1,
    inventory: 2,
    actions: 3
  });

  const [highestZIndex, setHighestZIndex] = useState(3);

  useEffect(() => {
    setMounted(true);
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAction = (action) => {
    setSelectedAction(action);
    // Here you would implement the actual action logic
  };

  const handleDragStart = (event) => {
    const { active } = event;
    const windowId = active.id;
    focusWindow(windowId);
  };

  const handleDragEnd = (event) => {
    const { active, delta } = event;
    const windowId = active.id;
    
    setWindowPositions(prev => ({
      ...prev,
      [windowId]: {
        x: prev[windowId].x + delta.x,
        y: prev[windowId].y + delta.y
      }
    }));
  };

  const toggleWindow = (windowId) => {
    setWindowVisibility(prev => ({
      ...prev,
      [windowId]: !prev[windowId]
    }));
    setActiveWindow(windowId);
    focusWindow(windowId);
  };

  const closeWindow = (windowId) => {
    setWindowVisibility(prev => ({
      ...prev,
      [windowId]: false
    }));
  };

  const focusWindow = (windowId) => {
    const newZIndex = highestZIndex + 1;
    setHighestZIndex(newZIndex);
    setWindowZIndices(prev => ({
      ...prev,
      [windowId]: newZIndex
    }));
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      day: 'numeric',
      month: 'short',
      year: '2-digit'
    });
  };

  if (!mounted) {
    return null;
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-gray-900 flex">
        {/* Sidebar */}
        <div className="w-48 bg-gray-800 border-r border-gray-700 flex flex-col">
          {/* Time and Date */}
          <div className="p-4 border-b border-gray-700">
            <div className="text-white text-xl font-medium">
              {formatTime(currentTime)}
            </div>
            <div className="text-gray-400 text-sm">
              {formatDate(currentTime)}
            </div>
          </div>
          
          {/* Window Navigation */}
          <div className="flex-1 py-2">
            <SidebarItem 
              title="Character Info" 
              isVisible={windowVisibility.character}
              onClick={() => toggleWindow('character')}
            />
            <SidebarItem 
              title="Inventory" 
              isVisible={windowVisibility.inventory}
              onClick={() => toggleWindow('inventory')}
            />
            <SidebarItem 
              title="Available Actions" 
              isVisible={windowVisibility.actions}
              onClick={() => toggleWindow('actions')}
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 relative overflow-hidden">
          {/* Character Info Window */}
          <Window 
            id="character" 
            title="Character Info" 
            position={windowPositions.character}
            onPositionChange={(pos) => setWindowPositions(prev => ({ ...prev, character: pos }))}
            isVisible={windowVisibility.character}
            onClose={() => closeWindow('character')}
            zIndex={windowZIndices.character}
            onFocus={() => focusWindow('character')}
          >
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Name:</span>
                <span className="text-white font-medium">{character.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Level:</span>
                <span className="text-white font-medium">{character.level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Experience:</span>
                <span className="text-white font-medium">{character.experience}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Health:</span>
                <span className="text-white font-medium">{character.health}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Gold:</span>
                <span className="text-white font-medium">{character.gold}</span>
              </div>
            </div>
          </Window>

          {/* Inventory Window */}
          <Window 
            id="inventory" 
            title="Inventory" 
            position={windowPositions.inventory}
            onPositionChange={(pos) => setWindowPositions(prev => ({ ...prev, inventory: pos }))}
            isVisible={windowVisibility.inventory}
            onClose={() => closeWindow('inventory')}
            zIndex={windowZIndices.inventory}
            onFocus={() => focusWindow('inventory')}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase">Item</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase">Weight</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase">Count</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {inventory.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-700 transition-colors">
                      <td className="px-4 py-2 text-gray-300">{item.name}</td>
                      <td className="px-4 py-2 text-gray-300">{item.weight} kg</td>
                      <td className="px-4 py-2 text-gray-300">{item.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Window>

          {/* Actions Window */}
          <Window 
            id="actions" 
            title="Available Actions" 
            position={windowPositions.actions}
            onPositionChange={(pos) => setWindowPositions(prev => ({ ...prev, actions: pos }))}
            isVisible={windowVisibility.actions}
            onClose={() => closeWindow('actions')}
            zIndex={windowZIndices.actions}
            onFocus={() => focusWindow('actions')}
          >
            <div className="space-y-2">
              {availableActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleAction(action)}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white rounded p-2 text-left transition-colors border border-gray-600"
                >
                  <h3 className="font-semibold">{action.name}</h3>
                  <p className="text-sm text-gray-300">{action.description}</p>
                </button>
              ))}
            </div>
          </Window>
        </div>
      </div>
    </DndContext>
  );
} 