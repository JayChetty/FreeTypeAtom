var Mapper = require('./mapper.js')
var map = require('./freetype_map.js')

var FreetypeKeyboardListener = function(editor){
  document.onkeypress = this.keyPress.bind(this);
  document.onkeyup = this.keyUp.bind(this)
  this.mapper = new Mapper(map, { backspace: this.backspace.bind(this) })
  this.editor = editor
}

FreetypeKeyboardListener.prototype = {

  setterMap:{//1 2 4 t c  (some keyboard have channels cant have mult on)
     '99':0,
     '116':1,
     '52':2,
     '50':3,
     '49':4,
   },

   setterMapUp:{
      '67':0,
      '84':1,
      '52':2,
      '50':3,
      '49':4,
    },

  triggerMap:{// m i 0 - =
     '109':0,
     '105':1,
     '48':2,
     '45':3,
     '61':4,
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
    console.log('code', code)
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
    console.log('upcode', code)
    if(this.setterMapUp[code] != undefined){
      this.mapper.setKeyReleased(this.setterMapUp[code]);
    }
  }
}

module.exports = FreetypeKeyboardListener
