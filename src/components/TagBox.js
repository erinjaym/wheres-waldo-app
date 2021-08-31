import React from "react";

const TagBox = (props) => {
  let tagBoxDisplay = props.tagBoxDisplay;
  let vertStart = props.verticalPosition;
  let horizStart = props.horizontalPosition;
  let picHeight = 1528;
  let picWidth = 1712;

  function setTagBoxDisplay(tagBoxDisplay) {
    if (tagBoxDisplay) {
      return "block";
    } else {
      return "none";
    }
  }

  function adjustHorizontalDisplay(horizStart) {
    if (horizStart < 80) {
      //adjust position to account for left border
      return 0;
    } else if (horizStart > picWidth - 110) {
      // adjust position to account for right border and frame border pixels
      return picWidth - 110;
    } else {
      //middle of board clicks
      return horizStart - 55;
    }
  }

  function adjustVerticalDisplay(vertStart) {
    if (vertStart < 80) {
      // if clicking on top border
      return 0;
    } else if (vertStart > picHeight - 110) {
      // if clicking on bottom border
      return picHeight - 110;
    } else {
      // clicks in middle of gameboard
      return vertStart - 55;
    }
  }

  let tagBoxStyle = {
    display: setTagBoxDisplay(tagBoxDisplay),
    left: adjustHorizontalDisplay(horizStart),
    position: "absolute",
    top: adjustVerticalDisplay(vertStart),
  };

  function tag(charName) {
    props.tag(charName, horizStart, vertStart);
  }

  return (
    <div id="tag-box" style={tagBoxStyle}>
      <div className="tag-frame" />
      <div className="tag-options">
        <li onClick={() => tag("Samus")}>Samus</li>
        <li onClick={() => tag("Vault Boy")}>Vault boy</li>
        <li onClick={() => tag("Boba Fett")}>Boba Fett</li>
      </div>
    </div>
  );
};
export default TagBox;
