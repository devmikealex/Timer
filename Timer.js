import Utils from './utils.js'
const { secToText, genGetID } = Utils

export default class Timer {
    constructor(obj = {}) {
        console.log('NEW Timer input:', obj)
        obj.root = obj.root ?? 'root'
        obj.name = obj.name ?? 'none'
        obj.pause = obj.pause ?? false
        obj.secCount = obj.secCount ?? 0
        obj.forward = obj.forward ?? true
        if (typeof obj.startTime === 'string') {
            obj.startTime = new Date(obj.startTime)
        } else {
            obj.startTime = new Date()
        }
        obj.endTimeSec = obj.endTimeSec ?? 0
        this.obj = obj
        this.id = genGetID.next().value
        setHTML(this)
        console.log('NEW Timer:', this)
    }
    update() {
        if (this.obj.forward) {
            this.timeText.textContent = this.getTimeString()
        } else {
            this.timeText.textContent = this.getTimeStringBack()
        }
    }
    reset() {
        this.obj.startTime = new Date()
        this.update()
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
    getTimeString() {
        const newTime = new Date()
        const sec = Math.floor((newTime.getTime() - this.obj.startTime.getTime()) / 1000)
        return secToText(sec)
    }
    getTimeStringBack() {
        const newTime = new Date()
        const sec = Math.floor(
            (this.obj.startTime.getTime() +
                this.obj.endTimeSec * 1000 -
                newTime.getTime()) /
                1000
        )
        if (sec > 0) {
            this.container.classList.remove("timer--mod-final")
            return secToText(sec)
        }else{
            this.container.classList.add("timer--mod-final")
            return '00:00'
        }
    }
}

function onClickReset(evnt, item) {
    item.reset()
}

function onClickDelete(evnt, item) {
    item.delete()
}

function setHTML(a) {
    a.container = document.createElement('div')
    a.container.className = 'timer' + (a.obj.forward ? '' : ' timer--mod')

    a.text = document.createElement('div')
    a.text.className = 'timer__name'
    a.text.textContent = a.obj.name
    a.text.contentEditable = true
    a.text.addEventListener('input', function () {
        a.obj.name = this.textContent
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
    a.buttonDel.dataset.id = a.id
    a.buttonDel.textContent = 'Del'
    a.buttonDel.onclick = (evnt) => onClickDelete(evnt, a)

    a.container.appendChild(a.text)
    a.container.appendChild(a.timeText)
    a.container.appendChild(a.button)
    a.container.appendChild(a.buttonDel)
    document.getElementById(a.obj.root).appendChild(a.container)
}
