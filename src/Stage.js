var Stage = cc.Node.extend({
	ctor:function(){
		this._super();
		this.floor = []
		this.v = 4;
		this.initFloor();
	},

	update:function(dt){
		
		var pos = this.getPosition();
		var floorPos = this.floor[0].getBoundingBoxToWorld();
		if(floorPos.x<-70){
			this.floor[0].removeFromParent(true);
			this.floor.splice( 0, 1 );
			this.addBox();
		}
		// console.log("1x:"+floorPos.x);
		this.setPosition(cc.p(pos.x-this.v,pos.y));
	},

	initFloor:function(){
		for(var i = 0;i<15;i++){
			var floor = cc.Sprite.create( 'img/ground.png' );
			this.floor.push(floor);
			floor.setPosition(cc.p(70*i,30));
			this.addChild(floor);
		}
	},

	addBox:function(){
		var lastBoxPos = this.floor[this.floor.length-1].getPosition().x;
		var floor = cc.Sprite.create( 'img/ground.png' );
		this.floor.push(floor);
		floor.setPosition(cc.p(lastBoxPos+70,30));
		this.addChild(floor);
	},

	checkOnFloor: function(obj){
		for(var i = 0;i<this.floor.length;i++){
			var boxBB = this.floor[i].getBoundingBoxToWorld();
			if(cc.rectOverlapsRect( obj, boxBB ))return true;
		}
		return false;
	}
});