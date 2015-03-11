var Mapper = require('./mapper.js')
var map = require('./freetype_map.js')

var FreetypeKeyboardListener = function(editor){
  document.onkeypress = this.keyPress.bind(this);
  document.onkeyup = this.keyUp.bind(this)
  this.mapper = new Mapper(map, { backspace: this.backspace.bind(this) })
  this.editor = editor
}

FreetypeKeyboardListener.prototype = {

  setterMap:{
     '118':0,
     '114':1,
     '101':2,
     '119':3,
     '113':4,
   },

   setterMapUp:{
      '86':0,
      '82':1,
      '69':2,
      '87':3,
      '81':4,
    },

  triggerMap:{
     '109':0,
     '105':1,
     '111':2,
     '112':3,
     '91':4,
  },

  addText:function(text){
    this.editor.insertText(text)
  },

  backspace: function(){
    console.log('backspace')
    this.editor.backspace();
  },

  keyPress: function(e){
    e.preventDefault();
    var e = window.event || e;
    this.target = e.target;
    // console.log('target', this.target)
    var code = e.keyCode;
    if(this.setterMap[code] != undefined){
      this.mapper.setKeyPressed(this.setterMap[code]);
    } else if(this.triggerMap[code] != undefined) {
      this.addText(this.mapper.triggerKeyPressed(this.triggerMap[code]))
    }
  },

  keyUp: function(e){
    e.preventDefault();
    var e = window.event || e;
    this.target = e.target;
    var code = e.keyCode;
    if(this.setterMapUp[code] != undefined){
      this.mapper.setKeyReleased(this.setterMapUp[code]);
    }
  }
}

module.exports = FreetypeKeyboardListener
