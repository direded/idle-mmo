'use client';

import { useState, useEffect } from 'react';
import { DndContext, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

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

const Window = ({ id, title, children, position, onPositionChange, isVisible, onClose, zIndex, onFocus }) => {
  const [mounted, setMounted] = useState(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const style = {
    transform: CSS.Translate.toString(transform),
    position: 'absolute',
    left: position.x,
    top: position.y,
    display: isVisible ? 'block' : 'none',
    zIndex: zIndex,
  };

  if (!mounted) {
    return null;
  }

  const handleWindowClick = (e) => {
    e.stopPropagation();
    onFocus();
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="bg-gray-800 border border-gray-900 w-96 select-none"
      onClick={handleWindowClick}
    >
      <div className="border border-gray-600 w-full h-full">
        {/* Window Title Bar */}
        <div 
          className="bg-gray-700 px-2 py-0.5 flex justify-between items-center select-none"
        >
          <div 
            {...attributes} 
            {...listeners}
            className="flex-1 cursor-move select-none text-center"
          >
            <span className="text-white font-medium text-xs select-none">{title}</span>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="text-gray-400 hover:text-white transition-colors text-lg font-light cursor-pointer ml-1 select-none px-0.5"
          >
            ×
          </button>
        </div>
        
        {/* Window Content */}
        <div className="p-2 select-none">
          {children}
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ title, isVisible, onClick }) => (
  <button
    onClick={onClick}
    className="w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between text-gray-400 hover:text-white hover:bg-gray-800 select-none"
  >
    <span className="select-none">{title}</span>
    <div className={`w-2 h-2 rounded-full transition-colors ${isVisible ? 'bg-white' : 'bg-gray-500'} select-none`} />
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
      <div className="min-h-screen bg-gray-900 flex select-none">
        {/* Sidebar */}
        <div className="w-48 bg-gray-800 border-r border-gray-700 flex flex-col select-none">
          {/* Time and Date */}
          <div className="p-4 border-b border-gray-700 select-none">
            <div className="text-white text-xl font-medium select-none">
              {formatTime(currentTime)}
            </div>
            <div className="text-gray-400 text-sm select-none">
              {formatDate(currentTime)}
            </div>
          </div>
          
          {/* Window Navigation */}
          <div className="flex-1 py-2 select-none">
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
        <div className="flex-1 relative overflow-hidden select-none">
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
            <div className="space-y-2 select-none">
              <div className="flex justify-between select-none">
                <span className="text-gray-300 select-none">Name:</span>
                <span className="text-white font-medium select-none">{character.name}</span>
              </div>
              <div className="flex justify-between select-none">
                <span className="text-gray-300 select-none">Level:</span>
                <span className="text-white font-medium select-none">{character.level}</span>
              </div>
              <div className="flex justify-between select-none">
                <span className="text-gray-300 select-none">Experience:</span>
                <span className="text-white font-medium select-none">{character.experience}</span>
              </div>
              <div className="flex justify-between select-none">
                <span className="text-gray-300 select-none">Health:</span>
                <span className="text-white font-medium select-none">{character.health}</span>
              </div>
              <div className="flex justify-between select-none">
                <span className="text-gray-300 select-none">Gold:</span>
                <span className="text-white font-medium select-none">{character.gold}</span>
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
            <div className="overflow-x-auto select-none">
              <table className="min-w-full select-none">
                <thead>
                  <tr className="bg-gray-700 select-none">
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase select-none">Item</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase select-none">Weight</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase select-none">Count</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700 select-none">
                  {inventory.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-700 transition-colors select-none">
                      <td className="px-4 py-2 text-gray-300 select-none">{item.name}</td>
                      <td className="px-4 py-2 text-gray-300 select-none">{item.weight} kg</td>
                      <td className="px-4 py-2 text-gray-300 select-none">{item.count}</td>
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
            <div className="space-y-2 select-none">
              {availableActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleAction(action)}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white rounded p-2 text-left transition-colors border border-gray-600 select-none"
                >
                  <h3 className="font-semibold select-none">{action.name}</h3>
                  <p className="text-sm text-gray-300 select-none">{action.description}</p>
                </button>
              ))}
            </div>
          </Window>
        </div>
      </div>
    </DndContext>
  );
} 