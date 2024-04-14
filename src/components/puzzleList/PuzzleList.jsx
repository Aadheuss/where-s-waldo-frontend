import PropTypes from "prop-types";
import styles from "./PuzzleList.module.css";

const PuzzleList = ({ puzzles }) => {
  console.log(puzzles);
  return (
    <ul className={styles.puzzleList}>
      {puzzles.map((puzzle) => (
        <li key={puzzle.name}>
          <div className={styles.imgContainer}>
            <img className={styles.img} src={puzzle.image} />
          </div>
          <p>{puzzle.name}</p>
        </li>
      ))}
    </ul>
  );
};

PuzzleList.propTypes = {
  puzzles: PropTypes.arrayOf(PropTypes.object),
};

export default PuzzleList;
