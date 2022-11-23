import Timer from './Timer.js'
import Utils from './utils.js'
const { secToText, textToSec } = Utils

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
const date = document.getElementById('date')
const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

const btnSave = document.getElementById('btn-save')
btnSave.addEventListener('click', (e) => saveStorage(e))
const btnDelete = document.getElementById('btn-delete')
btnDelete.addEventListener('click', deleteStorage)
const btnAddNew = document.getElementById('btn-add-new')
btnAddNew.addEventListener('click', addNew)
const btnAddNewTimer = document.getElementById('btn-add-new-timer')
btnAddNewTimer.addEventListener('click', () => addNewTimer())

const inpTimecode = document.getElementById('inp-timecode')
inpTimecode.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        console.info('-ENTER-')
        addNewTimer(textToSec(inpTimecode.value))
    }
})
const btnAddNewTimecode = document.getElementById('btn-add-new-timecode')
btnAddNewTimecode.addEventListener('click', () =>
    addNewTimer(textToSec(inpTimecode.value))
)

let loadTimers = localStorage.getItem('timers')
let timers = []

timers.push(new Timer({ name: 'LOAD' }))

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

for (let i = 10; i < 190; i += 10) {
    const btn = document.createElement('button')
    btn.className = 'button tools__button--mod'
    btn.dataset.sec = i * 60
    const temp = secToText(i * 60)
    btn.textContent = `${temp.substring(0, temp.length - 3)}m`
    btn.onclick = () => addNewTimer(btn.dataset.sec)
    tools.appendChild(btn)
}

// textToSec('59')
// textToSec('00:25')
// textToSec('37:10')
// textToSec('05:48:34')
// textToSec('02:05:48:34')
timer()
setInterval(timer, 1000)

function timer() {
    const noew = new Date()
    clock.textContent = noew.toTimeString().slice(0, 5) + ' '
    date.textContent = noew.toLocaleDateString('ru', dateOptions)
    timers.forEach((e) => {
        e.update()
    })
    const time = document.querySelector(
        'div.timer:nth-child(1) > div:nth-child(2)'
    ).textContent
    const name = document.querySelector(
        'div.timer:nth-child(1) > div:nth-child(1)'
    ).textContent
    document.title = `${time} ${name} - Timer`
}
/**
 * Сохранить настрйоки таймеров.
 * @param {event} event
 * @param {boolean} copy - false в localStorage / true в буфер обмена
 */
function saveStorage(event, copy = false) {
    console.info('FUNC save')
    const alt = event.getModifierState("Alt")
    console.info('mod ALT', alt)
    const t_filterd = timers.filter((e) => e.obj.name !== 'LOAD')
    const a = t_filterd.map((e) => e.save())
    console.log('SAVE', a)
    let json = JSON.stringify(a)
    if (copy || alt) {
        navigator.clipboard.writeText(json)
        console.log('SAVE to clipboard')
    } else {
        const control = event.getModifierState("Control")
        console.info('mod control', control)
        if (control) {
            console.log('Get data from input for save')
            json = inpTimecode.value
        }
        localStorage.setItem('timers', json)
        console.log('SAVE to localStorage')
    }
}

function deleteStorage() {
    console.info('FUNC deleteStorage')
    localStorage.removeItem('timers')
}

function addNew() {
    const newItem = new Timer()
    timers.push(newItem)
    newItem.focusName()
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

window.moveTimerToTop = function (id) {
    console.info('FUNC moveTimerToTop ID:', id)
    const index = timers.findIndex((e) => e.id === id)
    const element = timers[index]
    timers.splice(index, 1)
    timers.splice(0, 0, element)
    console.log('timers', timers)
}
