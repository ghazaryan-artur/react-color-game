import React from "react";

const InfoPanel = (props) => {
  if (props.isFinished) {
    return (
      <div className="game-info-panel">
        <div>You won!</div>
        <div>Steps: {props.stepCount}</div>
      </div>
    );
  }

  if (props.invalidMove) {
    return (
      <div className="game-info-panel">
        <div>Invalid move</div>
        <div>Steps: {props.stepCount}</div>
      </div>
    );
  }



  return (
    <div className="game-info-panel">
      <div>Steps: {props.stepCount}</div>
    </div>
  );
};

export default InfoPanel;