import PropTypes from "prop-types";
import styles from "./PuzzleDropdown.module.css";
import { useState } from "react";

const PuzzleDropdown = ({
  puzzles,
  imgOrgDimension,
  imgDimension,
  coord,
  puzzlesOnClick,
}) => {
  function checkCoordinates(puzzle) {
    const puzzleCoordinates = puzzle.coordinates
      .split(",")
      .map((num) => Number(num));
    const widthRatio = imgOrgDimension.width / imgDimension.width;
    const heightRatio = imgOrgDimension.height / imgDimension.height;
    const processedCoordX = coord.coordX * widthRatio;
    const processedCoordY = coord.coordY * heightRatio;
    const coordXMinLimit =
      puzzleCoordinates[0] - (1 / 40) * imgOrgDimension.width;
    const coordXMaxLimit =
      puzzleCoordinates[0] + (1 / 40) * imgOrgDimension.width;
    const coordYMinLimit =
      puzzleCoordinates[1] - (1 / 40) * imgOrgDimension.height;
    const coordYMaxLimit =
      puzzleCoordinates[1] + (1 / 40) * imgOrgDimension.height;
    if (
      processedCoordX >= coordXMinLimit &&
      processedCoordX <= coordXMaxLimit &&
      processedCoordY >= coordYMinLimit &&
      processedCoordY <= coordYMaxLimit
    ) {
      console.log(puzzles);
      const puzzlesCopy = [...puzzles];
      const newPuzzleIndex = puzzles.findIndex(
        (item) => item.name === puzzle.name
      );
      puzzlesCopy[newPuzzleIndex].status = true;
      return puzzlesOnClick([...puzzlesCopy]);
    }

    console.log("Wrong!");
  }

  return (
    <ul className={styles.puzzleDropdown}>
      {puzzles.map((puzzle) => (
        <li key={puzzle.name}>
          <button
            className={(styles.btn, puzzle.status ? styles.solved : "")}
            onClick={!puzzle.status ? () => checkCoordinates(puzzle) : null}
          >
            <div className={styles.imgContainer}>
              <img className={styles.img} src={puzzle.image} />
            </div>
            <p className={styles.p}>{puzzle.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
};

PuzzleDropdown.propTypes = {
  puzzles: PropTypes.arrayOf(PropTypes.object),
  imgOrgDimension: PropTypes.objectOf(PropTypes.number),
  imgDimension: PropTypes.objectOf(PropTypes.number),
  coord: PropTypes.objectOf(PropTypes.number),
};

export default PuzzleDropdown;
