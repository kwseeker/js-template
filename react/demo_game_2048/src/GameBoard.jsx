import React, { useEffect, useCallback, useState } from "react";
import { Grid, Paper, Typography, Box, Button } from "@mui/material";
import { tickToTime } from "./utils";

const GRID_SIZE = 4; 
const GAME_TARGET = 2048;

const GameBoard = ({ score, setScore, bestScore, gameTime, gameState, setGameState, handleNewGame, 
  board, setBoard, saveGameHistory, restoreGameState}) => {
  console.log("GameBoard rendered");

  // 保存游戏棋盘数据
  // const [board, setBoard] = useState(
  //   Array(GRID_SIZE)
  //     .fill()
  //     .map(() => Array(GRID_SIZE).fill(0)),
  // );
  const [newRecord, setNewRecord] = useState(false);

  // TODO 这里的函数必须被封装到的 useCallback 中否则会报错 ?
  const initGame = useCallback(() => {
    console.log("Initializing game board...");

    const newBoard = Array(GRID_SIZE)
      .fill()
      .map(() => Array(GRID_SIZE).fill(0));
    // 测试
    newBoard[3][0] = 1024;
    newBoard[3][1] = 512;
    newBoard[3][2] = 256;
    newBoard[3][3] = 128;
    newBoard[2][3] = 64;
    newBoard[2][2] = 32;
    newBoard[2][1] = 16;
    newBoard[2][0] = 8;
    // 在两个随机位置添加初始数字
    addRandomTile(newBoard);
    addRandomTile(newBoard);
    setBoard(newBoard);
    setNewRecord(false);
  }, [setScore]); // setScore 只有在 App 插件重建时才会不同

  // 先查找可用的空格,然后随机选择一个位置放置新数字(2或4)
  const addRandomTile = (grid) => {
    const emptyCells = [];
    grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === 0) emptyCells.push([i, j]);
      });
    });

    if (emptyCells.length > 0) {
      const [i, j] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      grid[i][j] = Math.random() < 0.85 ? 2 : 4;
    }
  };

  useEffect(() => {
    initGame();
  }, [initGame]); //每个对象的 initGame 都一样，通过这种方式实现了组件仅初始化一次

  // 根据数值获取对应的背景色
  const getTileColor = (value) => {
    const colors = {
      // 0: "#f5f5f5", // 浅灰色
      0: "#ccc0b4",
      2: "#fff8e1", // 琥珀色100
      4: "#ffecb3", // 琥珀色200
      8: "#ffe0b2", // 橙色300
      16: "#ffb74d", // 橙色400
      32: "#ef5350", // 红色400
      64: "#e53935", // 红色500
      128: "#ffd54f", // 琥珀色300
      256: "#ffca28", // 琥珀色400
      512: "#ffc107", // 琥珀色500
      1024: "#ffb300", // 琥珀色600
      2048: "#ffa000", // 琥珀色700
    };
    return colors[value] || "#e0e0e0"; // 默认灰色300
  };

  // 移动棋子并合此方向上相邻的相同的数字
  const moveTiles = (direction) => {
    if (gameState === 'paused' || gameState === 'succeed' || gameState === 'failed') 
      return;

    const newGrid = board.map((row) => [...row]);
    let moved = false;
    let scoreIncrease = 0;

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

    // 游戏结束
    // 游戏成功：出现 2048 砖块
    // 游戏失败：没有空格且没有相邻的相同数字
    const checkGameOver = (grid) => {
      // 检查游戏成功：出现2048方块
      const hasWon = grid.some(row => row.includes(GAME_TARGET));
      if (hasWon) {
        let currentScore = score + scoreIncrease
        console.log("won! current score: ", currentScore);
        setGameState('succeed');
        // 检查并更新最高分, TODO 这个应该可以移动到 App.jsx 中
        if (currentScore > bestScore) {
          setNewRecord(true);
        }
        return;
      }

      // 检查游戏失败：没有空格且没有相邻的相同数字
      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          if (grid[i][j] === 0) return false;
        }
      }

      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          if (j < GRID_SIZE - 1 && grid[i][j] === grid[i][j + 1]) return false;
          if (i < GRID_SIZE - 1 && grid[i][j] === grid[i + 1][j]) return false;
        }
      }

      setGameState('failed');
    };

    if (moved) {
      // 保存移动前的状态
      saveGameHistory(board);
      addRandomTile(newGrid);
      setBoard(newGrid);
      console.log('scoreIncrease: ', scoreIncrease);
      setScore((prev) => prev + scoreIncrease);

      checkGameOver(newGrid);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        const direction = e.key.replace("Arrow", "").toLowerCase();
        moveTiles(direction);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    console.log("key bound!");
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      console.log("key unbound!")
    }
  }, [board, gameState]); // TODO 为何在每次 board 改变时都要重新绑定事件 

  return (
    <Box
      sx={{
        padding: 3,
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#baada0",
        borderRadius: 2,
        position: 'relative',
      }}
    >
      {/* spacing 设置元素行列间距 */}
      <Grid container spacing={2} sx={{ minWidth: 368, maxWidth: 432 }}>
        {board.flatMap((row, rowIndex) => (
          <Grid container size={12} spacing={2} key={rowIndex}>
            {row.map((cell, colIndex) => (
              <Grid
                size={3}
                key={`${rowIndex}-${colIndex}`}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Paper
                  elevation={3}
                  sx={{
                    width: { xs: 80, md: 96 },
                    height: { xs: 80, md: 96 },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 2,
                    backgroundColor: getTileColor(cell),
                  }}
                >
                  {cell !== 0 && (
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: "bold", color: "#424242" }}
                    >
                      {cell}
                    </Typography>
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>

      {(gameState === "succeed" || gameState === "failed" || gameState === "paused") && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2,
            zIndex: 10,
          }}
        >
          <Box
            sx={{
              backgroundColor: 'white',
              padding: 4,
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4">
              {gameState === 'succeed' ? '恭喜你赢了' : gameState === 'failed' ? '游戏失败' : '已暂停'}
            </Typography>
            {gameState !== 'paused' && (
              <>
                {gameState === 'succeed' && (
                  <Typography variant="h5" sx={{ mt: 2 }}>
                    {newRecord ? '新记录！' : '得分:'} {score} {', 用时:'} {tickToTime(gameTime)}
                  </Typography>
                )}
                {gameState === 'failed' && (
                  <Typography variant="h5" sx={{ mt: 2 }}>
                    最终得分：{score}
                  </Typography>
                )}
                <Button variant="contained" sx={{ mt: 2 }} onClick={handleNewGame}>
                  再来一局
                </Button>
              </>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default GameBoard;
