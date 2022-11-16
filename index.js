// const timeDisplay = document.getElementById('time-display')
// const btnStart = document.getElementById('btn-start')
// btnStart.addEventListener('click', btnStartFunc)

// import {secToText} from "./utils.js"
import Timer from "./Timer.js"

const test = new Timer()
console.log(test)
console.log(test.secCount)
test.inc()
console.log(test.secCount)
console.log(test.getTimeString())

let timers = localStorage.getItem('timers')
if (!timers) {
    timers = [
        {
            startTime: new Date(),
            pause: false,
            secCount: 0,
        },
    ]
}
// function createTimerDIV() {}

// secToText(10)
// secToText(100)
// secToText(1000)
// secToText(10000)
// secToText(100000)
// secToText(1000000)

// setTimeout(timer, 100)

// function btnStartFunc() {
//     startTime = new Date()
//     setInterval(timer, 1000)
//     btnStart.textContent = 'Pause'
//     localStorage.setItem('startTime', startTime);
// }

// function timer() {
//     const newTime = new Date()
//     const sec = Math.floor((newTime.getTime() - startTime.getTime()) / 1000)
//     timeDisplay.textContent = secToText(sec)
// }
