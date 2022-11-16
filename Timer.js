import Utils from "./utils.js"
const {secToText} = Utils

export default class Timer {
    constructor(startTime = new Date(), pause = false, secCount = 0) {
        this.startTime = startTime
        this.pause = pause
        this.secCount = secCount
    }
    inc() {
        this.secCount++
    }
    getTimeString() {
        const newTime = new Date()
        const sec = Math.floor((newTime.getTime() - this.startTime.getTime()) / 1000)
        return secToText(sec)
    }
}
