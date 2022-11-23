/**
 * Конвертирует текст в количество секунд
 * @param {string} text Таймкод вида '00:00:00:00'
 * @returns {number} Количество секунд
 */
function textToSec(text) {
    console.info(`FUNC textToSec (${text})`)

    const timeCodeArr = text.split(':')
    console.log("🚀 ~ file: utils.js ~ line 9 ~ textToSec ~ timeCodeArr", timeCodeArr)
    const len = timeCodeArr.length
    let sec=0
    const a = [1, 60, 3600, 86400]

    const b = (i) => {
        sec += +timeCodeArr[len-1-i] * a[i]
        return sec
    }

    for (let i = 0; i < len; i++) {
        sec = b(i)
        console.info("🚀 ~ utils.js ~ textToSec ~ SEC", sec)
        // console.log(secToText(sec))
    }

    // // sec = +timeCodeArr[len-1]
    // sec = b(0)
    // console.log("🚀 ~ file: utils.js ~ line 14 ~ textToSec ~ sec", sec)
    // console.log(secToText(sec))
    
    // sec = b(1)
    // // sec += +timeCodeArr[len-2] * 60
    // console.log("🚀 ~ file: utils.js ~ line 14 ~ textToSec ~ sec", sec)
    // console.log(secToText(sec))

    // sec = b(2)
    // // sec += +timeCodeArr[len-3] * 3600
    // console.log("🚀 ~ file: utils.js ~ line 14 ~ textToSec ~ sec", sec)
    // console.log(secToText(sec))

    // sec = b(3)
    // // sec += +timeCodeArr[len-4] * 86400
    // console.log("🚀 ~ file: utils.js ~ line 14 ~ textToSec ~ sec", sec)
    // console.log(secToText(sec))

    return sec
}

/**
 * Конвертирует секунды в привычный вид времени
 * @param {number} seconds Количество секунд
 * @returns {string} Строка вида '00:00'
 */
function secToText(seconds) {
    const sec = seconds % 60
    const min = ~~(seconds / 60) % 60
    const hrs = ~~(seconds / 3600) % 24
    const days = ~~(seconds / 86400)

    let hrsString = '',
        daysString = ''
    if (hrs) {
        // hrsString = String(hrs).padStart(2, '0') + ':'
        hrsString = hrs + ':'
    }
    if (days) {
        // daysString = String(days).padStart(2, '0') + ':'
        daysString = days + 'd '
    }
    const out = `${daysString}${hrsString}${String(min).padStart(2, '0')}:${String(
        sec
    ).padStart(2, '0')}`

    // console.info(`FUNC secToText(${seconds}):`, out)
    return out
}

/**
 * Генератор уникального (в рамках запуска) индентификатора
 * @returns {number}
 */
function *getID() {
    let id = 0
    while (1) {
        id++
        yield id
    }
}
/**
 * Генератор уникального (в рамках запуска) индентификатора
 * @example genGetID()
 * @returns {number}
 */
const genGetID = getID()

export default { secToText, textToSec, genGetID }
