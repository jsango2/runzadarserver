import React, { Component } from 'react';
import './HelloWorldList.css';
import HelloWorld from './HelloWorld';
import AddGreeter from './AddGreeter';






class HelloWorldList extends Component {
    
    constructor(props) {
    super(props);
    this.removeGreeting = this.removeGreeting.bind(this);
    this.addGreeting = this.addGreeting.bind(this);
    this.state = { greetings: ["Jure","Pani"]} ;
  }



      renderGreetings() {
        return this.state.greetings.map((name, index) => (
          <HelloWorld
            key={index}
            name={name}
            index={index}
            removeGreeting={this.removeGreeting}
          />
        ));
      }

      removeGreeting(indexOfItemToDelete) {
        const filteredGreetings = this.state.greetings.filter((item,index) => {
          return indexOfItemToDelete !== index;
        });
        console.log(indexOfItemToDelete);
        this.setState({ greetings: filteredGreetings });
      }

      addGreeting(newName) {
        this.setState({ greetings: [newName,...this.state.greetings ] });
      }
    
    render() {
      return (
        <div className="HelloWorldList">
          <AddGreeter addGreeting={this.addGreeting}/>
          {this.renderGreetings()}
        </div>
      );
    }
}
  export default HelloWorldList;