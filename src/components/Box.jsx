import { useState } from "react";

export function Box({ id, box, setPlayable, playable, clicked, handleClick }) {
  const [stateBox, setStateBox] = useState(box);
  const [stateClicked, setStateClicked] = useState(clicked);
  return (
    <div
      id={clicked ? box[4] : ""}
      className="box"
      onClick={(e) => {
        if (playable && !clicked) {
          if (box[4] === "bomb") {
            e.target.id = "bomb";
            setPlayable(false);
          } else {
            setStateClicked(true);
            handleClick([stateBox]);
          }
        }
      }}
    >
      {clicked && box[5] > 0 && <div>{box[5]}</div>}
      {/* <div>{stateBox[5]}</div>
      <div>{stateBox[2]}</div> */}
    </div>
  );
}
// {stateBox[0]}
//       <div>{stateBox[1]}</div>
//       <div id={box[4]}>
//         {stateBox[4]} {stateBox[5]}
//       </div>
