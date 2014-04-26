var cocos2dApp = cc.Application.extend({
    config: document[ 'ccConfig' ],

    ctor: function( scene ) {
        this._super();
        this.startScene = scene;
        cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
        cc.initDebugSetting();
        cc.setup( this.config[ 'tag' ] );
        cc.AppController.shareAppController().didFinishLaunchingWithOptions();
    },

    applicationDidFinishLaunching: function() {
        // initialize director
        var director = cc.Director.getInstance();

        //cc.EGLView.getInstance()._adjustSizeToBrowser();

        // turn on display FPS
        director.setDisplayStats( this.config[ 'showFPS' ] );

        // set FPS. the default value is 1.0/60 if you don't call this
        director.setAnimationInterval( 1.0 / this.config[ 'frameRate' ] );

        director.runWithScene( new this.startScene() );

        cc.LoaderScene.preload(g_resources, function(){
                director.replaceScene(new this.startScene());
        },this);
        return true;
    }
});

var myApp = new cocos2dApp( StartScene );