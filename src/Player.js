var Player = cc.Sprite.extend({
	ctor: function(floor){
		this._super();
		// this.initWithFile('img/mainChar.png');
		this.standAction  = this.createStandAction();
		this.runAction(this.standAction);
		this.floor = floor;
		this.g = 5;
		this.isHit = false;
		this.status = 0;
		this.sHit = 0;
		this.maxHP = 100;
		this.HP = 100;
		this.setScale(0.5,0.5);
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

		if(!this.floor.checkOnFloor(box) || box.y<65){
			
			if(this.floor.checkOnFloor(box)){
				this.setPosition(cc.p(pos.x-this.floor.v,pos.y-this.g));
			}
			else{
				this.setPosition(cc.p(pos.x,pos.y-this.g));
			}
			if(this.g!=5)this.g++;
		}
		else{
			this.status = 0;
		}
		if(this.floor.checkHitObs(box) && !this.isHit){
			this.isHit = true;
			this.sHit = new Date() / 1000;
			console.log("HIT!");
			this.attacked(10);
		}

		if(this.floor.checkCollectCoin(box)){
			cc.AudioEngine.getInstance().playEffect( 'sound/coin.mp3' );
		}
		
	},
	jump: function(){
		console.log(this.status);
		if(this.status == 0 || this.status == 1){
			var pos = this.getPosition();
			this.setPosition(cc.p(pos.x,pos.y+150));
			this.g = -15;
			this.status++;
		}
	},

	createStandAction : function(){
		var animation = new cc.Animation.create();
		for (var i = 1 ; i<=10;i++){
			animation.addSpriteFrameWithFile( 'img/mainChar/main_'+i+'.png');
		}

		// console.log( animation.getDelayPerUnit() );
		animation.setDelayPerUnit( 0.1 );
		return cc.RepeatForever.create( cc.Animate.create( animation ) );
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