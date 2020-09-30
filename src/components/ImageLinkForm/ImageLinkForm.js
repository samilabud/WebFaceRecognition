import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className="f3">
                {'Este cerebro magico detectara los rostros de las personas en cualquier fotografias.'}
            </p>
            <div className="center form pa4 br3 shadow-5 ">
                <div className="center w-100">
                    <input type='text' className='f4 pa2 w-70 center' onChange={onInputChange}></input>
                    <button onClick={onButtonSubmit} className='w-30 grow f4 link ph3 pv2 dib white bg-light-blue center'>Detectar</button>
                </div>
            </div>
        </div>
        
    )
}

export default ImageLinkForm;