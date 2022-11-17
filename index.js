// import {secToText} from "./utils.js"
import Timer from './Timer.js'

const btnSave = document.getElementById('btn-save')
btnSave.addEventListener('click', saveStorage)
const btnDelete = document.getElementById('btn-delete')
btnDelete.addEventListener('click', deleteStorage)
const btnAddNew = document.getElementById('btn-add-new')
btnAddNew.addEventListener('click', addNewTimer)


let loadTimers = localStorage.getItem('timers')
let timers = []

if (loadTimers) {
    console.log('Tiemrs LOAD')
    loadTimers = JSON.parse(loadTimers)
    loadTimers.forEach(e => {
        console.log("🚀 forEach", e)
        timers.push( new Timer(e.root, e.name, e.startTime, e.pause, e.secCount) )
    });
} else {
    console.log('Tiemrs CREATE')
    timers.push( new Timer() )
    timers.push( new Timer('root2', 'test name') )
}

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

function addNewTimer() {
    timers.push( new Timer() )
}

window.deleteTimer = function (id) {
    console.info('FUNC deleteTimer ID:', id)
    timers = timers.filter ((e) => {
        return e.id !== id
    })
    console.log("timers", timers)
}
