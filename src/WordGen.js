var WordGen = cc.Node.extend({
	ctor: function(n){
		this.level = n;
		this.word = new Word();
		this.wordSet = this.getWordSet();

	},
	getWordSet: function(){
		if(this.level == 0)return this.word.easy;
		if(this.level == 1)return this.word.normal;
		if(this.level == 2)return this.word.hard;
		if(this.level == 3)return this.word.extram;
	},
	getWord:function(){
		var a = Math.round(Math.random() * this.wordSet.length);
		return this.wordSet[a];
	}
});