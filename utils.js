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
        daysString = days + ':'
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

export default { secToText, genGetID }
