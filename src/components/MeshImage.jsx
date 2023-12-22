import Mesh from '../assets/mesh.png';
import React from 'react';

const MeshImage = () => {
  return (
    <div className="flex-1 hidden laptop:block">
      <img src={Mesh} alt="meshGradient" className="w-full h-full object-cover blur-sm" />
    </div>
  );
};

export default MeshImage;
