'use client';

import { useState } from 'react';

export default function CharacterInfo({ character, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(character.name);

  const classes = ['Marauder', 'Ranger', 'Witch', 'Duelist', 'Templar', 'Shadow', 'Scion'];

  const handleNameSave = () => {
    onUpdate('name', editName);
    setIsEditing(false);
  };

  const handleNameCancel = () => {
    setEditName(character.name);
    setIsEditing(false);
  };

  return (
    <div className="p-1 border-b border-gray-700">
      <h2 className="text-xs font-bold text-orange-400 mb-1">Character Information</h2>
      
      <div className="space-y-1">
        {/* Name */}
        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-[10px]">Name:</span>
          {isEditing ? (
            <div className="flex items-center space-x-1">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="bg-gray-700 text-white px-1 py-0.5 rounded text-[10px] w-20"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleNameSave();
                  if (e.key === 'Escape') handleNameCancel();
                }}
                autoFocus
              />
              <button
                onClick={handleNameSave}
                className="text-green-400 hover:text-green-300 text-[10px]"
              >
                ✓
              </button>
              <button
                onClick={handleNameCancel}
                className="text-red-400 hover:text-red-300 text-[10px]"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-1">
              <span className="text-white text-[10px]">{character.name}</span>
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-400 hover:text-blue-300 text-[10px]"
              >
                ✎
              </button>
            </div>
          )}
        </div>

        {/* Level */}
        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-[10px]">Level:</span>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => onUpdate('level', Math.max(1, character.level - 1))}
              className="w-4 h-4 bg-gray-700 hover:bg-gray-600 rounded flex items-center justify-center text-[10px]"
            >
              -
            </button>
            <span className="text-white text-[10px] w-4 text-center">{character.level}</span>
            <button
              onClick={() => onUpdate('level', Math.min(100, character.level + 1))}
              className="w-4 h-4 bg-gray-700 hover:bg-gray-600 rounded flex items-center justify-center text-[10px]"
            >
              +
            </button>
          </div>
        </div>

        {/* Class */}
        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-[10px]">Class:</span>
          <select
            value={character.class}
            onChange={(e) => onUpdate('class', e.target.value)}
            className="bg-gray-700 text-white px-1 py-0.5 rounded text-[10px]"
          >
            {classes.map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        </div>

        {/* Experience */}
        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-[10px]">Experience:</span>
          <span className="text-white text-[10px]">{character.experience.toLocaleString()}</span>
        </div>

        {/* Experience Bar */}
        <div className="w-full bg-gray-700 rounded-full h-0.5">
          <div 
            className="bg-orange-500 h-0.5 rounded-full transition-all duration-300"
            style={{ width: `${(character.experience % 1000000) / 10000}%` }}
          ></div>
        </div>
        <div className="text-[10px] text-gray-400 text-center">
          {((character.experience % 1000000) / 10000).toFixed(1)}% to next level
        </div>
      </div>
    </div>
  );
} 