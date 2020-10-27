import React from "react";

const ControlPanel = (props) => {
  return (
    <div className="game-control-panel">
      <div>
        <button onClick={props.onReset} disabled={props.resetDisabled} className={props.resetDisabled ? "disabled" : ""}>
          {props.isFinished ? "Play Again" : "Reset"}
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;