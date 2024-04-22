import { useEffect, useState } from "react";
import styles from "./GameUI.module.css";
import skyResort from "/waldo-at-sky-resort.jpg";
import FloatingBox from "../floatingBox/FloatingBox";
import PuzzleList from "../puzzleList/PuzzleList";

const GameUI = () => {
  const [image, setImage] = useState(null);
  const [puzzles, setPuzzles] = useState(null);
  const [isBoxActive, setIsBoxActive] = useState(false);
  const [coord, setCoord] = useState({ x: null, y: null });
  const [imgDimension, setImgDimension] = useState({
    width: null,
    height: null,
  });
  const [imgOrgDimension, setOrgImageDimension] = useState({
    width: null,
    height: null,
  });
  const validArea = 1 / 20;

  function activateBox(e) {
    const parentOffsetX = e.target.parentElement.offsetLeft;
    const parentOffsetY = e.target.parentElement.offsetTop;
    const coordX = e.pageX - parentOffsetX;
    const coordY = e.pageY - parentOffsetY;

    setCoord({
      ...coord,
      x: coordX,
      y: coordY,
    });
    setOrgImageDimension({
      ...imgDimension,
      width: e.target.naturalWidth,
      height: e.target.naturalHeight,
    });
    setImgDimension({
      ...imgDimension,
      width: e.target.clientWidth,
      height: e.target.clientHeight,
    });
    setIsBoxActive(!isBoxActive);
  }

  useEffect(() => {
    async function fetchImages() {
      // 66120130d8629c3cae7a2ff2
      // 6619fe540d3b850b470af171
      const [imgResult, puzzlesResult] = await Promise.all([
        // fetch("http://localhost:3000/v1/image/66120130d8629c3cae7a2ff2")
        1,
        fetch(
          "http://localhost:3000/v1/image/66120130d8629c3cae7a2ff2/puzzles"
        ),
      ]);
      const [imgJSON, puzzlesJSON] = await Promise.all([
        // imgResult.json()
        imgResult,
        puzzlesResult.json(),
      ]);
      const imageData = imgJSON.image;

      console.log({ imgJSON, puzzlesJSON });
      !puzzlesJSON.error &&
        setPuzzles(
          puzzlesJSON.puzzles.map((puzzle) => {
            return { ...puzzle, status: false };
          })
        );
      !imgJSON.error && setImage(imgJSON.image);
    }

    fetchImages();

    return () => {
      setImage(null), setPuzzles(null);
    };
  }, []);

  return (
    <div className={styles.gameUI}>
      <h1>Find waldo!</h1>
      {puzzles !== null ? (
        <PuzzleList puzzles={puzzles} />
      ) : (
        <div> loading ...</div>
      )}
      <div className={styles.imgContainer}>
        {isBoxActive ? (
          <FloatingBox
            coord={{ coordX: coord.x, coordY: coord.y }}
            imgOrgDimension={imgOrgDimension}
            imgDimension={imgDimension}
            validArea={validArea}
            puzzles={puzzles}
            puzzlesOnClick={setPuzzles}
          />
        ) : null}
        <img
          onClick={activateBox}
          className={styles.img}
          src={skyResort}
          alt={"Where's Waldo sky resort"}
        />
      </div>
    </div>
  );
};

export default GameUI;
