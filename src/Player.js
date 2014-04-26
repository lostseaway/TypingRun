var Player = cc.Sprite.extend({
	ctor: function(floor){
		this._super();
		this.initWithFile('img/mainChar.png');
		this.floor = floor;
		this.g = 5;
		this.isHit = false;
		this.status = 0;
		this.sHit = 0;
		this.maxHP = 100;
		this.HP = 100;
	},
	update: function(dt){
		var box = this.getBoundingBoxToWorld();
		var pos = this.getPosition();
		
		if(this.isHit){
			var time = new Date() / 1000;
			// console.log()
			if(time - this.sHit >= 5){
				this.isHit = false;
			}
		}
		if(!this.floor.checkOnFloor(box)){
			
			this.setPosition(cc.p(pos.x,pos.y-this.g));
			if(this.g!=5)this.g++;
		}
		if(this.floor.checkHitObs(box) && !this.isHit){
			this.isHit = true;
			this.sHit = new Date() / 1000;
			console.log("HIT!");
			this.attacked(10);
		}
		else{
			this.status = 0;
		}
	},
	jump: function(){
		if(this.status == 0 || this.status == 1){
			var pos = this.getPosition();
			this.setPosition(cc.p(pos.x,pos.y+100));
			this.g = -15;
			this.status++;
		}
	},

	setHealthBar: function( healthBar ) {
		this.healthBar = healthBar;
	},

	attacked : function(damage){
		this.HP -= damage;
		// console.log(this.HP/this.maxHP);
		this.healthBar.setHP((this.HP/this.maxHP)*100);
	}
});