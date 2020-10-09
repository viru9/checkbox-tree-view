const helpers = {
    loopTreeData : function(dataTree,id,isChecked){
        id!== undefined && dataTree.map((value)=>{
            if(value.id==id){
                value.isChecked = isChecked;
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
    },

    loopCheckBoxAction : function(value,isChecked){
        value.nodes.map((value)=>{
            value.isChecked = isChecked;
            if(value.nodes){
                this.loopCheckBoxAction(value,isChecked);
            }
        });
    }
}

export default helpers;



