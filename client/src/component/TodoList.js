import React, { Component } from 'react';
import todoData from "../todo.json";
import List from "./List";
import TodoItem from "./TodoItem";
import Pagina from "./Pagina";
class TodoList extends Component {
    constructor(props){
        super(props);
        this.state={
            todoList:[]
        }
        this.onClickItem= this.onClickItem.bind(this);
    }
    componentDidMount(){
        this.setState({
            todoList: todoData.slice(0,10)
        })
    }
    onClickItem(item){
        return (event)=>{
            let {todoList} = this.state;
            let index= todoList.indexOf(item);
            this.setState({
                todoList: [
                    ...todoList.slice(0,index),
                    {
                        ...item,
                        isChecked: !item.isChecked
                    },
                    ...todoList.slice(index+1)
                ]
            })
        }
    }
    render() {
        let {todoList}= this.state;
        return (
            <div className="container-todo">
                <ul className="todoList">
                    <li>
                        <form>
                            <input className="input-item" placeholder="Enter new item"/>
                        </form>
                    </li>
                    <List items={todoList} render={(item)=><TodoItem onClick={this.onClickItem(item)} key={item.id} item={item} />}/>
                    <li>
                        <Pagina/>
                    </li>
                </ul>
            </div>
        );
    }
}

export default TodoList;