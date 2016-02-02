/**
 * Created by caelumtian on 16/2/1.
 */
import "../styles/reset.less";
import React from 'react';

const Todo = React.createClass({
    getInitialState() {
        return {
            disX : 0,
            disY : 0
        }
    },
    moveTo(event) {
        var aim = this.refs.aim.getDOMNode();
        var l = event.pageX - this.state.disX,
            t = event.pageY - this.state.disY;
        aim.style.left = l + "px";
        aim.style.top = t + "px";
    },
    handleMouseDown(event) {
        console.log(event.pageY);
        var aim = this.refs.aim.getDOMNode();
        this.setState({
            disX : event.pageX - aim.offsetLeft,
            disY : event.pageY - aim.offsetTop
        });
        document.addEventListener("mousemove", this.moveTo);
    },
    handleMouseUp(event) {
        document.removeEventListener("mousemove", this.moveTo);
    },
    render() {
        var style = {
            "width" : "100px",
            "height" : "100px",
            "background-color" : "#ff0000",
            "position" : "absolute"
        };
        return (
            <div style={style} onMouseDown={this.handleMouseDown} ref="aim" onMouseUp={this.handleMouseUp}></div>
        )
    }
});
React.render(<Todo />, document.body);