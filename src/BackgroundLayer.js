var BackgroundLayer = cc.Node.extend({
	ctor: function() {
	    // this._super( new cc.Color4B( 127, 255 , 127, 255 ) );
	    this._super();
        this.setPosition( new cc.Point( 0, 0 ) );

		this.sky = cc.Sprite.create( 'img/sky.jpg' );
        this.sky.setAnchorPoint(cc.p( 0 , 0 ));
        this.sky.setPosition(cc.p( 0 , 0 ));
        this.addChild(this.sky);
        

        this.sky1 = cc.Sprite.create( 'img/sky.jpg' );
        this.sky1.setAnchorPoint( cc.p( 0 , 0 ) );
        this.sky1.setPosition( cc.p( 1920 , 0 ) );
        this.addChild( this.sky1 );

        this.sky2 = cc.Sprite.create( 'img/sky.jpg' );
        this.sky2.setAnchorPoint( cc.p( 0 , 0 ) );
        this.sky2.setPosition( cc.p( 3840 , 0 ) );
        this.addChild( this.sky2 );

    },
    update: function(dt){
        var pos = this.getPosition();
        this.setPosition( cc.p( pos.x-0.2 , pos.y ) );
        var bbs1 = this.sky.getBoundingBoxToWorld();
        var bbs2 = this.sky1.getBoundingBoxToWorld();
        var bbs3 = this.sky2.getBoundingBoxToWorld();

        if(cc.rectGetMaxX(bbs1)<=0)
            this.sky.setPosition( cc.p( this.sky2.getPosition().x+1920 , 0 ) );

        if(cc.rectGetMaxX(bbs2)<=0)
            this.sky1.setPosition( cc.p( this.sky.getPosition().x+1920 ,0 ) );

        if(cc.rectGetMaxX(bbs3)<=0
            )this.sky2.setPosition( cc.p( this.sky1.getPosition().x+1920 ,0 ) );
    }
});