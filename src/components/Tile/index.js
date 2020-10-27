import React, { useMemo } from "react";

const Tile = (props) => {    
  const computeExpensiveValue = ({tileData, style}) => {
    let tileStyle = {...style, backgroundColor: tileData};
    return (
    <div
      className={`tile ${!tileData  ? "tile-empty" : ""}`}
      style={tileStyle}
    >
    </div>
  )};

  return useMemo(
    () => computeExpensiveValue(props),
    [props]
  );
};

export default Tile;