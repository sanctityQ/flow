import './index.less';

import React, { Component, PropTypes } from 'react';

export default class Tree extends Component {
  constructor(props) {
    super(props);
  }

  loadjs(src, loadedCallback) {
    let doc = document;
    let head = doc.head || doc.getElementsByTagName('head')[0] || doc.documentElement;
    let node = doc.createElement('script');

    loadedCallback = loadedCallback || new Function();

    node.async = true;
    node.type = 'text/javascript';
    node.src = src;

    let onload = () => {
      node.onload = node.onerror = node.onreadystatechange = null;
      node = null;
      loadedCallback();
    };

    node.onreadystatechange = () => {
      if (/loaded|complete/.test(node.readyState)) {
        onload();
      }
    };

    node.onload = onload;

    head.appendChild(node);
  }

  componentWillMount() {
    this.loadjs('http://apps.bdimg.com/libs/d3/3.4.8/d3.min.js', this.renderLayer);
  }

  renderLayer() {
    const m = [20, 120, 20, 100];
    const w = 1280 - m[1] - m[3];
    const h = 800 - m[0] - m[2];

    let i = 0; 
    let root;

    let tree = d3.layout.tree()
      .size([h, w]);

    let diagonal = d3.svg.diagonal()
      .projection((d) => { return [d.y, d.x]; });

    // Toggle children.
    let toggle = (d) => {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
    };

    let update = (source) => {
      let duration = d3.event && d3.event.altKey ? 5000 : 500;

      // Compute the new tree layout.
      let nodes = tree.nodes(root).reverse();

      // Normalize for fixed-depth.
      nodes.forEach((d) => { d.y = d.depth * 180; });

      // Update the nodes…
      let node = vis.selectAll("g.node")
        .data(nodes, (d) => { return d.id || (d.id = ++i); });

      // Enter any new nodes at the parent's previous position.
      let nodeEnter = node.enter().append("svg:g")
        .attr("class", "node")
        .attr("transform", (d) => { return "translate(" + source.y0 + "," + source.x0 + ")"; })
        .on("click", (d) => { toggle(d); update(d); });

      nodeEnter.append("svg:circle")
        .attr("r", 1e-6)
        .style("fill", (d) => { return d._children ? "lightsteelblue" : "#fff"; });

      nodeEnter.append('a')
        .attr('xlink:href', (d) => {
          return d.url;
        })
        .append("svg:text")
        .attr("x", (d) => { return d.children || d._children ? -10 : 10; })
        .attr("dy", ".35em")
        .attr("text-anchor", (d) => { return d.children || d._children ? "end" : "start"; })
        .text((d) => { return d.name; })
        .style('fill', (d) => {
          return d.free ? 'black' : '#999';
        })
        .style("fill-opacity", 1e-6);

      nodeEnter.append("svg:title")
      .text((d) => {
        return d.description;
      });

      // Transition nodes to their new position.
      let nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", (d) => { return "translate(" + d.y + "," + d.x + ")"; });

      nodeUpdate.select("circle")
        .attr("r", 6)
        .attr("class", (d) => {return d.className})
        // .attr("class", (d) => { return d.id == 11 ? "target" : ""})
        .style("fill", (d) => { return d._children ? "lightsteelblue" : "#fff"; });

      nodeUpdate.select("text")
        .style("fill-opacity", 1);

      // Transition exiting nodes to the parent's new position.
      let nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", (d) => { return "translate(" + source.y + "," + source.x + ")"; })
        .remove();

      nodeExit.select("circle")
        .attr("r", 1e-6);

      nodeExit.select("text")
        .style("fill-opacity", 1e-6);

      // Update the links…
      let link = vis.selectAll("path.link")
        .data(tree.links(nodes), function(d) { return d.target.id; });

      // Enter any new links at the parent's previous position.
      link.enter().insert("svg:path", "g")
        .attr("class", "link")
        .attr("d", (d) => {
          let o = {x: source.x0, y: source.y0};
          return diagonal({source: o, target: o});
        })
        .transition()
        .duration(duration)
        .attr("d", diagonal);

      // Transition links to their new position.
      link.transition()
        .duration(duration)
        .attr("d", diagonal);

      // Transition exiting nodes to the parent's new position.
      link.exit().transition()
        .duration(duration)
        .attr("d", (d) => {
          let o = {x: source.x, y: source.y};
          return diagonal({source: o, target: o});
        })
        .remove();

      // Stash the old positions for transition.
      nodes.forEach((d) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    };

    let vis = d3.select("#content").append("svg:svg")
      .attr("width", w + m[1] + m[3])
      .attr("height", h + m[0] + m[2])
      .append("svg:g")
      .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

    d3.json('/api/tree', (json) => {
      root = json;
      root.x0 = h / 2;
      root.y0 = 0;

      let toggleAll = (d) => {
        if (d.children) {
          d.children.forEach(toggleAll);
          toggle(d);
        }
      }

      update(root);

    });
  }

  render() {
    return null;
  }
}