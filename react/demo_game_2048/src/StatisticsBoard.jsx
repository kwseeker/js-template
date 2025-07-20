import React from "react";
import { Box, Card, Typography } from "@mui/material";

const StatItem = ({ label, value }) => (
  <Box
    sx={{
      backgroundColor: "#bbada0",
      borderRadius: "8px",
      padding: "8px",
      minWidth: "80px",
      flexGrow: 1,
    }}
  >
    <Typography
      variant="subtitle1"
      sx={{
        color: "#eee4da",
        fontWeight: "bold",
        textTransform: "uppercase",
      }}
    >
      {label}
    </Typography>
    <Typography
      variant="h6"
      sx={{
        color: "white",
        fontWeight: "bold",
        lineHeight: 1,
      }}
    >
      {value}
    </Typography>
  </Box>
);

const StatisticsBoard = ({ score, bestScore, time, bestTime }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "16px",
        borderRadius: "8px",
      }}
    >
      <StatItem label="当前分数" value={score || 0} />
      <StatItem label="最高分数" value={bestScore || 0} />
      <StatItem label="游戏用时" value={time || "00:00"} />
      <StatItem label="最短用时" value={bestTime || "00:00"} />
    </Box>
  );
};

export default StatisticsBoard;
