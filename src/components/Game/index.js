import React, { useState, useEffect } from "react";
import { cloneArray, generateRenderData } from "../../helpers";
import ControlPanel from "../ControlPanel";
import InfoPanel from "../InfoPanel";
import Tile from "../Tile";
import TileContainer from "../TileContainer";

const Game = (props) => {
  const [step, setStep] = useState(0);
  const [colors, setColors] = useState();
  const [selectedTile, setSelectedTile] = useState();
  const [beforeClickedTiles, setBeforeClickedTiles] = useState();
  const [finished, setFinished] = useState(false);
  const [invalidMove, setInvalidMove] = useState(false);

  const { maxCount } = props.data;

  useEffect(() => {
    if (props.data && props.data.colors) setColors(props.data.colors);
  }, [props.data]);

  useEffect(() => {
    if (!selectedTile && colors) {
      let status = true;
      colors.forEach((columnArr) => {
        // const colorArr = tilesArr.map((tile) => tile.colorCode);
        if (columnArr.length) {
          if (columnArr.length === maxCount) {
            const colorSet = new Set(columnArr);
            if (colorSet.size !== 1) {
              status = false;
            }
            return;
          }
          status = false;
        }
      });

      if (status) {
        setFinished(true);
      }
    }
  }, [selectedTile, colors, maxCount]);

  const handleTileClick = (index) => {
    if (finished) return;
    const tilesClone = cloneArray(colors);
    const clickedTilesArray = tilesClone[index];
    const clickedTile = clickedTilesArray[clickedTilesArray.length - 1];
    if (!selectedTile) {
      setBeforeClickedTiles(colors);
      clickedTilesArray.pop();
      setSelectedTile(clickedTile);
      setColors(tilesClone);      
      setStep(step + 1);
      return;
    }
    if (selectedTile) {
      if (
        clickedTilesArray.length < maxCount &&
        (!clickedTile || clickedTile === selectedTile)
      ) {
        clickedTilesArray.push(selectedTile);
        setSelectedTile();
        setColors(tilesClone);
        setInvalidMove(false);
        return;
      }
      setInvalidMove(true);
    }
  };

  const handleSelectedTileClick = () => {
    if (selectedTile) {
      setSelectedTile();
      setColors(beforeClickedTiles);
      setInvalidMove(false);
    }
  };

  const handleReset = () => {
    setColors(props.data.colors);
    setSelectedTile();
    setBeforeClickedTiles();
    setFinished(false);
    setInvalidMove(false);
    setStep(0);
  };



  const data = colors && generateRenderData(colors, maxCount);
  return (
    <div className="game">
      <div className="game-panel-container">
        <InfoPanel
          isFinished={finished}
          invalidMove={invalidMove}
          stepCount={step}
        />
            {!finished && (
        <div
          className="tile-selected-container"
          onClick={handleSelectedTileClick}
        >
          {selectedTile && (
            <Tile tileData={selectedTile} />
          )}
        </div>
      )}
        <ControlPanel
          isFinished={finished}
          onReset={handleReset}
          resetDisabled={step === 0}
        />
      </div>
  
      <div className="game-container">
        {data &&
          data.map((tiles, i) => (
            <TileContainer
              key={i}
              index={i}
              tiles={tiles}
              onTileClick={handleTileClick}
            />
          ))}
      </div>
    </div>
  );
};

export default Game;