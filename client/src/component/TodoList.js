import React, { Component } from 'react';
import List from "./List";
import TodoItem from "./TodoItem";
import Pagination from "./Pagination";
import axios from "axios";
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
        axios.get('/todoData')
        .then(todoData=>{
            this.setState({
                todoList: [
                    ...todoData.data.todoData               
                ],
                todos: [
                    ...todoData.data.todoData
                ]
            })
        });
    }
    componentWillUnmount(){
        document.body.classList.remove("body-todo");
    }
    submitItem(event){
        if (event.keyCode===13){
            var date= new Date();
            var time=date.getTime();
            let value=event.target.value;
            let newItem={
                title: value,
                isChecked: false,
                timeCreate: time
            }
            axios.post('/todoData/insert', newItem)
            .then(res => console.log(res.data))
            .catch(err=>{
                alert("post fail");
            })
            axios.get('/todoData')
            .then(todoData=>{
                this.setState({
                    todoList: [
                        ...todoData.data.todoData               
                    ],
                    todos: [
                        ...todoData.data.todoData
                    ]
                })
            });
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
            item.isChecked=!item.isChecked;
            axios.post('/todoData/update/'+item._id, item)
            .then(res=>{
                console.log(res);
                axios.get('/todoData')
                .then(todoData=>{
                    this.setState({
                        todoList: [
                            ...todoData.data.todoData               
                        ],
                        todos: [
                            ...todoData.data.todoData
                        ]
                    })
            });
            })
            .catch(err=> console.log(err));
        }
    }
    deleteItem(item){
        return (event)=>{
            axios.get('/todoData/delete/'+item._id)
            .then(console.log('Deleted'))
            .catch(err=>console(err));
            axios.get('/todoData')
            .then(todoData=>{
                this.setState({
                    todoList: [
                        ...todoData.data.todoData               
                    ],
                    todos: [
                        ...todoData.data.todoData
                    ]
                })
            });
        }
    }
    findStart(quantity, page){
        let start= (page-1)*quantity;
        return start;
    }
    findEnd(start, quantity){
        let {todoList} = this.state;
        let end= start + quantity;
        if (end>todoList.length){
            end=todoList.length;
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