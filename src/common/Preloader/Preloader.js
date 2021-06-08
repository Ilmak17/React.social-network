import preloader from "../../assets/images/Spinner-1s-200px.svg";
import React from "react";

let Preloader = () => {
    return (
        <div style={
            {
                width: '100px',
                height: '150px',
                position: 'absolute',
                top: '50%',
                left: '50%',
            }
        }>
            <img src={preloader} alt={"preloader"}/>
        </div>
    )
}

export default Preloader;