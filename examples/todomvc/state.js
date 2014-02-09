var uuid = require("uuid")

var ObservHash = require("./lib/observ-hash.js")
var ObservArray = require("./lib/observ-array.js")
var Observ = require("./lib/observ.js")

var defaultState = {
    todos: [],
    route: "all"
}

module.exports = State

function State(inputs, initialState) {
    initialState = initialState || defaultState

    var state = ObservHash({
        todos: ObservArray(initialState.todos),
        route: Observ(initialState.route),
        evs: {
            todos: uuid(),
            todo: uuid()
        }
    })

    inputs.route(function (route) {
        state.route.set(route.hash)
    })

    inputs.todos.toggleAll(function (ev) {
        state.todos.forEach(function(todo) {
            todo.completed.set(!todo.completed())
        })
    })

    inputs.todos.add(function () {

    })

    inputs.todos.textChange(function () {

    })

    TodoState(inputs.todo, state.todos)


    return state
}

function TodoState(inputs, list) {
    inputs.toggle
    inputs.editing
    inputs.destroy
    inputs.textChange
    inputs.edit
}
