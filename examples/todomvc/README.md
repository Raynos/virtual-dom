# virtual-dom TodoMVC

This is an example implementation of TodoMVC.

The three pillars you need to build a web app are

 - State representation (M)
 - Visual Scene rendering (V)
 - Input handling (C)

The three libraries we are using to represent these three pillars
    are `observ-hash` , `virtual-dom` and `dom-delegator` 
    respectively.

## Application structure

The first part of the application is defining the inputs of your
    application. Changes to state are directly driven by a set
    of inputs (including timers and such).

### Inputs

When we define our inputs we create a hash of `sinks` and 
    `sources`. We can listen to `sources` to get event
    values and pass those to a state transition function. `sinks`
    can be written to to generate event values, these `sinks`
    get passed to the rendering logic so that the rendering
    logic can say "when an event happens on this sub surface
    write this value to the sink"

### State

With our input defined we can define our state and our state
    transitions. It's important that the state data structure we
    use emits some kind 'state has changed notification'. For our
    state we will use `observ` and we will write a set of plain
    functions that take an event value and mutates the `observ`
    appropiately.

### Rendering

For rendering we write a simple function that takes in an entire
    plain javascript object of the state and a hash of sinks.
    This function creates a virtual DOM tree that represents a
    visual scene that can be rendered

### Bootstrapping

Your entry point `browser.js` creates the inputs, threads all
    the input sources through the state transition functions and
    passes the `state`, `render` function and a dom element 
    `surface` to `main`.

`main` sets up the rendering loop, it listens to state changes and
    calls `render` again, it uses `virtual-dom/diff` and
    `virtual-dom/patch` to apply changes between the virtual DOM
    trees returned from `render()` to a live dom element `surface`

This completes the entire application, inputs cause transitions
    to the state to happen, the state notificies the `main` loop
    and the `main` loop will re-render your application and write
    changes to the `DOM`.
