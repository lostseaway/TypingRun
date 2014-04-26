var PlayerHealthBar = cc.Node.extend({
	ctor: function() {
		this.started = false;
		// console.log(w);
		this._super();
		var w = 300;
		this.DEFAULT_SCALE_X = w/40.0 + 2;

		this.hpBar = cc.Sprite.create( 'img/hp_green.png' );

		this.hpBar.setScaleX(w/40.0 + 2);
		this.hpBar.setScaleY(5);
		this.hpBar.setAnchorPoint( new cc.Point( 0, 0 ) );
		this.hpBar.setPosition( new cc.Point( 0, 0 ) );
		this.addChild( this.hpBar );

		this.barBoarder = cc.Sprite.create( 'img/enemy_bar_border.png' );
		this.barBoarder.setScaleY( 5 );
		this.barBoarder.setScaleX(w/80.0 + 1);
		this.barBoarder.setAnchorPoint( new cc.Point( 0, 0 ) );
		this.barBoarder.setPosition( new cc.Point( 0, 0 ) );
		this.addChild( this.barBoarder );
		

	},

	setHP: function( percent ) {
		// console.log( this.DEFAULT_SCALE_X * (percent / 100) )
		this.hpBar.setScaleX( this.DEFAULT_SCALE_X * (percent / 100) );
	}
});