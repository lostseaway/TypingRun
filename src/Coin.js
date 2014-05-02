var Coin = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.cAction  = this.createAction();
		this.runAction(this.cAction);
	},
	createAction : function(){
		var animation = new cc.Animation.create();
		for (var i = 1 ; i<=8;i++){
			animation.addSpriteFrameWithFile( 'img/coin/coin_'+i+'.png');
		}
		animation.setDelayPerUnit( 0.1 );
		return cc.RepeatForever.create( cc.Animate.create( animation ) );
	},
});