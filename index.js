import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

const MAX_GROCERY = 3;
const INITIAL_LIST_GROCERY =  [
  { name: "Milk", position: 0 },
  { name: "Cheese", position: 1 },
  { name: "Water", position: 2 },
  { name: "Flour", position: 3 }]

const Grocery = ({grocery, index, handleButton}) => {
  const { name } = grocery;
  return (
    <li key={index}>
      <button onClick={() => handleButton(grocery)}>Up</button>
      <button onClick={() => handleButton(grocery, false)}>Down</button>

      <span>{` ${name}`}</span>
    </li>
  );
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      listGrocery: INITIAL_LIST_GROCERY,
    };
  }

  handleButton = ({name, position}, isUp = true) => {
    const { listGrocery } = this.state;
    const result = [];
    
    listGrocery.forEach(grocery => {
      const { position } = grocery;
      let newPosition = 0;

      if (isUp) {
        newPosition = position > 0 ? position - 1 : MAX_GROCERY;
      } else {
        newPosition = position < MAX_GROCERY ? position + 1 : 0;
      }

      const newGrocery = {
        ...grocery,
        position: newPosition
      }

      result.splice(newPosition, 0, newGrocery)
    });

    this.setState({
      listGrocery: result
    });
  }

  render() {
    const { listGrocery } = this.state;
    return (
      <div>
       <ul>
        {listGrocery.map((grocery, index) => {
          return <Grocery 
            index={index} 
            grocery={grocery}
            handleButton={this.handleButton}
            />
        })}
       </ul>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
