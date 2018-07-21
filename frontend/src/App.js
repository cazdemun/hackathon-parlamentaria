import React, { Component } from 'react';
import './App.css';
import Ciudadano from './Pantallas/Ciudadano/Ciudadano';

class App extends Component {

  state = {
    persons: [
      {name: 'Andre', age:28},
      {name: 'p', age:21},
      {name: 'juan', age:22}
    ]
  }

  swithchNameHandler = (e) =>{
    console.log('Was clicked!');
    console.log(e);
    this.state.persons[0].name = 'CAMBIE CONCHATUMADRE';
  }

  render() {
    return (
      <div className="App">
        <h1>HOLA COMO TAS</h1>
        <button onClick={this.swithchNameHandler}> Test </button>
        <Ciudadano nombre={this.state.persons[0].name} edad="juancito"> HOLA PES CAUSATA</Ciudadano>
        <Ciudadano nombre={this.state.persons[1].name} edad = "andre"/>
        <Ciudadano nombre="c" edad = "pepe"/>
      </div>
    );
  }
}

export default App;

