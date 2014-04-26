var Stage = cc.Node.extend({
	ctor:function(){
		this._super();
		this.floor = [];
		this.obs = [];
		this.v = 4;
		this.started = false;
		this.passed = 0;
		this.hold = 0;

		this.initFloor();
	},

	update:function(dt){
		
		var pos = this.getPosition();
		var floorPos = this.floor[0].getBoundingBoxToWorld();
		if(this.started){
			this.addObs();
			this.getParent().bg.scheduleUpdate();
		}
		if(floorPos.x<-70){
			this.floor[0].removeFromParent(true);
			this.floor.splice( 0, 1 );
			this.addBox();
			if(this.hold!=0) this.hold=0;
		}
		if(this.obs.length!=0){
			var obsPos = this.obs[0].getBoundingBoxToWorld();
			if(obsPos.x <-70){
				this.obs[0].removeFromParent(true);
				this.obs.splice( 0, 1 );
			}
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
		floor.setPosition(cc.p((lastBoxPos+70)+this.hold,30));
		this.addChild(floor);
	},

	checkOnFloor: function(obj){
		for(var i = 0;i<this.floor.length;i++){
			var boxBB = this.floor[i].getBoundingBoxToWorld();
			if(cc.rectOverlapsRect( obj, boxBB ))return true;
		}
		return false;
	},
	checkHitObs: function(obj){
		for(var i = 0;i<this.obs.length;i++){
			var boxBB = this.obs[i].getBoundingBoxToWorld();
			if(cc.rectOverlapsRect(obj,boxBB))return true;
		}
		return false;
	},

	addObs: function(){
		var ran = Math.round(Math.random()*1000);
		// console.log(ran);
		if(ran<=5){
			// console.log("in");
			this.hold = 140;
		}
		else if(ran<=10){
			var lastPos = this.floor[this.floor.length-1].getPosition().x;
			
			if(this.obs.length!=0){
				var lastObs = this.obs[this.obs.length-1].getPosition().x;
				if(Math.abs(lastPos-lastObs)<=280)return;
			}

			var lowObs = cc.Sprite.create('img/obs_low.png');
			
			lowObs.setPosition(cc.p(lastPos,100));
			this.addChild(lowObs);
			this.obs.push(lowObs);

		}
	}
});