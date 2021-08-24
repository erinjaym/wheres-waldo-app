import React from "react";
import { useState, useEffect } from "react";

const TagBox = (props) => {

    let vertStart = props.verticalPosition;
    let horizStart = props.horizontalPosition;


console.log("Virticle plot point:" + vertStart); 
console.log("horizontal plot point:" + horizStart); 

    let tagBoxStyle = {
        display: "block",
        left: horizStart, 
        position: "absolute", 
        top: vertStart,
    }
    //let tagBoxVertical = 0;
    //let tagBoxHorizontal = 0; 

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
                    <li>Samus</li>
                    <li>Vault boy</li>
                    <li>Boba Fett</li>
            </div>
    </div>
    );
}
export default TagBox;