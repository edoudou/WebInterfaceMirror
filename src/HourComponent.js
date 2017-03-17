/**
 * Created by ESH3655 on 16/03/2017.
 */
import React, { Component } from 'react';

class HourComponent extends Component{
    constructor(props){
        super(props);

        this.state = {
            date : new Date(),
        }

        setInterval(this.updater,100);
    }

    updater = () =>{

        this.setState({
            date : new Date(),
        });
    }

    render(){
        return(
            <div>
                <p>Il est {this.state.date.getHours() + ':' + this.state.date.getMinutes()+':' + this.state.date.getSeconds()}</p>
            </div>
        );
    }
}

export default HourComponent;