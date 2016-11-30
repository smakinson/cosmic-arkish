(function (lib, img, cjs, ss, an) {

var p; // shortcut to reference prototypes
lib.webFontTxtInst = {}; 
var loadedTypekitCount = 0;
var loadedGoogleCount = 0;
var gFontsUpdateCacheList = [];
var tFontsUpdateCacheList = [];
lib.ssMetadata = [];



lib.updateListCache = function (cacheList) {		
	for(var i = 0; i < cacheList.length; i++) {		
		if(cacheList[i].cacheCanvas)		
			cacheList[i].updateCache();		
	}		
};		

lib.addElementsToCache = function (textInst, cacheList) {		
	var cur = textInst;		
	while(cur != exportRoot) {		
		if(cacheList.indexOf(cur) != -1)		
			break;		
		cur = cur.parent;		
	}		
	if(cur != exportRoot) {		
		var cur2 = textInst;		
		var index = cacheList.indexOf(cur);		
		while(cur2 != cur) {		
			cacheList.splice(index, 0, cur2);		
			cur2 = cur2.parent;		
			index++;		
		}		
	}		
	else {		
		cur = textInst;		
		while(cur != exportRoot) {		
			cacheList.push(cur);		
			cur = cur.parent;		
		}		
	}		
};		

lib.gfontAvailable = function(family, totalGoogleCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], gFontsUpdateCacheList);		

	loadedGoogleCount++;		
	if(loadedGoogleCount == totalGoogleCount) {		
		lib.updateListCache(gFontsUpdateCacheList);		
	}		
};		

lib.tfontAvailable = function(family, totalTypekitCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], tFontsUpdateCacheList);		

	loadedTypekitCount++;		
	if(loadedTypekitCount == totalTypekitCount) {		
		lib.updateListCache(tFontsUpdateCacheList);		
	}		
};
// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Tween4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF36CC").ss(9.9,2,1).p("A2vN3QDrAZEOgwQELgwD+huQEEhxDIifQDVioB0jFQDYlwGJk9QCdh+CLhOQCDhJA9gCQpzABnzDTQl8ChjADeQg0A8iuDcQimDRhyB/Ql0GjlQCYQgBABAAAAIAAgBQAAAAABAAg");
	this.shape.setTransform(32,-0.7,0.062,0.062,38.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#FFFFFF","#FF61EE","#ED25AF"],[0,0.482,1],97,217.5,-100.7,-213.1).s().p("A2vN3QFQiYF0mjQByh/CmjRQCujcA0g8QDAjeF8ihQHzjTJzgBQg9ACiDBJQiKBOieB+QmJE9jYFwQh0DFjUCoQjJCfkEBxQj+BukKAwQi0AgijAAQhUAAhPgJgA2wN3IABAAIgBABg");
	this.shape_1.setTransform(32,-0.7,0.062,0.062,38.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.lf(["#FFFFFF","#FF6ABF","#ED1FDD"],[0,0.482,1],-370,0,370.1,0).s().p("Egn4A4CQo8m5ktqKQkgptAOqyQANq1E9pfQFNqAJgmkQEkjJIUiuQCng2EphWQFOhfB8gnQIIiiEAisQFPjgAzlIQAdi/CmkDQCXjrDsj8QDgjuDxi/QCUh1B+hOQhHBagtC8QhFEdAAHNQAAITh1HcQikKcloFpQiXCWkCC5QkmDKiNBpQjxC1iNCiQizDNhMDrQBqhqEFiQQIIkiMEjBQOdjnMGloQFpioDdiYQDmifAlhyQgtEXi8DvQiVC+kWDOQhhBHibBpIkBCuQk0DViqCqQl9F8hyHlQgwDIgOEHQgJCfAAFUQBIjHEbixQDxiXF0h7QE7hoFVhAQEug4CzgBQhJACiZBCQitBKipBwQjHCEiFCSQidCsgtCrQjlNlqFKvQjvD/kJDCQjZCfihBFQjxBnkSBDQmGBgmHADIgdABQwwAAt6qvg");
	this.shape_2.setTransform(-9.6,-2,0.062,0.062,38.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.lf(["#FFFFFF","#FF6ABF","#ED1FDD"],[0,0.482,1],-7.6,0,7.7,0).s().p("ABMgoQhIAhhQAwQBChRBWAAg");
	this.shape_3.setTransform(16.1,-15.4,0.062,0.062,38.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.lf(["#FFFFFF","#FFB1D0","#ED1C24"],[0,0.482,1],120.5,127.1,-140.5,-132.7).s().p("A0KKkQAPiJAMhFQAwkTCLjAQGgo/VQhPQDPAAC4guQDdg2AAhYQBDPA1CCcQmFAtlzCZQl7CcjQDRQALgwANh0g");
	this.shape_4.setTransform(-5.5,-19.5,0.062,0.062,38.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.lf(["#FFFFFF","#FF91DA","#ED1C24"],[0,0.482,1],198.3,234.4,-286.3,-155.5).s().p("AvbM+QAAkmDukXQDgkIFgieQCWhDDNhIQDUhKBIggQCMg+BxhXQCEhmCJioQg8IVj4EoQhiB0iIBcQhcA9iYBLQiPBGivAwQjGAxhfAYQinArh1A3QibBJiKB8g");
	this.shape_5.setTransform(11,-1.7,0.062,0.062,38.9);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.lf(["#FFFFFF","#FFCCB6","#ED1C24"],[0,0.482,1],131.1,134.2,-131.8,-116.8).s().p("AxNEgQB1h8CKhRQE3izIbgRQE1gKCygTQDSgVCMgrQCSgtBshPQBqhPBeiDQjtH+lbC1QiUBNi8AgQiOAYjeAFImDABQjtABiQAPQmTAqiGDBQBkiZBdhkg");
	this.shape_6.setTransform(8.2,11.4,0.062,0.062,38.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#FF36CC").ss(12.9,2,1).p("A7ua5QE1AAFQg7QF+hDFWiGQNNlJGSp8QCqkNBYl7QAfiKAei+QAfjWAQhmQA5lvBWi5QB3kBDwhzQoMAAldBHQl4BLkDCtQkGCwi7EyQi2EriMHZQipI9hNDfQh4FghyDHQh/DeioB6QirB8kDA1g");
	this.shape_7.setTransform(24.7,8.4,0.062,0.062,38.9);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.lf(["#FFFFFF","#FF61EE","#ED25AF"],[0,0.482,1],171.4,187.1,-156.8,-173.9).s().p("A0gYIQCoh6B/jeQByjHB4lgQBNjfCqo9QCLnZC2krQC7kyEGiwQEEitF3hLQFdhHIMAAQjwBzh3EBQhWC5g5FvQgQBlgfDXQgdC9ggCKQhYF8iqENQmRJ8tNFJQlXCGl+BDQlPA7k1AAQECg1Crh8g");
	this.shape_8.setTransform(24.5,8.3,0.062,0.062,38.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FF33CC").s().p("EgSTBTrQmwgHnfh9Qnfh9mnjZQpmk6nEnhQnDnfj/phQlgtMgnsTQgmsSEUrLQDUojGEnhQGEnhIumVQHilfJsi7QFihrJNhaQEVgqBegXQAqhNBjjcQDIm6CWj4QEFmsFXkyQHImWJsjMQJrjNMFAAIAAAAQERABDQCwQDQCwAuENQAtENiLDqQiMDrkBBZQi7BBhxBAQhBAmgaAbQgLAhgDBrQgBBBABB+QABDygHCNQgMDxgpDbQgiCzg1C4QIMjgFMkBQGMkzCel8QBXjTC/h+QC7h7DfAAQBrAABoAfQESBRCVD0QCWDzg0EZQhwJli2HqQi1HnkMGdQiGDNiZC6QApgEApAAQCUAACJA4QDRBXB9C8QB+C8AADgQAAE6hxEPQhxERjgDiQiMCNjICJQh3BRj0CRQjTB8hvBLQiaBohnBhQjpDdhgFDQiyJblVHyQlUHzneFjQnYFfo2C3Qo0C2ppABQj2gBj0gdgEAQ4hDaQnqEBlJHkQh7C1h2DuQgrBXiKExQhjDahABoQhZCThfA/Qh8BTkfA2Ql0A5jaAmQmNBGkpBqQmQCOlCDqQuuKtlbN/Qm/SGJRWKQDbINGNGPQFZFcHPDsQGJDKG2BnQF1BYE9AAQDfAdDbAAQHzAAHFiSQHBiRF1kWQF4kYEOmJQEUmSCSnvQCSntFklfQCOiMC+iFQCDhcDWh+QD+iXBGguQCphtBmhiQEAj0AAlQQiWCWioBCQiOA3inAAQhLAAhbgLQg7gIhkgRIiYgYQhSgLg8AAQgngBglAFQtUBvluDKQjCBshrCYQhpCTgjDRQAAl0DulHQD0lPHJjtQQ0ouIjtJQDyl1ChnJQCLmLBdn7QjcISn0GYQmdFSp8EUQmqC4rADgQlkBvijA0QkSBZisBEQB9hICdilQCsi1CcjsQGDpMB8qQQAwkBgCl+QgBjaACg3QAEiPAThmQAvj9CziqQDRjHG/iaQuXgBppFFg");
	this.shape_9.setTransform(-7.2,-0.8,0.062,0.062,38.9);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("EgKpBOUQjoAAjqgdQllgDmZhiQnnh1mxjgQn/kIl+mEQm5m+j2pNQlDsHgmrMQglrOD5qFQDAnwFkm3QFkm3IBl2QG0k8IwioQFEhhIzhWQDigiBjgVQCogiA2gkQAqgcBNiVQArhVBWi+QC5mZCHjhQDpmEEtkPQMorWWNAAQCIAABoBYQBoBYAXCGQAWCHhFB1QhGB2iBAsQnkCohtDDQgsBOgMCLQgIBYACDUQABDhgGCAQgLDeglDEQhoIpkYIIQOXktIEk4QLYm5D+plQAshpBfg/QBeg9BvAAQA2AAA0APQCJApBKB5QBLB6gZCMQhQGwhqFZQiEGpjAFpQnNNgtoJaIAOAAQBPAABfAMQA5AHBuATIAQADQBaAPAwAGQBHAJA2AAQBeAABKgbQBigmBhhgQA1g1BFgcQBEgcBKAAQBLAABDAdQBpArA+BeQA/BdAABxQAAHLk6FNQh8CCi8CCQhxBNjnCJQjbCBhrBIQiyB3h/B2QlAErh8GmQihIhkzHBQkyHBmtE/QmoE8n8CjQn8CkosAAg");
	this.shape_10.setTransform(-7.2,-0.8,0.062,0.062,38.9);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#FF00CC").ss(24.3,0,0,4).p("EAAAhBcQNUAAMLFJQLwE+JDJEQJEJDE+LwQFJMKAANUQAANUlJMLQk+LvpEJEQpDJErwE+QsKFJtVAAQtTAAsKlJQrwk+pEpEQpEpEk+rvQlJsLAAtUQAAtTFJsLQE+rvJEpEQJEpELwk+QMKlJNTAAg");
	this.shape_11.setTransform(-16.3,0.9,0.062,0.062,38.9);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FF00CC").s().p("AvbZMQiwgehziHQhziIAAiyIAAhVQgBkpAOiNQAYjlBPi7QBbjVCsi8QCsi8EkjMQBRg4Bgg+IDliSQDJiBBTg3QCThjAygwQAUiaBqhyQBrhzCagfQAugJAxAAQCSAAB6BRQB8BSA4CJQCgGDgpFlQgpFkjuErQigDJkFC8QidBylLDEQkWClh8BZQjRCXgjBnQgyCViABaQh/BaiaAAQglAAgrgGgAL5u0Qg1BSh3BeQhhBMjBB9ImZEGQheA9hEAvQj2CsiICTQiCCNg5CZQgyCDgMC9QgFBSAAE/QBakIF3kEQB3hSDkiIQEGicBgg+QGakJCOkBQC7lUi3m7QAABhg5BXg");
	this.shape_12.setTransform(23.3,-5.2,0.062,0.062,38.9);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.lf(["#FFFFFF","#FF9DB1","#ED1C24"],[0,0.482,1],99.4,120.6,-107.7,-111.6).s().p("Au0VcQhYgOg5hEQg6hEAAhZIAAhWQgBkVAQiRQAWjIBCiYQBJipCUidQCaikEGi3QBFgxBkhAIDkiSQE/jLBnhOQCnh9AAhDQAAhXA3hDQA4hDBVgRQAYgEAXAAQBJAAA9AoQA+ApAcBFQELKHl+HrQiSC7j/C3QiWBskvC0QlLDFiJBpQjlCwg2ChQgaBKg/AuQhAAshNAAQgTAAgVgDg");
	this.shape_13.setTransform(23.3,-5.2,0.062,0.062,38.9);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#ED1C24").s().p("A5KH1QA7inBBh8QCplEEpjMQFtj7Jkh1QK4iEQeAhIk3GNMgweAScQBNjvATg0g");
	this.shape_14.setTransform(-4.2,-22,0.062,0.062,38.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-76.9,-49.1,126.5,96.3);


(lib.Tween3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF36CC").ss(9.9,2,1).p("A2vN3QDrAZEOgwQELgwD+huQEEhxDIifQDVioB0jFQDYlwGJk9QCdh+CLhOQCDhJA9gCQpzABnzDTQl8ChjADeQg0A8iuDcQimDRhyB/Ql0GjlQCYQgBABAAAAIAAgBQAAAAABAAg");
	this.shape.setTransform(32,-0.7,0.062,0.062,38.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#FFFFFF","#FF61EE","#ED25AF"],[0,0.482,1],97,217.5,-100.7,-213.1).s().p("A2vN3QFQiYF0mjQByh/CmjRQCujcA0g8QDAjeF8ihQHzjTJzgBQg9ACiDBJQiKBOieB+QmJE9jYFwQh0DFjUCoQjJCfkEBxQj+BukKAwQi0AgijAAQhUAAhPgJgA2wN3IABAAIgBABg");
	this.shape_1.setTransform(32,-0.7,0.062,0.062,38.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.lf(["#FFFFFF","#FF6ABF","#ED1FDD"],[0,0.482,1],-7.6,0,7.7,0).s().p("ABMgoQhIAhhQAwQBChRBWAAg");
	this.shape_2.setTransform(16.1,-15.3,0.062,0.062,38.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.lf(["#FFFFFF","#FF6ABF","#ED1FDD"],[0,0.482,1],-370,0,370.1,0).s().p("Egn4A4CQo8m5ktqKQkgptAOqyQANq1E9pfQFNqAJgmkQEkjJIUiuQCng2EphWQFOhfB8gnQIIiiEAisQFPjgAzlIQAdi/CmkDQCXjrDsj8QDgjuDxi/QCUh1B+hOQhHBagtC8QhFEdAAHNQAAITh1HcQikKcloFpQiXCWkCC5QkmDKiNBpQjxC1iNCiQizDNhMDrQBqhqEFiQQIIkiMEjBQOdjnMGloQFpioDdiYQDmifAlhyQgtEXi8DvQiVC+kWDOQhhBHibBpIkBCuQk0DViqCqQl9F8hyHlQgwDIgOEHQgJCfAAFUQBIjHEbixQDxiXF0h7QE7hoFVhAQEug4CzgBQhJACiZBCQitBKipBwQjHCEiFCSQidCsgtCrQjlNlqFKvQjvD/kJDCQjZCfihBFQjxBnkSBDQmGBgmHADIgdABQwwAAt6qvg");
	this.shape_3.setTransform(-9.6,-1.9,0.062,0.062,38.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.lf(["#FFFFFF","#FFB1D0","#ED1C24"],[0,0.482,1],120.5,127.1,-140.5,-132.7).s().p("A0KKkQAPiJAMhFQAwkTCLjAQGgo/VQhPQDPAAC4guQDdg2AAhYQBDPA1CCcQmFAtlzCZQl7CcjQDRQALgwANh0g");
	this.shape_4.setTransform(-5.5,-19.5,0.062,0.062,38.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.lf(["#FFFFFF","#FF91DA","#ED1C24"],[0,0.482,1],198.3,234.4,-286.3,-155.5).s().p("AvbM+QAAkmDukXQDgkIFgieQCWhDDNhIQDUhKBIggQCMg+BxhXQCEhmCJioQg8IVj4EoQhiB0iIBcQhcA9iYBLQiPBGivAwQjGAxhfAYQinArh1A3QibBJiKB8g");
	this.shape_5.setTransform(11,-1.6,0.062,0.062,38.9);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.lf(["#FFFFFF","#FFCCB6","#ED1C24"],[0,0.482,1],131.1,134.2,-131.8,-116.8).s().p("AxNEgQB1h8CKhRQE3izIbgRQE1gKCygTQDSgVCMgrQCSgtBshPQBqhPBeiDQjtH+lbC1QiUBNi8AgQiOAYjeAFImDABQjtABiQAPQmTAqiGDBQBkiZBdhkg");
	this.shape_6.setTransform(8.2,11.5,0.062,0.062,38.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#FF36CC").ss(12.9,2,1).p("A7ua5QE1AAFQg7QF+hDFWiGQNNlJGSp8QCqkNBYl7QAfiKAei+QAfjWAQhmQA5lvBWi5QB3kBDwhzQoMAAldBHQl4BLkDCtQkGCwi7EyQi2EriMHZQipI9hNDfQh4FghyDHQh/DeioB6QirB8kDA1g");
	this.shape_7.setTransform(24.7,8.5,0.062,0.062,38.9);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.lf(["#FFFFFF","#FF61EE","#ED25AF"],[0,0.482,1],171.4,187.1,-156.8,-173.9).s().p("A0gYIQCoh6B/jeQByjHB4lgQBNjfCqo9QCLnZC2krQC7kyEGiwQEEitF3hLQFdhHIMAAQjwBzh3EBQhWC5g5FvQgQBlgfDXQgdC9ggCKQhYF8iqENQmRJ8tNFJQlXCGl+BDQlPA7k1AAQECg1Crh8g");
	this.shape_8.setTransform(24.5,8.3,0.062,0.062,38.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FF33CC").s().p("EgSTBTrQmwgHnfh9Qnfh9mnjZQpmk6nEnhQnDnfj/phQlgtMgnsTQgmsSEUrLQDUojGEnhQGEnhIumVQHilfJsi7QFihrJNhaQEVgqBegXQAqhNBjjcQDIm6CWj4QEFmsFXkyQHImWJsjMQJrjNMFAAIAAAAQERABDQCwQDQCwAuENQAtENiLDqQiMDrkBBZQi7BBhxBAQhBAmgaAbQgLAhgDBrQgBBBABB+QABDygHCNQgMDxgpDbQgiCzg1C4QIMjgFMkBQGMkzCel8QBXjTC/h+QC7h7DfAAQBrAABoAfQESBRCVD0QCWDzg0EZQhwJli2HqQi1HnkMGdQiGDNiZC6QApgEApAAQCUAACJA4QDRBXB9C8QB+C8AADgQAAE6hxEPQhxERjgDiQiMCNjICJQh3BRj0CRQjTB8hvBLQiaBohnBhQjpDdhgFDQiyJblVHyQlUHzneFjQnYFfo2C3Qo0C2ppABQj2gBj0gdgEAQ4hDaQnqEBlJHkQh7C1h2DuQgrBXiKExQhjDahABoQhZCThfA/Qh8BTkfA2Ql0A5jaAmQmNBGkpBqQmQCOlCDqQuuKtlbN/Qm/SGJRWKQDbINGNGPQFZFcHPDsQGJDKG2BnQF1BYE9AAQDfAdDbAAQHzAAHFiSQHBiRF1kWQF4kYEOmJQEUmSCSnvQCSntFklfQCOiMC+iFQCDhcDWh+QD+iXBGguQCphtBmhiQEAj0AAlQQiWCWioBCQiOA3inAAQhLAAhbgLQg7gIhkgRIiYgYQhSgLg8AAQgngBglAFQtUBvluDKQjCBshrCYQhpCTgjDRQAAl0DulHQD0lPHJjtQQ0ouIjtJQDyl1ChnJQCLmLBdn7QjcISn0GYQmdFSp8EUQmqC4rADgQlkBvijA0QkSBZisBEQB9hICdilQCsi1CcjsQGDpMB8qQQAwkBgCl+QgBjaACg3QAEiPAThmQAvj9CziqQDRjHG/iaQuXgBppFFg");
	this.shape_9.setTransform(-7.2,-0.8,0.062,0.062,38.9);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("EgKpBOUQjoAAjqgdQllgDmZhiQnnh1mxjgQn/kIl+mEQm5m+j2pNQlDsHgmrMQglrOD5qFQDAnwFkm3QFkm3IBl2QG0k8IwioQFEhhIzhWQDigiBjgVQCogiA2gkQAqgcBNiVQArhVBWi+QC5mZCHjhQDpmEEtkPQMorWWNAAQCIAABoBYQBoBYAXCGQAWCHhFB1QhGB2iBAsQnkCohtDDQgsBOgMCLQgIBYACDUQABDhgGCAQgLDeglDEQhoIpkYIIQOXktIEk4QLYm5D+plQAshpBfg/QBeg9BvAAQA2AAA0APQCJApBKB5QBLB6gZCMQhQGwhqFZQiEGpjAFpQnNNgtoJaIAOAAQBPAABfAMQA5AHBuATIAQADQBaAPAwAGQBHAJA2AAQBeAABKgbQBigmBhhgQA1g1BFgcQBEgcBKAAQBLAABDAdQBpArA+BeQA/BdAABxQAAHLk6FNQh8CCi8CCQhxBNjnCJQjbCBhrBIQiyB3h/B2QlAErh8GmQihIhkzHBQkyHBmtE/QmoE8n8CjQn8CkosAAg");
	this.shape_10.setTransform(-7.2,-0.8,0.062,0.062,38.9);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#FF00CC").ss(24.3,0,0,4).p("EAAAhBcQNUAAMLFJQLwE+JDJEQJEJDE+LwQFJMKAANUQAANUlJMLQk+LvpEJEQpDJErwE+QsKFJtVAAQtTAAsKlJQrwk+pEpEQpEpEk+rvQlJsLAAtUQAAtTFJsLQE+rvJEpEQJEpELwk+QMKlJNTAAg");
	this.shape_11.setTransform(-16.3,1,0.062,0.062,38.9);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FF00CC").s().p("AvbZMQiwgehziHQhziIAAiyIAAhVQgBkpAOiNQAYjlBPi7QBbjVCsi8QCsi8EkjMQBRg4Bgg+IDliSQDJiBBTg3QCThjAygwQAUiaBqhyQBrhzCagfQAugJAxAAQCSAAB6BRQB8BSA4CJQCgGDgpFlQgpFkjuErQigDJkFC8QidBylLDEQkWClh8BZQjRCXgjBnQgyCViABaQh/BaiaAAQglAAgrgGgAL5u0Qg1BSh3BeQhhBMjBB9ImZEGQheA9hEAvQj2CsiICTQiCCNg5CZQgyCDgMC9QgFBSAAE/QBakIF3kEQB3hSDkiIQEGicBgg+QGakJCOkBQC7lUi3m7QAABhg5BXg");
	this.shape_12.setTransform(23.3,-5.2,0.062,0.062,38.9);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.lf(["#FFFFFF","#FF9DB1","#ED1C24"],[0,0.482,1],99.4,120.6,-107.7,-111.6).s().p("Au0VcQhYgOg5hEQg6hEAAhZIAAhWQgBkVAQiRQAWjIBCiYQBJipCUidQCaikEGi3QBFgxBkhAIDkiSQE/jLBnhOQCnh9AAhDQAAhXA3hDQA4hDBVgRQAYgEAXAAQBJAAA9AoQA+ApAcBFQELKHl+HrQiSC7j/C3QiWBskvC0QlLDFiJBpQjlCwg2ChQgaBKg/AuQhAAshNAAQgTAAgVgDg");
	this.shape_13.setTransform(23.3,-5.2,0.062,0.062,38.9);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#ED1C24").s().p("A5KH1QA7inBBh8QCplEEpjMQFtj7Jkh1QK4iEQeAhIk3GNMgweAScQBNjvATg0g");
	this.shape_14.setTransform(-4.2,-22,0.062,0.062,38.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-76.9,-49,126.5,96.3);


(lib.Tween2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF36CC").ss(9.9,2,1).p("A2vN3QDrAZEOgwQELgwD+huQEEhxDIifQDVioB0jFQDYlwGJk9QCdh+CLhOQCDhJA9gCQpzABnzDTQl8ChjADeQg0A8iuDcQimDRhyB/Ql0GjlQCYQgBABAAAAIAAgBQAAAAABAAg");
	this.shape.setTransform(32,-0.7,0.062,0.062,38.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#FFFFFF","#FF61EE","#ED25AF"],[0,0.482,1],97,217.5,-100.7,-213.1).s().p("A2vN3QFQiYF0mjQByh/CmjRQCujcA0g8QDAjeF8ihQHzjTJzgBQg9ACiDBJQiKBOieB+QmJE9jYFwQh0DFjUCoQjJCfkEBxQj+BukKAwQi0AgijAAQhUAAhPgJgA2wN3IABAAIgBABg");
	this.shape_1.setTransform(32,-0.7,0.062,0.062,38.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.lf(["#FFFFFF","#FF6ABF","#ED1FDD"],[0,0.482,1],-370,0,370.1,0).s().p("Egn4A4CQo8m5ktqKQkgptAOqyQANq1E9pfQFNqAJgmkQEkjJIUiuQCng2EphWQFOhfB8gnQIIiiEAisQFPjgAzlIQAdi/CmkDQCXjrDsj8QDgjuDxi/QCUh1B+hOQhHBagtC8QhFEdAAHNQAAITh1HcQikKcloFpQiXCWkCC5QkmDKiNBpQjxC1iNCiQizDNhMDrQBqhqEFiQQIIkiMEjBQOdjnMGloQFpioDdiYQDmifAlhyQgtEXi8DvQiVC+kWDOQhhBHibBpIkBCuQk0DViqCqQl9F8hyHlQgwDIgOEHQgJCfAAFUQBIjHEbixQDxiXF0h7QE7hoFVhAQEug4CzgBQhJACiZBCQitBKipBwQjHCEiFCSQidCsgtCrQjlNlqFKvQjvD/kJDCQjZCfihBFQjxBnkSBDQmGBgmHADIgdABQwwAAt6qvg");
	this.shape_2.setTransform(-9.6,-2,0.062,0.062,38.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.lf(["#FFFFFF","#FF6ABF","#ED1FDD"],[0,0.482,1],-7.6,0,7.7,0).s().p("ABMgoQhIAhhQAwQBChRBWAAg");
	this.shape_3.setTransform(16.1,-15.4,0.062,0.062,38.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.lf(["#FFFFFF","#FFB1D0","#ED1C24"],[0,0.482,1],120.5,127.1,-140.5,-132.7).s().p("A0KKkQAPiJAMhFQAwkTCLjAQGgo/VQhPQDPAAC4guQDdg2AAhYQBDPA1CCcQmFAtlzCZQl7CcjQDRQALgwANh0g");
	this.shape_4.setTransform(-5.5,-19.5,0.062,0.062,38.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.lf(["#FFFFFF","#FF91DA","#ED1C24"],[0,0.482,1],198.3,234.4,-286.3,-155.5).s().p("AvbM+QAAkmDukXQDgkIFgieQCWhDDNhIQDUhKBIggQCMg+BxhXQCEhmCJioQg8IVj4EoQhiB0iIBcQhcA9iYBLQiPBGivAwQjGAxhfAYQinArh1A3QibBJiKB8g");
	this.shape_5.setTransform(11,-1.7,0.062,0.062,38.9);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.lf(["#FFFFFF","#FFCCB6","#ED1C24"],[0,0.482,1],131.1,134.2,-131.8,-116.8).s().p("AxNEgQB1h8CKhRQE3izIbgRQE1gKCygTQDSgVCMgrQCSgtBshPQBqhPBeiDQjtH+lbC1QiUBNi8AgQiOAYjeAFImDABQjtABiQAPQmTAqiGDBQBkiZBdhkg");
	this.shape_6.setTransform(8.2,11.4,0.062,0.062,38.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#FF36CC").ss(12.9,2,1).p("A7ua5QE1AAFQg7QF+hDFWiGQNNlJGSp8QCqkNBYl7QAfiKAei+QAfjWAQhmQA5lvBWi5QB3kBDwhzQoMAAldBHQl4BLkDCtQkGCwi7EyQi2EriMHZQipI9hNDfQh4FghyDHQh/DeioB6QirB8kDA1g");
	this.shape_7.setTransform(24.7,8.4,0.062,0.062,38.9);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.lf(["#FFFFFF","#FF61EE","#ED25AF"],[0,0.482,1],171.4,187.1,-156.8,-173.9).s().p("A0gYIQCoh6B/jeQByjHB4lgQBNjfCqo9QCLnZC2krQC7kyEGiwQEEitF3hLQFdhHIMAAQjwBzh3EBQhWC5g5FvQgQBlgfDXQgdC9ggCKQhYF8iqENQmRJ8tNFJQlXCGl+BDQlPA7k1AAQECg1Crh8g");
	this.shape_8.setTransform(24.5,8.3,0.062,0.062,38.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FF33CC").s().p("EgSTBTrQmwgHnfh9Qnfh9mnjZQpmk6nEnhQnDnfj/phQlgtMgnsTQgmsSEUrLQDUojGEnhQGEnhIumVQHilfJsi7QFihrJNhaQEVgqBegXQAqhNBjjcQDIm6CWj4QEFmsFXkyQHImWJsjMQJrjNMFAAIAAAAQERABDQCwQDQCwAuENQAtENiLDqQiMDrkBBZQi7BBhxBAQhBAmgaAbQgLAhgDBrQgBBBABB+QABDygHCNQgMDxgpDbQgiCzg1C4QIMjgFMkBQGMkzCel8QBXjTC/h+QC7h7DfAAQBrAABoAfQESBRCVD0QCWDzg0EZQhwJli2HqQi1HnkMGdQiGDNiZC6QApgEApAAQCUAACJA4QDRBXB9C8QB+C8AADgQAAE6hxEPQhxERjgDiQiMCNjICJQh3BRj0CRQjTB8hvBLQiaBohnBhQjpDdhgFDQiyJblVHyQlUHzneFjQnYFfo2C3Qo0C2ppABQj2gBj0gdgEAQ4hDaQnqEBlJHkQh7C1h2DuQgrBXiKExQhjDahABoQhZCThfA/Qh8BTkfA2Ql0A5jaAmQmNBGkpBqQmQCOlCDqQuuKtlbN/Qm/SGJRWKQDbINGNGPQFZFcHPDsQGJDKG2BnQF1BYE9AAQDfAdDbAAQHzAAHFiSQHBiRF1kWQF4kYEOmJQEUmSCSnvQCSntFklfQCOiMC+iFQCDhcDWh+QD+iXBGguQCphtBmhiQEAj0AAlQQiWCWioBCQiOA3inAAQhLAAhbgLQg7gIhkgRIiYgYQhSgLg8AAQgngBglAFQtUBvluDKQjCBshrCYQhpCTgjDRQAAl0DulHQD0lPHJjtQQ0ouIjtJQDyl1ChnJQCLmLBdn7QjcISn0GYQmdFSp8EUQmqC4rADgQlkBvijA0QkSBZisBEQB9hICdilQCsi1CcjsQGDpMB8qQQAwkBgCl+QgBjaACg3QAEiPAThmQAvj9CziqQDRjHG/iaQuXgBppFFg");
	this.shape_9.setTransform(-7.2,-0.8,0.062,0.062,38.9);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("EgKpBOUQjoAAjqgdQllgDmZhiQnnh1mxjgQn/kIl+mEQm5m+j2pNQlDsHgmrMQglrOD5qFQDAnwFkm3QFkm3IBl2QG0k8IwioQFEhhIzhWQDigiBjgVQCogiA2gkQAqgcBNiVQArhVBWi+QC5mZCHjhQDpmEEtkPQMorWWNAAQCIAABoBYQBoBYAXCGQAWCHhFB1QhGB2iBAsQnkCohtDDQgsBOgMCLQgIBYACDUQABDhgGCAQgLDeglDEQhoIpkYIIQOXktIEk4QLYm5D+plQAshpBfg/QBeg9BvAAQA2AAA0APQCJApBKB5QBLB6gZCMQhQGwhqFZQiEGpjAFpQnNNgtoJaIAOAAQBPAABfAMQA5AHBuATIAQADQBaAPAwAGQBHAJA2AAQBeAABKgbQBigmBhhgQA1g1BFgcQBEgcBKAAQBLAABDAdQBpArA+BeQA/BdAABxQAAHLk6FNQh8CCi8CCQhxBNjnCJQjbCBhrBIQiyB3h/B2QlAErh8GmQihIhkzHBQkyHBmtE/QmoE8n8CjQn8CkosAAg");
	this.shape_10.setTransform(-7.2,-0.8,0.062,0.062,38.9);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#FF00CC").ss(24.3,0,0,4).p("EAAAhBcQNUAAMLFJQLwE+JDJEQJEJDE+LwQFJMKAANUQAANUlJMLQk+LvpEJEQpDJErwE+QsKFJtVAAQtTAAsKlJQrwk+pEpEQpEpEk+rvQlJsLAAtUQAAtTFJsLQE+rvJEpEQJEpELwk+QMKlJNTAAg");
	this.shape_11.setTransform(-16.3,0.9,0.062,0.062,38.9);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FF00CC").s().p("AvbZMQiwgehziHQhziIAAiyIAAhVQgBkpAOiNQAYjlBPi7QBbjVCsi8QCsi8EkjMQBRg4Bgg+IDliSQDJiBBTg3QCThjAygwQAUiaBqhyQBrhzCagfQAugJAxAAQCSAAB6BRQB8BSA4CJQCgGDgpFlQgpFkjuErQigDJkFC8QidBylLDEQkWClh8BZQjRCXgjBnQgyCViABaQh/BaiaAAQglAAgrgGgAL5u0Qg1BSh3BeQhhBMjBB9ImZEGQheA9hEAvQj2CsiICTQiCCNg5CZQgyCDgMC9QgFBSAAE/QBakIF3kEQB3hSDkiIQEGicBgg+QGakJCOkBQC7lUi3m7QAABhg5BXg");
	this.shape_12.setTransform(23.3,-5.2,0.062,0.062,38.9);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.lf(["#FFFFFF","#FF9DB1","#ED1C24"],[0,0.482,1],99.4,120.6,-107.7,-111.6).s().p("Au0VcQhYgOg5hEQg6hEAAhZIAAhWQgBkVAQiRQAWjIBCiYQBJipCUidQCaikEGi3QBFgxBkhAIDkiSQE/jLBnhOQCnh9AAhDQAAhXA3hDQA4hDBVgRQAYgEAXAAQBJAAA9AoQA+ApAcBFQELKHl+HrQiSC7j/C3QiWBskvC0QlLDFiJBpQjlCwg2ChQgaBKg/AuQhAAshNAAQgTAAgVgDg");
	this.shape_13.setTransform(23.3,-5.2,0.062,0.062,38.9);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#ED1C24").s().p("A5KH1QA7inBBh8QCplEEpjMQFtj7Jkh1QK4iEQeAhIk3GNMgweAScQBNjvATg0g");
	this.shape_14.setTransform(-4.2,-22,0.062,0.062,38.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-76.9,-49.1,126.5,96.3);


(lib.Tween1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF36CC").ss(9.9,2,1).p("A2vN3QDrAZEOgwQELgwD+huQEEhxDIifQDVioB0jFQDYlwGJk9QCdh+CLhOQCDhJA9gCQpzABnzDTQl8ChjADeQg0A8iuDcQimDRhyB/Ql0GjlQCYQgBABAAAAIAAgBQAAAAABAAg");
	this.shape.setTransform(32,-0.7,0.062,0.062,38.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#FFFFFF","#FF61EE","#ED25AF"],[0,0.482,1],97,217.5,-100.7,-213.1).s().p("A2vN3QFQiYF0mjQByh/CmjRQCujcA0g8QDAjeF8ihQHzjTJzgBQg9ACiDBJQiKBOieB+QmJE9jYFwQh0DFjUCoQjJCfkEBxQj+BukKAwQi0AgijAAQhUAAhPgJgA2wN3IABAAIgBABg");
	this.shape_1.setTransform(32,-0.7,0.062,0.062,38.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.lf(["#FFFFFF","#FF6ABF","#ED1FDD"],[0,0.482,1],-370,0,370.1,0).s().p("Egn4A4CQo8m5ktqKQkgptAOqyQANq1E9pfQFNqAJgmkQEkjJIUiuQCng2EphWQFOhfB8gnQIIiiEAisQFPjgAzlIQAdi/CmkDQCXjrDsj8QDgjuDxi/QCUh1B+hOQhHBagtC8QhFEdAAHNQAAITh1HcQikKcloFpQiXCWkCC5QkmDKiNBpQjxC1iNCiQizDNhMDrQBqhqEFiQQIIkiMEjBQOdjnMGloQFpioDdiYQDmifAlhyQgtEXi8DvQiVC+kWDOQhhBHibBpIkBCuQk0DViqCqQl9F8hyHlQgwDIgOEHQgJCfAAFUQBIjHEbixQDxiXF0h7QE7hoFVhAQEug4CzgBQhJACiZBCQitBKipBwQjHCEiFCSQidCsgtCrQjlNlqFKvQjvD/kJDCQjZCfihBFQjxBnkSBDQmGBgmHADIgdABQwwAAt6qvg");
	this.shape_2.setTransform(-9.6,-2,0.062,0.062,38.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.lf(["#FFFFFF","#FF6ABF","#ED1FDD"],[0,0.482,1],-7.6,0,7.7,0).s().p("ABMgoQhIAhhQAwQBChRBWAAg");
	this.shape_3.setTransform(16.1,-15.4,0.062,0.062,38.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.lf(["#FFFFFF","#FFB1D0","#ED1C24"],[0,0.482,1],120.5,127.1,-140.5,-132.7).s().p("A0KKkQAPiJAMhFQAwkTCLjAQGgo/VQhPQDPAAC4guQDdg2AAhYQBDPA1CCcQmFAtlzCZQl7CcjQDRQALgwANh0g");
	this.shape_4.setTransform(-5.5,-19.5,0.062,0.062,38.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.lf(["#FFFFFF","#FF91DA","#ED1C24"],[0,0.482,1],198.3,234.4,-286.3,-155.5).s().p("AvbM+QAAkmDukXQDgkIFgieQCWhDDNhIQDUhKBIggQCMg+BxhXQCEhmCJioQg8IVj4EoQhiB0iIBcQhcA9iYBLQiPBGivAwQjGAxhfAYQinArh1A3QibBJiKB8g");
	this.shape_5.setTransform(11,-1.7,0.062,0.062,38.9);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.lf(["#FFFFFF","#FFCCB6","#ED1C24"],[0,0.482,1],131.1,134.2,-131.8,-116.8).s().p("AxNEgQB1h8CKhRQE3izIbgRQE1gKCygTQDSgVCMgrQCSgtBshPQBqhPBeiDQjtH+lbC1QiUBNi8AgQiOAYjeAFImDABQjtABiQAPQmTAqiGDBQBkiZBdhkg");
	this.shape_6.setTransform(8.2,11.4,0.062,0.062,38.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#FF36CC").ss(12.9,2,1).p("A7ua5QE1AAFQg7QF+hDFWiGQNNlJGSp8QCqkNBYl7QAfiKAei+QAfjWAQhmQA5lvBWi5QB3kBDwhzQoMAAldBHQl4BLkDCtQkGCwi7EyQi2EriMHZQipI9hNDfQh4FghyDHQh/DeioB6QirB8kDA1g");
	this.shape_7.setTransform(24.7,8.4,0.062,0.062,38.9);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.lf(["#FFFFFF","#FF61EE","#ED25AF"],[0,0.482,1],171.4,187.1,-156.8,-173.9).s().p("A0gYIQCoh6B/jeQByjHB4lgQBNjfCqo9QCLnZC2krQC7kyEGiwQEEitF3hLQFdhHIMAAQjwBzh3EBQhWC5g5FvQgQBlgfDXQgdC9ggCKQhYF8iqENQmRJ8tNFJQlXCGl+BDQlPA7k1AAQECg1Crh8g");
	this.shape_8.setTransform(24.5,8.3,0.062,0.062,38.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FF33CC").s().p("EgSTBTrQmwgHnfh9Qnfh9mnjZQpmk6nEnhQnDnfj/phQlgtMgnsTQgmsSEUrLQDUojGEnhQGEnhIumVQHilfJsi7QFihrJNhaQEVgqBegXQAqhNBjjcQDIm6CWj4QEFmsFXkyQHImWJsjMQJrjNMFAAIAAAAQERABDQCwQDQCwAuENQAtENiLDqQiMDrkBBZQi7BBhxBAQhBAmgaAbQgLAhgDBrQgBBBABB+QABDygHCNQgMDxgpDbQgiCzg1C4QIMjgFMkBQGMkzCel8QBXjTC/h+QC7h7DfAAQBrAABoAfQESBRCVD0QCWDzg0EZQhwJli2HqQi1HnkMGdQiGDNiZC6QApgEApAAQCUAACJA4QDRBXB9C8QB+C8AADgQAAE6hxEPQhxERjgDiQiMCNjICJQh3BRj0CRQjTB8hvBLQiaBohnBhQjpDdhgFDQiyJblVHyQlUHzneFjQnYFfo2C3Qo0C2ppABQj2gBj0gdgEAQ4hDaQnqEBlJHkQh7C1h2DuQgrBXiKExQhjDahABoQhZCThfA/Qh8BTkfA2Ql0A5jaAmQmNBGkpBqQmQCOlCDqQuuKtlbN/Qm/SGJRWKQDbINGNGPQFZFcHPDsQGJDKG2BnQF1BYE9AAQDfAdDbAAQHzAAHFiSQHBiRF1kWQF4kYEOmJQEUmSCSnvQCSntFklfQCOiMC+iFQCDhcDWh+QD+iXBGguQCphtBmhiQEAj0AAlQQiWCWioBCQiOA3inAAQhLAAhbgLQg7gIhkgRIiYgYQhSgLg8AAQgngBglAFQtUBvluDKQjCBshrCYQhpCTgjDRQAAl0DulHQD0lPHJjtQQ0ouIjtJQDyl1ChnJQCLmLBdn7QjcISn0GYQmdFSp8EUQmqC4rADgQlkBvijA0QkSBZisBEQB9hICdilQCsi1CcjsQGDpMB8qQQAwkBgCl+QgBjaACg3QAEiPAThmQAvj9CziqQDRjHG/iaQuXgBppFFg");
	this.shape_9.setTransform(-7.2,-0.8,0.062,0.062,38.9);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("EgKpBOUQjoAAjqgdQllgDmZhiQnnh1mxjgQn/kIl+mEQm5m+j2pNQlDsHgmrMQglrOD5qFQDAnwFkm3QFkm3IBl2QG0k8IwioQFEhhIzhWQDigiBjgVQCogiA2gkQAqgcBNiVQArhVBWi+QC5mZCHjhQDpmEEtkPQMorWWNAAQCIAABoBYQBoBYAXCGQAWCHhFB1QhGB2iBAsQnkCohtDDQgsBOgMCLQgIBYACDUQABDhgGCAQgLDeglDEQhoIpkYIIQOXktIEk4QLYm5D+plQAshpBfg/QBeg9BvAAQA2AAA0APQCJApBKB5QBLB6gZCMQhQGwhqFZQiEGpjAFpQnNNgtoJaIAOAAQBPAABfAMQA5AHBuATIAQADQBaAPAwAGQBHAJA2AAQBeAABKgbQBigmBhhgQA1g1BFgcQBEgcBKAAQBLAABDAdQBpArA+BeQA/BdAABxQAAHLk6FNQh8CCi8CCQhxBNjnCJQjbCBhrBIQiyB3h/B2QlAErh8GmQihIhkzHBQkyHBmtE/QmoE8n8CjQn8CkosAAg");
	this.shape_10.setTransform(-7.2,-0.8,0.062,0.062,38.9);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#FF00CC").ss(24.3,0,0,4).p("EAAAhBcQNUAAMLFJQLwE+JDJEQJEJDE+LwQFJMKAANUQAANUlJMLQk+LvpEJEQpDJErwE+QsKFJtVAAQtTAAsKlJQrwk+pEpEQpEpEk+rvQlJsLAAtUQAAtTFJsLQE+rvJEpEQJEpELwk+QMKlJNTAAg");
	this.shape_11.setTransform(-16.3,0.9,0.062,0.062,38.9);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FF00CC").s().p("AvbZMQiwgehziHQhziIAAiyIAAhVQgBkpAOiNQAYjlBPi7QBbjVCsi8QCsi8EkjMQBRg4Bgg+IDliSQDJiBBTg3QCThjAygwQAUiaBqhyQBrhzCagfQAugJAxAAQCSAAB6BRQB8BSA4CJQCgGDgpFlQgpFkjuErQigDJkFC8QidBylLDEQkWClh8BZQjRCXgjBnQgyCViABaQh/BaiaAAQglAAgrgGgAL5u0Qg1BSh3BeQhhBMjBB9ImZEGQheA9hEAvQj2CsiICTQiCCNg5CZQgyCDgMC9QgFBSAAE/QBakIF3kEQB3hSDkiIQEGicBgg+QGakJCOkBQC7lUi3m7QAABhg5BXg");
	this.shape_12.setTransform(23.3,-5.2,0.062,0.062,38.9);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.lf(["#FFFFFF","#FF9DB1","#ED1C24"],[0,0.482,1],99.4,120.6,-107.7,-111.6).s().p("Au0VcQhYgOg5hEQg6hEAAhZIAAhWQgBkVAQiRQAWjIBCiYQBJipCUidQCaikEGi3QBFgxBkhAIDkiSQE/jLBnhOQCnh9AAhDQAAhXA3hDQA4hDBVgRQAYgEAXAAQBJAAA9AoQA+ApAcBFQELKHl+HrQiSC7j/C3QiWBskvC0QlLDFiJBpQjlCwg2ChQgaBKg/AuQhAAshNAAQgTAAgVgDg");
	this.shape_13.setTransform(23.3,-5.2,0.062,0.062,38.9);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#ED1C24").s().p("A5KH1QA7inBBh8QCplEEpjMQFtj7Jkh1QK4iEQeAhIk3GNMgweAScQBNjvATg0g");
	this.shape_14.setTransform(-4.2,-22,0.062,0.062,38.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-76.9,-49.1,126.5,96.3);


(lib.shotasset = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#66CCFF").s().p("ArtgnIXbAMIAAA3I3bAMg");
	this.shape.setTransform(46.9,2.5,0.625,0.625);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.shotasset, new cjs.Rectangle(0,0,93.8,5), null);


(lib.shipbottomport = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,1).p("Aj5jHIHzAAIAAGPInzAAg");
	this.shape.setTransform(35,20,1.4,1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#990000").s().p("Aj5DIIAAmPIHzAAIAAGPg");
	this.shape_1.setTransform(35,20,1.4,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.shipbottomport, new cjs.Rectangle(-1,-1,72,42), null);


(lib.Path_11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#FFC800","#C57101"],[0,1],-6,38.8,-3.1,-127.9).s().p("AslIpQkeg3jMhbQjTheheh4Qheh4Aoh8QAnh4CehsQCehtD8hPQEFhSFGgnQKWhQJcB0QEeA3DMBbQDTBeBeB4QBeB4goB8QgnB4idBsQieBtj9BPQkFBSlGAnQkPAhkEAAQl6AAllhFg");
	this.shape.setTransform(166.7,62);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Path_11, new cjs.Rectangle(0,-0.1,333.4,124.4), null);


(lib.Path_9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#570000").s().p("AqQMAQqMgVoqhKQo+hMmBh9QmBh9iCiXQh+iSCBiVQCBiWFqiEQF4iII+hgQI+hfKhgoQKJgmKNATQKMAUIqBLQI+BMGBB9QGBB9CCCXQB+CSiBCVQiACWlrCEQl3CIo/BgQo+BfqhAoQmuAZmtAAQjdAAjegGg");
	this.shape.setTransform(339.8,77.4);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Path_9, new cjs.Rectangle(-0.1,0,679.9,154.8), null);


(lib.saucerbeamasset = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("EgDHggXQAggMAqgIQApgHAtgBQAsAAArAFQAsAGAjANMADZBBOIqvABg");
	this.shape.setTransform(42.4,214.6);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.saucerbeamasset, new cjs.Rectangle(8,4.7,68.8,420), null);


(lib.planetgunasset = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFCCFF").s().p("EgFOA+gMAAAh8/IKdAAIAACCImmAAMAAAB69g");
	this.shape.setTransform(33.5,400);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.planetgunasset, new cjs.Rectangle(0,0,67.1,800), null);


(lib.meteorasset = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#ED1C24").ss(9.9,2,1).p("A2vN3QDrAZEOgwQELgwD+huQEEhxDIifQDVioB0jFQDYlwGJk9QCdh+CLhOQCDhJA9gCQpzABnzDTQl8ChjADeQg0A8iuDcQimDRhyB/Ql0GjlQCYQgBABAAAAIAAgBQAAAAABAAg");
	this.shape.setTransform(74.5,-0.7,0.062,0.062,38.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#FFFFFF","#FFF200","#ED1C24"],[0,0.482,1],97,217.5,-100.7,-213.1).s().p("A2vN3QFQiYF0mjQByh/CmjRQCujcA0g8QDAjeF8ihQHzjTJzgBQg9ACiDBJQiKBOieB+QmJE9jYFwQh0DFjUCoQjJCfkEBxQj+BukKAwQi0AgijAAQhUAAhPgJgA2wN3IABAAIgBABg");
	this.shape_1.setTransform(74.5,-0.7,0.062,0.062,38.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.lf(["#FFFFFF","#FFF200","#ED1C24"],[0,0.482,1],359.9,268.5,-273.4,-181.9).s().p("Egn4A4rQo8m5ktqJQkgpuAOqxQANq2E9pfQFNqAJgmjQEkjKIUitQCng3EphVQFOhgB8gnQIIiiEAirQFPjhAzlIQAdi/CmkDQCXjrDsj8QDgjuDxi/QCUh1B+hNQBChTBXAAQhIAhhRAyQhHBagtC8QhFEdAAHNQAAISh1HdQikKcloFoQiXCXkCC4QkmDLiNBpQjxC0iNCiQizDNhMDrQBqhqEFiRQIIkgMEjBQOdjoMGloQFpioDdiYQDmieAlhyQgtEXi8DuQiVC+kWDOQhhBHibBpIkBCvQk0DUiqCrQl9F8hyHkQgwDJgOEGQgJCgAAFTQBIjGEbixQDxiYF0h7QE7hoFVhAQEug4CzgBQhJACiZBCQitBKipBwQjHCEiFCSQidCsgtCrQjlNlqFKvQjvD/kJDDQjZCeihBFQjxBokSBDQmGBgmHADIgdAAQwwAAt6qvg");
	this.shape_2.setTransform(33.1,-2.2,0.062,0.062,38.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.lf(["#FFFFFF","#FFF200","#ED1C24"],[0,0.482,1],120.5,127.1,-140.5,-132.7).s().p("A0KKkQAPiJAMhFQAwkTCLjAQGgo/VQhPQDPAAC4guQDdg2AAhYQBDPA1CCcQmFAtlzCZQl7CcjQDRQALgwANh0g");
	this.shape_3.setTransform(37,-19.5,0.062,0.062,38.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.lf(["#FFFFFF","#FFF200","#ED1C24"],[0,0.482,1],198.3,234.4,-286.3,-155.5).s().p("AvbM+QAAkmDukXQDgkIFgieQCWhDDNhIQDUhKBIggQCMg+BxhXQCEhmCJioQg8IVj4EoQhiB0iIBcQhcA9iYBLQiPBGivAwQjGAxhfAYQinArh1A3QibBJiKB8g");
	this.shape_4.setTransform(53.5,-1.7,0.062,0.062,38.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.lf(["#FFFFFF","#FFF200","#ED1C24"],[0,0.482,1],131.1,134.2,-131.8,-116.8).s().p("AxNEgQB1h8CKhRQE3izIbgRQE1gKCygTQDSgVCMgrQCSgtBshPQBqhPBeiDQjtH+lbC1QiUBNi8AgQiOAYjeAFImDABQjtABiQAPQmTAqiGDBQBkiZBdhkg");
	this.shape_5.setTransform(50.7,11.4,0.062,0.062,38.9);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#ED1C24").ss(12.9,2,1).p("A7ua5QE1AAFQg7QF+hDFWiGQNNlJGSp8QCqkNBYl7QAfiKAei+QAfjWAQhmQA5lvBWi5QB3kBDwhzQoMAAldBHQl4BLkDCtQkGCwi7EyQi2EriMHZQipI9hNDfQh4FghyDHQh/DeioB6QirB8kDA1g");
	this.shape_6.setTransform(67.2,8.4,0.062,0.062,38.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.lf(["#FFFFFF","#FFF200","#ED1C24"],[0,0.482,1],171.4,187.1,-156.8,-173.9).s().p("A0gYIQCoh6B/jeQByjHB4lgQBNjfCqo9QCLnZC2krQC7kyEGiwQEEitF3hLQFdhHIMAAQjwBzh3EBQhWC5g5FvQgQBlgfDXQgdC9ggCKQhYF8iqENQmRJ8tNFJQlXCGl+BDQlPA7k1AAQECg1Crh8g");
	this.shape_7.setTransform(67,8.3,0.062,0.062,38.9);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#ED1C24").s().p("EgSTBTrQmwgHnfh9Qnfh9mnjZQpmk6nEnhQnDnfj/phQlgtMgnsTQgmsSEUrLQDUojGEnhQGEnhIumVQHilfJsi7QFihrJNhaQEVgqBegXQAqhNBjjcQDIm6CWj4QEFmsFXkyQHImWJsjMQJrjNMFAAIAAAAQERABDQCwQDQCwAuENQAtENiLDqQiMDrkBBZQi7BBhxBAQhBAmgaAbQgLAhgDBrQgBBBABB+QABDygHCNQgMDxgpDbQgiCzg1C4QIMjgFMkBQGMkzCel8QBXjTC/h+QC7h7DfAAQBrAABoAfQESBRCVD0QCWDzg0EZQhwJli2HqQi1HnkMGdQiGDNiZC6QApgEApAAQCUAACJA4QDRBXB9C8QB+C8AADgQAAE6hxEPQhxERjgDiQiMCNjICJQh3BRj0CRQjTB8hvBLQiaBohnBhQjpDdhgFDQiyJblVHyQlUHzneFjQnYFfo2C3Qo0C2ppABQj2gBj0gdgEAQ4hDaQnqEBlJHkQh7C1h2DuQgrBXiKExQhjDahABoQhZCThfA/Qh8BTkfA2Ql0A5jaAmQmNBGkpBqQmQCOlCDqQuuKtlbN/Qm/SGJRWKQDbINGNGPQFZFcHPDsQGJDKG2BnQF1BYE9AAQDfAdDbAAQHzAAHFiSQHBiRF1kWQF4kYEOmJQEUmSCSnvQCSntFklfQCOiMC+iFQCDhcDWh+QD+iXBGguQCphtBmhiQEAj0AAlQQiWCWioBCQiOA3inAAQhLAAhbgLQg7gIhkgRIiYgYQhSgLg8AAQgngBglAFQtUBvluDKQjCBshrCYQhpCTgjDRQAAl0DulHQD0lPHJjtQQ0ouIjtJQDyl1ChnJQCLmLBdn7QjcISn0GYQmdFSp8EUQmqC4rADgQlkBvijA0QkSBZisBEQB9hICdilQCsi1CcjsQGDpMB8qQQAwkBgCl+QgBjaACg3QAEiPAThmQAvj9CziqQDRjHG/iaQuXgBppFFg");
	this.shape_8.setTransform(35.3,-0.8,0.062,0.062,38.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("EgKpBOUQjoAAjqgdQllgDmZhiQnnh1mxjgQn/kIl+mEQm5m+j2pNQlDsHgmrMQglrOD5qFQDAnwFkm3QFkm3IBl2QG0k8IwioQFEhhIzhWQDigiBjgVQCogiA2gkQAqgcBNiVQArhVBWi+QC5mZCHjhQDpmEEtkPQMorWWNAAQCIAABoBYQBoBYAXCGQAWCHhFB1QhGB2iBAsQnkCohtDDQgsBOgMCLQgIBYACDUQABDhgGCAQgLDeglDEQhoIpkYIIQOXktIEk4QLYm5D+plQAshpBfg/QBeg9BvAAQA2AAA0APQCJApBKB5QBLB6gZCMQhQGwhqFZQiEGpjAFpQnNNgtoJaIAOAAQBPAABfAMQA5AHBuATIAQADQBaAPAwAGQBHAJA2AAQBeAABKgbQBigmBhhgQA1g1BFgcQBEgcBKAAQBLAABDAdQBpArA+BeQA/BdAABxQAAHLk6FNQh8CCi8CCQhxBNjnCJQjbCBhrBIQiyB3h/B2QlAErh8GmQihIhkzHBQkyHBmtE/QmoE8n8CjQn8CkosAAg");
	this.shape_9.setTransform(35.3,-0.8,0.062,0.062,38.9);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#ED1C24").ss(24.3,0,0,4).p("EAAAhBcQNUAAMLFJQLwE+JDJEQJEJDE+LwQFJMKAANUQAANUlJMLQk+LvpEJEQpDJErwE+QsKFJtVAAQtTAAsKlJQrwk+pEpEQpEpEk+rvQlJsLAAtUQAAtTFJsLQE+rvJEpEQJEpELwk+QMKlJNTAAg");
	this.shape_10.setTransform(26.2,0.9,0.062,0.062,38.9);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#ED1C24").s().p("AvbZMQiwgehziHQhziIAAiyIAAhVQgBkpAOiNQAYjlBPi7QBbjVCsi8QCsi8EkjMQBRg4Bgg+IDliSQDJiBBTg3QCThjAygwQAUiaBqhyQBrhzCagfQAugJAxAAQCSAAB6BRQB8BSA4CJQCgGDgpFlQgpFkjuErQigDJkFC8QidBylLDEQkWClh8BZQjRCXgjBnQgyCViABaQh/BaiaAAQglAAgrgGgAL5u0Qg1BSh3BeQhhBMjBB9ImZEGQheA9hEAvQj2CsiICTQiCCNg5CZQgyCDgMC9QgFBSAAE/QBakIF3kEQB3hSDkiIQEGicBgg+QGakJCOkBQC7lUi3m7QAABhg5BXg");
	this.shape_11.setTransform(65.8,-5.2,0.062,0.062,38.9);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.lf(["#FFFFFF","#FFF200","#ED1C24"],[0,0.482,1],99.4,120.6,-107.7,-111.6).s().p("Au0VcQhYgOg5hEQg6hEAAhZIAAhWQgBkVAQiRQAWjIBCiYQBJipCUidQCaikEGi3QBFgxBkhAIDkiSQE/jLBnhOQCnh9AAhDQAAhXA3hDQA4hDBVgRQAYgEAXAAQBJAAA9AoQA+ApAcBFQELKHl+HrQiSC7j/C3QiWBskvC0QlLDFiJBpQjlCwg2ChQgaBKg/AuQhAAshNAAQgTAAgVgDg");
	this.shape_12.setTransform(65.8,-5.2,0.062,0.062,38.9);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#ED1C24").s().p("A5KH1QA7inBBh8QCplEEpjMQFtj7Jkh1QK4iEQeAhIk3GNMgweAScQBNjvATg0g");
	this.shape_13.setTransform(38.3,-22,0.062,0.062,38.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.meteorasset, new cjs.Rectangle(-34.4,-49.1,126.5,96.3), null);


(lib.laserasset = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFDDFD").ss(6,0,1).p("EhdvAAAMC7fAAA");
	this.shape.setTransform(600,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.laserasset, new cjs.Rectangle(-3,-3,1206,6), null);


(lib.groundasset = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFCCFF").s().p("EBgJACRIAAkhID3AAIAAEhgEhj/ACRIAAkhID3AAIAAEhg");
	this.shape.setTransform(640,-14.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#66CCFF").s().p("Ehj/ADIIAAmPID3AAMDARAAAID3AAIAAGPg");
	this.shape_1.setTransform(640,20);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.groundasset, new cjs.Rectangle(0,-29,1280,69), null);


(lib.Game = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

}).prototype = getMCSymbolPrototype(lib.Game, null, null);


(lib.saucerasset = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#FFC800","#C57101"],[0,1],0.2,2.9,-0.1,-2.8).s().p("AgOAMQgLgDgCgGQgCgEAGgFQAHgGALgBQALgCAJADQALAEACAFQACAGgGAEQgGAGgMABIgGABQgIAAgGgDg");
	this.shape.setTransform(33,15.5,0.095,0.096);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#FFC800","#C57101"],[0,1],0.5,7.6,-0.5,-7.5).s().p("AgoAgQgbgIgGgPQgHgPARgNQARgNAfgEQAegDAbAIQAaAIAHAPQAGAPgRANQgRAOgfADIgRABQgVAAgSgGg");
	this.shape_1.setTransform(20,7.6,0.095,0.096);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.lf(["#FFC800","#C57101"],[0,1],0.6,9.1,-0.6,-9).s().p("AgwAnQgggKgIgTQgIgRAVgQQAUgQAlgEQAjgEAgAJQAgAKAIASQAIARgVARQgUAPglAFIgVABQgZAAgVgGg");
	this.shape_2.setTransform(10.7,11.6,0.095,0.096);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.lf(["#FFC800","#C57101"],[0,1],0.4,6.1,-0.4,-6.1).s().p("AggAaQgVgHgGgMQgFgLANgLQAOgLAZgDQAYgDAVAHQAVAGAGANQAFALgOALQgNALgZADIgOABQgRAAgOgFg");
	this.shape_3.setTransform(12.4,15.3,0.095,0.096);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.lf(["#FFC800","#C57101"],[0,1],0.3,4.7,-0.3,-4.7).s().p("AgZAUQgQgFgEgJQgEgJALgIQAKgIATgDQATgCAQAFQAQAFAEAKQAEAIgLAIQgKAJgTACIgLAAQgNAAgLgDg");
	this.shape_4.setTransform(19.3,16,0.095,0.096);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.lf(["#FFC800","#C57101"],[0,1],0.4,5.1,-0.3,-5).s().p("AgbAWQgRgGgEgKQgFgJAMgJQALgJAUgCQATgDATAGQARAFAFAKQAEAJgMAJQgLAKgUABIgMABQgNAAgNgDg");
	this.shape_5.setTransform(43.5,12.6,0.095,0.096);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.lf(["#FFC800","#C57101"],[0,1],0.3,4.8,-0.3,-4.7).s().p("AgZAUQgRgFgEgKQgEgIALgJQALgIATgCQASgDARAFQARAFAEAKQAEAJgLAJQgKAIgUACIgLABQgMAAgMgEg");
	this.shape_6.setTransform(51,10.2,0.095,0.096);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.lf(["#FFC800","#C57101"],[0,1],0.4,6.2,-0.4,-6.1).s().p("AghAaQgVgGgFgNQgGgLAPgLQANgLAZgDQAYgDAVAHQAWAGAFANQAFALgOALQgNALgZADIgOABQgRAAgPgFg");
	this.shape_7.setTransform(53,6.6,0.095,0.096);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.lf(["#FFC800","#C57101"],[0,1],0.5,6.9,-0.4,-6.8).s().p("AgkAeQgYgIgGgOQgGgNAPgMQAPgMAcgDQAbgEAYAHQAYAIAGAOQAGANgPAMQgQAMgcADIgQACQgSAAgQgFg");
	this.shape_8.setTransform(47.3,4.8,0.095,0.096);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.lf(["#FFC800","#C57101"],[0,1],0.5,7.4,-0.5,-7.4).s().p("AgnAfQgagIgHgPQgGgOARgNQAQgNAegDQAdgEAaAIQAaAIAHAPQAGAOgRANQgQANgeAEIgSABQgUAAgRgGg");
	this.shape_9.setTransform(39.5,4.6,0.095,0.096);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.lf(["#FFC800","#C57101"],[0,1],0.7,9.4,-0.6,-9.4).s().p("AgyAoQghgKgIgTQgIgSAVgRQAVgQAmgFQAmgEAgAKQAhAKAIATQAJASgWARQgVAQgmAFQgMABgLAAQgYAAgXgHg");
	this.shape_10.setTransform(30.4,5.4,0.095,0.096);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("Aj/EbQoegPk2hdQiYgtgzg4Qgzg1Azg3QBph1HLhIQHLhJIeAOQIfAPE2BdQCYAtAzA4QAzA2gzA2QhpB1nLBIQl/A9m5AAQhXAAhbgCg");
	this.shape_11.setTransform(33.1,11.8,0.095,0.096);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("Aj+EbQoggPk1hdQiYgtg0g4Qgxg1Axg3QBqh1HLhIQHLhJIfAOQIfAPE1BdQCYAtA0A4QAyA2gyA2QhqB1nLBJQl/A8m4AAQhYAAhagCg");
	this.shape_12.setTransform(33.3,11.8,0.095,0.096);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#000000").ss(5.3,0,0,4).p("ARUiuQCYAuA0A3QAyA2gyA2QhqB1nLBJQnLBIoegOQoggPk1hdQiYgtg0g4Qgyg1Ayg3QBqh1HLhIQHLhJIfAOQIfAPE1Bdg");
	this.shape_13.setTransform(33.4,11.9,0.095,0.096);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("Aj+EaQoggOk1hdQiYgtg0g4Qgyg1Ayg3QBqh1HLhIQHLhJIfAPQIfAOE1BdQCYAtA0A4QAyA2gyA2QhqB1nLBJQl/A8m4AAQhYAAhagDg");
	this.shape_14.setTransform(33.4,11.9,0.095,0.096);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#000000").ss(5.3,0,0,4).p("AVEjUQC4A3A/BEQA9BBg9BCQiBCPouBYQouBYqUgRQqVgSl4hxQi4g4g/hDQg9hBA9hCQCAiPIuhYQIvhYKTARQKVASF5Bxg");
	this.shape_15.setTransform(33.1,11.5,0.095,0.096);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#B3B3B3").s().p("Ak2FYQqVgSl4hxQi4g4g/hDQg9hBA9hCQCAiPIvhYQIuhYKTARQKWASF3BxQC5A3A/BEQA9BBg9BCQiACPouBYQnSBKoZAAQhqAAhugDg");
	this.shape_16.setTransform(33.1,11.5,0.095,0.096);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.lf(["#570000","#FF0000"],[0,1],5,443.4,-2.5,-390.5).s().p("AqJLQQqOgSoshFQo/hHmDh0QmDh0iEiOQh/iICAiMQB/iNFqh7QF3iAI+hbQI+hbKiglQKKglKNARQKOASIsBEQI/BIGDB0QGDB0CECNQB/CJh/CMQiACNlqB7Ql3CAo+BbQo+BaqiAmQm8AZm8AAQjQAAjPgFg");
	this.shape_17.setTransform(32.6,9.8,0.095,0.096);

	this.instance = new lib.Path_9();
	this.instance.parent = this;
	this.instance.setTransform(32.1,10,0.095,0.096,0,0,0,337,82.5);
	this.instance.alpha = 0.738;

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.rf(["#570000","#CE0000"],[0,1],-1.9,135.5,0,-1.9,135.5,481.9).s().p("AqPMNQqNgUoqhMQo9hOmCh/QmBiAiCiZQh9iVB/iYQCBiZFriGQF3iKI+hhQI+hiKigoQKIgnKNAVQKNAUIqBLQI+BPGBB/QGBCACCCZQB+CViBCYQiACZlrCFQl3CLo+BhQo/BiqhAoQmrAZmsAAQjfAAjfgHg");
	this.shape_18.setTransform(32.4,9,0.095,0.096);

	this.instance_1 = new lib.Path_11();
	this.instance_1.parent = this;
	this.instance_1.setTransform(31.1,6.2,0.095,0.096,0,0,0,163.2,64.8);
	this.instance_1.alpha = 0.852;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.shape_18},{t:this.instance},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.saucerasset, new cjs.Rectangle(0,0,65,19.3), null);


(lib.meteorwiggleasset = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.Tween1("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(42.5,0);

	this.instance_1 = new lib.Tween2("synched",0);
	this.instance_1.parent = this;
	this.instance_1.setTransform(42.5,-20);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween3("synched",0);
	this.instance_2.parent = this;
	this.instance_2.setTransform(42.5,20);
	this.instance_2._off = true;

	this.instance_3 = new lib.Tween4("synched",0);
	this.instance_3.parent = this;
	this.instance_3.setTransform(42.5,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},2).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_3}]},2).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,y:-20},2).wait(6));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},2).to({_off:true,y:20},3).wait(3));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(2).to({_off:false},3).to({_off:true,y:0},2).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-34.4,-49.1,126.5,96.3);


(lib.Ground = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.ground = new lib.groundasset();
	this.ground.parent = this;
	this.ground.setTransform(641,1,1,1,0,0,0,641,1);

	this.timeline.addTween(cjs.Tween.get(this.ground).wait(1));

}).prototype = getMCSymbolPrototype(lib.Ground, new cjs.Rectangle(0,-29,1280,69), null);


(lib.Shot = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.shotasset();
	this.instance.parent = this;
	this.instance.setTransform(20.5,0,1,1,0,0,0,20.5,4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({skewY:180,x:-20.5},0).wait(1).to({rotation:90,skewY:0,x:0,y:20.5},0).wait(1).to({rotation:0,skewX:90,skewY:-90,y:-20.5},0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-4,93.8,5);


(lib.Ship = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_4 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(4));

	// ship body
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,4).p("AxDBHMAhzAAAQgZgIgggNQhAgagjgYQgjgXgfgaIgXgVI58AAQg0AvgwAbQgvAbhvAog");
	this.shape.setTransform(0.8,34.8,0.771,0.769,0,180,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#990000").s().p("Aw5BHQBvgoAvgbQAwgbA0gvIZ8AAIAXAVQAfAaAjAXQAjAYBAAaQAgANAZAIg");
	this.shape_1.setTransform(0,34.8,0.771,0.769,0,180,0);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,0,0,4).p("A9YDBMA6vAAAQAkgjgpgtQgqgth9gzQh9gykJhWIj1hJMghIAAAQh2AfiKArQkTBVh4AoQh3ApgxAvQgwAwAjAyg");
	this.shape_2.setTransform(0,14.5,0.923,0.769,0,180,0);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#990000").s().p("A9YDBQgjgzAwgvQAxgwB3goQB4goEThVQCKgrB2gfMAhIAAAID1BJQEJBXB9AxQB9AzAqAtQApAtgkAjg");
	this.shape_3.setTransform(0,14.5,0.923,0.769,0,180,0);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(1,0,0,4).p("AAUAAQAAAVgGAOQgGAPgIAAQgHAAgFgPQgHgOAAgVQAAgTAHgPQAFgPAHAAQAIAAAGAPQAGAOAAAUg");
	this.shape_4.setTransform(-59.5,-54.4,0.771,0.769);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFCC00").s().p("AgMAjQgHgOAAgVQAAgTAHgPQAFgPAHAAQAIAAAGAPQAGAOgBAUIAAAAQABAVgGAOQgGAPgIAAQgHAAgFgPg");
	this.shape_5.setTransform(-59.5,-54.4,0.771,0.769);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(1,0,0,4).p("AArAAQAAAUgNAOQgMAOgSAAQgRAAgMgOQgNgOAAgUQAAgTANgOQAMgOARAAQASAAAMAOQANAOAAATg");
	this.shape_6.setTransform(-40.5,-54.4,0.771,0.769);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFCC00").s().p("AgdAiQgNgOAAgUQAAgTANgOQAMgOARAAQASAAAMAOQANAOAAATIAAAAQAAAUgNAOQgMAOgSAAQgRAAgMgOg");
	this.shape_7.setTransform(-40.5,-54.4,0.771,0.769);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#000000").ss(1,0,0,4).p("AArAAQAAAUgNAOQgMAOgSAAQgRAAgMgOQgNgOAAgUQAAgTANgOQAMgOARAAQASAAAMAOQANAOAAATg");
	this.shape_8.setTransform(29.8,-54.4,0.771,0.769);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFCC00").s().p("AgdAiQgNgOAAgUQAAgTANgOQAMgOARAAQASAAAMAOQANAOAAATIAAAAQAAAUgNAOQgMAOgSAAQgRAAgMgOg");
	this.shape_9.setTransform(29.8,-54.4,0.771,0.769);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#000000").ss(1,0,0,4).p("AApAAQAAAUgMAOQgMAOgRAAQgQAAgMgOQgMgOAAgUQAAgTAMgOQAMgOAQAAQARAAAMAOQAMANAAAUg");
	this.shape_10.setTransform(53.3,-54.4,0.771,0.769);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFCC00").s().p("AgcAiQgMgOAAgUQAAgTAMgOQAMgOAQAAQARAAAMAOQAMANAAAUIAAAAQAAAUgMAOQgMAOgRAAQgQAAgMgOg");
	this.shape_11.setTransform(53.3,-54.4,0.771,0.769);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(1,0,0,4).p("AAwAAQAAAUgOAOQgOAOgUAAQgTAAgOgOQgOgOAAgUQAAgTAOgNQAOgOATAAQAUgBAOAOQAOAOAAATg");
	this.shape_12.setTransform(-17.1,-54.4,0.771,0.769);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFCC00").s().p("AghAiQgOgOAAgUQAAgTAOgNQAOgOATAAQAUgBAOAOQAOAOAAATIAAAAQAAAUgOAOQgOAOgUAAQgTAAgOgOg");
	this.shape_13.setTransform(-17.1,-54.4,0.771,0.769);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#000000").ss(1,0,0,4).p("AAwAAQAAAUgOAOQgOAOgUAAQgTAAgOgOQgOgOAAgUQAAgTAOgNQAOgOATAAQAUgBAOAOQAOAOAAATg");
	this.shape_14.setTransform(6.4,-54.4,0.771,0.769);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFCC00").s().p("AghAiQgOgOAAgUQAAgTAOgNQAOgOATAAQAUgBAOAOQAOAOAAATIAAAAQAAAUgOAOQgOAOgUAAQgTAAgOgOg");
	this.shape_15.setTransform(6.4,-54.4,0.771,0.769);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#000000").ss(1,0,0,4).p("A9YDBMA6vAAAQAlghgqgtQgpgth9g0Qh9gzkKhWIj0hJMghIAAAQh3AfiJArQkUBVh4AkQh5AkgwAvQgwAwAkA7g");
	this.shape_16.setTransform(0,-17.6,0.923,0.769);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#990000").s().p("A9YDBQgkg7AwgwQAwgvB5gkQB4gkEUhVQCJgrB3gfMAhIAAAID0BJQEKBXB9AzQB9AzApAuQAqAsglAhg");
	this.shape_17.setTransform(0,-17.6,0.923,0.769);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#000000").ss(1,0,0,4).p("AxDBHMAhzAAAQgZgIgggNQhAgagjgYQgjgXgfgaIgXgVI58AAQg0AvgwAbQgvAbhvAog");
	this.shape_18.setTransform(0.8,-36.5,0.771,0.769);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#990000").s().p("Aw5BHQBvgoAvgbQAwgbA0gvIZ8AAIAXAVQAfAaAjAXQAjAYBAAaQAgANAZAIg");
	this.shape_19.setTransform(0,-36.5,0.771,0.769);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("#000000").ss(1,0,1).p("As5inIAAFPIZzAAIAAlLg");
	this.shape_20.setTransform(0,-53.7,0.771,0.769);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#990000").s().p("As5CoIAAlPIZzAEIAAFLg");
	this.shape_21.setTransform(0,-53.7,0.771,0.769);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#000000").ss(1,0,1).p("As4ANIAbgfIY3AAIAfAlg");
	this.shape_22.setTransform(0,-67.5,0.771,0.769);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FF0099").s().p("As4ANIAbgfIY3AAIAfAlg");
	this.shape_23.setTransform(0,-67.5,0.771,0.769);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(8));

	// center line
	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FF0099").s().p("A7GALIAAgVMA2NAAAIAAAVg");
	this.shape_24.setTransform(0,-1.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_24).wait(8));

	// bottom opening
	this.port = new lib.shipbottomport();
	this.port.parent = this;
	this.port.setTransform(19.3,9,0.771,0.769,0,0,0,50,40);
	this.port.visible = false;

	this.timeline.addTween(cjs.Tween.get(this.port).wait(1).to({scaleX:1,scaleY:1,x:15,y:13.1,visible:true},0).to({y:63.1},3).to({y:13.1},3).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-176,-70,352,111.3);


(lib.Saucer = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// saucer
	this.saucer = new lib.saucerasset();
	this.saucer.parent = this;
	this.saucer.setTransform(10.3,12.8,1,1,0,0,0,42.8,12.8);

	this.timeline.addTween(cjs.Tween.get(this.saucer).wait(1));

	// beam
	this.beam = new lib.saucerbeamasset();
	this.beam.parent = this;
	this.beam.setTransform(8.4,47.5,1,1,0,0,0,47.6,40.4);

	this.timeline.addTween(cjs.Tween.get(this.beam).wait(1));

}).prototype = getMCSymbolPrototype(lib.Saucer, new cjs.Rectangle(-32.5,0,70.1,431.8), null);


(lib.PlanetGuns = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// guns
	this.rightGun = new lib.planetgunasset();
	this.rightGun.parent = this;
	this.rightGun.setTransform(1239.5,400,1,1,0,0,180,40.5,400);

	this.leftGun = new lib.planetgunasset();
	this.leftGun.parent = this;
	this.leftGun.setTransform(40.5,400,1,1,0,0,0,40.5,400);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.leftGun},{t:this.rightGun}]}).wait(1));

	// laser
	this.laser = new lib.laserasset();
	this.laser.parent = this;
	this.laser.setTransform(672,7.1,1,1,0,0,0,640,0);

	this.timeline.addTween(cjs.Tween.get(this.laser).wait(1));

}).prototype = getMCSymbolPrototype(lib.PlanetGuns, new cjs.Rectangle(0,0,1280,800), null);


(lib.Planet = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// ground
	this.ground = new lib.Ground();
	this.ground.parent = this;
	this.ground.setTransform(641,799.5,1,1,0,0,0,641,-0.5);

	this.timeline.addTween(cjs.Tween.get(this.ground).wait(1));

}).prototype = getMCSymbolPrototype(lib.Planet, new cjs.Rectangle(0,771,1280,69), null);


(lib.Meteor = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{right:0,left:1,bottom:2,top:3,wiggle_right:4,wiggle_left:5,wiggle_bottom:6,wiggle_top:7});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(8));

	// meteor
	this.instance = new lib.meteorasset();
	this.instance.parent = this;
	this.instance.setTransform(69.9,47,1,1,0,0,0,59.9,47);

	this.instance_1 = new lib.meteorwiggleasset();
	this.instance_1.parent = this;
	this.instance_1.setTransform(69.9,47,1.001,1,0,0,0,59.8,46.9);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({skewY:180,x:-70.9},0).wait(1).to({rotation:90,skewY:0,x:-47,y:69.9},0).wait(1).to({rotation:0,skewX:90,skewY:-90,y:-70.9},0).to({_off:true},1).wait(4));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(4).to({_off:false},0).wait(1).to({regX:59.9,regY:47,scaleX:1,skewY:180,x:-69.9,y:47.1},0).wait(1).to({rotation:90,skewY:0,x:-47,y:69.9},0).wait(1).to({rotation:0,skewX:90,skewY:-90,y:-69.9},0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-24.4,-49.1,126.1,96.3);


// stage content:
(lib.cosmicarkishassets = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		/*this.init = function(){
			// A timeline var is available from the template for use in controlling all tweens.
			
			this.level = 1;
			this.numMeteors = 3;	
			this.ship = new lib.Ship();
			this.ship.setBounds(0, 0, 353, 97);
			
			this.addChild(this.ship);
		}
		
		this.pause = function(){
			createjs.Ticker.paused = true;
		}
		
		this.resume = function(){
			createjs.Ticker.paused = false;
		}
		
		this.run = function(){
			
			createjs.Ticker.addEventListener("tick", handleTick);
			 function handleTick(event) {
					 // Actions carried out each tick (aka frame)
					 if (!event.paused) {
							 // Actions carried out when the Ticker is not paused.
						 
					 }
			 }
		}
		
		this.gotoSpace = function(){
			var shipBounds = this.ship.getBounds();
			
			timeline.fromTo(this.ship, .9, {
					x: (this.stage.canvas.width * .5) - (shipBounds.width * .5),
					y: -shipBounds.height - 5
				}, { 
					y: 300, ease: Back.easeOut.config(.8) 
				}, "+=1");
				
				var m = new lib.Meteor();
				this.addChild(m);
				m.wiggle();
		}
		
		this.leaveSpace = function(){
			
		}
		
		this.gotoPlanet = function(){
			
		}
		
		this.leavePlanet = function(){
			
		}
		
		this.init();
		this.run();
		this.gotoSpace();*/
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;
// library properties:
lib.properties = {
	width: 1280,
	height: 800,
	fps: 24,
	color: "#CCCCCC",
	opacity: 1.00,
	webfonts: {},
	manifest: [],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;