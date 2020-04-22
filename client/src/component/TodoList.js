import React, { Component } from 'react';
import todoData from "../todo.json";
import List from "./List";
import TodoItem from "./TodoItem";
import Pagination from "./Pagination";
class TodoList extends Component {
    constructor(props){
        super(props);
        this.state={
            todoList:[]
        }
        this.onClickItem= this.onClickItem.bind(this);
        document.body.classList.add("body-todo");
        this.submitItem= this.submitItem.bind(this);
        this.findEnd= this.findEnd.bind(this);
        this.findStart=this.findStart.bind(this);
        this.deleteItem=this.deleteItem.bind(this);
    }
    componentDidMount(){
        this.setState({
            todoList: [
                ...todoData
            ]
        })
    }
    componentWillUnmount(){
        document.body.classList.remove("body-todo");
    }
    submitItem(event){
        if (event.keyCode===13){
            var date= new Date();
            var time=date.getTime();
            let value=event.target.value;
            let {todoList}=this.state;
            this.setState({
                todoList:[
                    {
                        id:'',
                        title: value,
                        isChecked: false,
                        timeCreate: time
                    },
                    ...todoList
                ]
            })
        }
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
    deleteItem(item){
        return (event)=>{
            let {todoList} = this.state;
            let list=[...todoList];
            let index= todoList.indexOf(item);
            list.splice(index,1);
            this.setState({
                todoList: [
                    ...list
                ]
            })
        }
    }
    findStart(quantity, page){
        let start= (page-1)*quantity;
        return start;
    }
    findEnd(start, quantity){
        let end= start + quantity;
        if (end>todoData.length){
            end=start+todoData.length%start;
        };
        return end
    }
    render() {
        //Calculate totalPage of pagination
        let quantity=10;
        let totalPage=Math.ceil(todoData.length/quantity);
        //Check page
        let {page}=this.props.match.params;
        if (page===undefined||page<1){
            page=1;
        }
        else if(page>totalPage){
            page=totalPage;
        }
        //find start and end of list
        let start= this.findStart(quantity, page);
        let end= this.findEnd(start, quantity);
        //create list from start to end
        let {todoList}=this.state;
        let list=[...todoList.slice(start,end)];
        return (
            <div className="cover-todo">
            <div className="container-todo">
                <ul className="todoList">
                    <li>
                        <input onKeyUp={this.submitItem} name="newItem" refs="newItem" className="input-item" placeholder="Enter new item"/>
                    </li>
                    <List items={list} render={(item)=><TodoItem deleteItem={this.deleteItem(item)} onClick={this.onClickItem(item)} key={item.id} item={item} />}/>
                    <li className="pagi-container">
                        <Pagination activeNum={page} totalPage={totalPage}/>
                    </li>
                </ul>
            </div>
            </div>
        );
    }
}

export default TodoList;