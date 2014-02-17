var document = require("global/document")

var main = require("./lib/main.js")

var createInput = require("./input.js")
var State = require("./state.js")
var render = require("./render.js")

var surface = document.body
var inputs = createInput(surface)
var state = State.fresh(inputs.sinks, null)
main(state, render, surface)

var events = inputs.events

transitionState(events.toggleAll, State.toggleAll)
transitionState(events.add, State.add)
transitionState(events.setTodoField, State.setTodoField)
transitionState(events.toggle, State.toggle)
transitionState(events.destroy, State.destroy)
transitionState(events.startEdit, State.startEdit)
transitionState(events.finishEdit, State.finishEdit)
transitionState(events.setRoute, State.setRoute)

function transitionState(input, fn) {
    input(eventListener)

    function eventListener(value) {
        var values
        // handle dom-delegator signature
        if ("values" in value && "ev" in value) {
            values = value.values
            values.push(value.ev)
        } else {
            values = [value]
        }

        values.unshift(state)

        fn.apply(null, values)
    }
}
