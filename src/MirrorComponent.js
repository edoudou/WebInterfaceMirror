/**
 * Created by ESH3655 on 15/03/2017.
 */
import React, { Component } from 'react';
import './MirrorComponent.css';

class MirrorComponent extends Component {
    constructor(props){
        super(props);

        this.state = {
            xVit : 0,
            yVit : 0,
            xPos : this.props.xPos | 10,
            yPos : this.props.yPos | 10,
            dx : 10,
            dy : 10,
            eventTarget : null,
            content : this.props.content,
            title : this.props.title,
        }


    }

    componentWillMount(){
        setInterval(this.updatePhysic,10);
    }

    updatePhysic = () =>{
        var newPosX = this.state.xPos + this.state.xVit;
        var newPosY = this.state.yPos + this.state.yVit;

        this.setState({
            xPos:newPosX,
            yPos:newPosY,
            xVit:this.state.xVit * 0.9,
            yVit:this.state.yVit * 0.9,
        });
    }

    drag = (e) => {
        this.setState({
            eventTarget: e.target,
        });
        this.setState({
            dx : e.pageX - e.target.offsetTop,
            dy : e.pageY - e.target.offsetLeft,
        });
        console.log(e.pageX - e.target.offsetTop);
        e.target.addEventListener("mousemove", this.move );
    }

    move = (e)=> {
        this.moveTo(e.pageX,e.pageY);
    }

    changeSpeed(direction){
        switch(direction)
        {
            case 'left':
                this.setState({xVit: this.state.xVit - 1});
                break;
            case 'right':
                this.setState({xVit: this.state.xVit + 1});
                break;
            case 'up':
                this.setState({yVit: this.state.yVit - 1});
                break;
            case 'down':
                this.setState({yVit: this.state.yVit + 1});
                break;
        }
    }

    moveToDirection = (dir) => {
        switch(dir)
        {
            case 'left':
                this.moveTo(this.state.xPos-5,this.state.yPos);
                break;
            case 'right':
                this.moveTo(this.state.xPos+5,this.state.yPos);
                break;
            case 'up':
                this.moveTo(this.state.xPos,this.state.yPos-5);
                break;
            case 'down':
                this.moveTo(this.state.xPos,this.state.yPos+5);
                break;
        }
    }

    moveTo = (X,Y)=>{
        this.setState({
            xPos: X,
            yPos: Y,
        });
    }

    drop = () => {
        this.state.eventTarget.removeEventListener("mousemove",this.move);
        this.setState({eventTarget : null});
    }

    render() {
        return (
            <div className="MirrorComponent" onMouseDown={this.drag} onMouseUp={this.drop}
                 style={
                        {
                            top: this.state.yPos,
                            left:this.state.xPos
                        }}>
                <h3 className="title">
                    {this.state.title}
                </h3>
                <div className="content">
                    {this.state.content}
                </div>
            </div>
        );
    }
}

export default MirrorComponent;