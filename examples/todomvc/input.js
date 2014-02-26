var Delegator = require("dom-delegator")
var EventSource = require("geval/source")
var HashRouter = require("hash-router")
var extend = require("xtend")
var EventSinks = require("event-sinks")

module.exports = createInput

function createInput(surface) {
    var del = Delegator(surface)
    var events = EventSinks(del.id, [
        "toggleAll", "add", "setTodoField", "toggle", "destroy",
        "startEdit", "finishEdit"
    ])

    var router = HashRouter()
    var hashEvent = EventSource(function (emit) {
        router.on("hash", emit)
    })

    return {
        sinks: events.sinks,
        events: extend(events, {
            setRoute: hashEvent
        })
    }
}
