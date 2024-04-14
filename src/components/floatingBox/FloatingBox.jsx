import styles from "./FloatingBox.module.css";
import PropTypes from "prop-types";

const FloatingBox = ({ imgDimension, coord, validArea }) => {
  const leftPercentage =
    (coord.coordX / imgDimension.width - validArea / 2) * 100;
  const topPercentage =
    (coord.coordY / imgDimension.height -
      (validArea * (imgDimension.width / imgDimension.height)) / 2) *
    100;
  const left = `calc(calc(${leftPercentage}% - 3px))`;
  const top = `calc(calc(${topPercentage}% - 3px)`;
  const widthCSS = `${validArea * 100}%`;
  const heightCSS = `${
    validArea * (imgDimension.width / imgDimension.height) * 100
  }%`;

  console.log({ height: imgDimension.height });

  return (
    <div
      className={styles.floatingBox}
      style={{ top: top, left: left, height: heightCSS, width: widthCSS }}
    ></div>
  );
};

FloatingBox.propTypes = {
  imgDimension: PropTypes.objectOf(PropTypes.number),
  coord: PropTypes.objectOf(PropTypes.number),
  validArea: PropTypes.number,
};

export default FloatingBox;
