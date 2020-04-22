import React, { Component } from 'react';
let axios = require('axios');

class Menu extends Component {
    constructor(props){
        super(props);
        this.state={
            name:""
        }
    }
    componentDidMount(){
        axios.get('/api/todoData')
        .then(object=>this.setState({
            name: object.data.name
        }))
    }
    render() {
        let {name} = this.state;
        console.log(name);
        return (
            <div>
                sang
            </div>
        );
    }
}

export default Menu;