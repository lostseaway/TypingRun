var GameLayer = cc.LayerColor.extend({
    init: function( diff , sound ) {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.isSound = sound;
        // console.log(diff);
        this.isSound = true;
        this.level = 0;


        this.state = 0;
        this.keymap = new MappingKey();
        
        this.initGame();
 		
        this.setMouseEnabled( true );
        this.setKeyboardEnabled( true );
        
       
        this.setDiff( diff );
        return true;
    },
    onKeyDown: function( e ){
        if(e==16 && !this.stage.started) {
            this.stage.started = true;
            this.shif.removeFromParent( true );
            this.textLabel.setText(this.wordGen.getWord().toLowerCase());
            
            if(this.isSound){
                cc.AudioEngine.getInstance().playMusic( 'sound/theme.mp3', true );
            }
        }

        if(this.stage.started){
            if(e == 32 || e== 13){
                if(this.textLabel.isComplet()){
                    this.textLabel.setText( this.wordGen.getWord().toLowerCase() );
                    this.player.jump();
                }
            }
            else{
            	this.textLabel.checkTypeIn( this.keymap.getKey( e ) );
            }
        }
        // console.log(e);
    },
    
    onMouseMoved: function( event ){
        var loc = event.getLocation();
        var sb = this.sound_butt.getBoundingBoxToWorld();

        if(cc.rectContainsPoint( sb , loc )){
            this.sound_butt.setOpacity( 1000 );
        }else{
            this.sound_butt.setOpacity( 80 );
        }
    },

    onMouseDown: function(event){
        var loc = event.getLocation();
        var sb = this.sound_butt.getBoundingBoxToWorld();
        if( cc.rectContainsPoint( sb , loc ) ){
            if( this.isSound ){
                this.isSound = false;
                this.sound_butt.initWithFile( "img/menu/nsound.png" );
                cc.AudioEngine.getInstance().stopMusic();
            }
            else{
                this.isSound = true;
                this.sound_butt.initWithFile( "img/menu/sound.png" );
                cc.AudioEngine.getInstance().playMusic( 'sound/theme.mp3', true );
            }
        }
    },


    scoring: function( p ){
        this.score += p;
        var tmp = "";

        if( this.score < 10 ) 
            tmp = "X 0000"+this.score;
        else if( this.score < 100 ) 
            tmp = "X 000"+this.score;
        else if( this.score < 1000 )
            tmp = "X 00"+this.score;
        else if( this.score < 10000 ) 
            tmp = "X 0"+this.score;
        else if( this.score < 100000 ) 
            tmp = "X "+this.score;

        this.scoreLabel.setString( tmp );
    },

    endGame: function(){
        this.bg.unscheduleUpdate();
        var menu = confirm( "You're Dead. Your score is " + this.score + " ! \n\n\"OK\" To Submit your Score \n\"Cancel\" to Restart!" );
        
        if( !menu ){
            var director = cc.Director.getInstance();
            director.replaceScene(cc.TransitionFade.create( 1.5 , new SelectScene(this.isSound) ) );
        }
        else{
            var name = prompt( "Please enter your name","Anonymous NyanCat" );
            
            if( name != null ){
                this.postScore( name );
            }
            else{
                var director = cc.Director.getInstance();
                director.replaceScene(cc.TransitionFade.create( 1.5, new SelectScene( this.isSound ) ) );
            }
            
            
        }
    },

    postScore: function( pName ){
        $.post( "src/post_score.php", { name: pName, score: this.score ,level: this.level })
        .done(function( data ) {
            alert( data );
            var director = cc.Director.getInstance();
            director.replaceScene( cc.TransitionFade.create( 1.5 , new SelectScene( this.isSound ) ) );
         });
    },

    setDiff: function( n ){
        this.level = n;
        this.wordGen = new WordGen( this.level );
    },

    initGame: function(){
        this.bg = new BackgroundLayer();
        this.addChild( this.bg );
        

        this.textLabel = new LabelContorll();
        this.textLabel.setPosition( cc.p( 350 , 400 ) );
        this.addChild(this.textLabel);

        this.stage = new Stage();
        this.stage.setPosition( cc.p( 0 , 0 ) );
        this.addChild(this.stage);
        this.stage.scheduleUpdate();

        this.player = new Player( this.stage , this );
        this.player.setPosition(cc.p( 70 , 200 ) );
        this.player.scheduleUpdate();
        this.addChild(this.player);



        this.playerhealth = new PlayerHealthBar();
        this.playerhealth.setPosition( cc.p( 30 , 550 ) );
        this.addChild(this.playerhealth);

        this.player.setHealthBar( this.playerhealth );
        
        var coin = cc.Sprite.create( 'img/coin_top.png' );
        coin.setPosition( cc.p( 570 , 560 ) );
        coin.setScale( 0.7 , 0.7 );
        this.addChild( coin );

        this.score = 0;

        this.scoreLabel = cc.LabelTTF.create( '0', 'Arial', 40);
        this.scoreLabel.setPosition( new cc.Point( 680 , 555 ) );
        this.scoreLabel.setColor( cc.c3b( 0 ,  0 , 0 ) );
        this.scoreLabel.setString( "X 00000" );
        this.addChild(this.scoreLabel);

        if(this.isSound) this.sound_butt = cc.Sprite.create( 'img/menu/sound.png' );
        else this.sound_butt = cc.Sprite.create( 'img/menu/nsound.png' );
        this.sound_butt.setPosition( cc.p( 30,30 ) );
        this.sound_butt.setOpacity( 80 );
        this.sound_butt.setScaleX( 0.08 );
        this.sound_butt.setScaleY( 0.08 );
        this.addChild( this.sound_butt );

        this.shif = cc.Sprite.create();

        this.shif.createAction = function(){
            var animation = new cc.Animation.create();
            for ( var i = 0 ; i <= 1 ; i++ ){
                animation.addSpriteFrameWithFile( 'img/menu/pressShift_'+i+'.png');
            }
            animation.setDelayPerUnit( 0.5 );
            return cc.RepeatForever.create( cc.Animate.create( animation ) );
        }

        this.shif.runAction(this.shif.createAction());
        this.shif.setPosition( cc.p( 400,400 ) );

        this.addChild( this.shif );
    }
});

var StartScene = cc.Scene.extend({
    ctor: function( diff , sound ){
        this._super();
        var layer = new GameLayer();
        layer.init( diff , sound );
        this.addChild( layer );
    }
});


