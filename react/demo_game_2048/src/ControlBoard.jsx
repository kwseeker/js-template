import React from "react";
import { Button, ButtonGroup } from "@mui/material";

const ControlBoard = ({ onNewGame, onPauseResume, onUndo, gameState }) => {
  console.log("ControlBoard rendered");

  return (
    <div className="items-left flex flex-col space-y-6 p-4">
      <ButtonGroup variant="contained" size="large" className="w-full max-w-md" fullWidth>
        <Button color="primary" onClick={onNewGame} className="py-3">
          新游戏
        </Button>
        <Button
          color={gameState === 'paused' ? "success" : "warning"}
          onClick={onPauseResume}
          className="py-3"
        >
          {gameState === "paused" ? "继续游戏" : "暂停游戏"}
        </Button>
        <Button
          color={gameState === 'ongoing' ? "secondary" : "disabled"}
          onClick={onUndo}
          className="py-3"
        >
          上一步
        </Button>
      </ButtonGroup>

      <div className="text-sm text-blue-500">使用方向键移动方块，悔棋只能返回到上一步</div>
    </div>
  );
};

export default ControlBoard;
