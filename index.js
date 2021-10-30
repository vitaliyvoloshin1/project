var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $result = document.querySelector('#result')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $gameTime = document.querySelector('#game-time')
var colors = ['#517909', '#794c09', '#790909' , '#792909', '#1c7909', '#097927', '#097958', '#097972'] // создаем масив c цветами и будем передавать в renderbox цвета
var score = 0
var isGameStarted = false

$start.addEventListener('click', startGame) // ставим обработчик события клика
$game.addEventListener('click', handleBoxClick) // создали,чтобы отловить событие клика .вешаем событие на весь блок , а не на блок game
$gameTime.addEventListener('input', setGameTime)

function show($el) {
    $el.classList.remove('hide')
}

function hide($el) {
    $el.classList.add('hide')
}
function startGame() {
    score = 0
    setGameTime()
    $gameTime.setAttribute('disabled', 'true')
    isGameStarted = true
    $game.style.backgroundColor = '#fff' // к стилям game
    hide($start) // обращаемся  к класс листу 
    var interval = setInterval(function() { //запускает интервал
        var time = parseFloat($time.textContent) //создаем локальную переменную ,чтобы менять миллисек
        if (time <=0 ) { // устанавливаем условия таймера
          clearInterval(interval)
          endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }
    
    }, 100) 
    
    renderBox() 
}
function setGameScore () {
    $result.textContent = score.toString()
}
function setGameTime() {
    var time = +$gameTime.value
    $time.textContent = time.toFixed(1)
    show($timeHeader)
    hide($resultHeader)
}
function endGame() {
    isGameStarted = false
    setGameScore()
    $gameTime.removeAttribute('disabled')
    show($start)
    $game.style.backgroundColor = '#ccc'
    $game.innerHTML = ''
    hide($timeHeader)
    show($resultHeader)
}
function handleBoxClick(event) {
    if(!isGameStarted) {
        return
    }
    if (event.target.dataset.box) {   // dataset вревращается в обьект где перечислены значения
        score++
        renderBox() // генирировать по новой квадрат
    } 
}

function renderBox() { // изменять html создавая квадраты
    $game.innerHTML = '' // сразу очищает контейнер 
    var box = document.createElement('div') // оздаем элемент котрй будет появляться и результат функции ложим в box
    var boxSize = getRandom(30, 100)
    var gameSize = $game.getBoundingClientRect() // вычеслить диапазон поля game
    var maxTop = gameSize.height - boxSize //максимально отклонение от верхней части игры 
    var maxLeft = gameSize.width - boxSize
    var randomColorIndex = getRandom(0, colors.length) // ложим внутрь значения индекса

    box.style.height = box.style.width = boxSize + 'px' // задаем стили для бокса
    box.style.position = 'absolute' 
    box.style.backgroundColor = colors[randomColorIndex] // создали переменную
    box.style.top = getRandom(0, maxTop) + 'px' // когда сделали переменные maxLef и Тор поменяли на них
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'// чтобы юзер понимал что можно кликать
    box.setAttribute('data-box', 'true') // понять что именно клик по квадрату был


    $game.insertAdjacentElement('afterbegin', box) // функция позволяет положить html в данный div
    
} 

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min) //для того чтобы мы получили целое число пишем умножение и тд. math floor чтобы округлить в нижнюю сторону
}
