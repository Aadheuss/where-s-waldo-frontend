import { useEffect, useState } from "react";
import styles from "./GameUI.module.css";
import skyResort from "/waldo-at-sky-resort.jpg";
import FloatingBox from "../floatingBox/FloatingBox";

const GameUI = () => {
  const [isBoxActive, setIsBoxActive] = useState(false);
  const [coord, setCoord] = useState({ x: null, y: null });
  const [imgDimension, setImgDimension] = useState({
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
    setImgDimension({
      ...imgDimension,
      width: e.target.clientWidth,
      height: e.target.clientHeight,
    });
    setIsBoxActive(true);
    console.log({ imgDimension, coord });
  }

  const [image, setImage] = useState(null);

  useEffect(() => {
    async function fetchImage() {
      // 66120130d8629c3cae7a2ff2
      // 6619fe540d3b850b470af171
      const result = await fetch(
        "http://localhost:3000/v1/image/66120130d8629c3cae7a2ff2"
      );
      const resultJSON = await result.json();
      const imageData = resultJSON.image;

      setImage(imageData);
    }

    fetchImage();

    return setImage(null);
  }, []);

  return (
    <div className={styles.gameUI}>
      <h1>Find waldo!</h1>
      <div className={styles.imgContainer}>
        {isBoxActive ? (
          <FloatingBox
            coord={{ coordX: coord.x, coordY: coord.y }}
            imgDimension={imgDimension}
            validArea={validArea}
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
