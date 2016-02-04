/**
 * Created by caelumtian on 16/2/1.
 */
import "../styles/reset.less";
import React from 'react';
import Reflux from 'reflux';

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

var TodoActions = Reflux.createActions([
    'addItem', 'getAll'
]);
var TodoStore = Reflux.createStore({
    items : ['第1条数据', '第2条数据', '第3条数据'],
    listenables : [TodoAction],
    onAddItem() {
        console.log("请求服务器更新数据");
        var newItem = '第' + (this.items.length + 1) + '条数据';
        this.items.push(newItem);
        this.trigger(this.items);
    },
    onGetAll() {
        console.log("获取数据");
        this.trigger(this.items);
    }
});
var Todolist = React.createClass({
    getInitialState() {
        return {
            list : []
        }
    },
    onStatusChange(list) {
        this.setState({
            list : list
        })
    },
    handleClick() {
        TodoAction.addItem();
    },
    componentDidMount() {
        this.unsubscribe1 = TodoStore.listen(this.onStatusChange);
        TodoAction.getAll();
    },
    componentWillUnmount() {
        this.unsubscribe1();
    },
    render() {
        return (
            <div>
                <h1>数据在这里</h1>
                {this.state.list.map(item => {
                    return <p>{item}</p>
                })}
                <button onClick={this.handleClick}>添加项目</button>
            </div>
        )
    },
});
React.render(<Todolist />, document.body);