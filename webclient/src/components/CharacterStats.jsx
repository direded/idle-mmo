'use client';

import { useState } from 'react';

export default function CharacterStats({ stats, onStatUpdate }) {
  const [hoveredStat, setHoveredStat] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const statTooltips = {
    strength: {
      title: 'Strength',
      description: 'Increases physical damage and life. Each point provides +2 to maximum life and +0.2% increased physical damage.',
      effects: ['+2 to maximum life per point', '+0.2% increased physical damage per point', 'Required for some equipment']
    },
    dexterity: {
      title: 'Dexterity',
      description: 'Increases accuracy and evasion. Each point provides +2 to accuracy rating and +0.2% increased evasion rating.',
      effects: ['+2 to accuracy rating per point', '+0.2% increased evasion rating per point', 'Required for some equipment']
    },
    intelligence: {
      title: 'Intelligence',
      description: 'Increases mana and energy shield. Each point provides +2 to maximum mana and +0.2% increased energy shield.',
      effects: ['+2 to maximum mana per point', '+0.2% increased energy shield per point', 'Required for some equipment']
    },
    life: {
      title: 'Life',
      description: 'Your character\'s health pool. When this reaches 0, you die.',
      effects: ['Base life from character level', 'Additional life from equipment and passives', 'Life regeneration rate']
    },
    mana: {
      title: 'Mana',
      description: 'Used to cast skills and abilities. Skills cannot be used if you don\'t have enough mana.',
      effects: ['Base mana from character level', 'Additional mana from equipment and passives', 'Mana regeneration rate']
    },
    energyShield: {
      title: 'Energy Shield',
      description: 'A protective barrier that absorbs damage before your life. Regenerates when not taking damage.',
      effects: ['Absorbs damage before life', 'Regenerates when not taking damage', 'Can be increased by equipment and passives']
    },
    armor: {
      title: 'Armour',
      description: 'Reduces physical damage taken. More effective against smaller hits than larger ones.',
      effects: ['Reduces physical damage taken', 'More effective vs small hits', 'Less effective vs large hits']
    },
    evasion: {
      title: 'Evasion',
      description: 'Chance to completely avoid attacks. Higher evasion rating increases dodge chance.',
      effects: ['Chance to avoid attacks completely', 'Increases dodge chance', 'Affected by attacker accuracy']
    },
    block: {
      title: 'Block',
      description: 'Chance to block attacks and spells, reducing damage by 50%.',
      effects: ['Chance to block attacks and spells', 'Reduces damage by 50% when blocking', 'Can be increased by equipment']
    },
    dodge: {
      title: 'Dodge',
      description: 'Chance to dodge attacks. Separate from evasion and can stack.',
      effects: ['Chance to dodge attacks', 'Separate from evasion', 'Can stack with other avoidance']
    },
    spellDodge: {
      title: 'Spell Dodge',
      description: 'Chance to dodge spells. Similar to dodge but only affects spells.',
      effects: ['Chance to dodge spells', 'Separate from regular dodge', 'Can stack with other avoidance']
    },
    attackSpeed: {
      title: 'Attack Speed',
      description: 'How fast you attack with weapons. Higher values mean faster attacks.',
      effects: ['Attacks per second', 'Affects DPS calculation', 'Can be increased by equipment and passives']
    },
    castSpeed: {
      title: 'Cast Speed',
      description: 'How fast you cast spells. Higher values mean faster spell casting.',
      effects: ['Spells cast per second', 'Affects spell DPS', 'Can be increased by equipment and passives']
    },
    movementSpeed: {
      title: 'Movement Speed',
      description: 'How fast you move around the world. Affects combat mobility.',
      effects: ['Base movement speed', 'Can be increased by equipment', 'Affects combat positioning']
    },
    critChance: {
      title: 'Critical Strike Chance',
      description: 'Chance to deal critical hits, which deal increased damage.',
      effects: ['Chance to deal critical hits', 'Base 5% chance', 'Can be increased by equipment and passives']
    },
    critMultiplier: {
      title: 'Critical Strike Multiplier',
      description: 'Damage multiplier for critical hits. Base is 150% (1.5x damage).',
      effects: ['Multiplier for critical hit damage', 'Base 150% multiplier', 'Can be increased by equipment and passives']
    },
    accuracy: {
      title: 'Accuracy Rating',
      description: 'Determines hit chance against enemies. Higher accuracy means more hits land.',
      effects: ['Determines hit chance', 'Affects DPS calculation', 'Can be increased by equipment and passives']
    }
  };

  const damageTooltips = {
    physical: {
      title: 'Physical Damage',
      description: 'Raw physical damage from weapons and abilities.',
      effects: ['Base weapon damage', 'Can be converted to other types', 'Affected by armor']
    },
    fire: {
      title: 'Fire Damage',
      description: 'Elemental fire damage that can ignite enemies.',
      effects: ['Can ignite enemies', 'Affected by fire resistance', 'Can be converted from physical']
    },
    cold: {
      title: 'Cold Damage',
      description: 'Elemental cold damage that can freeze and chill enemies.',
      effects: ['Can freeze and chill enemies', 'Affected by cold resistance', 'Can be converted from physical']
    },
    lightning: {
      title: 'Lightning Damage',
      description: 'Elemental lightning damage that can shock enemies.',
      effects: ['Can shock enemies', 'Affected by lightning resistance', 'Can be converted from physical']
    },
    chaos: {
      title: 'Chaos Damage',
      description: 'Chaos damage that bypasses energy shield and is harder to resist.',
      effects: ['Bypasses energy shield', 'Harder to resist', 'Can be converted from physical']
    }
  };

  const resistanceTooltips = {
    fire: {
      title: 'Fire Resistance',
      description: 'Reduces fire damage taken. Maximum 75% without special modifiers.',
      effects: ['Reduces fire damage taken', 'Maximum 75% normally', 'Can be increased by equipment']
    },
    cold: {
      title: 'Cold Resistance',
      description: 'Reduces cold damage taken. Maximum 75% without special modifiers.',
      effects: ['Reduces cold damage taken', 'Maximum 75% normally', 'Can be increased by equipment']
    },
    lightning: {
      title: 'Lightning Resistance',
      description: 'Reduces lightning damage taken. Maximum 75% without special modifiers.',
      effects: ['Reduces lightning damage taken', 'Maximum 75% normally', 'Can be increased by equipment']
    },
    chaos: {
      title: 'Chaos Resistance',
      description: 'Reduces chaos damage taken. Starts at 0% and can go negative.',
      effects: ['Reduces chaos damage taken', 'Starts at 0%', 'Can go negative']
    }
  };

  const StatRow = ({ label, value, tooltip, hoveredStat, onChange, min = 0, max = 999 }) => (
    <div 
      className="flex items-center justify-between py-0 hover:bg-gray-600 rounded px-0.5 relative"
      onMouseEnter={(e) => {
        setHoveredStat(hoveredStat);
        setMousePosition({ x: e.clientX, y: e.clientY });
      }}
      onMouseLeave={() => {
        setHoveredStat(null);
        setMousePosition({ x: 0, y: 0 });
      }}
      onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
    >
      <span className="text-gray-300 text-[10px]">{label}:</span>
      <div className="flex items-center space-x-0.5">
        {onChange ? (
          <>
            <button
              onClick={() => onChange(Math.max(min, value - 1))}
              className="w-3 h-3 bg-gray-600 hover:bg-gray-500 rounded flex items-center justify-center text-[8px]"
            >
              -
            </button>
            <span className="text-white text-[10px] w-6 text-center">{value}</span>
            <button
              onClick={() => onChange(Math.min(max, value + 1))}
              className="w-3 h-3 bg-gray-600 hover:bg-gray-500 rounded flex items-center justify-center text-[8px]"
            >
              +
            </button>
          </>
        ) : (
          <span className="text-white text-[10px]">{value}</span>
        )}
      </div>
    </div>
  );

  const Tooltip = () => {
    if (!hoveredStat) return null;

    let data = null;
    
    if (hoveredStat === 'physical' || hoveredStat === 'fire' || hoveredStat === 'cold' || hoveredStat === 'lightning' || hoveredStat === 'chaos') {
      data = damageTooltips[hoveredStat];
    } else if (hoveredStat === 'fire' || hoveredStat === 'cold' || hoveredStat === 'lightning' || hoveredStat === 'chaos') {
      data = resistanceTooltips[hoveredStat];
    } else {
      data = statTooltips[hoveredStat];
    }

    if (!data) return null;

    return (
      <div 
        className="fixed z-50 bg-gray-800 border border-gray-600 rounded-lg p-2 shadow-lg max-w-xs pointer-events-none"
        style={{ left: `${mousePosition.x + 10}px`, top: `${mousePosition.y + 10}px` }}
      >
        <h4 className="font-bold text-orange-400 mb-1 text-xs">{data.title}</h4>
        <p className="text-gray-300 text-[10px] mb-1">{data.description}</p>
        <div className="space-y-0.5">
          {data.effects.map((effect, index) => (
            <div key={index} className="text-gray-400 text-[9px] flex items-start">
              <span className="text-blue-400 mr-1">•</span>
              {effect}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div 
      className="flex-1 p-1 overflow-y-auto relative"
      onMouseLeave={() => {
        setHoveredStat(null);
        setMousePosition({ x: 0, y: 0 });
      }}
    >
      <h2 className="text-xs font-bold text-orange-400 mb-1">Character Statistics</h2>
      
      <div className="space-y-1">
        {/* Core Stats */}
        <div className="bg-gray-700 rounded p-1">
          <h3 className="font-bold text-blue-400 mb-0.5 text-[10px]">Core Stats</h3>
          <div className="space-y-0">
            <StatRow 
              label="Strength" 
              value={stats.strength} 
              tooltip="strength"
              hoveredStat="strength"
            />
            <StatRow 
              label="Dexterity" 
              value={stats.dexterity} 
              tooltip="dexterity"
              hoveredStat="dexterity"
            />
            <StatRow 
              label="Intelligence" 
              value={stats.intelligence} 
              tooltip="intelligence"
              hoveredStat="intelligence"
            />
          </div>
        </div>

        {/* Defensive Stats */}
        <div className="bg-gray-700 rounded p-1">
          <h3 className="font-bold text-green-400 mb-0.5 text-[10px]">Defensive</h3>
          <div className="space-y-0">
            <StatRow label="Life" value={stats.life} tooltip="life" hoveredStat="life" />
            <StatRow label="Mana" value={stats.mana} tooltip="mana" hoveredStat="mana" />
            <StatRow label="Energy Shield" value={stats.energyShield} tooltip="energyShield" hoveredStat="energyShield" />
            <StatRow label="Armour" value={stats.armor} tooltip="armor" hoveredStat="armor" />
            <StatRow label="Evasion" value={stats.evasion} tooltip="evasion" hoveredStat="evasion" />
            <StatRow label="Block" value={`${stats.block}%`} tooltip="block" hoveredStat="block" />
            <StatRow label="Dodge" value={`${stats.dodge}%`} tooltip="dodge" hoveredStat="dodge" />
            <StatRow label="Spell Dodge" value={`${stats.spellDodge}%`} tooltip="spellDodge" hoveredStat="spellDodge" />
          </div>
        </div>

        {/* Offensive Stats */}
        <div className="bg-gray-700 rounded p-1">
          <h3 className="font-bold text-red-400 mb-0.5 text-[10px]">Offensive</h3>
          <div className="space-y-0">
            <StatRow label="Attack Speed" value={`${stats.attackSpeed.toFixed(2)}/s`} tooltip="attackSpeed" hoveredStat="attackSpeed" />
            <StatRow label="Cast Speed" value={`${stats.castSpeed.toFixed(2)}/s`} tooltip="castSpeed" hoveredStat="castSpeed" />
            <StatRow label="Movement Speed" value={`${stats.movementSpeed.toFixed(1)}x`} tooltip="movementSpeed" hoveredStat="movementSpeed" />
            <StatRow label="Crit Chance" value={`${stats.critChance}%`} tooltip="critChance" hoveredStat="critChance" />
            <StatRow label="Crit Multiplier" value={`${stats.critMultiplier}%`} tooltip="critMultiplier" hoveredStat="critMultiplier" />
            <StatRow label="Accuracy" value={stats.accuracy} tooltip="accuracy" hoveredStat="accuracy" />
          </div>
        </div>

        {/* Damage Types */}
        <div className="bg-gray-700 rounded p-1">
          <h3 className="font-bold text-yellow-400 mb-0.5 text-[10px]">Damage</h3>
          <div className="space-y-0">
            <StatRow label="Physical" value={stats.damage.physical} tooltip="damage" hoveredStat="physical" />
            <StatRow label="Fire" value={stats.damage.fire} tooltip="damage" hoveredStat="fire" />
            <StatRow label="Cold" value={stats.damage.cold} tooltip="damage" hoveredStat="cold" />
            <StatRow label="Lightning" value={stats.damage.lightning} tooltip="damage" hoveredStat="lightning" />
            <StatRow label="Chaos" value={stats.damage.chaos} tooltip="damage" hoveredStat="chaos" />
          </div>
        </div>

        {/* Resistances */}
        <div className="bg-gray-700 rounded p-1">
          <h3 className="font-bold text-purple-400 mb-0.5 text-[10px]">Resistances</h3>
          <div className="space-y-0">
            <StatRow label="Fire" value={`${stats.resistances.fire}%`} tooltip="resistance" hoveredStat="fire" />
            <StatRow label="Cold" value={`${stats.resistances.cold}%`} tooltip="resistance" hoveredStat="cold" />
            <StatRow label="Lightning" value={`${stats.resistances.lightning}%`} tooltip="resistance" hoveredStat="lightning" />
            <StatRow label="Chaos" value={`${stats.resistances.chaos}%`} tooltip="resistance" hoveredStat="chaos" />
          </div>
        </div>
      </div>

      {/* Fixed Tooltip */}
      <Tooltip />
    </div>
  );
} 