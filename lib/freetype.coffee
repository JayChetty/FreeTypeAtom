{CompositeDisposable} = require 'atom'
FreetypeKeyboardListener = require('./freetype_keyboard_listener.js')
module.exports = Freetype =
  freetypeView: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'freetype:toggle': => @toggle()


  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @freetypeView.destroy()

  serialize: ->
    freetypeViewState: @freetypeView.serialize()

  toggle: ->
    console.log 'Freetype was toggled la!'
    atom.workspace.observeTextEditors (editor) ->
      freeType = new FreetypeKeyboardListener(editor)

    document.onclick = ->
      console.log('Something wajj sdfas clicked')

    document.onkeydown = ->
      console.log('someting had key down')
