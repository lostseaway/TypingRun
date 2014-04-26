var BackgroundLayer = cc.Node.extend({
	ctor: function() {
	    // this._super( new cc.Color4B( 127, 255 , 127, 255 ) );
	    this._super();
        this.setPosition( new cc.Point( 0, 0 ) );

		this.sky = cc.Sprite.create('img/sky.jpg');
        this.sky.setAnchorPoint(cc.p(0,0));
        this.sky.setPosition(cc.p(0,0));
        this.addChild(this.sky);
        

        this.sky1 = cc.Sprite.create('img/sky.jpg');
        this.sky1.setAnchorPoint(cc.p(0,0));
        this.sky1.setPosition(cc.p(1920,0));
        this.addChild(this.sky1);

    },
    update: function(dt){
        var pos = this.getPosition();
        this.setPosition(cc.p(pos.x-0.2,pos.y));
    }
});