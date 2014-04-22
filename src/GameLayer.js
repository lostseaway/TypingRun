var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.keymap = new MappingKey();
        

 		this.wordGen = new WordGen(0);

 		this.textLabel = new LabelContorll();
 		this.textLabel.setPosition(cc.p(300,400));
 		this.addChild(this.textLabel);

        this.stage = new Stage();
        this.stage.setPosition(cc.p(0,0));
        this.addChild(this.stage);
        this.stage.scheduleUpdate();

        this.player = new Player(this.stage);
        this.player.setPosition(cc.p(70,200));
        this.player.scheduleUpdate();
        this.addChild(this.player);
 		this.setKeyboardEnabled( true );
        return true;
    },
    onKeyDown: function(e){
        if(e==32) this.textLabel.setText(this.wordGen.getWord().toLowerCase());
        //jump
        else if(e==16){
            // console.log(this.textLabel.isComplet());
            if(this.textLabel.isComplet())this.textLabel.setText(this.wordGen.getWord().toLowerCase());
        }
        //slide
        else if(e == 13){
            if(this.textLabel.isComplet()){
                this.textLabel.setText(this.wordGen.getWord().toLowerCase());
                this.player.jump();
            }
        }
        else{
        	console.log(this.textLabel.checkTypeIn(this.keymap.getKey(e)));
        }
        console.log(e);
    },
    onKeyUp: function(e){
        // console.log("UP : "+e);
    }
});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});


