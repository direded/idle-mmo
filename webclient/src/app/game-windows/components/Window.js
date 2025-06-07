'use client';

import { useState, useEffect } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

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
      className="bg-gray-800 border border-gray-900 w-96"
      onClick={handleWindowClick}
    >
      {/* Window Title Bar */}
      <div 
        className="bg-gray-700 px-2 flex justify-between items-center"
      >
        <div 
          {...attributes} 
          {...listeners}
          className="flex-1 cursor-move text-center"
        >
          <span className="text-white font-medium text-xs">{title}</span>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="text-gray-400 hover:text-white transition-colors font-light cursor-pointer ml-1 px-0.5"
        >
          ×
        </button>
      </div>
      
      {/* Window Content */}
      <div className="p-2">
        {children}
      </div>
    </div>
  );
};

export default Window; 