'use client';

import { useState } from 'react';

export default function SkillTree() {
  const [allocatedNodes, setAllocatedNodes] = useState(new Set(['strength1', 'life1', 'armor1']));
  const [hoveredNode, setHoveredNode] = useState(null);
  const [availablePoints, setAvailablePoints] = useState(5);

  const skillNodes = [
    // Strength nodes
    { id: 'strength1', name: 'Strength', type: 'strength', position: 'top-20 left-20', connections: ['life1'], stats: ['+10 Strength'] },
    { id: 'strength2', name: 'Strength', type: 'strength', position: 'top-20 left-40', connections: ['strength1', 'armor1'], stats: ['+10 Strength'] },
    { id: 'strength3', name: 'Strength', type: 'strength', position: 'top-20 left-60', connections: ['strength2'], stats: ['+10 Strength'] },
    
    // Life nodes
    { id: 'life1', name: 'Life', type: 'life', position: 'top-40 left-30', connections: ['strength1', 'armor1'], stats: ['+12% increased maximum Life'] },
    { id: 'life2', name: 'Life', type: 'life', position: 'top-40 left-50', connections: ['life1', 'armor1'], stats: ['+12% increased maximum Life'] },
    { id: 'life3', name: 'Life', type: 'life', position: 'top-60 left-40', connections: ['life1', 'life2'], stats: ['+12% increased maximum Life'] },
    
    // Armor nodes
    { id: 'armor1', name: 'Armour', type: 'armor', position: 'top-40 left-10', connections: ['strength2', 'life1'], stats: ['+15% increased Armour'] },
    { id: 'armor2', name: 'Armour', type: 'armor', position: 'top-60 left-20', connections: ['armor1', 'life3'], stats: ['+15% increased Armour'] },
    
    // Damage nodes
    { id: 'damage1', name: 'Physical Damage', type: 'damage', position: 'top-20 right-20', connections: ['dexterity1'], stats: ['+12% increased Physical Damage'] },
    { id: 'damage2', name: 'Physical Damage', type: 'damage', position: 'top-20 right-40', connections: ['damage1', 'dexterity1'], stats: ['+12% increased Physical Damage'] },
    
    // Dexterity nodes
    { id: 'dexterity1', name: 'Dexterity', type: 'dexterity', position: 'top-40 right-30', connections: ['damage1', 'evasion1'], stats: ['+10 Dexterity'] },
    { id: 'dexterity2', name: 'Dexterity', type: 'dexterity', position: 'top-40 right-50', connections: ['dexterity1', 'evasion1'], stats: ['+10 Dexterity'] },
    
    // Evasion nodes
    { id: 'evasion1', name: 'Evasion', type: 'evasion', position: 'top-60 right-40', connections: ['dexterity1', 'dexterity2'], stats: ['+15% increased Evasion Rating'] },
    
    // Intelligence nodes
    { id: 'intelligence1', name: 'Intelligence', type: 'intelligence', position: 'bottom-20 left-20', connections: ['mana1'], stats: ['+10 Intelligence'] },
    { id: 'intelligence2', name: 'Intelligence', type: 'intelligence', position: 'bottom-20 left-40', connections: ['intelligence1', 'mana1'], stats: ['+10 Intelligence'] },
    
    // Mana nodes
    { id: 'mana1', name: 'Mana', type: 'mana', position: 'bottom-40 left-30', connections: ['intelligence1', 'intelligence2'], stats: ['+12% increased maximum Mana'] },
    
    // Notable nodes
    { id: 'notable1', name: 'Iron Grip', type: 'notable', position: 'top-80 left-40', connections: ['strength3'], stats: ['Strength\'s damage bonus applies to Projectile Attack Damage as well as Melee Damage', '+20 Strength'] },
    { id: 'notable2', name: 'Quick Recovery', type: 'notable', position: 'bottom-80 right-40', connections: ['dexterity2'], stats: ['+20% increased Life Recovery Rate', '+20% increased Mana Recovery Rate', '+20 Dexterity'] }
  ];

  const getNodeColor = (type) => {
    switch (type) {
      case 'strength': return 'bg-red-600';
      case 'dexterity': return 'bg-green-600';
      case 'intelligence': return 'bg-blue-600';
      case 'life': return 'bg-red-500';
      case 'mana': return 'bg-blue-500';
      case 'armor': return 'bg-yellow-600';
      case 'evasion': return 'bg-green-500';
      case 'damage': return 'bg-red-700';
      case 'notable': return 'bg-purple-600';
      default: return 'bg-gray-600';
    }
  };

  const getNodeBorder = (type) => {
    switch (type) {
      case 'notable': return 'border-2 border-yellow-400';
      default: return 'border border-gray-400';
    }
  };

  const canAllocateNode = (nodeId) => {
    if (allocatedNodes.has(nodeId)) return false;
    if (availablePoints <= 0) return false;
    
    // Check if connected to an allocated node
    const node = skillNodes.find(n => n.id === nodeId);
    return node.connections.some(connId => allocatedNodes.has(connId));
  };

  const handleNodeClick = (nodeId) => {
    if (allocatedNodes.has(nodeId)) {
      // Deallocate node
      const newAllocated = new Set(allocatedNodes);
      newAllocated.delete(nodeId);
      setAllocatedNodes(newAllocated);
      setAvailablePoints(availablePoints + 1);
    } else if (canAllocateNode(nodeId)) {
      // Allocate node
      const newAllocated = new Set(allocatedNodes);
      newAllocated.add(nodeId);
      setAllocatedNodes(newAllocated);
      setAvailablePoints(availablePoints - 1);
    }
  };

  const SkillNode = ({ node }) => {
    const isAllocated = allocatedNodes.has(node.id);
    const canAllocate = canAllocateNode(node.id);
    const isHovered = hoveredNode === node.id;

    return (
      <div
        className={`absolute ${node.position} w-8 h-8 ${getNodeColor(node.type)} ${getNodeBorder(node.type)} rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ${
          isAllocated ? 'ring-2 ring-yellow-400' : ''
        } ${canAllocate ? 'hover:scale-110' : ''} ${!canAllocate && !isAllocated ? 'opacity-50' : ''}`}
        onClick={() => handleNodeClick(node.id)}
        onMouseEnter={() => setHoveredNode(node.id)}
        onMouseLeave={() => setHoveredNode(null)}
      >
        {node.type === 'notable' && (
          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
        )}
        
        {/* Node tooltip */}
        {isHovered && (
          <div className="absolute left-full ml-2 top-0 z-50 bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg max-w-xs">
            <h4 className={`font-bold ${node.type === 'notable' ? 'text-yellow-400' : 'text-orange-400'} mb-2`}>
              {node.name}
            </h4>
            <div className="space-y-1">
              {node.stats.map((stat, index) => (
                <div key={index} className="text-gray-300 text-xs">
                  {stat}
                </div>
              ))}
            </div>
            {!isAllocated && canAllocate && (
              <div className="text-green-400 text-xs mt-2">
                Click to allocate (1 point)
              </div>
            )}
            {isAllocated && (
              <div className="text-red-400 text-xs mt-2">
                Click to deallocate
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const ConnectionLine = ({ from, to }) => {
    const fromNode = skillNodes.find(n => n.id === from);
    const toNode = skillNodes.find(n => n.id === to);
    
    if (!fromNode || !toNode) return null;

    // Simple line calculation (in a real implementation, you'd use SVG paths)
    const isAllocated = allocatedNodes.has(from) && allocatedNodes.has(to);
    
    return (
      <div
        className={`absolute h-0.5 bg-gray-600 ${isAllocated ? 'bg-yellow-400' : ''} transition-colors duration-200`}
        style={{
          left: '50%',
          top: '50%',
          width: '20px',
          transform: 'translate(-50%, -50%)'
        }}
      />
    );
  };

  return (
    <div className="p-2 h-full overflow-auto">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-bold text-orange-400">Passive Skill Tree</h2>
        <div className="flex items-center space-x-2">
          <span className="text-gray-300 text-xs">Available Points:</span>
          <span className={`text-sm font-bold ${availablePoints > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {availablePoints}
          </span>
          <button
            onClick={() => {
              setAllocatedNodes(new Set());
              setAvailablePoints(5);
            }}
            className="px-2 py-0.5 bg-red-600 hover:bg-red-700 rounded text-white text-xs"
          >
            Reset Tree
          </button>
        </div>
      </div>

      {/* Skill Tree Canvas */}
      <div className="relative w-full h-[500px] bg-gray-900 rounded border border-gray-700 overflow-hidden">
        {/* Connection lines */}
        {skillNodes.map(node => 
          node.connections.map(connId => (
            <ConnectionLine key={`${node.id}-${connId}`} from={node.id} to={connId} />
          ))
        )}
        
        {/* Skill nodes */}
        {skillNodes.map(node => (
          <SkillNode key={node.id} node={node} />
        ))}
      </div>

      {/* Legend */}
      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
        <div>
          <h4 className="font-bold text-gray-300 mb-1 text-xs">Node Types</h4>
          <div className="space-y-0.5">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              <span className="text-gray-400 text-xs">Strength</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span className="text-gray-400 text-xs">Dexterity</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-gray-400 text-xs">Intelligence</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-purple-600 rounded-full border border-yellow-400"></div>
              <span className="text-gray-400 text-xs">Notable</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-gray-300 mb-1 text-xs">Allocated</h4>
          <div className="space-y-0.5">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-yellow-400 rounded-full ring ring-yellow-400"></div>
              <span className="text-gray-400 text-xs">Allocated Node</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-gray-600 rounded-full opacity-50"></div>
              <span className="text-gray-400 text-xs">Unavailable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 