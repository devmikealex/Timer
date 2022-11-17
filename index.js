// import {secToText} from "./utils.js"
import Timer from './Timer.js'

// document.body.addEventListener('click', (e) => {
//     const tag = e.target.tagName
//     const id = e.target.dataset.id
//     console.info('BODY click', tag, 'id:', id)
//     if (e.target.tagName==='BUTTON' && id) {
//         console.info('ID:', id)
//         window.deleteTimer(+id)
//     }
// })

const btnSave = document.getElementById('btn-save')
btnSave.addEventListener('click', saveStorage)
const btnDelete = document.getElementById('btn-delete')
btnDelete.addEventListener('click', deleteStorage)
const btnAddNew = document.getElementById('btn-add-new')
btnAddNew.addEventListener('click', addNew)
const btnAddNewTimer = document.getElementById('btn-add-new-timer')
btnAddNewTimer.addEventListener('click', addNewTimer)

let loadTimers = localStorage.getItem('timers')
let timers = []

if (loadTimers) {
    console.log('Tiemrs LOAD')
    loadTimers = JSON.parse(loadTimers)
    loadTimers.forEach(e => {
        console.log("🚀 forEach", e)
        // timers.push( new Timer(e.root, e.name, e.startTime, e.pause, e.secCount, e.forward) )
        timers.push( new Timer(e) )
    });
} else {
    console.log('Tiemrs CREATE')
    timers.push( new Timer() )
    // timers.push( new Timer('root2', 'test name') )
}

timer()
setInterval(timer, 1000)

function timer() {
    timers.forEach(e => {
        e.update()
    });
}

function saveStorage() {
    console.info('FUNC save')
    const a = timers.map(e => e.save())
    console.log('SAVE', a);
    localStorage.setItem('timers', JSON.stringify(a));
    // return a
}

function deleteStorage() {
    console.info('FUNC deleteStorage')
    localStorage.removeItem('timers');
}

function addNew() {
    timers.push( new Timer() )
}

function addNewTimer() {
    timers.push( new Timer({forward: false, endTimeSec: 5}) )
}

window.deleteTimer = function (id) {
    console.info('FUNC deleteTimer ID:', id)
    timers = timers.filter ((e) => {
        return e.id !== id
    })
    console.log("timers", timers)
}
