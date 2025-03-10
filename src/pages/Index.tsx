
import P5Canvas from '@/components/P5Canvas';

const Index = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* P5.js Canvas */}
      <P5Canvas />
      
      {/* Overlay text */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
        <div className="text-center p-6 bg-black/30 backdrop-blur-sm rounded-lg">
          <h1 className="text-4xl font-bold mb-4 text-white">Interactive 3D Experience</h1>
          <p className="text-xl text-gray-200">Click anywhere to add more spheres</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
