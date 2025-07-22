const GRID_SIZE = 4;

let grid = Array(GRID_SIZE)
  .fill()
  .map(() => Array(GRID_SIZE).fill(0));

const printGrid = (grid) => {
  for (let i = 0; i < GRID_SIZE; i++) {
    const row = [...grid[i]];
    console.log(row);
  }
  console.log();
};

grid[0][0] = 2;
grid[1][1] = 4;
grid[1][2] = 4;
grid[2][0] = 8;
grid[2][1] = 4;
grid[2][2] = 2;
grid[2][3] = 2;
grid[3][0] = 2;
grid[3][1] = 4;
grid[3][2] = 2;
grid[3][3] = 4;

printGrid(grid);

const moveTiles = (grid, direction) => {
  const newGrid = grid.map((row) => [...row]);
  let moved = false;
  let scoreIncrease = 0;

  // Process movement based on direction
  const processCells = (cells) => {
    const nonZeroCells = cells.filter((val) => val !== 0);
    const mergedCells = [];

    for (let i = 0; i < nonZeroCells.length; i++) {
      if (
        i < nonZeroCells.length - 1 &&
        nonZeroCells[i] === nonZeroCells[i + 1]
      ) {
        mergedCells.push(nonZeroCells[i] * 2);
        scoreIncrease += nonZeroCells[i] * 2;
        i++;
      } else {
        mergedCells.push(nonZeroCells[i]);
      }
    }

    while (mergedCells.length < cells.length) {
      mergedCells.push(0);
    }

    return mergedCells;
  };

  if (direction === "left") {
    for (let i = 0; i < GRID_SIZE; i++) {
      const row = [...newGrid[i]];
      const processed = processCells(row);
      if (JSON.stringify(row) !== JSON.stringify(processed)) 
        moved = true;
      newGrid[i] = processed;
    }
  } else if (direction === "right") {
    for (let i = 0; i < GRID_SIZE; i++) {
      const row = [...newGrid[i]];
      const processed = processCells(row.reverse()).reverse();
      if (JSON.stringify(row) !== JSON.stringify(processed))
        moved = true;
      newGrid[i] = processed;
    }
  } else if (direction === "up") {
    for (let j = 0; j < GRID_SIZE; j++) {
      const column = newGrid.map((row) => row[j]);
      const processed = processCells(column);
      if (JSON.stringify(column) !== JSON.stringify(processed)) moved = true;
      processed.forEach((val, i) => (newGrid[i][j] = val));
    }
  } else if (direction === "down") {
    for (let j = 0; j < GRID_SIZE; j++) {
      const column = newGrid.map((row) => row[j]).reverse();
      const processed = processCells(column).reverse();
      if (JSON.stringify(column) !== JSON.stringify(processed.reverse()))
        moved = true;
      processed.forEach((val, i) => (newGrid[GRID_SIZE - 1 - i][j] = val));
    }
  }

  if (moved) {
    console.log("moved, score increase:", scoreIncrease);
  }

  return newGrid;
}

newGrid = moveTiles(grid, "left");
printGrid(newGrid);

newGrid = moveTiles(grid, "right");
printGrid(newGrid);

newGrid = moveTiles(grid, "up");
printGrid(newGrid);

newGrid = moveTiles(grid, "down");
printGrid(newGrid);
