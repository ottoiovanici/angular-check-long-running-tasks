# angular-check-long-running-tasks

Demo: https://plnkr.co/edit/SNG0kI1uPiGy30twwWd6?p=preview

Method of checking the long running task status by a recursive queue

Long running task can either finish in SUCCESS or FAILURE (manual input needed)
Long running task completes in 3 seconds, either in SUCCESS or FAILURE
Upon finishing, Long running task signals the recursive queue to stop checking (longTaskFinishedFlag)

Task completing can be interrupted. (Manual INTERRUPT)<br>
