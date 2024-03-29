import Utils from './utils.js'
const { secToText, genGetID } = Utils

const alarmAudio = new Audio('./audio/alarm.mp3')

/**
 * Class for working with a timer
 * @export
 * @class Timer
 */
export default class Timer {
    /**
     * Creating an object for working with a stopwatch and a timer.
     * @param {Object} obj Timer description object
     * @param {string} [obj.root] The name of the element to connect
     * @param {string} [obj.name] Name of the timer
     * @param {boolean} [obj.pause] Pause (not implemented)
     * @param {number} [obj.secCount] Seconds counter (not implemented)
     * @param {boolean} [obj.forward] Count direction (stopwatch = true / timer = false)
     * @param {Date} [obj.startTime] Count start time
     * @param {number} [obj.endTimeSec] After how many seconds the timer will end
     * @param {boolean} [obj.alarmDone] The timer has already worked or not
     */
    constructor(obj = {}) {
        console.log('NEW Timer input:', obj)
        obj.root = obj.root ?? 'root'
        obj.name = obj.name ?? 'Name'
        obj.pause = obj.pause ?? false
        obj.secCount = obj.secCount ?? 0
        if (typeof obj.startTime === 'string') {
            obj.startTime = new Date(obj.startTime)
        } else {
            obj.startTime = new Date()
        }
        obj.forward = obj.forward ?? true
        obj.endTimeSec = +obj.endTimeSec ?? 0
        obj.alarmDone = obj.alarmDone ?? false
        obj.alarmDisabled = obj.alarmDisabled ?? true
        // obj.endTimeSec += 1
        this.obj = obj
        this.id = genGetID.next().value
        setHTML(this)
        if (obj.forward) {
            const mainStartTime = obj.startTime
            this.timeStartText.textContent = `${mainStartTime.getHours()}:${String(
                mainStartTime.getMinutes()
            ).padStart(2, '0')}`
            const today = new Date().toDateString()
            const startDay = mainStartTime.toDateString()
            if (today !== startDay) {
                const options = { month: 'long', day: 'numeric' }
                this.timeStartText.textContent +=
                    ' - ' + mainStartTime.toLocaleDateString('ru-RU', options)
            }
        } else {
            this.timeStartText.textContent = secToText(obj.endTimeSec)
        }
        console.log('NEW Timer:', this)
        this.update()
    }
    update() {
        if (this.obj.forward) {
            this.timeText.textContent = this.getTimeString()
        } else {
            this.timeText.textContent = this.getTimeStringBack()
        }
    }
    rename(newName) {
        this.obj.name = newName
        this.container.classList.remove('timer--load')
    }
    reset() {
        this.obj.startTime = new Date()
        this.update()
        this.container.classList.remove('timer--mod-final')
        this.timeText.classList.remove('blink')
        this.obj.alarmDone = false
        this.obj.alarmDisabled = true
    }
    focusName() {
        this.text.focus()
        window.getSelection().removeAllRanges()
        window.getSelection().selectAllChildren(this.text)

        // let sel, range
        // if (window.getSelection && document.createRange) {
        //     range = document.createRange();
        //     range.selectNodeContents(this.text);
        //     sel = window.getSelection();
        //     sel.removeAllRanges();
        //     sel.addRange(range);
        // } else if (document.body.createTextRange) {
        //     range = document.body.createTextRange();
        //     range.moveToElementText(this.text);
        //     range.select();
        // }
    }
    delete() {
        console.log('DELETE timer ID:', this.id)
        this.container.remove()
        window.deleteTimer(this.id)
    }
    save() {
        return this.obj
    }
    inc(inc = 1) {
        this.obj.secCount += inc
    }
    /**
     * Переводит секунды в читаемый вид
     * @returns {string} Текст в виде "00:00:00"
     */
    getTimeString() {
        const newTime = new Date()
        const sec = Math.floor((newTime.getTime() - this.obj.startTime.getTime()) / 1000)
        return secToText(sec)
    }
    getTimeStringBack() {
        const newTime = new Date()
        const sec = Math.round(
            (this.obj.startTime.getTime() +
                this.obj.endTimeSec * 1000 -
                newTime.getTime()) /
                1000
        )
        if (!this.obj.alarmDone) {
            if (sec > 0) {
                // this.container.classList.remove('timer--mod-final')
                return secToText(sec)
            } else {
                this.obj.alarmDone = true
                this.obj.alarmDisabled = false
                this.container.classList.add('timer--mod-final')
                this.timeText.classList.add('blink')
                alarmAudio.play()
            }
        }
        return '00:00'
    }
}

function onClickReset(evnt, item) {
    item.reset()
}

function onClickDelete(evnt, item) {
    item.delete()
}
/**
 * Передвинуть элементв в DOM в первую позицию у родителя
 * @param {event} evnt
 * @param {object} item
 */
function onClickToTop(evnt, item) {
    item.container.parentElement.prepend(item.container)
    window.moveTimerToTop(item.id)
}

function onClickRemoveBlink(evnt, item) {
    evnt.target.classList.remove('blink')
    item.obj.alarmDisabled = true
}

/**
 * Создание HTML элементов для таймера
 * @param {object} a Объект для хранения новых элементов HTML
 */
function setHTML(a) {
    a.container = document.createElement('div')
    let modClass = ''
    if (a.obj.name === 'LOAD') {
        modClass = ' timer--load'
    }
    if (!a.obj.forward) {
        modClass += ' timer--mod'
    }
    if (a.obj.alarmDone) modClass += ' timer--mod-final'
    a.container.className = 'timer' + modClass

    a.text = document.createElement('div')
    a.text.className = 'timer__name'
    a.text.textContent = a.obj.name
    a.text.contentEditable = true

    a.text.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            console.info('-ENTER-')
            window.getSelection().removeAllRanges()
            e.target.blur()
        }
    })

    a.text.addEventListener('blur', function () {
        console.info('-blur-')
        // a.obj.name = a.text.textContent
        a.rename(a.text.textContent)
    })

    a.timeText = document.createElement('div')
    a.timeText.className = 'timer__timeText'
    a.timeText.textContent = '00:00'
    a.timeText.onclick = (evnt) => onClickRemoveBlink(evnt, a)
    if (!a.obj.alarmDisabled) a.timeText.classList.add('blink')

    a.timeStartText = document.createElement('div')
    a.timeStartText.className = 'timer__startTime'
    a.timeStartText.textContent = '--:--'

    a.btnContainer = document.createElement('div')
    a.btnContainer.className = 'timer__buttons'

    a.buttonToTop = document.createElement('button')
    a.buttonToTop.className = 'timer__button button'
    a.buttonToTop.textContent = 'Top'
    a.buttonToTop.onclick = (evnt) => onClickToTop(evnt, a)

    const img2 = document.createElement('img')
    img2.src = './images/pin.png'
    img2.className = 'button__icon'
    a.buttonToTop.prepend(img2)

    a.button = document.createElement('button')
    a.button.className = 'timer__button button'
    a.button.textContent = 'Reset'
    a.button.onclick = (evnt) => onClickReset(evnt, a)

    const img1 = document.createElement('img')
    img1.src = './images/reset.png'
    // img1.width='20'
    img1.className = 'button__icon'
    // a.button.prepend(document.createElement('br'))
    a.button.prepend(img1)

    a.buttonDel = document.createElement('button')
    a.buttonDel.className = 'timer__button button timer__button--small'
    a.buttonDel.dataset.id = a.id
    a.buttonDel.innerHTML = '&#10006;'
    a.buttonDel.onclick = (evnt) => onClickDelete(evnt, a)

    a.container.appendChild(a.text)
    a.container.appendChild(a.timeText)
    a.container.appendChild(a.timeStartText)

    a.container.appendChild(a.btnContainer)
    a.btnContainer.appendChild(a.buttonToTop)
    a.btnContainer.appendChild(a.button)
    a.btnContainer.appendChild(a.buttonDel)
    document.getElementById(a.obj.root).appendChild(a.container)
}
