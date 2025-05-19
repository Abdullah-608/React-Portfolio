import { useEffect, useState, useCallback, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

export const CircuitBoard = () => {
  const canvasRef = useRef(null);
  const offscreenCanvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  
  // Animation refs
  const circuitsRef = useRef([]);
  const microchipsRef = useRef([]);
  const nodesRef = useRef([]);
  const pulsesRef = useRef([]);
  const particlesRef = useRef([]);
  const dataFlowsRef = useRef([]);
  const animationFrameRef = useRef(null);
  const lastFrameTimeRef = useRef(0);
  
  // Premium color schemes with depth layers
  const getColors = useCallback(() => {
    return isDarkMode ? {
      // Dark mode - deep blue / cyan theme
      background: 'rgba(7, 11, 22, 0.92)',
      backgroundNoise: 'rgba(10, 14, 26, 0.04)',
      
      // Circuit layers
      circuitDeep: '#182039',
      circuit: '#1e2c4f',
      circuitHighlight: '#2a3a70',
      
      // Node types
      nodeInactive: '#396bae',
      node: '#4f84cc',
      nodeActive: '#64aefd',
      nodePrimary: '#55d8ff',
      nodeAccent: '#44ffbb',
      
      // Data elements
      dataPulse: '#78d9ff',
      dataFlow: '#64aefd',
      dataAccent: '#44ffbb',
      
      // Microchip elements
      chipBase: '#1c243e',
      chipDetail: '#283662',
      chipHighlight: '#3e569e',
      
      // Particle effects
      particleFaint: 'rgba(83, 164, 255, 0.3)',
      particleBright: 'rgba(100, 221, 255, 0.7)',
      
      // Glow effects - these are base colors, opacity is applied in rendering
      glowFaint: '#396bae',
      glowBright: '#55d8ff',
      glowAccent: '#44ffbb'
    } : {
      // Light mode - subtle gray / blue theme
      background: 'rgba(247, 250, 252, 0.95)',
      backgroundNoise: 'rgba(230, 236, 241, 0.05)',
      
      // Circuit layers
      circuitDeep: '#d9e1ec',
      circuit: '#ccd7e6',
      circuitHighlight: '#b4c6df',
      
      // Node types
      nodeInactive: '#7da7d9',
      node: '#5c8ad6',
      nodeActive: '#4571c4',
      nodePrimary: '#3f66c6',
      nodeAccent: '#7667d8',
      
      // Data elements
      dataPulse: '#5c8ad6',
      dataFlow: '#3f66c6',
      dataAccent: '#7667d8',
      
      // Microchip elements
      chipBase: '#e4eaf5',
      chipDetail: '#ccd7e6',
      chipHighlight: '#abc0dd',
      
      // Particle effects
      particleFaint: 'rgba(92, 138, 214, 0.2)',
      particleBright: 'rgba(63, 102, 198, 0.5)',
      
      // Glow effects
      glowFaint: '#7da7d9',
      glowBright: '#4571c4',
      glowAccent: '#7667d8'
    };
  }, [isDarkMode]);

  const detectColorScheme = useCallback(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(isDark);
    return isDark;
  }, []);

  // Create noise texture for realistic effect
  const createNoiseTexture = useCallback((width, height, colors) => {
    if (!offscreenCanvasRef.current) {
      offscreenCanvasRef.current = document.createElement('canvas');
    }
    
    const canvas = offscreenCanvasRef.current;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    // Create base color
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, width, height);
    
    // Add subtle noise pattern
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      // Random noise with very subtle variation
      const noise = Math.random() * 5 - 2.5;
      
      data[i] = Math.min(255, Math.max(0, data[i] + noise));
      data[i+1] = Math.min(255, Math.max(0, data[i+1] + noise));
      data[i+2] = Math.min(255, Math.max(0, data[i+2] + noise));
    }
    
    ctx.putImageData(imageData, 0, 0);
    
    // Add subtle vignette effect
    const gradient = ctx.createRadialGradient(
      width/2, height/2, Math.min(width, height) * 0.1,
      width/2, height/2, Math.max(width, height) * 0.7
    );
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.15)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Add subtle grid overlay
    ctx.strokeStyle = colors.backgroundNoise;
    ctx.lineWidth = 0.5;
    
    const gridSize = 50;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    return canvas;
  }, []);

  // Generate advanced circuit layout
  const generateCircuitry = useCallback(() => {
    if (!dimensions.width) return;
    
    const colors = getColors();
    const { width, height } = dimensions;
    
    // Calculate grid size based on screen dimensions
    const gridSize = Math.min(width, height) / 30;
    const halfGrid = gridSize / 2;
    const cols = Math.ceil(width / gridSize);
    const rows = Math.ceil(height / gridSize);
    
    // Clear previous data
    const circuits = [];
    const nodes = [];
    const microchips = [];
    
    // Create microchip regions first
    const chipCount = Math.max(1, Math.floor(Math.sqrt(width * height) / 350));
    
    for (let i = 0; i < chipCount; i++) {
      // Determine size and position
      const chipWidth = Math.floor(Math.random() * 5 + 5) * gridSize;
      const chipHeight = Math.floor(Math.random() * 5 + 5) * gridSize;
      
      // Position chip with some margin from edges
      const marginX = Math.min(width * 0.1, gridSize * 2);
      const marginY = Math.min(height * 0.1, gridSize * 2);
      
      const chipX = marginX + Math.random() * (width - chipWidth - marginX * 2);
      const chipY = marginY + Math.random() * (height - chipHeight - marginY * 2);
      
      // Create chip pins along edges
      const pins = [];
      const pinSpacing = gridSize * 0.8;
      
      // Top pins
      for (let px = chipX + pinSpacing; px < chipX + chipWidth - pinSpacing; px += pinSpacing) {
        pins.push({
          x: px,
          y: chipY,
          direction: 'up',
          isConnected: Math.random() < 0.7
        });
      }
      
      // Right pins
      for (let py = chipY + pinSpacing; py < chipY + chipHeight - pinSpacing; py += pinSpacing) {
        pins.push({
          x: chipX + chipWidth,
          y: py,
          direction: 'right',
          isConnected: Math.random() < 0.7
        });
      }
      
      // Bottom pins
      for (let px = chipX + pinSpacing; px < chipX + chipWidth - pinSpacing; px += pinSpacing) {
        pins.push({
          x: px,
          y: chipY + chipHeight,
          direction: 'down',
          isConnected: Math.random() < 0.7
        });
      }
      
      // Left pins
      for (let py = chipY + pinSpacing; py < chipY + chipHeight - pinSpacing; py += pinSpacing) {
        pins.push({
          x: chipX,
          y: py,
          direction: 'left',
          isConnected: Math.random() < 0.7
        });
      }
      
      microchips.push({
        x: chipX,
        y: chipY,
        width: chipWidth,
        height: chipHeight,
        pins,
        type: ['cpu', 'memory', 'controller', 'io'][Math.floor(Math.random() * 4)],
        details: Math.random() < 0.7,
        activity: Math.random() * 0.1 + 0.01,
        pulseRate: 0.001 + Math.random() * 0.002,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }
    
    // Generate primary circuit pathways first
    const mainPathCount = Math.max(7, Math.min(20, Math.floor(Math.sqrt(width * height) / 100)));
    
    // Create circuit paths connecting between random points and chips
    for (let i = 0; i < mainPathCount; i++) {
      // Determine start point
      let startX, startY, endX, endY;
      
      // 50% chance to connect from a chip pin
      if (microchips.length > 0 && Math.random() < 0.5) {
        // Select a random chip and pin
        const chip = microchips[Math.floor(Math.random() * microchips.length)];
        const connectedPins = chip.pins.filter(pin => pin.isConnected);
        
        if (connectedPins.length > 0) {
          const pin = connectedPins[Math.floor(Math.random() * connectedPins.length)];
          startX = pin.x;
          startY = pin.y;
          
          // Adjust start position based on pin direction
          switch (pin.direction) {
            case 'up': startY -= gridSize; break;
            case 'right': startX += gridSize; break;
            case 'down': startY += gridSize; break;
            case 'left': startX -= gridSize; break;
          }
        } else {
          // Fallback to random start
          startX = Math.floor(Math.random() * cols) * gridSize;
          startY = Math.floor(Math.random() * rows) * gridSize;
        }
      } else {
        // Random start position
        startX = Math.floor(Math.random() * cols) * gridSize;
        startY = Math.floor(Math.random() * rows) * gridSize;
      }
      
      // Determine end point
      // 50% chance to end at a chip
      if (microchips.length > 0 && Math.random() < 0.5) {
        const chip = microchips[Math.floor(Math.random() * microchips.length)];
        const connectedPins = chip.pins.filter(pin => pin.isConnected);
        
        if (connectedPins.length > 0) {
          const pin = connectedPins[Math.floor(Math.random() * connectedPins.length)];
          endX = pin.x;
          endY = pin.y;
          
          // Adjust end position based on pin direction
          switch (pin.direction) {
            case 'up': endY -= gridSize; break;
            case 'right': endX += gridSize; break;
            case 'down': endY += gridSize; break;
            case 'left': endX -= gridSize; break;
          }
        } else {
          // Fallback to random end
          endX = Math.floor(Math.random() * cols) * gridSize;
          endY = Math.floor(Math.random() * rows) * gridSize;
        }
      } else {
        // Random end position
        endX = Math.floor(Math.random() * cols) * gridSize;
        endY = Math.floor(Math.random() * rows) * gridSize;
      }
      
      // Create path using A* pathfinding for more organic circuits
      const path = createCircuitPath(
        { x: startX, y: startY },
        { x: endX, y: endY },
        microchips,
        gridSize,
        width,
        height
      );
      
      // Add nodes at start, end, and occasionally along the path
      if (path.length > 0) {
        // Start node
        nodes.push({
          x: path[0].x,
          y: path[0].y,
          size: (Math.random() * 0.2 + 0.25) * gridSize,
          color: Math.random() < 0.2 ? colors.nodeAccent : colors.node,
          pulseRate: 0.002 + Math.random() * 0.005,
          pulsePhase: Math.random() * Math.PI * 2,
          isActive: Math.random() < 0.6,
          lastPulseTime: 0,
          dataGen: Math.random() < 0.3,
          glowIntensity: Math.random() * 0.5 + 0.5
        });
        
        // End node
        nodes.push({
          x: path[path.length - 1].x,
          y: path[path.length - 1].y,
          size: (Math.random() * 0.2 + 0.25) * gridSize,
          color: Math.random() < 0.2 ? colors.nodeAccent : colors.node,
          pulseRate: 0.002 + Math.random() * 0.005,
          pulsePhase: Math.random() * Math.PI * 2,
          isActive: Math.random() < 0.6,
          lastPulseTime: 0,
          dataGen: Math.random() < 0.3,
          glowIntensity: Math.random() * 0.5 + 0.5
        });
        
        // Occasionally add nodes along the path
        if (path.length > 4) {
          for (let j = 2; j < path.length - 2; j += 2) {
            if (Math.random() < 0.2) {
              nodes.push({
                x: path[j].x,
                y: path[j].y,
                size: (Math.random() * 0.15 + 0.2) * gridSize,
                color: Math.random() < 0.15 ? colors.nodeAccent : 
                       Math.random() < 0.3 ? colors.nodePrimary : colors.node,
                pulseRate: 0.002 + Math.random() * 0.003,
                pulsePhase: Math.random() * Math.PI * 2,
                isActive: Math.random() < 0.4,
                lastPulseTime: 0,
                dataGen: false,
                glowIntensity: Math.random() * 0.4 + 0.3
              });
            }
          }
        }
        
        // Add circuit to the collection
        circuits.push({
          path,
          width: (Math.random() * 0.1 + 0.05) * gridSize,
          color: Math.random() < 0.7 ? colors.circuit : 
                 Math.random() < 0.3 ? colors.circuitDeep : colors.circuitHighlight,
          isMainPath: true,
          dataFlow: Math.random() < 0.3,
          flowSpeed: 0.001 + Math.random() * 0.002,
          flowOffset: Math.random() * 1000,
          flowIntensity: Math.random() * 0.6 + 0.4
        });
      }
    }
    
    // Create secondary/branch circuits
    const branchCount = mainPathCount * 2;
    
    for (let i = 0; i < branchCount; i++) {
      // Branch from existing node or circuit
      let startX, startY;
      
      if (nodes.length > 0 && Math.random() < 0.7) {
        // Start from an existing node
        const node = nodes[Math.floor(Math.random() * nodes.length)];
        startX = node.x;
        startY = node.y;
      } else if (circuits.length > 0) {
        // Start from a point on an existing circuit
        const circuit = circuits[Math.floor(Math.random() * circuits.length)];
        const pointIndex = Math.floor(Math.random() * circuit.path.length);
        startX = circuit.path[pointIndex].x;
        startY = circuit.path[pointIndex].y;
      } else {
        // Fallback to random start
        startX = Math.floor(Math.random() * cols) * gridSize;
        startY = Math.floor(Math.random() * rows) * gridSize;
      }
      
      // Determine end point
      let endX, endY;
      
      // 30% chance to end at a node
      if (nodes.length > 0 && Math.random() < 0.3) {
        const node = nodes[Math.floor(Math.random() * nodes.length)];
        endX = node.x;
        endY = node.y;
      } 
      // 20% chance to end at a chip
      else if (microchips.length > 0 && Math.random() < 0.2) {
        const chip = microchips[Math.floor(Math.random() * microchips.length)];
        const connectedPins = chip.pins.filter(pin => pin.isConnected);
        
        if (connectedPins.length > 0) {
          const pin = connectedPins[Math.floor(Math.random() * connectedPins.length)];
          endX = pin.x;
          endY = pin.y;
          
          // Adjust end position based on pin direction
          switch (pin.direction) {
            case 'up': endY -= gridSize; break;
            case 'right': endX += gridSize; break;
            case 'down': endY += gridSize; break;
            case 'left': endX -= gridSize; break;
          }
        } else {
          // Random end position
          endX = Math.floor(Math.random() * cols) * gridSize;
          endY = Math.floor(Math.random() * rows) * gridSize;
        }
      } else {
        // Random end position
        endX = Math.floor(Math.random() * cols) * gridSize;
        endY = Math.floor(Math.random() * rows) * gridSize;
      }
      
      // Create shorter path for branches
      const path = createCircuitPath(
        { x: startX, y: startY },
        { x: endX, y: endY },
        microchips,
        gridSize,
        width,
        height,
        5 // max steps for branches
      );
      
      if (path.length > 0) {
        // Add node at the end point with smaller probability
        if (Math.random() < 0.4) {
          nodes.push({
            x: path[path.length - 1].x,
            y: path[path.length - 1].y,
            size: (Math.random() * 0.15 + 0.15) * gridSize,
            color: Math.random() < 0.1 ? colors.nodeAccent : 
                   Math.random() < 0.2 ? colors.nodePrimary : colors.node,
            pulseRate: 0.002 + Math.random() * 0.003,
            pulsePhase: Math.random() * Math.PI * 2,
            isActive: Math.random() < 0.3,
            lastPulseTime: 0,
            dataGen: false,
            glowIntensity: Math.random() * 0.3 + 0.2
          });
        }
        
        // Add branch circuit
        circuits.push({
          path,
          width: (Math.random() * 0.08 + 0.03) * gridSize,
          color: Math.random() < 0.6 ? colors.circuitDeep : 
                 Math.random() < 0.3 ? colors.circuit : colors.circuitHighlight,
          isMainPath: false,
          dataFlow: Math.random() < 0.15,
          flowSpeed: 0.0005 + Math.random() * 0.001,
          flowOffset: Math.random() * 1000,
          flowIntensity: Math.random() * 0.4 + 0.2
        });
      }
    }
    
    // Initialize data flows
    const dataFlows = [];
    
    // Save all generated elements
    circuitsRef.current = circuits;
    nodesRef.current = nodes;
    microchipsRef.current = microchips;
    dataFlowsRef.current = dataFlows;
    pulsesRef.current = [];
    particlesRef.current = [];
    
  }, [dimensions, getColors]);

  // Helper function to create circuit paths with a simplified A* algorithm
  const createCircuitPath = (start, end, obstacles, gridSize, width, height, maxSteps = 20) => {
    const path = [{ x: start.x, y: start.y }];
    let current = { ...start };
    let steps = 0;
    
    // Simplified pathfinding - try to move toward target while avoiding obstacles
    // and maintaining a clean circuit look with right angles
    while ((current.x !== end.x || current.y !== end.y) && steps < maxSteps) {
      steps++;
      
      // Decide whether to move horizontally or vertically first
      const moveHorizontalFirst = Math.random() < 0.5;
      
      let moved = false;
      
      if (moveHorizontalFirst) {
        // Try horizontal movement
        if (current.x !== end.x) {
          const stepX = current.x < end.x ? gridSize : -gridSize;
          const nextX = current.x + stepX;
          
          // Check if path is clear
          if (isPathClear(current, { x: nextX, y: current.y }, obstacles, gridSize)) {
            current = { x: nextX, y: current.y };
            path.push({ ...current });
            moved = true;
          }
        }
        
        // Then try vertical if needed
        if (!moved && current.y !== end.y) {
          const stepY = current.y < end.y ? gridSize : -gridSize;
          const nextY = current.y + stepY;
          
          // Check if path is clear
          if (isPathClear(current, { x: current.x, y: nextY }, obstacles, gridSize)) {
            current = { x: current.x, y: nextY };
            path.push({ ...current });
            moved = true;
          }
        }
      } else {
        // Try vertical movement first
        if (current.y !== end.y) {
          const stepY = current.y < end.y ? gridSize : -gridSize;
          const nextY = current.y + stepY;
          
          // Check if path is clear
          if (isPathClear(current, { x: current.x, y: nextY }, obstacles, gridSize)) {
            current = { x: current.x, y: nextY };
            path.push({ ...current });
            moved = true;
          }
        }
        
        // Then try horizontal if needed
        if (!moved && current.x !== end.x) {
          const stepX = current.x < end.x ? gridSize : -gridSize;
          const nextX = current.x + stepX;
          
          // Check if path is clear
          if (isPathClear(current, { x: nextX, y: current.y }, obstacles, gridSize)) {
            current = { x: nextX, y: current.y };
            path.push({ ...current });
            moved = true;
          }
        }
      }
      
      // If stuck, try random direction
      if (!moved) {
        const directions = [
          { x: current.x + gridSize, y: current.y },
          { x: current.x - gridSize, y: current.y },
          { x: current.x, y: current.y + gridSize },
          { x: current.x, y: current.y - gridSize }
        ];
        
        // Filter valid directions
        const validDirections = directions.filter(dir => 
          dir.x >= 0 && dir.x < width && 
          dir.y >= 0 && dir.y < height &&
          isPathClear(current, dir, obstacles, gridSize)
        );
        
        if (validDirections.length > 0) {
          const nextDir = validDirections[Math.floor(Math.random() * validDirections.length)];
          current = { ...nextDir };
          path.push({ ...current });
        } else {
          // Completely stuck, terminate path
          break;
        }
      }
    }
    
    // Add final point if we're close
    if (Math.abs(current.x - end.x) <= gridSize && Math.abs(current.y - end.y) <= gridSize) {
      path.push({ x: end.x, y: end.y });
    }
    
    return path;
  };

  // Check if path between two points is clear of obstacles
  const isPathClear = (point1, point2, obstacles, gridSize) => {
    // Check if path intersects any microchip
    for (const chip of obstacles) {
      // Expand chip bounds slightly
      const chipBounds = {
        left: chip.x - gridSize/2,
        right: chip.x + chip.width + gridSize/2,
        top: chip.y - gridSize/2,
        bottom: chip.y + chip.height + gridSize/2
      };
      
      // Simple line-rectangle intersection check
      // For horizontal line
      if (point1.y === point2.y) {
        const y = point1.y;
        const minX = Math.min(point1.x, point2.x);
        const maxX = Math.max(point1.x, point2.x);
        
        if (y >= chipBounds.top && y <= chipBounds.bottom &&
            minX <= chipBounds.right && maxX >= chipBounds.left) {
          return false; // Intersection found
        }
      }
      
      // For vertical line
      if (point1.x === point2.x) {
        const x = point1.x;
        const minY = Math.min(point1.y, point2.y);
        const maxY = Math.max(point1.y, point2.y);
        
        if (x >= chipBounds.left && x <= chipBounds.right &&
            minY <= chipBounds.bottom && maxY >= chipBounds.top) {
          return false; // Intersection found
        }
      }
    }
    
    return true; // No intersection
  };

  // Calculate fps for smooth animations
  const calculateDeltaTime = () => {
    const now = performance.now();
    const delta = now - lastFrameTimeRef.current;
    lastFrameTimeRef.current = now;
    
    // Clamp to reasonable values
    return Math.min(0.1, delta / 1000);
  };

  // Initialize canvas and elements
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        
        // Set actual dimensions (crucial for proper rendering)
        const pixelRatio = window.devicePixelRatio || 1;
        canvas.width = rect.width * pixelRatio;
        canvas.height = rect.height * pixelRatio;
        
        // Set display size
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        
        // Store dimensions for calculations
        setDimensions({ 
          width: rect.width, 
          height: rect.height,
          pixelRatio
        });
      }
    };
    
    updateDimensions();
    detectColorScheme();
    
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleColorSchemeChange = () => {
      setIsDarkMode(mediaQuery.matches);
    };
    
    const handleResize = () => {
      updateDimensions();
    };

    try {
      mediaQuery.addEventListener("change", handleColorSchemeChange);
    } catch (e) {
      mediaQuery.addListener(handleColorSchemeChange);
    }
    
    window.addEventListener("resize", handleResize);

    return () => {
      try {
        mediaQuery.removeEventListener("change", handleColorSchemeChange);
      } catch (e) {
        mediaQuery.removeListener(handleColorSchemeChange);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [detectColorScheme]);

  // Generate circuit when dimensions change
  useEffect(() => {
    if (dimensions.width > 0) {
      generateCircuitry();
    }
  }, [dimensions, isDarkMode, generateCircuitry]);

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || !dimensions.width) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const colors = getColors();
    
    // Set for high-DPI displays
    if (dimensions.pixelRatio > 1) {
      ctx.scale(dimensions.pixelRatio, dimensions.pixelRatio);
    }
    
    // Create noise texture for background
    const noiseTexture = createNoiseTexture(dimensions.width, dimensions.height, colors);
    
    let frameCount = 0;
    lastFrameTimeRef.current = performance.now();
    
    const circuits = circuitsRef.current;
    const nodes = nodesRef.current;
    const microchips = microchipsRef.current;
    
    // Main draw function
    const draw = () => {
      frameCount++;
      const deltaTime = calculateDeltaTime();
      
      // Clear canvas
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Draw background with noise texture
      ctx.drawImage(noiseTexture, 0, 0, dimensions.width, dimensions.height);
      
      // Draw circuits
      circuits.forEach(circuit => {
        if (circuit.path.length < 2) return;
        
        ctx.strokeStyle = circuit.color;
        ctx.lineWidth = circuit.width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.beginPath();
        ctx.moveTo(circuit.path[0].x, circuit.path[0].y);
        
        for (let i = 1; i < circuit.path.length; i++) {
          ctx.lineTo(circuit.path[i].x, circuit.path[i].y);
        }
        
        ctx.stroke();
        
        // Draw data flow along circuit if active
        if (circuit.dataFlow) {
          drawDataFlow(ctx, circuit, frameCount);
        }
      });
      
      // Draw microchips
      microchips.forEach(chip => {
        // Chip base
        ctx.fillStyle = colors.chipBase;
        ctx.fillRect(chip.x, chip.y, chip.width, chip.height);
        
        // Chip details
        if (chip.details) {
          drawChipDetails(ctx, chip, colors, frameCount);
        }
        
        // Draw chip pins
        chip.pins.forEach(pin => {
          ctx.fillStyle = pin.isConnected ? colors.chipHighlight : colors.chipDetail;
          
          // Draw appropriate pin based on direction
          switch (pin.direction) {
            case 'up':
              ctx.fillRect(pin.x - 2, pin.y - 5, 4, 5);
              break;
            case 'right':
              ctx.fillRect(pin.x, pin.y - 2, 5, 4);
              break;
            case 'down':
              ctx.fillRect(pin.x - 2, pin.y, 4, 5);
              break;
            case 'left':
              ctx.fillRect(pin.x - 5, pin.y - 2, 5, 4);
              break;
          }
        });
      });
      
      // Update and draw data pulses
      let pulses = pulsesRef.current;
      
      pulses = updateAndDrawPulses(ctx, pulses, deltaTime, colors);
      pulsesRef.current = pulses;
      
      // Manage data particles
      let particles = particlesRef.current;
      
      // Occasionally generate new particles from active nodes
      if (frameCount % 10 === 0 && Math.random() < 0.3) {
        const activeNodes = nodes.filter(node => node.isActive && node.dataGen);
        
        if (activeNodes.length > 0) {
          const sourceNode = activeNodes[Math.floor(Math.random() * activeNodes.length)];
          
          // Create new particle
          particles.push({
            x: sourceNode.x,
            y: sourceNode.y,
            size: sourceNode.size * 0.3,
            alpha: 0.7,
            vx: (Math.random() - 0.5) * 40,
            vy: (Math.random() - 0.5) * 40,
            color: Math.random() < 0.3 ? colors.particleBright : colors.particleFaint,
            life: 1.0,
            decay: 0.02 + Math.random() * 0.05
          });
        }
      }
      
      // Update and draw particles
      particles = updateAndDrawParticles(ctx, particles, deltaTime);
      particlesRef.current = particles;
      
      // Generate data pulse flows occasionally
      if (frameCount % 60 === 0) {
        // Find active nodes to send data between
        const activeNodes = nodes.filter(node => node.isActive);
        
        if (activeNodes.length > 1 && Math.random() < 0.4) {
          const sourceIndex = Math.floor(Math.random() * activeNodes.length);
          let targetIndex;
          
          do {
            targetIndex = Math.floor(Math.random() * activeNodes.length);
          } while (targetIndex === sourceIndex);
          
          const sourceNode = activeNodes[sourceIndex];
          const targetNode = activeNodes[targetIndex];
          
          // Find a circuit path that connects these nodes
          const path = findConnectingCircuit(sourceNode, targetNode, circuits);
          
          if (path) {
            pulses.push({
              path,
              progress: 0,
              speed: 0.2 + Math.random() * 0.3,
              color: Math.random() < 0.2 ? colors.dataAccent : colors.dataPulse,
              size: sourceNode.size * 0.6,
              alpha: 0.9,
              tail: Math.random() < 0.7,
              tailLength: 5 + Math.random() * 10
            });
            
            // Mark source node as having sent data
            sourceNode.lastPulseTime = frameCount;
          }
        }
      }
      
      // Draw nodes
      nodes.forEach(node => {
        drawNode(ctx, node, frameCount, colors);
      });
      
      // Draw node glow effects (separate pass for better layering)
      nodes.forEach(node => {
        if (node.isActive && node.glowIntensity > 0.1) {
          drawNodeGlow(ctx, node, frameCount, colors);
        }
      });
      
      animationFrameRef.current = requestAnimationFrame(draw);
    };
    
    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(draw);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
    
  }, [dimensions, getColors, createNoiseTexture, prefersReducedMotion]);

  // Find a circuit path that connects two nodes
  const findConnectingCircuit = (nodeA, nodeB, circuits) => {
    // Check each circuit
    for (const circuit of circuits) {
      const path = circuit.path;
      if (path.length < 2) continue;
      
      // Check if this circuit connects the nodes
      let hasNodeA = false;
      let hasNodeB = false;
      let nodeAIndex = -1;
      let nodeBIndex = -1;
      
      for (let i = 0; i < path.length; i++) {
        const point = path[i];
        
        // Check proximity to nodeA
        if (Math.abs(point.x - nodeA.x) < 5 && Math.abs(point.y - nodeA.y) < 5) {
          hasNodeA = true;
          nodeAIndex = i;
        }
        
        // Check proximity to nodeB
        if (Math.abs(point.x - nodeB.x) < 5 && Math.abs(point.y - nodeB.y) < 5) {
          hasNodeB = true;
          nodeBIndex = i;
        }
      }
      
      // If both nodes are on this circuit, extract the path segment
      if (hasNodeA && hasNodeB) {
        // Determine direction
        if (nodeAIndex < nodeBIndex) {
          return path.slice(nodeAIndex, nodeBIndex + 1);
        } else {
          return path.slice(nodeBIndex, nodeAIndex + 1).reverse();
        }
      }
    }
    
    return null;
  };

  // Draw data flow along a circuit
  const drawDataFlow = (ctx, circuit, frameCount) => {
    const flowOffset = (frameCount + circuit.flowOffset) * circuit.flowSpeed;
    
    // Create gradient for flow effect
    const gradient = ctx.createLinearGradient(
      circuit.path[0].x, circuit.path[0].y,
      circuit.path[circuit.path.length - 1].x, circuit.path[circuit.path.length - 1].y
    );
    
    // Create flowing pattern
    for (let i = 0; i < 10; i++) {
      const pos = (i / 10 + flowOffset) % 1;
      const alpha = Math.sin(pos * Math.PI) * circuit.flowIntensity;
      
      gradient.addColorStop(pos, `rgba(255, 255, 255, ${alpha})`);
    }
    
    // Draw flow effect
    ctx.strokeStyle = gradient;
    ctx.lineWidth = circuit.width * 0.7;
    
    ctx.beginPath();
    ctx.moveTo(circuit.path[0].x, circuit.path[0].y);
    
    for (let i = 1; i < circuit.path.length; i++) {
      ctx.lineTo(circuit.path[i].x, circuit.path[i].y);
    }
    
    ctx.stroke();
  };

  // Draw microchip details
  const drawChipDetails = (ctx, chip, colors, frameCount) => {
    const { x, y, width, height, type } = chip;
    
    // Draw frame
    ctx.strokeStyle = colors.chipDetail;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x + 2, y + 2, width - 4, height - 4);
    
    // Draw type identifier
    ctx.font = '10px monospace';
    ctx.fillStyle = colors.chipHighlight;
    ctx.textAlign = 'center';
    ctx.fillText(type.toUpperCase(), x + width / 2, y + height / 2 + 3);
    
    // Draw dividing lines
    ctx.beginPath();
    
    // Horizontal divider
    ctx.moveTo(x + 5, y + height / 2);
    ctx.lineTo(x + width - 5, y + height / 2);
    
    // Activity patterns based on chip type
    switch (type) {
      case 'cpu':
        // Grid pattern
        const gridSize = Math.min(width, height) / 8;
        
        for (let gx = x + gridSize; gx < x + width; gx += gridSize) {
          ctx.moveTo(gx, y + 5);
          ctx.lineTo(gx, y + height - 5);
        }
        
        for (let gy = y + gridSize; gy < y + height; gy += gridSize) {
          ctx.moveTo(x + 5, gy);
          ctx.lineTo(x + width - 5, gy);
        }
        
        // Activity indicator
        if (Math.sin(frameCount * chip.pulseRate) > 0.7) {
          ctx.fillStyle = colors.nodeActive + '80';
          ctx.fillRect(x + width - 15, y + 5, 10, 10);
        }
        break;
        
      case 'memory':
        // Memory bar patterns
        const barCount = Math.floor(width / 15);
        const barWidth = (width - 10) / barCount;
        
        for (let i = 0; i < barCount; i++) {
          const barHeight = 10 + Math.sin((frameCount * chip.activity) + i) * 5;
          const barX = x + 5 + i * barWidth;
          
          ctx.fillStyle = colors.chipDetail;
          ctx.fillRect(barX, y + height - 15 - barHeight, barWidth - 2, barHeight);
        }
        break;
        
      case 'controller':
        // Circular pattern
        ctx.beginPath();
        ctx.arc(x + width / 2, y + 3 * height / 4, height / 6, 0, Math.PI * 2);
        ctx.moveTo(x + width / 2, y + 3 * height / 4 - height / 6);
        ctx.lineTo(x + width / 2, y + 3 * height / 4 - height / 3);
        ctx.stroke();
        
        // Connection lines
        for (let i = 0; i < 4; i++) {
          const angle = (i / 4) * Math.PI * 2;
          ctx.moveTo(
            x + width / 2 + Math.cos(angle) * height / 6,
            y + 3 * height / 4 + Math.sin(angle) * height / 6
          );
          ctx.lineTo(
            x + width / 2 + Math.cos(angle) * height / 3,
            y + 3 * height / 4 + Math.sin(angle) * height / 3
          );
        }
        break;
        
      case 'io':
        // IO port patterns
        ctx.fillStyle = colors.chipDetail;
        
        // Input
        ctx.fillRect(x + 10, y + height / 4 - 5, width / 3, 10);
        
        // Output
        ctx.fillRect(x + width - 10 - width / 3, y + height / 4 - 5, width / 3, 10);
        
        // Activity indicators
        if (Math.sin(frameCount * chip.pulseRate + 0.5) > 0.7) {
          ctx.fillStyle = colors.nodeActive + '80';
          ctx.fillRect(x + 5, y + height - 15, 10, 10);
        }
        
        if (Math.sin(frameCount * chip.pulseRate) > 0.7) {
          ctx.fillStyle = colors.nodeAccent + '80';
          ctx.fillRect(x + width - 15, y + height - 15, 10, 10);
        }
        break;
        
      default:
        // Generic pattern
        ctx.fillStyle = colors.chipDetail;
        ctx.fillRect(x + width / 4, y + height * 0.6, width / 2, height * 0.2);
    }
    
    ctx.strokeStyle = colors.chipDetail;
    ctx.stroke();
  };

  // Draw a node with all effects
  const drawNode = (ctx, node, frameCount, colors) => {
    // Calculate pulse effect
    let scaleFactor = 1;
    
    if (node.isActive) {
      // Gentle pulsing effect
      scaleFactor = 0.8 + 0.2 * Math.sin(frameCount * node.pulseRate + node.pulsePhase);
      
      // Add extra pulse when node sends data
      if (frameCount - node.lastPulseTime < 20 && frameCount - node.lastPulseTime > 0) {
        const pulseSize = node.size * (1 + (frameCount - node.lastPulseTime) / 7);
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = node.color + '30';
        ctx.fill();
      }
    }
    
    // Draw node base
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.size * scaleFactor, 0, Math.PI * 2);
    ctx.fillStyle = node.isActive ? node.color : colors.nodeInactive;
    ctx.fill();
    
    // Draw node ring
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.size * 1.2 * scaleFactor, 0, Math.PI * 2);
    ctx.lineWidth = node.size * 0.15;
    ctx.strokeStyle = node.color + '40';
    ctx.stroke();
    
    // Add highlight
    ctx.beginPath();
    ctx.arc(
      node.x - node.size * 0.3 * scaleFactor, 
      node.y - node.size * 0.3 * scaleFactor, 
      node.size * 0.3 * scaleFactor, 
      0, Math.PI * 2
    );
    ctx.fillStyle = '#ffffff40';
    ctx.fill();
  };

  // Draw node glow separately for better performance
  const drawNodeGlow = (ctx, node, frameCount, colors) => {
    const scaleFactor = 0.8 + 0.2 * Math.sin(frameCount * node.pulseRate + node.pulsePhase);
    
    // Create glow effect with radial gradient
    const gradient = ctx.createRadialGradient(
      node.x, node.y, node.size * scaleFactor,
      node.x, node.y, node.size * 4 * scaleFactor
    );
    
    const glowColor = node.color === colors.nodeAccent ? colors.glowAccent : 
                     node.color === colors.nodePrimary ? colors.glowBright : colors.glowFaint;
    
    gradient.addColorStop(0, glowColor + '30');
    gradient.addColorStop(0.5, glowColor + '15');
    gradient.addColorStop(1, 'transparent');
    
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.size * 4 * scaleFactor, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.globalAlpha = node.glowIntensity * (0.5 + 0.5 * Math.sin(frameCount * node.pulseRate * 0.5));
    ctx.fill();
    ctx.globalAlpha = 1.0;
  };

  // Update and draw pulse objects
  const updateAndDrawPulses = (ctx, pulses, deltaTime, colors) => {
    return pulses.filter(pulse => {
      // Update progress
      pulse.progress += pulse.speed * deltaTime * (prefersReducedMotion ? 0.5 : 1);
      
      if (pulse.progress >= 1) {
        return false; // Remove completed pulses
      }
      
      if (pulse.path.length < 2) return false;
      
      // Interpolate position along path
      const pathLength = pulse.path.length;
      const exactIndex = pulse.progress * (pathLength - 1);
      const index1 = Math.floor(exactIndex);
      const index2 = Math.min(pathLength - 1, index1 + 1);
      const subProgress = exactIndex - index1;
      
      const x = pulse.path[index1].x + (pulse.path[index2].x - pulse.path[index1].x) * subProgress;
      const y = pulse.path[index1].y + (pulse.path[index2].y - pulse.path[index1].y) * subProgress;
      
      // Draw pulse
      ctx.globalAlpha = pulse.alpha;
      
      // Draw main pulse
      ctx.beginPath();
      ctx.arc(x, y, pulse.size, 0, Math.PI * 2);
      ctx.fillStyle = pulse.color;
      ctx.fill();
      
      // Draw halo
      ctx.beginPath();
      ctx.arc(x, y, pulse.size * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = pulse.color + '40';
      ctx.fill();
      
      // Draw tail if needed
      if (pulse.tail) {
        // Calculate points for tail
        const tailPoints = [];
        const tailLength = pulse.tailLength;
        
        for (let i = 1; i <= tailLength; i++) {
          const tailProgress = Math.max(0, pulse.progress - (i * 0.01));
          if (tailProgress <= 0) break;
          
          const tailExactIndex = tailProgress * (pathLength - 1);
          const tailIndex1 = Math.floor(tailExactIndex);
          const tailIndex2 = Math.min(pathLength - 1, tailIndex1 + 1);
          const tailSubProgress = tailExactIndex - tailIndex1;
          
          const tailX = pulse.path[tailIndex1].x + (pulse.path[tailIndex2].x - pulse.path[tailIndex1].x) * tailSubProgress;
          const tailY = pulse.path[tailIndex1].y + (pulse.path[tailIndex2].y - pulse.path[tailIndex1].y) * tailSubProgress;
          
          tailPoints.push({ x: tailX, y: tailY });
        }
        
        // Draw tail segments
        for (let i = 0; i < tailPoints.length; i++) {
          const tailFade = 1 - (i / tailPoints.length);
          const tailSize = pulse.size * tailFade * 0.9;
          
          ctx.beginPath();
          ctx.arc(tailPoints[i].x, tailPoints[i].y, tailSize, 0, Math.PI * 2);
          ctx.fillStyle = pulse.color + Math.floor(tailFade * 255).toString(16).padStart(2, '0');
          ctx.fill();
        }
      }
      
      ctx.globalAlpha = 1.0;
      return true;
    });
  };

  // Update and draw particle effects
  const updateAndDrawParticles = (ctx, particles, deltaTime) => {
    return particles.filter(particle => {
      // Update particle
      particle.x += particle.vx * deltaTime;
      particle.y += particle.vy * deltaTime;
      particle.life -= particle.decay * deltaTime;
      
      if (particle.life <= 0) {
        return false; // Remove dead particles
      }
      
      // Apply some drag
      particle.vx *= 0.98;
      particle.vy *= 0.98;
      
      // Draw particle
      ctx.globalAlpha = particle.alpha * particle.life;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
      ctx.globalAlpha = 1.0;
      
      return true;
    });
  };

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
      style={{ 
        width: "100vw", 
        height: "100vh",
        transition: "opacity 0.5s ease"
      }}
      aria-hidden="true"
    />
  );
};

// For backwards compatibility
export const StarBackground = CircuitBoard;