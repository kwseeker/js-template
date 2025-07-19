import { useState, useEffect } from "react";
import { Container, Typography, Stack } from "@mui/material";
import GameBoard from "./GameBoard";
import StatisticsBoard from "./StatisticsBoard";
import ControlBoard from "./ControlBoard";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const [bestTime, setBestTime] = useState(0);

  const handleNewGame = () => {
    setScore(0);
    setGameTime(0);
    setIsPaused(false);
    // 重置计时器会在useEffect中处理
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  // 游戏计时器效果
  useEffect(() => {
    let timer;
    if (!isPaused) {
      timer = setInterval(() => {
        setGameTime((prevTime) => {
          const newTime = prevTime + 1;
          // 更新最佳时间
          if (newTime < bestTime || bestTime === 0) {
            setBestTime(newTime);
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPaused, bestTime]);

  const handleUndo = () => {
    // TODO: 实现撤销逻辑
  };

  return (
    <Container maxWidth="md" className="app-container p-4">
      <Stack direction="column" spacing={3}>
        <Typography
          variant="h4"
          component="h1"
          className="text-center font-bold"
        >
          2048 游戏
        </Typography>

        <StatisticsBoard
          score={score}
          bestScore={bestScore}
          time={`${Math.floor(gameTime / 60)}:${(gameTime % 60)
            .toString()
            .padStart(2, "0")}`}
          bestTime={`${Math.floor(bestTime / 60)}:${(bestTime % 60)
            .toString()
            .padStart(2, "0")}`}
        />

        <GameBoard
          onScoreUpdate={(newScore) => {
            setScore(newScore);
            if (newScore > bestScore) {
              setBestScore(newScore);
            }
          }}
        />

        <ControlBoard
          onNewGame={handleNewGame}
          onPauseResume={handlePauseResume}
          onUndo={handleUndo}
          isPaused={isPaused}
        />
      </Stack>
    </Container>
  );
}

export default App;
