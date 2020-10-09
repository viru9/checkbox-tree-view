import React, { Component } from 'react';
import '../styles/checkBoxTree.css';
import response from '../actions/response';
import helpers from '../../../helpers/helpers';
import checkBoxHelpers from '../helpers/helpers';

class checkBoxTree extends Component {

    constructor(props){
        super(props);
        this.state = {
            treeData : []
        };
    }

    componentDidMount(){
        let data = response.data.categories;
        let parent = [];
        data.map((value) => {
            if(value.parent==0){
            parent.push(value);
          }
        });
        let formatedResponse = helpers.jsonTreeFormatter(parent, data);
        this.setState({treeData:formatedResponse});
    }

    onCheckBoxChange = (id,isChecked) => {
        let dataTree = this.state.treeData;
        checkBoxHelpers.loopTreeData(dataTree,id,isChecked);
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