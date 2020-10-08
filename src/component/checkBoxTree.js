import React, { Component } from 'react';
import './checkBoxTree.css';
import response from './responseFromated';

class checkBoxTree extends Component {

    renderNested = (data) => {
        return data.map((value)=>{
            return  value.nodes ?
                <li key={value.id}><span className="caret">{value.name}
                    </span>
                    {value.nodes && 
                        <ul className="nested">
                            {this.renderNested(value.nodes)}
                        </ul>
                        }
                </li>
                    :
                 <li key={value.id}> {value.name}</li>
            }
        );
    }

    renderTreeView = (data) => {
        return data.map((value)=>{
            if(value.parent==0){
                console.log("parent: ",value);
                return <li key={value.id}><span className="caret">{value.name}</span>
                        {value.nodes && 
                            <ul className="nested">
                                {this.renderNested(value.nodes)}
                            </ul>
                        }
                     </li>
            }
        });
    }


    render(){
        return (
            <div>
                <ul>
                {this.renderTreeView(response.data.categories)}
                </ul>
            </div>
        )
    }
}

export default checkBoxTree;