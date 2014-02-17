var Delegator = require("dom-delegator")
var EventSource = require("geval/source")
var HashRouter = require("hash-router")
var extend = require("xtend")

module.exports = createInput

function createInput(surface) {
    var del = Delegator(surface, [
        "toggleAll", "add", "setTodoField", "toggle", "destroy",
        "startEdit", "finishEdit"
    ])

    var router = HashRouter()
    var hashEvent = EventSource(function (emit) {
        router.on("hash", emit)
    })

    return {
        sinks: del.sinks,
        events: extend(del.events, {
            setRoute: hashEvent
        })
    }
}
