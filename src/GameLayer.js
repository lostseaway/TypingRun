var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        


        this.keymap = new MappingKey();
        

 		this.wordGen = new WordGen(0);

        this.bg = new BackgroundLayer();
        this.addChild(this.bg);
        // this.bg.scheduleUpdate();

 		this.textLabel = new LabelContorll();
 		this.textLabel.setPosition(cc.p(300,400));
 		this.addChild(this.textLabel);

        this.stage = new Stage();
        this.stage.setPosition(cc.p(0,0));
        this.addChild(this.stage);
        this.stage.scheduleUpdate();

        this.player = new Player(this.stage,this);
        this.player.setPosition(cc.p(70,200));
        this.player.scheduleUpdate();
        this.addChild(this.player);
 		this.setKeyboardEnabled( true );

        this.playerhealth = new PlayerHealthBar();
        this.playerhealth.setPosition(cc.p(30,550));
        this.addChild(this.playerhealth);

        this.player.setHealthBar(this.playerhealth);
        
        var coin = cc.Sprite.create( 'img/coin_top.png' );
        coin.setPosition(cc.p(570,560));
        coin.setScale(0.7,0.7);
        this.addChild(coin);

        this.score = 0;

        this.scoreLabel = cc.LabelTTF.create( '0', 'Arial', 40);
        this.scoreLabel.setPosition( new cc.Point( 680, 555 ) );
        this.scoreLabel.setColor( cc.c3b( 0, 0, 0 ));
        this.scoreLabel.setString("X 00000");
        this.addChild(this.scoreLabel);
        // $(function() {
        //     // console.log("asdfasd");
        // });
        
        return true;
    },
    onKeyDown: function(e){
        if(e== 32){
            console.log(this.player.getPosition().y);
        }
        if(e==16) {
            this.stage.started = true;
            this.textLabel.setText(this.wordGen.getWord().toLowerCase());
            cc.AudioEngine.getInstance().playMusic( 'sound/theme.mp3', true );
        }
        //jump
        else if(e==16){
            // console.log(this.textLabel.isComplet());
            if(this.textLabel.isComplet())this.textLabel.setText(this.wordGen.getWord().toLowerCase());
        }
        //slide
        else if(e == 32 || e== 13){
            if(this.textLabel.isComplet()){
                this.textLabel.setText(this.wordGen.getWord().toLowerCase());
                this.player.jump();
            }
        }
        else{
        	this.textLabel.checkTypeIn(this.keymap.getKey(e));
        }
        // console.log(e);
    },
    onKeyUp: function(e){
        // console.log("UP : "+e);
    },

    scoring: function(p){
        this.score+=p;
        var tmp = ""
        if(this.score < 10) tmp = "X 0000"+this.score;
        else if(this.score < 100) tmp = "X 000"+this.score;
        else if(this.score < 1000) tmp = "X 00"+this.score;
        else if(this.score < 10000) tmp = "X 0"+this.score;
        else if(this.score < 100000) tmp = "X "+this.score;

        this.scoreLabel.setString(tmp);
    },

    endGame: function(){
        this.bg.unscheduleUpdate();
        var menu = confirm("You're Dead. Your score is"+this.score+"! \n\"OK\" To Submit your score \"Cancel\" to Restart!");
        if(!menu) location.reload();
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


