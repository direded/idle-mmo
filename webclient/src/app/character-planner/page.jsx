'use client';

import { useState } from 'react';
import CharacterStats from '../../components/CharacterStats';
import GameInfo from '../../components/GameInfo';

export default function CharacterPlanner() {
  const [characterData, setCharacterData] = useState({
    name: 'Exile',
    level: 1,
    class: 'Marauder',
    experience: 0,
    stats: {
      strength: 20,
      dexterity: 14,
      intelligence: 14,
      life: 50,
      mana: 40,
      energyShield: 0,
      armor: 0,
      evasion: 0,
      block: 0,
      dodge: 0,
      spellDodge: 0,
      attackSpeed: 1.2,
      castSpeed: 1.0,
      movementSpeed: 1.0,
      critChance: 5,
      critMultiplier: 150,
      accuracy: 100,
      damage: {
        physical: 10,
        fire: 0,
        cold: 0,
        lightning: 0,
        chaos: 0
      },
      resistances: {
        fire: 0,
        cold: 0,
        lightning: 0,
        chaos: 0
      }
    }
  });

  const [activeView, setActiveView] = useState('stats');

  const updateStat = (statName, value) => {
    setCharacterData(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [statName]: value
      }
    }));
  };

  const renderMainContent = () => {
    switch (activeView) {
      case 'stats':
        return (
          <div className="p-4 text-center text-gray-400">
            <h2 className="text-lg font-bold mb-4">Character Statistics Overview</h2>
            <p>Detailed character statistics and calculations will be displayed here.</p>
          </div>
        );
      case 'skills':
        return (
          <div className="p-4 text-center text-gray-400">
            <h2 className="text-lg font-bold mb-4">Active Skills</h2>
            <p>Skill gems and their configurations will be shown here.</p>
          </div>
        );
      case 'passives':
        return (
          <div className="p-4 text-center text-gray-400">
            <h2 className="text-lg font-bold mb-4">Passive Skill Tree</h2>
            <p>Passive skill tree visualization will be displayed here.</p>
          </div>
        );
      case 'equipment':
        return (
          <div className="p-4 text-center text-gray-400">
            <h2 className="text-lg font-bold mb-4">Equipment</h2>
            <p>Character equipment and item details will be shown here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 text-[10px]">
      <div className="flex h-screen">
        {/* Center Panel - Game Info, View Buttons & Character Stats */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
          {/* Game Info */}
          <div className="p-1 border-b border-gray-700">
            <GameInfo />
          </div>

          {/* View Buttons */}
          <div className="p-1 border-b border-gray-700">
            <div className="grid grid-cols-2 gap-1">
              <button
                onClick={() => setActiveView('stats')}
                className={`px-1 py-0.5 rounded text-[10px] transition-colors ${
                  activeView === 'stats' 
                    ? 'bg-orange-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Stats
              </button>
              <button
                onClick={() => setActiveView('skills')}
                className={`px-1 py-0.5 rounded text-[10px] transition-colors ${
                  activeView === 'skills' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Skills
              </button>
              <button
                onClick={() => setActiveView('passives')}
                className={`px-1 py-0.5 rounded text-[10px] transition-colors ${
                  activeView === 'passives' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Passives
              </button>
              <button
                onClick={() => setActiveView('equipment')}
                className={`px-1 py-0.5 rounded text-[10px] transition-colors ${
                  activeView === 'equipment' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Equipment
              </button>
            </div>
          </div>

          <CharacterStats 
            stats={characterData.stats} 
            onStatUpdate={updateStat}
          />
        </div>

        {/* Main Canvas */}
        <div className="flex-1 bg-gray-800">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
} 