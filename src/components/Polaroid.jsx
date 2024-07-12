import React, { useState, useRef } from 'react';

const Polaroid = ({ ref, img, text, scale, position, setPosition, rotation, fontSize}) => {
  const [dragging, setDragging] = useState(false);
  const lastMousePosition = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    setDragging(true);
    lastMousePosition.current = { x: e.pageX, y: e.pageY };
    e.stopPropagation();
    e.preventDefault();
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const deltaX = (e.pageX - lastMousePosition.current.x) / scale;
    const deltaY = (e.pageY - lastMousePosition.current.y) / scale;
    setPosition(prevPosition => ({
      x: prevPosition.x + deltaX,
      y: prevPosition.y + deltaY
    }));
    lastMousePosition.current = { x: e.pageX, y: e.pageY };
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div id ="polaroid-div" ref={ref} className="bg-white p-4 w-64 flex flex-col items-center">
      <div 
        className="aspect-square w-full flex items-center justify-center overflow-hidden relative"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ position: 'relative' }}
      >
        <img src={img} alt="pic" className="object-contain absolute" style={{  transform: `scale(${scale}) translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,cursor: 'move'}} onMouseDown={handleMouseDown}/>
      </div>
      <div className="bg-white h-12 flex justify-center items-center w-full mt-2 overflow-hidden">
        <p size={fontSize} className={"text-center font-gochi text-2xl italic"}>{text}</p>
      </div>
    </div>
  );
};

export default Polaroid;
