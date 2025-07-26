import { useState, useEffect } from "react";
import { Container, Typography, Stack } from "@mui/material";
import GameBoard from "./GameBoard";
import StatisticsBoard from "./StatisticsBoard";
import ControlBoard from "./ControlBoard";
import "./App.css";
import { tickToTime } from "./utils";

function App() {
  const [boardKey, setBoardKey] = useState(0);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  // 开始新游戏重置计时器
  // 游戏结束后停止计时器，如果是成功结束判断是否是历史最佳时间
  // 点击暂停案件暂停计时器，再次点击恢复计时器
  const [gameTime, setGameTime] = useState(0);
  const [bestTime, setBestTime] = useState(0);
  // 'ongoing' or 'paused' or 'succeed' or 'failed'
  const [gameState, setGameState] = useState('ongoing');
  const [history, setHistory] = useState([]);
  const [board, setBoard] = useState([]); 

  console.log("---> App rendered");

  const initBestRecord = () => {
    const savedBestScore = localStorage.getItem('2048GameBestScore');
    let prevBestScore = savedBestScore ? parseInt(savedBestScore) : 0;
    setBestScore(prevBestScore);
    const savedBestTime = localStorage.getItem('2048GameBestTime');
    let prevBestTime = savedBestTime ? parseInt(savedBestTime) : 0;
    setBestTime(prevBestTime);
    console.log("---> init best record: ", prevBestScore, prevBestTime);
  }

  useEffect(() => {
    initBestRecord();
  }, []);

  const handleNewGame = () => {
    setBoardKey((prevKey) => prevKey + 1);
    setScore(0);
    setGameTime(0);
    setHistory([]);
    initBestRecord();
    setGameState('ongoing');
  };

  const saveGameHistory = (currentBoard) => {
    setHistory(prev => [...prev, { board: [...currentBoard.map(row => [...row])], score }]);
  };

  const restoreGameState = (state) => {
    setBoard(state.board);
    setScore(state.score);
  };

  const handlePauseResume = () => {
    // 只是暂停或恢复计时器计时
    if (gameState === 'ongoing') {
      setGameState('paused');
    } else if (gameState === 'paused') {
      setGameState('ongoing');
    }
  };

  useEffect(() => {
    console.log('---> gameState: ', gameState);
    // 游戏结束时，检查是否创建新纪录
    if (gameState === 'succeed') {
      console.log("prev record: ", bestScore, bestTime);
      if (score > bestScore) {
        setBestScore(score);
        localStorage.setItem('2048GameBestScore', score);
      }
      if (gameTime < bestTime || bestTime === 0) {
        setBestTime(gameTime);
        localStorage.setItem('2048GameBestTime', gameTime);
      }
    }

    let timer;
    if (gameState === 'ongoing') {
      // 每秒更新一次用时
      timer = setInterval(() => {
        setGameTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState]);

  const handleUndo = () => {
    if (gameState === 'ongoing' && history.length > 0) {
      const lastState = history.pop();
      restoreGameState(lastState);
      setHistory([...history]);
    }
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
          time={tickToTime(gameTime)}
          bestTime={tickToTime(bestTime)}
        />

        {/* 通过 key 值的改变， 每次重新渲染 GameBoard 组件都是一个全新的组件，不改变 key 的话，"新游戏" 无法重置棋盘， 因为 initGame() 方法未改变，不会重新初始化棋盘*/}
        <GameBoard
          key={boardKey}
          score={score}
          setScore={setScore}
          bestScore={bestScore}
          gameTime={gameTime}
          gameState={gameState}
          setGameState={setGameState}
          handleNewGame={handleNewGame}
          board={board}
          setBoard={setBoard}
          saveGameHistory={saveGameHistory}
        />

        <ControlBoard
          onNewGame={handleNewGame}
          onPauseResume={handlePauseResume}
          onUndo={handleUndo}
          gameState={gameState}
        />
      </Stack>
    </Container>
  );
}

export default App;
