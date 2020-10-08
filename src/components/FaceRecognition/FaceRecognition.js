import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageURL,boxes}) =>{
    let i = 0;
    return (
        <div className="center ma">
            <div className="absolute mt2">
                {imageURL!=="" ? 
                    <img id="inputImage" alt="Imagen Analizada" src={imageURL} width="400"/>
                   :
                   <div></div> 
                }
                {
                    boxes.map(box=>{
                        i++;
                    return <div key={i} className="faceBox" style={{top:box.topRow,left:box.leftCol, right:box.rightCol, bottom:box.bottomCol}}></div>
                })}
            </div>
        </div>
    )
}

export default FaceRecognition;