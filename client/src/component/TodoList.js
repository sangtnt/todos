import React, { Component } from 'react';
import todoData from "../todo.json";
import List from "./List";
import TodoItem from "./TodoItem";
import Pagination from "./Pagination";
class TodoList extends Component {
    constructor(props){
        super(props);
        this.state={
            todoList:[],
            page:1
        }
        this.onClickItem= this.onClickItem.bind(this);
        document.body.classList.add("body-todo");
        this.submitItem= this.submitItem.bind(this);
        this.findEnd= this.findEnd.bind(this);
        this.findStart=this.findStart.bind(this);
        this.deleteItem=this.deleteItem.bind(this);
        this.controlItem= this.controlItem.bind(this);
        this.changePage= this.changePage.bind(this);
    }
    componentDidMount(){
        this.setState({
            todoList: [
                ...todoData
            ],
            todos: [
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
    controlItem(event){
        let name= event.target.name;
        let {todos}=this.state;
        if (name==="all"){
            this.setState({
                todoList : todos.filter(function(item){
                    return item;
                })
            })
        }
        else if(name==="active"){
            this.setState({
                todoList : todos.filter(function(item){
                return item.isChecked===false;
                })
            })
        }
        else{
            this.setState({
                todoList : todos.filter(function(item){
                return item.isChecked===true;
                })
            })
        }
        this.setState({
            page:1
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
    changePage(event){
        this.setState({
            page: event.target.value
        })
    }
    render() {
        let {todoList, page}=this.state;
        //Calculate totalPage of pagination
        let quantity=10;
        let totalPage=Math.ceil(todoList.length/quantity);
        //Check page
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
        let list=[...todoList.slice(start,end)];
        return (
            <div className="cover-todo">
            <div className="container-todo">
                <ul className="todoList">
                    <li className="control-btn">
                        <input name="all" onClick={this.controlItem} className="btn btn-all" value="all" type="button"/>
                        <input name="active" onClick={this.controlItem} className="btn btn-active" value="active" type="button"/>
                        <input name="complete" onClick={this.controlItem} className="btn btn-complete" value="complete" type="button"/>
                    </li>
                    <li>
                        <input onKeyUp={this.submitItem} name="newItem" refs="newItem" className="input-item" placeholder="Enter new item"/>
                    </li>
                    <List items={list} render={(item)=><TodoItem deleteItem={this.deleteItem(item)} onClick={this.onClickItem(item)} key={item.id} item={item} />}/>
                    <li className="pagi-container">
                        <Pagination changePage={this.changePage} activeNum={page} totalPage={totalPage}/>
                    </li>
                </ul>
            </div>
            </div>
        );
    }
}

export default TodoList;