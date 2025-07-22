import React from "react";
import { Button, ButtonGroup } from "@mui/material";

const ControlBoard = ({ onNewGame, onPauseResume, onUndo, isPaused }) => {
  console.log("ControlBoard rendered");

  return (
    <div className="items-left flex flex-col space-y-6 p-4">
      <ButtonGroup variant="contained" size="large" className="w-full max-w-md" fullWidth>
        <Button color="primary" onClick={onNewGame} className="py-3">
          新游戏
        </Button>
        <Button
          color={isPaused ? "success" : "warning"}
          onClick={onPauseResume}
          className="py-3"
        >
          {isPaused ? "继续游戏" : "暂停游戏"}
        </Button>
        <Button color="secondary" onClick={onUndo} className="py-3">
          上一步
        </Button>
      </ButtonGroup>

      <div className="text-sm text-blue-500">使用方向键或WASD移动方块</div>
    </div>
  );
};

export default ControlBoard;
