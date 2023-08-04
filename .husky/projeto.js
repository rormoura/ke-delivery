BFS(grid){
    console.log(`${this.curr_search} selected.`);
    
    let queue = [];
    let visited = new Set();
    const numCols = grid.length;
    const numRows = grid[0].length;
    const parentMap = new Map();
    
    queue.push({ col: this.coord.x, row: this.coord.y})
    visited.add(`${this.coord.x}-${this.coord.y}`);
    
    while (queue.length > 0) {
      const { col, row,} = queue.shift();
      
      if (row === this.target.y && col === this.target.x) {
        // Reconstruct the path from the target cell to the starting cell
        const path = [];
        let currCol = col;
        let currRow = row;

        while (currCol !== this.coord.x || currRow !== this.coord.y) {
          const parent = parentMap.get(`${currCol}-${currRow}`);
          path.unshift(parent.direction);
          currCol = parent.col;
          currRow = parent.row;
        }
        this.path = path;
        this.found = true;
      }
      
      for (const { dr, dc, name } of this.directions) {
        const newCol = col + dc;
        const newRow = row + dr;
        
        if (this.validCell(grid, newRow, newCol) && !visited.has(`${newCol}-${newRow}`)) {
          queue.push({ col: newCol, row: newRow });
          visited.add(`${newCol}-${newRow}`);
          parentMap.set(`${newCol}-${newRow}`, { col, row, direction: name });
        }
      }
    }
  }