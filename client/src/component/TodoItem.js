import React, { Component } from 'react';

class TodoItem extends Component {
    render() {
        let classItem='todo-item';
        if (this.props.item.isChecked){
            classItem+=' checked';
        }
        return (
            <div className="item-block">
                <li onClick={this.props.onClick} className={classItem}>
                    {this.props.item.title}
                </li>
                <div onClick={this.props.deleteItem} class="delete-item">X</div>
            </div>
        );
    }
}

export default TodoItem;