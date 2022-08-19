import { useEffect, useState } from "react";
import { Box } from "./Box";

function createArray() {
  let index = 1;
  let array = [];
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
      array.push([i, j, index++, false, "empt"]);
    }
  }
  for (let i = 0; i < 10; i++) {
    let y = Math.floor(Math.random() * 255);
    array[y][4] = "bomb";
  }
  for (let i = 0; i < 256; i++) {
    let bombsAround = 0;
    let row = array[i][0];
    let col = array[i][1];
    if (col - 1 >= 0 && array[i][4] !== "bomb") {
      if (array[i - 1][4] === "bomb") {
        bombsAround++;
      }
    }
    if (col + 1 <= 15 && array[i][4] !== "bomb") {
      if (array[i + 1][4] === "bomb") {
        bombsAround++;
      }
    }
    if (row + 1 <= 15 && array[i][4] !== "bomb") {
      if (array[i + 16][4] === "bomb") {
        bombsAround++;
      }
    }
    if (row - 1 >= 0 && array[i][4] !== "bomb") {
      if (array[i - 16][4] === "bomb") {
        bombsAround++;
      }
    }
    if (row - 1 >= 0 && col - 1 >= 0 && array[i][4] !== "bomb") {
      if (array[i - 16 - 1][4] === "bomb") {
        bombsAround++;
      }
    }
    if (row + 1 <= 15 && col - 1 >= 0 && array[i][4] !== "bomb") {
      if (array[i + 16 - 1][4] === "bomb") {
        bombsAround++;
      }
    }
    if (row + 1 <= 15 && col + 1 <= 15 && array[i][4] !== "bomb") {
      if (array[i + 16 + 1][4] === "bomb") {
        bombsAround++;
      }
    }
    if (row - 1 >= 0 && col + 1 <= 15 && array[i][4] !== "bomb") {
      if (array[i - 16 + 1][4] === "bomb") {
        bombsAround++;
      }
    }
    array[i].push(bombsAround);
  }
  return array;
}

export function MineSweeper() {
  const [array, setArray] = useState(["asd"]);
  const [playable, setPlayable] = useState(true);
  useEffect(function () {
    setArray(createArray);
  }, []);
  function pff(box) {
    console.log("b");
    let col = box[1];
    let row = box[0];
    let arrayCopy = structuredClone(array);
    box[3] = true;
    if (box[5] > 0) {
      arrayCopy[box[2] - 1][3] = true;
      setArray(arrayCopy);
    } else if (box[5] === 0) {
      console.log(box);
      console.log("a");
      if (col - 1 >= 0) {
        console.log("a");
        //  if (array[box[2] - 1 - 1][4] === "bomb") {
        //    bombNeighbours = true;
        //  }
        arrayCopy[box[2] - 1] = structuredClone(box);
        arrayCopy[box[2] - 2] = structuredClone(array[box[2] - 2]);
        arrayCopy[box[2] - 2][3] = true;

        console.log(arrayCopy[box[2] - 2]);
        console.log(arrayCopy);
        setArray(structuredClone(arrayCopy));

        // pff(arrayCopy[box[2] - 2]);
      }
    }
  }
  function handleClick(boxes) {
    // boxes.push(array[0]);
    let arrayCopy = structuredClone(array);
    let thingsToChange = structuredClone(boxes);
    for (let box of boxes) {
      box[3] = true;
      console.log(box);
      if (box[5] > 0) {
        arrayCopy[box[2] - 1][3] = true;
        setArray(arrayCopy);
        thingsToChange = [];
      } else {
        thingsToChange = [];

        arrayCopy[box[2] - 1][3] = true;
        let row = box[0];
        let col = box[1];
        let bombNeighbours = false;
        if (col - 1 >= 0 && box[4] !== "bomb") {
          if (array[box[2] - 1 - 1][4] === "bomb") {
            bombNeighbours = true;
          }
        }
        if (col + 1 <= 15 && box[4] !== "bomb") {
          if (array[box[2] - 1 + 1][4] === "bomb") {
            bombNeighbours = true;
          }
        }
        if (row + 1 <= 15 && box[4] !== "bomb") {
          if (array[box[2] - 1 + 16][4] === "bomb") {
            bombNeighbours = true;
          }
        }
        if (row - 1 >= 0 && box[4] !== "bomb") {
          if (array[box[2] - 1 - 16][4] === "bomb") {
            bombNeighbours = true;
          }
        }
        if (row - 1 >= 0 && col - 1 >= 0 && box[4] !== "bomb") {
          if (array[box[2] - 1 - 16 - 1][4] === "bomb") {
            bombNeighbours = true;
          }
        }
        if (row + 1 <= 15 && col - 1 >= 0 && box[4] !== "bomb") {
          if (array[box[2] - 1 + 16 - 1][4] === "bomb") {
            bombNeighbours = true;
          }
        }
        if (row + 1 <= 15 && col + 1 <= 15 && box[4] !== "bomb") {
          if (array[box[2] - 1 + 16 + 1][4] === "bomb") {
            bombNeighbours = true;
          }
        }
        if (row - 1 >= 0 && col + 1 <= 15 && box[4] !== "bomb") {
          if (array[box[2] - 1 - 16 + 1][4] === "bomb") {
            bombNeighbours = true;
          }
        }
        if (bombNeighbours === false) {
          thingsToChange = [];
          if (col - 1 >= 0) {
            thingsToChange.push(array[box[2] - 2]);
            console.log(box);
            pff(array[box[2] - 2]);
            arrayCopy[box[2] - 2][3] = true;
          }
          if (col + 1 <= 15) {
            thingsToChange.push(array[box[2]]);
            arrayCopy[box[2]][3] = true;
          }
          if (row + 1 <= 15) {
            thingsToChange.push(array[box[2] + 16 - 1]);
            arrayCopy[box[2] + 16 - 1][3] = true;
          }
          if (row - 1 >= 0) {
            thingsToChange.push(array[box[2] - 16 - 1]);
            arrayCopy[box[2] - 16 - 1][3] = true;
          }
          if (row - 1 >= 0 && col - 1 >= 0) {
            thingsToChange.push(array[box[2] - 16 - 2]);
            arrayCopy[box[2] - 16 - 2][3] = true;
          }
          if (row + 1 <= 15 && col - 1 >= 0) {
            thingsToChange.push(array[box[2] + 16 - 2]);
            arrayCopy[box[2] + 16 - 2][3] = true;
          }
          if (row + 1 <= 15 && col + 1 <= 15) {
            thingsToChange.push(array[box[2] + 16]);
            arrayCopy[box[2] + 16][3] = true;
          }
          if (row - 1 >= 0 && col + 1 <= 15) {
            thingsToChange.push(array[box[2] - 16]);
            arrayCopy[box[2] - 16][3] = true;
          }
          setArray(arrayCopy);
          // if (thingsToChange.length !== 0) {
          //   handleClick(thingsToChange);
          // }
        }
      }
    }
  }

  return (
    <div className="container">
      {array !== undefined &&
        array.map((box) => (
          <Box
            key={box[2]}
            id={box[2]}
            box={box}
            clicked={box[3]}
            playable={playable}
            setPlayable={setPlayable}
            handleClick={handleClick}
          />
        ))}
    </div>
  );
}
