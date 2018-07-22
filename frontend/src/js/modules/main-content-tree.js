var MainContent = (function(){

    // ************** Generate the tree diagram	 *****************
    var height_size = window.innerHeight; 
    var margin = {top: 20, right: 120, bottom: 20, left: 120},
          width = 960 - margin.right - margin.left,
          height = height_size - margin.top - margin.bottom;
        
    var i = 0,
        duration = 750,
        root;
    
    var svg = d3.select("#area2").append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      
    var force = d3.layout.force()
        .size([width, height])
        .on("tick", tick);
    
    var link = svg.selectAll("path.link"),
        node = svg.selectAll("g.node");
    
    var tree = d3.layout.tree()
        .size([height, width]);
    
    var diagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.y, d.x]; });
    
    
    d3.json("data/entidades.json", function(error, DEF) {
      root = DEF;
      root.x0 = height / 2;
      root.y0 = 0;
    
      function collapse(d) {
        if (d.children) {
          d._children = d.children;
          d._children.forEach(collapse);
          d.children = null;
        }
      }
      
      root.children.forEach(collapse);
      update(root);
    });
    
    d3.select(self.frameElement).style("height", height);
    
    function update(source) {
      var nodes = flatten(root),
          links = d3.layout.tree().links(nodes);
    
      var tip = d3.select("body")
        .append("div")
        .attr("class", "tip");
    
        tip.show = function(d){
          var posX = d3.event.pageX,
              posY = d3.event.pageY - 20; // right: -10
    
          var html = "",
              type = d.type;
    
          html += d.name;
    
          if(type) {
            html += ": <p>" + type[0].toUpperCase() + type.substr(1).replace(/_/g, ' ') + "</p>";
          }
          tip.html(html);
    
          // Tooltip to the left if it gets out of the window
          var tipBox = tip.node().getBoundingClientRect();
          if(posX + tipBox.width > window.innerWidth) {
            posX -= tipBox.width + 10;
          } else {
            posX += 10;
          }
          tip.attr('style', `visibility: visible; left: ${posX}px; top: ${posY}px`);
        };
        tip.hide = function(){
          tip.style("visibility", "hidden");
        }
    
      // Compute the new tree layout.
      
    
      // Restart the force layout.
      force
          .nodes(nodes)
          .links(links)
          .start();
    
      // Normalize for fixed-depth.
      nodes.forEach(function(d) { d.y = d.depth * 180; });
    
      // Update the nodes…
      node = node.data(nodes, function(d) { return d.id || (d.id = ++i); });
    
      // Enter any new nodes at the parent's previous position.
      var nodeEnter = node.enter().append("g")
          .attr("class", "node")
          .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
          .on("click", click); 
    
      nodeEnter.append("circle")
          .attr("r", 1e-6)
        .attr("id", function(d){return "node" + d.id;})
          .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; })
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide)
        .call(force.drag);
    
      nodeEnter.append("text")
          .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
          .attr("dy", ".35em")
          .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
          .text(function(d) { return d.name; })
          .style("fill-opacity", 1e-6);
    
      // Transition nodes to their new position.
      var nodeUpdate = node.transition()
          .duration(duration)
          .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });  
    
      nodeUpdate.select("circle")
          .attr("r", 4.5)
          .style("fill", function(d) { 
          return d._children ? "lightsteelblue" : "#fff";       
        });
    
      nodeUpdate.select("text")
          .style("fill-opacity", 1);
      
      // Transition exiting nodes to the parent's new position.
      var nodeExit = node.exit().transition()
          .duration(duration)
          .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
          .remove();
    
      nodeExit.select("circle")
          .attr("r", 1e-6);
    
      nodeExit.select("text")
          .style("fill-opacity", 1e-6);
    
      // Update the links…
      link = link.data(links, function(d) { return d.target.id;});
     
      // Enter any new links at the parent's previous position.
      link.enter().insert("path", "g")
          .attr("class", "link")
        .attr("id", function(d){ return ("link" + d.source.id + "-" + d.target.id)})
          .attr("d", function(d) {
            var o = {x: source.x0, y: source.y0};
            return diagonal({source: o, target: o});
          });
    
      // Transition links to their new position.
      link.transition()
          .duration(duration)
          .attr("d", diagonal);
    
      // Transition exiting nodes to the parent's new position.
      link.exit().transition()
          .duration(duration)
          .attr("d", function(d) {
          var o = {x: source.x, y: source.y};
          return diagonal({source: o, target: o});
          })
          .remove();
    
      // Stash the old positions for transition.
      nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    
    }
    
    function tick() {
      link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });
    
      node.attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; });
    }
    
    
    // Toggle children on click.
    function click(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;     
      } else {
        d.children = d._children;
      // console.log(d._children)
        d._children = null;  
      }
      update(d);
      d3.selectAll("circle").style("fill", "white");
          d3.selectAll("path").style("stroke", "#c3c3c3");
          while (d.parent) {
            d3.selectAll("#node"+d.id).style("fill", "red")
            if (d.parent != "null")
              d3.selectAll("#link"+d.parent.id + "-" + d.id).style("stroke", "red")
              d = d.parent;
          }  
    }
    
    function flatten(root) {
      var nodes = [], i = 0;
    
      function recurse(node) {
        if (node.children) node.children.forEach(recurse);
        if (!node.id) node.id = ++i;
        nodes.push(node);
      }
    
      recurse(root);
      return nodes;
    }
     
    })();
    