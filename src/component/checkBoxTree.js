import React, { Component } from 'react';
import './checkBoxTree.css';
import response from './response';

class checkBoxTree extends Component {

    constructor(props){
        super(props);
        this.state = {
            treeData : []
        }
    }

    convertTree(parent, data){
        parent.map((paren,index) => {
            let newParent = [];
            data.map((value) => {
                if(paren.id===value.parent){
                    console.log('indes',index)
                    parent[index].nodes ? 
                    parent[index].nodes.includes(value) && parent[index].nodes.push(value) : 
                    parent[index].nodes = []; parent[index].nodes.push(value)
                    newParent = parent[index].nodes;
                }
                });
            this.convertTree(newParent,response.data.categories);
        });
        return parent;
    }

    componentDidMount(){

        let data = response.data.categories;
        let parent = [];

        data.map((value) => {
            if(value.parent==0){
            parent.push(value);
          }
        });

        let formatedResponse = this.convertTree(parent, data);
        this.setState({treeData:formatedResponse});
}
    

    renderTreeView = (data) => {
        return data.map((value)=>{
            return  value.nodes ?
                <li key={value.id}>
                    
                    <label className="container">
                    <input type="checkbox"/>
                    <span className="checkmark"></span>
                    </label>

                    <span className="caret">{value.name}
                    </span>
                    {value.nodes && 
                        <ul className="nested ul-nostyle">
                            {this.renderTreeView(value.nodes)}
                        </ul>
                        }
                </li>
                    :
                 <li key={value.id}> 
                    <label className="container">
                    <input type="checkbox"/>
                    <span className="checkmark"></span>
                    </label>
                 {value.name}</li>
        });
    }


    render(){
        return (
            <div>
                <ul className="ul-nostyle">
                {this.renderTreeView(this.state.treeData)}
                </ul>
            </div>
        )
    }
}

export default checkBoxTree;