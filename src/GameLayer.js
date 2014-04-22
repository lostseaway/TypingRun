var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.keymap = new MappingKey();
        

 		this.wordGen = new WordGen(0);

 		this.textLabel = new LabelContorll();
 		this.textLabel.setPosition(cc.p(300,400));
 		this.addChild(this.textLabel);
 		this.setKeyboardEnabled( true );
        return true;
    },
    onKeyDown: function(e){
        if(e==32) this.textLabel.setText(this.wordGen.getWord().toLowerCase());
        else{
        	console.log(this.textLabel.checkTypeIn(this.keymap.getKey(e)));
        }
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


