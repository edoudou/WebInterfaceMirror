import React, { Component } from 'react';
import logo from './logo.svg';
import MirrorComponent from './MirrorComponent';
import HourComponent from './HourComponent';
import Leap from 'leapjs';

import './App.css';

class App extends Component {
    constructor(props){
        super(props);

        var controller = Leap.loop({enableGestures: true}, this.manageGesture );
    }

    manageGesture = (frame)=>{
        var hand = frame.hand();
        if(hand.palmPosition) console.log(hand.palmPosition);

        if(frame.valid && frame.gestures.length > 0){
            frame.gestures.forEach((gesture)=>{
                switch (gesture.type){
                    case "circle":
                        break;
                    case "swipe": {
                        var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
                        var swipeDirection;
                        //Classify as right-left or up-down
                        if (isHorizontal) {
                            if (gesture.direction[0] > 0) {
                                swipeDirection = "right";
                            } else {
                                swipeDirection = "left";
                            }
                        } else { //vertical
                            if (gesture.direction[1] > 0) {
                                swipeDirection = "up";
                            } else {
                                swipeDirection = "down";
                            }
                        }
                        //console.log(swipeDirection);
                        this.refs.selectedComponent.changeSpeed(swipeDirection);

                        break;
                    }
                }
            });
        }
    }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">
            <MirrorComponent ref="selectedComponent" title="Heure" xPos="1000" yPos="500" content={(
                <HourComponent />
            )}/>
        </div>
      </div>
    );
  }
}

export default App;
