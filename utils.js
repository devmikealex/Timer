function secToText(seconds) {
    const sec = seconds % 60
    const min = ~~(seconds / 60) % 60
    const hrs = ~~(seconds / 3600) % 24
    const days = ~~(seconds / 86400)

    let hrsString = '',
        daysString = ''
    if (hrs) {
        hrsString = String(hrs).padStart(2, '0') + ' : '
    }
    if (days) {
        daysString = String(days).padStart(2, '0') + ' : '
    }
    const out = `${daysString}${hrsString}${String(min).padStart(2, '0')} : ${String(
        sec
    ).padStart(2, '0')}`

    console.info(`FUNC secToText(${seconds}):`, out)
    return out
}

export default {secToText}