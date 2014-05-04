
var SelectLayer = cc.Layer.extend({
	ctor: function(){
		this._super();
	},

	init: function(){
		this._super();
		this.setMouseEnabled( true );
		this.isSound = true;

		var director = cc.Director.getInstance();
        var winsize = director.getWinSize();
        var center = cc.p( 400, 300 );
       
        var bg = cc.Sprite.create( 'img/menu/selection.png' );
        bg.setPosition( center );
        this.addChild( bg );

        this.butt1 = cc.Sprite.create( 'img/menu/butt_easy.png');
        this.butt1.setPosition(cc.p(160,360));
        this.butt1.setOpacity(80);
        this.addChild(this.butt1);

        this.butt2 = cc.Sprite.create( 'img/menu/butt_med.png');
        this.butt2.setPosition(cc.p(420,360));
        this.butt2.setOpacity(80);
        this.addChild(this.butt2);

        this.butt3 = cc.Sprite.create( 'img/menu/butt_hard.png');
        this.butt3.setPosition(cc.p(665,360));
        this.butt3.setOpacity(80);
        this.addChild(this.butt3);

        this.sound_butt = cc.Sprite.create( 'img/menu/sound.png' );
        this.sound_butt.setPosition(cc.p(30,30));
        this.sound_butt.setOpacity(80);
        // this.setAnchorPoint(0.5,0.5);
        this.sound_butt.setScaleX(0.08);
        this.sound_butt.setScaleY(0.08);
        this.addChild(this.sound_butt);
	},

	onMouseMoved: function(event){
		var loc = event.getLocation();
		var b1 = this.butt1.getBoundingBoxToWorld();
		var b2 = this.butt2.getBoundingBoxToWorld();
		var b3 = this.butt3.getBoundingBoxToWorld();
		var sb = this.sound_butt.getBoundingBoxToWorld();

		if(cc.rectContainsPoint(b1,loc)){
			this.butt1.setOpacity(1000);
		}else{
			this.butt1.setOpacity(80);
		}

		if(cc.rectContainsPoint(b2,loc)){
			this.butt2.setOpacity(1000);
		}else{
			this.butt2.setOpacity(80);
		}

		if(cc.rectContainsPoint(b3,loc)){
			this.butt3.setOpacity(1000);
		}else{
			this.butt3.setOpacity(80);
		}

		if(cc.rectContainsPoint(sb,loc)){
			this.sound_butt.setOpacity(1000);
		}else{
			this.sound_butt.setOpacity(80);
		}


		// console.log("X : "+loc.x+" Y : "+loc.y);
	},

	onMouseDown: function(event){
		var loc = event.getLocation();
		var b1 = this.butt1.getBoundingBoxToWorld();
		var b2 = this.butt2.getBoundingBoxToWorld();
		var b3 = this.butt3.getBoundingBoxToWorld();
		var sb = this.sound_butt.getBoundingBoxToWorld();

		if(cc.rectContainsPoint(b1,loc)){
			var director = cc.Director.getInstance();
        	director.replaceScene(cc.TransitionFade.create(1.5, new StartScene(0)));
		}

		if(cc.rectContainsPoint(b2,loc)){
			var director = cc.Director.getInstance();
        	director.replaceScene(cc.TransitionFade.create(1.5, new StartScene(1)));
		}

		if(cc.rectContainsPoint(b3,loc)){
			var director = cc.Director.getInstance();
        	director.replaceScene(cc.TransitionFade.create(1.5, new StartScene(2)));
		}

		if(cc.rectContainsPoint(sb,loc)){
			if(this.isSound){
				this.isSound = false;
				this.sound_butt.initWithFile("img/menu/nsound.png");
			}
			else{
				this.isSound = true;
				this.sound_butt.initWithFile("img/menu/sound.png");
			}
		}
	}
});

var SelectScene = cc.Scene.extend({
	ctor: function(){
		this._super();
		var layer = new SelectLayer();
		layer.init();
		this.addChild( layer );
	}
});