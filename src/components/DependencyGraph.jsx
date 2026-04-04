import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function DependencyGraph({ product, ecosystem, species }) {
  const svgRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!product || !ecosystem || !species || !containerRef.current) return;
    
    const width = containerRef.current.clientWidth || 800;
    const height = containerRef.current.clientHeight || 500;

    const nodes = [
      { id: product.name, type: 'product', label: product.name },
      { id: ecosystem.name, type: 'ecosystem', label: ecosystem.name },
      ...species.map(s => ({ id: s.common_name, type: 'species', label: s.common_name }))
    ];

    const links = [
      { source: product.name, target: ecosystem.name },
      ...species.map(s => ({ source: ecosystem.name, target: s.common_name }))
    ];

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    
    svg.attr("viewBox", [0, 0, width, height]);

    const sim = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-500))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide().radius(40));

    const colors = { 
      product: '#f59e0b',
      ecosystem: '#34d974',
      species: '#84cc16'
    };

    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#1e3a20')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,5');

    const nodeGroup = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(drag(sim));

    nodeGroup.append('circle')
      .attr('r', d => d.type === 'product' ? 30 : d.type === 'ecosystem' ? 24 : 16)
      .attr('fill', d => colors[d.type])
      .attr('stroke', '#0d1a0f')
      .attr('stroke-width', 3);

    nodeGroup.append('text')
      .text(d => d.label)
      .attr('x', 0)
      .attr('y', d => d.type === 'product' ? 45 : d.type === 'ecosystem' ? 40 : 30)
      .attr('text-anchor', 'middle')
      .attr('fill', '#e8f5e9')
      .attr('font-size', '12px')
      .attr('font-family', 'Inter, sans-serif')
      .attr('class', 'pointer-events-none drop-shadow-md');

    sim.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
        
      nodeGroup
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
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }
    
    return () => {
      sim.stop();
    };
  }, [product, ecosystem, species]);

  return (
    <div ref={containerRef} className='w-full h-full min-h-[500px]'>
      <svg ref={svgRef} className='w-full h-full cursor-grab active:cursor-grabbing' />
    </div>
  );
}
