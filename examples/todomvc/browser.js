var document = require("global/document")
var Delegator = require("dom-delegator")
var EventSource = require("geval/source")
var HashRouter = require("hash-router")
var extend = require("xtend")

var main = require("./lib/main.js")

var State = require("./state.js")
var render = require("./render.js")

var inputs = createInput()
var state = State.fresh(inputs.channels, null)
main(state, render, document.body)

transition(state, inputs.events, State)

function createInput() {
    var del = Delegator(document.body, [
        "toggleAll", "add", "setTodoField", "toggle", "destroy",
        "startEdit", "finishEdit"
    ])

    var router = HashRouter()
    var hashEvent = EventSource(function (emit) {
        router.on("hash", emit)
    })

    return {
        channels: del.channels,
        events: extend(del.events, {
            setRoute: hashEvent
        })
    }
}

function transition(state, events, fns) {
    Object.keys(events).forEach(function (eventName) {
        var event = events[eventName]
        var fn = fns[eventName]

        event(function (tuple) {
            var values = tuple.values
            var ev = tuple.ev

            values.push(ev)
            values.unshift(state)

            fn.apply(null, values)
        })
    })
}
