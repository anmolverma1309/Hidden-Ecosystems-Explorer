import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import data from '../data/code_dependencies.json';

export default function CodeReviewGraph() {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const width = containerRef.current.clientWidth || 800;
    const height = containerRef.current.clientHeight || 600;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    
    svg.attr("viewBox", [0, 0, width, height]);

    // Create a group for zoom/pan
    const g = svg.append('g');

    svg.call(d3.zoom()
      .extent([[0, 0], [width, height]])
      .scaleExtent([0.1, 8])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      }));

    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links).id(d => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide().radius(60));

    const colors = { 
      section: '#f59e0b', // Amber
      component: '#34d974', // Eco Green
      data: '#84cc16', // Lime
      utility: '#06b6d4' // Cyan
    };

    // Draw links
    const link = g.append('g')
      .attr('stroke', '#1f3d2a')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(data.links)
      .join('line')
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', d => d.target.id === 'App.jsx' ? '5,5' : '0');

    // Draw nodes
    const node = g.append('g')
      .selectAll('g')
      .data(data.nodes)
      .join('g')
      .attr('class', 'cursor-pointer pointer-events-auto')
      .call(drag(simulation))
      .on('click', (event, d) => setSelectedNode(d));

    // Outer glow for nodes
    node.append('circle')
      .attr('r', d => (d.type === 'section' ? 28 : 20))
      .attr('fill', d => colors[d.type])
      .attr('fill-opacity', 0.15)
      .attr('stroke', d => colors[d.type])
      .attr('stroke-width', 2)
      .attr('class', 'animate-pulse');

    // Main node circle
    node.append('circle')
      .attr('r', d => (d.type === 'section' ? 22 : 16))
      .attr('fill', d => colors[d.type])
      .attr('stroke', '#0d1a0f')
      .attr('stroke-width', 2);

    // Node labels
    node.append('text')
      .text(d => d.name)
      .attr('x', 0)
      .attr('y', 35)
      .attr('text-anchor', 'middle')
      .attr('fill', '#f0faf2')
      .attr('font-size', '10px')
      .attr('font-family', 'Inter, sans-serif')
      .attr('class', 'font-medium drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]');

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('transform', d => `translate(${d.x},${d.y})`);
    });

    function drag(simulation) {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }
      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }
      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }
      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }

    return () => simulation.stop();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full bg-forest-900 overflow-hidden border border-forest-border rounded-2xl shadow-2xl">
      <div className="absolute top-6 left-6 z-10 bg-forest-800/80 backdrop-blur-md p-4 rounded-xl border border-forest-border">
        <h3 className="text-eco-green font-serif text-xl mb-1">Code Ecosystem</h3>
        <p className="text-text-muted text-xs">A visual map of the project's internal dependencies.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {Object.entries({
            'Sections': '#f59e0b',
            'Components': '#34d974',
            'Data': '#84cc16',
            'Utils': '#06b6d4'
          }).map(([label, color]) => (
            <div key={label} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
              <span className="text-text-muted text-[10px] uppercase tracking-wider">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <svg ref={svgRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {selectedNode && (
        <div className="absolute bottom-6 right-6 z-10 bg-forest-800/90 backdrop-blur-lg p-6 rounded-2xl border border-eco-green/30 w-72 shadow-emerald-900/20 shadow-2xl">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-eco-green mb-1 block">File Registry</span>
              <h4 className="text-text-primary font-bold text-lg">{selectedNode.name}</h4>
            </div>
            <button 
              onClick={() => setSelectedNode(null)}
              className="text-text-muted hover:text-eco-green transition-colors"
            >
              ×
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-text-muted">Type:</span>
              <span className="text-text-secondary capitalize">{selectedNode.type}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-muted">Path:</span>
              <span className="text-text-secondary">/{selectedNode.id}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-muted">Impact:</span>
              <span className="text-text-secondary">High-Frequency Dependency</span>
            </div>
          </div>
          <div className="mt-6">
            <button className="w-full py-2 bg-eco-green/10 border border-eco-green/20 rounded-lg text-eco-green text-xs font-bold hover:bg-eco-green hover:text-forest-900 transition-all">
              Initialize Audit
            </button>
          </div>
        </div>
      )}

      {/* Decorative Forest Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-forest-900/40 to-transparent"></div>
    </div>
  );
}
