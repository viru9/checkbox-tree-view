import React, { Component } from 'react';
import './checkBoxTree.css';
import response, { data } from './response';

class checkBoxTree extends Component {

    constructor(props){
        super(props);
        this.state = {
            treeData : []
        };
    }

    convertTree(parent, data){
        parent.map((paren,index) => {
            paren.isChecked=false;
            let newParent = [];
            data.map((value) => {
                if(paren.id===value.parent){
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
    
    loopCheckBoxAction = (value,isChecked) =>{
        value.nodes.map((value)=>{
            isChecked ? value.isChecked = true : value.isChecked = false
            if(value.nodes){
                this.loopCheckBoxAction(value,isChecked);
            }
        });
    }

    loopTreeData = (dataTree,id,isChecked) =>{

        id!== undefined && dataTree.map((value)=>{

            if(value.id==id){
                console.log('loopTreeData ',value)

                isChecked ? value.isChecked = true : value.isChecked = false;
                
                if(value.nodes){
                    this.loopCheckBoxAction(value,isChecked);
                }
            }
            else {
                if(value.nodes){
                    this.loopTreeData(value.nodes,id,isChecked)
                }
            }
            
        });
    }

    onCheckBoxChange = (id,isChecked) => {
        let dataTree = this.state.treeData;
        this.loopTreeData(dataTree,id,isChecked);
        this.setState({treeData:dataTree});
    }

    renderTreeView = (data) => {
        return data.map((value)=>{
            return  value.nodes ?
                <li key={value.id}>
                    
                    <label className="container">
                    <input id={value.id} name={value.name} type="checkbox" className="checkmark" 
                    value={value.name || ''}
                    checked={value.isChecked ? value.isChecked : false } 
                    onChange={(event)=>{this.onCheckBoxChange(value.id, event.target.checked)}}/>
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
                    <input id={value.id} name={value.name} type="checkbox" className="checkmark" 
                    value={value.name || ''}
                    checked={value.isChecked ? value.isChecked : false }
                    onChange={(event)=>{this.onCheckBoxChange(value.id, event.target.checked)}}/>
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