import React, { useEffect, useRef } from 'react';

interface Node {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  lines: string[];
  isQuestion: boolean;
  pairId: number;
}

const QA_PAIRS = [
  { q: ["Who's gonna win", "the elections?"], a: ["The", "Republicans"] },
  { q: ["What is the", "future of AI?"], a: ["Agentic", "Workflows"] },
  { q: ["Will interest", "rates drop?"], a: ["Expected in", "Q3 2026"] },
  { q: ["Best tech", "stack?"], a: ["React &", "Tailwind"] },
  { q: ["Is crypto", "bouncing back?"], a: ["Bitcoin hits", "new ATH"] },
  { q: ["Mars mission", "status?"], a: ["Crewed launch", "in 2032"] },
  { q: ["Renewable", "energy?"], a: ["Solar dominates", "grid"] },
  { q: ["Next big", "breakthrough?"], a: ["Quantum", "Supremacy"] },
];

export const NeuralNetwork: React.FC<{ className?: string }> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let nodes: Node[] = [];
    let animationFrameId: number;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = parent.clientWidth * dpr;
        canvas.height = parent.clientHeight * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = `${parent.clientWidth}px`;
        canvas.style.height = `${parent.clientHeight}px`;
      }
    };

    const init = () => {
      resize();
      nodes = [];
      const parent = canvas.parentElement;
      if (!parent) return;
      
      QA_PAIRS.forEach((pair, index) => {
        // Random center for the pair
        const cx = Math.random() * (parent.clientWidth - 200) + 100;
        const cy = Math.random() * (parent.clientHeight - 200) + 100;

        // Question Node
        nodes.push({
          id: index * 2,
          x: cx - 60,
          y: cy - 60,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          width: Math.max(...pair.q.map(l => l.length)) * 7.5 + 30,
          height: pair.q.length * 18 + 24,
          lines: pair.q,
          isQuestion: true,
          pairId: index
        });

        // Answer Node
        nodes.push({
          id: index * 2 + 1,
          x: cx + 60,
          y: cy + 60,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          width: Math.max(...pair.a.map(l => l.length)) * 7.5 + 30,
          height: pair.a.length * 18 + 24,
          lines: pair.a,
          isQuestion: false,
          pairId: index
        });
      });
    };

    const draw = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      ctx.clearRect(0, 0, parent.clientWidth, parent.clientHeight);
      
      // Physics update
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off walls safely
        if (node.x < 0) { node.x = 0; node.vx *= -1; }
        if (node.x > parent.clientWidth) { node.x = parent.clientWidth; node.vx *= -1; }
        if (node.y < 0) { node.y = 0; node.vy *= -1; }
        if (node.y > parent.clientHeight) { node.y = parent.clientHeight; node.vy *= -1; }
      });

      // Spring force between pairs to keep them somewhat together
      for (let i = 0; i < QA_PAIRS.length; i++) {
        const qNode = nodes.find(n => n.pairId === i && n.isQuestion);
        const aNode = nodes.find(n => n.pairId === i && !n.isQuestion);
        if (qNode && aNode) {
          const dx = aNode.x - qNode.x;
          const dy = aNode.y - qNode.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const targetDist = 180;
          if (dist > targetDist) {
            const force = (dist - targetDist) * 0.0003;
            qNode.vx += (dx / dist) * force;
            qNode.vy += (dy / dist) * force;
            aNode.vx -= (dx / dist) * force;
            aNode.vy -= (dy / dist) * force;
          }
        }
      }

      // Draw connections
      ctx.lineWidth = 1.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 300) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            
            if (nodes[i].pairId === nodes[j].pairId) {
              // Stronger, dashed line for paired nodes
              ctx.strokeStyle = `rgba(15, 23, 42, ${(1 - distance / 300) * 0.5})`;
              ctx.setLineDash([6, 6]);
            } else {
              // Faint solid line for random nearby nodes
              ctx.strokeStyle = `rgba(15, 23, 42, ${(1 - distance / 300) * 0.1})`;
              ctx.setLineDash([]);
            }
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.roundRect(node.x - node.width / 2, node.y - node.height / 2, node.width, node.height, 12);
        
        // Shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
        ctx.shadowBlur = 12;
        ctx.shadowOffsetY = 4;
        
        // Fill
        ctx.fillStyle = node.isQuestion ? '#ffffff' : '#22c55e';
        ctx.fill();
        
        // Reset shadow for stroke and text
        ctx.shadowColor = 'transparent';
        
        // Stroke
        ctx.strokeStyle = node.isQuestion ? '#cbd5e1' : '#16a34a';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Draw text
        ctx.fillStyle = node.isQuestion ? '#0f172a' : '#ffffff';
        ctx.font = node.isQuestion ? 'bold 12px "Roboto Mono"' : 'bold 12px "Roboto Mono"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const startY = node.y - ((node.lines.length - 1) * 18) / 2;
        node.lines.forEach((line, idx) => {
          ctx.fillText(line, node.x, startY + idx * 18);
        });
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    init();
    draw();

    window.addEventListener('resize', init);

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
};
