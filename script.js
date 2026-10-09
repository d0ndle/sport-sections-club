// window.onload: код запускается, когда страница полностью загружена
// и все кнопки уже существуют в DOM
window.onload = function () {
    // числа храним строками: так удобно дописывать цифры в конец ('14' + '5' = '145')
    let a = ''                    // первое число
    let b = ''                    // второе число
    let expressionResult = ''     // результат вычисления
    let selectedOperation = null  // выбранная операция: '+', '-', 'x', '/', 'membership'

    // скидка на абонемент от 6 месяцев (индивидуальная операция)
    const membershipDiscountMonths = 6
    const membershipDiscount = 0.1

    // табло калькулятора
    const outputElement = document.getElementById('result')

    // все кнопки, чей id начинается с "btn_digit_" (цифры 0-9 и точка)
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

    // ввод цифры: дописываем её в a (если операция ещё не выбрана) или в b
    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            // вторую точку в числе не допускаем
            if (digit !== '.' || !a.includes('.')) {
                a += digit
            }
            outputElement.innerHTML = a
        } else {
            if (digit !== '.' || !b.includes('.')) {
                b += digit
            }
            outputElement.innerHTML = b
        }
    }

    // текущее число на табло: b, если вводим второе число, иначе a
    function getCurrentNumber() {
        return selectedOperation ? b : a
    }

    // записать новое значение в текущее число и показать его
    function setCurrentNumber(value) {
        if (selectedOperation) {
            b = value
        } else {
            a = value
        }
        outputElement.innerHTML = value === '' ? 0 : value
    }

    // на каждую цифру вешаем один и тот же обработчик
    digitButtons.forEach(button => {
        button.onclick = function () {
            // текст на кнопке и есть цифра
            onDigitButtonClicked(button.innerHTML)
        }
    })

    // выбор операции: запоминаем её, ввод дальше пойдёт во второе число
    function selectOperation(operation) {
        if (a === '') return
        selectedOperation = operation
    }

    document.getElementById('btn_op_plus').onclick = () => selectOperation('+')
    document.getElementById('btn_op_minus').onclick = () => selectOperation('-')
    document.getElementById('btn_op_mult').onclick = () => selectOperation('x')
    document.getElementById('btn_op_div').onclick = () => selectOperation('/')

    // индивидуальная операция «Абонемент»:
    // a — стоимость секции в месяц, b — число месяцев
    document.getElementById('btn_op_membership').onclick = () => selectOperation('membership')

    // C — сброс всего
    document.getElementById('btn_op_clear').onclick = function () {
        a = ''
        b = ''
        selectedOperation = null
        expressionResult = ''
        outputElement.innerHTML = 0
    }

    // +/- — смена знака текущего числа
    document.getElementById('btn_op_sign').onclick = function () {
        const current = getCurrentNumber()
        if (current === '') return
        setCurrentNumber((-current).toString())
    }

    // % — текущее число делим на 100
    document.getElementById('btn_op_percent').onclick = function () {
        const current = getCurrentNumber()
        if (current === '') return
        setCurrentNumber((current / 100).toString())
    }

    // ⌫ — стираем последнюю цифру: slice(0, -1) отрезает последний символ строки
    document.getElementById('btn_op_backspace').onclick = function () {
        setCurrentNumber(getCurrentNumber().slice(0, -1))
    }

    // стоимость абонемента: цена × месяцы, от 6 месяцев скидка 10%
    function calculateMembershipPrice(monthlyPrice, months) {
        let membershipPrice = monthlyPrice * months
        if (months >= membershipDiscountMonths) {
            membershipPrice = membershipPrice * (1 - membershipDiscount)
        }
        return membershipPrice
    }

    // = — считаем результат выбранной операции
    document.getElementById('btn_op_equal').onclick = function () {
        if (a === '' || b === '' || !selectedOperation) return

        // унарный плюс (+a) превращает строку в число
        switch (selectedOperation) {
            case 'x':
                expressionResult = (+a) * (+b)
                break
            case '+':
                expressionResult = (+a) + (+b)
                break
            case '-':
                expressionResult = (+a) - (+b)
                break
            case '/':
                expressionResult = (+a) / (+b)
                break
            case 'membership':
                expressionResult = calculateMembershipPrice(+a, +b)
                break
        }

        // округляем до копеек, чтобы не было 0.30000000000000004
        expressionResult = Math.round(expressionResult * 100) / 100

        // результат становится первым числом для следующей операции
        a = expressionResult.toString()
        b = ''
        selectedOperation = null
        outputElement.innerHTML = a
    }
}
