# Check completion of Async Long Running Tasks with a recursive method.
#### Implemented under AngularJS

Demo: https://plnkr.co/edit/SNG0kI1uPiGy30twwWd6?p=preview

## Description
Method of checking the long running task status by a recursive queue.

Long running task can either finish in SUCCESS or FAILURE (manual input needed)
Long running task completes in 3 seconds, either in SUCCESS or FAILURE
Upon finishing, Long running task signals the recursive queue to stop checking (longTaskFinishedFlag)

The recursive check (_recursive_queue()) will continuously check, at a predetermined interval, for task completion.
Default is at 500ms (much easier to visualize in the demo).

Task completing can be interrupted. (Manual INTERRUPT)

## Not implemented (further ideas)
* No debounce, throttle and "Already initialized" checks if the init button **Start Long Running Task** is pressed multiple times in a sequence. Pressing multiple times rapidly will fire subsequent calls to the init() method that will run in parallel and cannot be killed by the **Manual INTERRUPT** button
* No comparison on implementing same functionality with angular watches ($watch()).
* No comparison on implementing same functionality with angular events ($broadcast() and/or $emit())
