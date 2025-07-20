import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";

const GameBoard = () => {
  // 初始空棋盘数据
  const board = Array(4)
    .fill()
    .map(() => Array(4).fill(0));
  board[1][0] = 2; // 示例数据
  board[2][3] = 4; // 示例数据

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

  return (
    <Box
      sx={{
        padding: 3,
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#baada0",
        borderRadius: 2,
      }}
    >
      {/* spacing 设置元素行列间距 */}
      <Grid container spacing={2} sx={{ minWidth: 368, maxWidth: 432 }}>
        {board.flatMap((row, rowIndex) => (
          <Grid container size={12} spacing={2} key={rowIndex}>
            {row.map((cell, colIndex) => (
              <Grid size={3} key={`${rowIndex}-${colIndex}`} display="flex" justifyContent="center" alignItems="center" >
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
    </Box>
  );
};

export default GameBoard;
