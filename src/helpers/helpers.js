const helpers = {
    jsonTreeFormatter : function(parent, data) {
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
            this.jsonTreeFormatter(newParent,data);
        });
        return parent;
    }
}

export default helpers;

