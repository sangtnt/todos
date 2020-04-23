import React, { Component } from 'react';
import {Link} from "react-router-dom"
class Pagination extends Component {
    render() {
        let {activeNum, totalPage}= this.props;
        if (totalPage===0){
            return(
                <div class="pagination">
                    <div className="page-item active-page"><input type="button" value={0}/></div>
                </div>
            );
        }
        let maxPage=5;
        let bigPage=Math.ceil(activeNum/maxPage);
        let start=(bigPage-1)*maxPage+1;
        let end =start+4;
        if (end>totalPage){
            end=totalPage;
        }
        let item=[];
        for (let i=start; i<=end; i++){
            item.push(i);
        }
        return (
            <div class="pagination">
                {
                    item.map((page)=>{
                        let classPage="page-item"
                        if (activeNum==page){
                            classPage+=" active-page";
                        }
                        return <div className={classPage}><input className="btn-change-page" type="button" value={page} onClick={this.props.changePage}/></div>
                    })
                }
            </div>
        );
    }
}

export default Pagination;