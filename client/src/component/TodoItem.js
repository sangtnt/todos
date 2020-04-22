import React, { Component } from 'react';

class TodoItem extends Component {
    render() {
        let classItem='todo-item';
        if (this.props.item.isChecked){
            classItem+=' checked';
        }
        return (
            <li onClick={this.props.onClick} className={classItem}>
                {this.props.item.title}<br/>
            </li>
        );
    }
}

export default TodoItem;