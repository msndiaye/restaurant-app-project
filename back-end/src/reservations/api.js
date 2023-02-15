function phoneConvert(number) {

    const allNumber = [...number].map(n => +n).every(n => Number(n) || n === 0)
    if (number.length === 12) {
        const store = []
        for (let i = 0; i < number.length; i++) {
            if (Number(number[i]) || Number(number[i]) === 0) {
                store.push(1)
            } else if (number[i] === "-") {
                store.push(number[i])
            }
        }
        const checkValidNumber = "111-111-1111" === store.join("")

        if (checkValidNumber) return true

    } else if (allNumber && number.length === 10) {

        return true
    }
    return false


}


module.exports = phoneConvert