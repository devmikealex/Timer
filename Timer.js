import Utils from './utils.js'
const { secToText, genGetID } = Utils

export default class Timer {
    constructor(
        root = 'root',
        name = 'none',
        startTime = new Date(),
        pause = false,
        secCount = 0
    ) {
        this.root = root
        this.name = name
        if (typeof startTime === 'string') {
            this.startTime = new Date(startTime)
        } else {
            this.startTime = startTime
        }
        this.pause = pause
        this.secCount = secCount
        this.id = genGetID.next().value

        setHTML(this)
        console.log(this)
    }
    update() {
        this.timeText.textContent = this.getTimeString()
    }
    reset() {
        this.startTime = new Date()
        this.update()
    }
    delete() {
        //Todo -----------
        console.log('DELETE timer ID:', this.id);
        this.container.remove()
        window.deleteTimer(this.id)
    }
    save() {
        return {
            root: this.root,
            name: this.name,
            startTime: this.startTime,
            pause: this.pause,
            secCount: this.secCount,
        }
    }
    inc(inc = 1) {
        this.secCount += inc
    }
    getTimeString() {
        const newTime = new Date()
        const sec = Math.floor((newTime.getTime() - this.startTime.getTime()) / 1000)
        return secToText(sec)
    }
}

function onClickReset(evnt, item) {
    item.reset()
}

function onClickDelete(evnt, item) {
    item.delete()
}

const setHTML = (a) => {
    a.container = document.createElement('div')
    a.container.className = 'timer'

    a.text = document.createElement('div')
    a.text.className = 'timer__name'
    a.text.textContent = a.name
    a.text.contentEditable = true
    a.text.addEventListener('input', function () {
        a.name = this.textContent
    })

    a.timeText = document.createElement('div')
    a.timeText.className = 'timer__timeText'
    a.timeText.textContent = '00:00'

    a.button = document.createElement('button')
    a.button.className = 'timer__button button'
    a.button.textContent = 'Reset'
    a.button.onclick = (evnt) => onClickReset(evnt, a)

    a.buttonDel = document.createElement('button')
    a.buttonDel.className = 'timer__button button timer__button--small'
    a.buttonDel.textContent = 'Del'
    a.buttonDel.onclick = (evnt) => onClickDelete(evnt, a)

    a.container.appendChild(a.text)
    a.container.appendChild(a.timeText)
    a.container.appendChild(a.button)
    a.container.appendChild(a.buttonDel)
    document.getElementById(a.root).appendChild(a.container)
}
