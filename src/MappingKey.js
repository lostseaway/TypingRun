var MappingKey = cc.Node.extend({
	ctor: function(){
		this.map = {};
		var j = 97;
		for(var i = 65 ;i<=90;i++){
			this.map[i] = String.fromCharCode(j);
			j++; 
		}
	},
	getKey:function(e){
		if(this.map[e] === undefined)return e;
		return this.map[e];
	}
});