import React from 'react';
import '../../App.css';

const Ciudadano = (props) => {
    return (
        <div>
            <p> Probando {props.nombre} {props.edad} {Math.random()* 2}</p>
            <p> {props.children} </p>
        </div>
    )
}

export default Ciudadano;