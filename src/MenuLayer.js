
var MenuLayer = cc.Layer.extend({
	ctor: function(){
		this._super();
	},

	init: function(){
		this._super();
		this.setTouchEnabled( true );
        this.setTouchMode( 1 );

        var director = cc.Director.getInstance();
        var winsize = director.getWinSize();
        var center = cc.p( 400, 300 );
       
        var bg = cc.Sprite.create();

        bg.createAction = function(){
        	var animation = new cc.Animation.create();
			
			for ( var i = 0 ; i <= 1 ; i++ ){
				animation.addSpriteFrameWithFile( 'img/menu/menu_'+i+'.png');
			}

			animation.setDelayPerUnit( 0.5 );
			return cc.RepeatForever.create( cc.Animate.create( animation ) );
        }

        bg.runAction( bg.createAction() );
        bg.setPosition( center );
        this.addChild( bg );
	},

	onTouchBegan:function( touch, event ) {
        // cc.log("==onplay clicked");
        var director = cc.Director.getInstance();
        director.replaceScene( cc.TransitionFade.create( 1.5, new SelectScene( true ) ) );
    }
});

var MenuScene = cc.Scene.extend({
	ctor: function(){
		this._super();
		var layer = new MenuLayer();
		layer.init();
		this.addChild( layer );
	}
});