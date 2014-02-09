var document = require("global/document")

var main = require("./lib/main.js")

var State = require("./state.js")
var App = require("./app.js")

var inputs = createInput()
var state = State(inputs, null)

main(state, App, document.body)

function createInput() {

}
