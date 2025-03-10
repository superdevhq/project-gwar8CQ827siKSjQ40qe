
import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const P5Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Only create the sketch once
    if (!canvasRef.current) return;
    
    // Create a new p5 instance
    const sketch = (p: p5) => {
      // Variables for our 3D objects
      let angle = 0;
      let spheres: Sphere[] = [];
      const numSpheres = 15;
      
      // Class to manage individual spheres
      class Sphere {
        x: number;
        y: number;
        z: number;
        radius: number;
        color: p5.Color;
        speed: number;
        
        constructor() {
          this.radius = p.random(15, 40);
          this.x = p.random(-200, 200);
          this.y = p.random(-200, 200);
          this.z = p.random(-200, 200);
          this.color = p.color(
            p.random(100, 255),
            p.random(100, 255),
            p.random(100, 255),
            p.random(150, 200)
          );
          this.speed = p.random(0.005, 0.02);
        }
        
        update() {
          // Move in a circular pattern
          this.x += Math.sin(angle * this.speed) * 0.5;
          this.y += Math.cos(angle * this.speed) * 0.5;
          this.z += Math.sin(angle * this.speed) * Math.cos(angle * this.speed) * 0.3;
        }
        
        display() {
          p.push();
          p.translate(this.x, this.y, this.z);
          p.noStroke();
          p.fill(this.color);
          p.specularMaterial(250);
          p.shininess(50);
          p.sphere(this.radius);
          p.pop();
        }
      }
      
      p.setup = () => {
        // Create canvas that fills the container
        const canvas = p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
        canvas.parent(canvasRef.current!);
        
        // Create spheres
        for (let i = 0; i < numSpheres; i++) {
          spheres.push(new Sphere());
        }
        
        // Enable smooth rendering
        p.smooth();
      };
      
      p.draw = () => {
        // Set background with slight transparency for trail effect
        p.background(10, 20, 30, 20);
        
        // Add ambient light
        p.ambientLight(60, 60, 60);
        
        // Add directional light
        p.directionalLight(255, 255, 255, 0.5, 0.5, -1);
        
        // Add point light that follows mouse
        const lightX = p.map(p.mouseX, 0, p.width, -200, 200);
        const lightY = p.map(p.mouseY, 0, p.height, -200, 200);
        p.pointLight(255, 255, 255, lightX, lightY, 250);
        
        // Rotate the entire scene
        p.rotateX(angle * 0.3);
        p.rotateY(angle * 0.2);
        
        // Update and display all spheres
        for (const sphere of spheres) {
          sphere.update();
          sphere.display();
        }
        
        // Increment angle for animation
        angle += 0.01;
      };
      
      // Handle window resize
      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
      };
      
      // Add interactivity - create new sphere on mouse press
      p.mousePressed = () => {
        if (spheres.length < 30) { // Limit the number of spheres
          spheres.push(new Sphere());
        }
        return false; // Prevent default
      };
    };
    
    // Create new p5 instance
    const p5Instance = new p5(sketch);
    
    // Cleanup function
    return () => {
      p5Instance.remove();
    };
  }, []);
  
  return <div ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
};

export default P5Canvas;
