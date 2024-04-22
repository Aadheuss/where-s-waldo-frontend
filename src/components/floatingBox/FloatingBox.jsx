import styles from "./FloatingBox.module.css";
import PropTypes from "prop-types";
import PuzzleDropdown from "../puzzleDropdown/PuzzleDropdown";

const FloatingBox = ({
  imgOrgDimension,
  imgDimension,
  coord,
  validArea,
  puzzles,
  puzzlesOnClick,
}) => {
  const leftPercentage =
    (coord.coordX / imgDimension.width - validArea / 2) * 100;
  const topPercentage =
    (coord.coordY / imgDimension.height -
      (validArea * (imgDimension.width / imgDimension.height)) / 2) *
    100;
  const left = `calc(calc(${leftPercentage}% - 3px))`;
  const top = `calc(calc(${topPercentage}% - 3px)`;
  const width = validArea * 100;
  const widthCSS = `${width}%`;
  const heightCSS = `${
    validArea * (imgDimension.width / imgDimension.height) * 100
  }%`;

  return (
    <>
      <div
        className={styles.floatingBox}
        style={{ top: top, left: left, height: heightCSS, width: widthCSS }}
      ></div>
      {puzzles ? (
        <PuzzleDropdown
          puzzles={puzzles}
          imgOrgDimension={imgOrgDimension}
          coord={coord}
          imgDimension={imgDimension}
          puzzlesOnClick={puzzlesOnClick}
        />
      ) : (
        <div>loading</div>
      )}
    </>
  );
};

FloatingBox.propTypes = {
  puzzles: PropTypes.arrayOf(PropTypes.object),
  imgOrgDimension: PropTypes.objectOf(PropTypes.number),
  imgDimension: PropTypes.objectOf(PropTypes.number),
  coord: PropTypes.objectOf(PropTypes.number),
  validArea: PropTypes.number,
  puzzlesOnClick: PropTypes.func,
};

export default FloatingBox;
