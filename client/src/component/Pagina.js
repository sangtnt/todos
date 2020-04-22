import React, { Component } from 'react';
import {Pagination} from "react-bootstrap"
class Pagina extends Component {
    render() {
        let active = 1;
        let items = [];
        for (let number = 1; number <= 4; number++){
            items.push(
                <Pagination.Item key={number} active={number === active}>
                {number}
                </Pagination.Item>,
            )
        }
        return (
            <div>
                <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                    {items}
                    <Pagination.Next />
                    <Pagination.Last />
                </Pagination>
            </div>
        );
    }
}

export default Pagina;