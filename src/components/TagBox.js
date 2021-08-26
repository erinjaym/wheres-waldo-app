import React from "react";
import { useState, useEffect } from "react";

const TagBox = (props) => {

    const [showTagBox, setShowTagBox] = useState (props.selectionMade);
    const [tagBoxDisplay, setTagBoxDisplay] = useState ("none");
    let vertStart = props.verticalPosition;
    let horizStart = props.horizontalPosition;

    let picHeight = 1528; 
    let picWidth = 1712; 

useEffect(() => {
    // may need to move outside of use effect ? 
  if (showTagBox) {
    setTagBoxDisplay("block");
  }

},[ showTagBox ]);

function adjustHorizontalDisplay(horizStart){  // need to adjust for click along border as well 
    if ( horizStart < 80){ //adjust position to account for left border
      return 0; // pic is 0 - 1712 but area map is 20 - 1732 
    }else if (horizStart >= picWidth){ // adjust position to account for right border and frame border pixels
      return (picWidth - 105);
    }else{ //middle of board clicks
      return (horizStart - 55);
    }
  }

  function adjustVerticalDisplay (vertStart) {
    if (vertStart < 80){ // if clicking on top border
        return 0;
    }else if (vertStart > (picHeight - 110)){ // if clicking on bottom border 
        return (picHeight - 110);
    }else{  // clicks in middle of gameboard
        return (vertStart - 55);
    }
}
    let tagBoxStyle = {
        display: tagBoxDisplay,
        left: adjustHorizontalDisplay(horizStart), 
        position: "absolute", 
        top: adjustVerticalDisplay(vertStart),
    }


    function tag (charName){
         props.tag(charName, horizStart ,vertStart);
    }


    /*
    const showTagBox = () => {
        tagBoxStyle.display = "block";
    }

    const hideTagBox = () => {
        tagBoxStyle.display = "none";
    }*/


return(
    <div id="tag-box" style={tagBoxStyle}>
        <div className="tag-frame" />
            <div className="tag-options">
                    <li onClick={() => tag("Samus")}>Samus</li>
                    <li onClick={() => tag("Vault Boy")}>Vault boy</li>
                    <li onClick={() => tag("Boba Fett")}>Boba Fett</li>
            </div>
    </div>
    );
}
export default TagBox;