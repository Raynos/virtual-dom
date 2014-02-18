var uuid = require("uuid")

var ObservHash = require("./lib/observ-hash.js")
var ObservArray = require("./lib/observ-array.js")
var Observ = require("./lib/observ.js")

var defaultState = {
    todos: [],
    route: "all",
    todoField: ""
}

module.exports = {
    fresh: freshState,
    freshItem: freshItem,
    setRoute: setRoute,
    toggleAll: toggleAll,
    add: add,
    setTodoField: setTodoField,
    toggle: toggle,
    destroy: destroy,
    startEdit: startEdit,
    finishEdit: finishEdit
}

function freshState(sinks, initialState) {
    initialState = initialState || defaultState

    return ObservHash({
        todos: ObservArray(initialState.todos),
        route: Observ(initialState.route),
        todoField: Observ(initialState.todoField),
        sinks: sinks
    })
}

function freshItem(title) {
    return ObservHash({
        id: uuid(),
        title: Observ(title),
        editing: Observ(false),
        completed: Observ(false)
    })
}

function setRoute(state, route) {
    state.route.set(route.hash)
}

function toggleAll(state) {
    state.todos.forEach(function (todo) {
        todo.completed.set(!todo.completed())
    })
}

function add(state, data, ev) {
    state.todos.push(freshItem(ev.currentValue.newTodo))
    state.todoField.set("")
}

function setTodoField(state, data, ev) {
    state.todoField.set(ev.currentValue.newTodo)
}

function toggle(state, delta) {
    var item = find(state.todos, delta.id)
    item.completed.set(delta.completed)
}

function startEdit(state, delta) {
    var item = find(state.todos, delta.id)
    item.editing.set(true)
}

function destroy(state, delta) {
    var index = findIndex(state.todos, delta.id)
    state.todos.splice(index, 1)
}

function finishEdit(state, delta, ev) {
    var item = find(state.todos, delta.id)
    item.title.set(ev.currentValue.title)
}

function find(list, id) {
    for (var i = 0; i < list.length; i++) {
        var item = list[i]
        if (item.id === id) {
            return item
        }
    }

    return null
}

function findIndex(list, id) {
    for (var i = 0; i < list.length; i++) {
        var item = list[i]
        if (item.id === id) {
            return i
        }
    }

    return null
}
