a_star(grid) {
    let priority_queue = [];
    
    let visited = new Set();
    const numCols = grid.length;
    const numRows = grid[0].length;
    const maxDistance = 10000000000;
    const parentMap = new Map();
    let distances = [];
    let cellSize = 40;
    
    for(let i = 0;i < numCols;i++) {
      let rowDistances = new Array(numRows).fill(maxDistance);
      distances.push(rowDistances);
    }
    
    priority_queue.push({col : this.coord.x, row : this.coord.y, cost : 0});
    visited.add(`${this.coord.x}-${this.coord.y}`);
    distances[this.coord.x][this.coord.y] = 0;
    
    while(priority_queue.length > 0) {
      const { col, row, cost} = priority_queue.shift();
      
      if (row === this.target.y && col === this.target.x) {
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
        let terrain;
        
        if(!this.validCell(grid, newRow, newCol) || grid[newCol][newRow].type == 3) continue;
        
        let myPosX = cellSize/2 + cellSize*this.coord.x;
        let myPosY = cellSize/2 + cellSize*this.coord.y;
        
        if(grid[newCol][newRow].type == 0) {
          terrain = 1;
        } else if(grid[newCol][newRow].type == 1) {
          terrain = 2;
        } else if(grid[newCol][newRow].type == 2) {
          terrain = 3;
        } 
        
        let heuristic = abs(myPosX- this.target.x) + abs(myPosY - this.target.y);
        
        if (!visited.has(`${newCol}-${newRow}`) && terrain + heuristic + cost < distances[newCol][newRow] ) {
          distances[newCol][newRow] = terrain + heuristic + cost;
          priority_queue.push({col : newCol, row : newRow, cost : distances[newCol][newRow]});
          priority_queue.sort((a, b) => a.cost - b.cost )
          visited.add(`${newCol}-${newRow}`);
          parentMap.set(`${newCol}-${newRow}`, { col, row, direction: name });
        }
        
      }
      
    }
  }