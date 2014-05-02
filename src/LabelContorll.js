var LabelContorll = cc.Node.extend({
	ctor: function(){
		this._super();
		this.fontSize = 40;
		this.passed = cc.LabelTTF.create( '0', 'Arial', this.fontSize );
        this.passed.setPosition( new cc.Point( 0, 0 ) );
        this.passed.setColor( cc.c3b( 200, 0, 0 ));
        this.passed.setAnchorPoint(cc.p(0,0));
        this.addChild( this.passed, 1);
        this.passed.setString("Pass Left Shift To START!");
	
		this.nonPass = cc.LabelTTF.create( '0', 'Arial', this.fontSize );
        this.nonPass.setPosition( new cc.Point( 0, 0 ) );
        this.nonPass.setColor( cc.c3b( 0, 0, 0 ));
        this.nonPass.setAnchorPoint(cc.p(0,0));
        this.addChild( this.nonPass, 1);
        this.nonPass.setString("");

        this.word = "";
        this.wIndex = 0;
	},
	setText: function(word){
		this.word = word;
		this.wIndex = 0;
		this.nonPass.setString(this.word);
		this.nonPass.setPosition( new cc.Point( 0, 0 ) );
		this.passed.setString("");
	},

	checkTypeIn: function(e){
		if(e == this.word[this.wIndex]){
			var text = this.passed.getString();
			this.passed.setString(text+e);
			this.nonPass.setString(this.nonPass.getString().substr(1));
			// console.log(this.nonPass.getBoundingBox().width);
			// console.log();
			// console.log(cc.rectGetMaxX(nonPassBox));
			this.nonPass.setPosition(cc.p(this.passed.getBoundingBox().width,0));
			this.wIndex++;
			return true;
		}
		else{
			this.wIndex = 0;
			this.nonPass.setString(this.word);
			this.nonPass.setPosition( new cc.Point( 0, 0 ) );
			this.passed.setString("");
			return false;
		}
		
	},

	isComplet :function(){
		// console.log("word length : "+(this.word.length)+" windex : "+this.wIndex);
		if(this.word.length == this.wIndex)return true;
		return false;
	}
});