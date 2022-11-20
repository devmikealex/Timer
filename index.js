import Timer from './Timer.js'
import Utils from './utils.js'
const { secToText } = Utils

// document.body.addEventListener('click', (e) => {
//     const tag = e.target.tagName
//     const id = e.target.dataset.id
//     console.info('BODY click', tag, 'id:', id)
//     if (e.target.tagName==='BUTTON' && id) {
//         console.info('ID:', id)
//         window.deleteTimer(+id)
//     }
// })

const tools = document.getElementById('tools')
const clock = document.getElementById('clock')

const btnSave = document.getElementById('btn-save')
btnSave.addEventListener('click', saveStorage)
const btnDelete = document.getElementById('btn-delete')
btnDelete.addEventListener('click', deleteStorage)
const btnAddNew = document.getElementById('btn-add-new')
btnAddNew.addEventListener('click', addNew)
const btnAddNewTimer = document.getElementById('btn-add-new-timer')
btnAddNewTimer.addEventListener('click', () => addNewTimer())

let loadTimers = localStorage.getItem('timers')
let timers = []

timers.push(new Timer({name: 'LOAD'}))

if (loadTimers) {
    console.log('Timers LOAD')
    loadTimers = JSON.parse(loadTimers)
    loadTimers.forEach((e) => {
        console.log('🚀 forEach', e)
        // timers.push( new Timer(e.root, e.name, e.startTime, e.pause, e.secCount, e.forward) )
        timers.push(new Timer(e))
    })
} else {
    // console.log('Timers CREATE')
    // timers.push(new Timer())
    // timers.push( new Timer('root2', 'test name') )
}

for (let i = 10; i < 200; i += 10) {
    const btn = document.createElement('button')
    btn.className = 'button'
    btn.dataset.sec = i * 60
    const temp = secToText(i * 60)
    btn.textContent = `${temp.substring(0, temp.length - 3)}m`
    btn.onclick = () => addNewTimer(btn.dataset.sec)
    tools.appendChild(btn)
}

timer()
setInterval(timer, 1000)

function timer() {
    clock.textContent=(new Date()).toTimeString().slice(0,5)
    timers.forEach((e) => {
        e.update()
    })
}

function saveStorage() {
    console.info('FUNC save')
    const a = timers.map((e) => e.save())
    console.log('SAVE', a)
    localStorage.setItem('timers', JSON.stringify(a))
    // return a
}

function deleteStorage() {
    console.info('FUNC deleteStorage')
    localStorage.removeItem('timers')
}

function addNew() {
    timers.push(new Timer())
}

function addNewTimer(sec = 5) {
    timers.push(new Timer({ forward: false, endTimeSec: sec }))
}

window.deleteTimer = function (id) {
    console.info('FUNC deleteTimer ID:', id)
    timers = timers.filter((e) => {
        return e.id !== id
    })
    console.log('timers', timers)
}
