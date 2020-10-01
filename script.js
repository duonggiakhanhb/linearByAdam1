// ## Global Variables
var ALPHABE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const SEARCH_INTERVAL_TIME = 800;
let linear_interval;
var ALPHABET


// ## Helper Functions
function randomIndex(array) {
    return Math.ceil(Math.random() * array.length) - 1;
}

function randomElement(array) {
    return array[randomIndex(array)];
}

function createNumber(array) {
    for (i = 0; i <= 20; i++) {
        array[i] = i;
    }
}


// ## Search Functions
function startLinearSearch(value, set) {
    let current_value;
    let current_elm;
    let current_index = 0;
    let num_iterations = 0;
    let info = document.getElementById('linear-info');
    linear_interval = setInterval(() => {
        current_value = set[current_index];
        current_elm = document.getElementById(`${current_value}-linear`);
        num_iterations += 1;
        if (current_index >= set.length) {
            clearInterval(linear_interval);
            info.innerHTML = `Index: -1, Value: none, Num Iterations: ${num_iterations}`;
            return;
        }
        if (current_value != value) {
            current_elm.className = "exempt";
            info.innerHTML = `Index: ${current_index}, Value: ${current_value}, Num Iterations: ${num_iterations}`;
        }
        if (current_value == value) {
            clearInterval(linear_interval);
            current_elm.className = "found";
            info.innerHTML = `Index: ${current_index}, Value: ${current_value}, Num Iterations: ${num_iterations}`;
            return;
        }
        current_index += 1;
    }, SEARCH_INTERVAL_TIME);
}



// ## DOM triggered functions
function reset() {
    clearInterval(linear_interval);
    let exempt = document.querySelectorAll('.exempt');
    Array.prototype.forEach.call(exempt, el => { el.classList.remove('exempt'); });
    let found = document.querySelectorAll('.found');
    Array.prototype.forEach.call(found, el => { el.classList.remove('found'); });
    let info = document.querySelectorAll('.info');
    Array.prototype.forEach.call(info, el => { el.innerHTML = '&nbsp;'; });
    enableButton('random-btn');
    enableButton('search-btn');
    let input = document.getElementById('random-letter');
    input.value = null;
    let uList = document.getElementById("myList");
    while (uList.hasChildNodes()) {
        uList.removeChild(uList.firstChild);
    }

}

function getRandomLetter() {
    const value = randomElement(ALPHABET);
    let input = document.getElementById('random-letter');
    input.value = value;
    input.style.webkitAnimationName = 'shake';
    input.className = 'shake';
}

function disableButton(id) {
    document.getElementById(id).disabled = true;
}

function enableButton(id) {
    document.getElementById(id).disabled = false;
}

function createNumberLI() {
    let args = new Array();
    createNumber(args);
    for (i in args) {
        let li = document.createElement("li");
        li.id = i + '-linear';
        li.className = 'liAlpha';
        let textnode = document.createTextNode(i);
        li.appendChild(textnode);

        document.getElementById("myList").appendChild(li);
    }
    let info = document.getElementById("linear-info");
    info.innerHTML = `adammm`;
    ALPHABET = args;
}

function createAlphabetLI() {
    ALPHABET = ALPHABE;
    for (i in ALPHABET) {
        let li = document.createElement("li");
        li.id = ALPHABET[i] + '-linear';
        li.className = 'liAlpha';
        let textnode = document.createTextNode(ALPHABET[i]);
        li.appendChild(textnode);

        document.getElementById("myList").appendChild(li);
    }
    info = document.getElementById("linear-info");
    info.innerHTML = `adam`;
}

// ## Setup functions
function setupInputHandlers() {
    let input = document.getElementById('random-letter');
    input.onkeyup = function() {
        this.value = this.value.toUpperCase();
        reset();
    };
    input.addEventListener('webkitAnimationEnd', function() {
        this.style.webkitAnimationName = '';
        this.className = '';
    }, false);
    let random_btn = document.getElementById('random-btn');
    random_btn.onclick = function(e) {
        e.preventDefault();
        getRandomLetter();
    };
    let search_btn = document.getElementById('search-btn');
    search_btn.onclick = function(e) {
        e.preventDefault();
        if (input.value.length) {
            startLinearSearch(input.value, ALPHABET);
        }
    };
    let alphabet_btn = document.getElementById('alpha-btn');
    alphabet_btn.onclick = function(e) {
        e.preventDefault();
        reset();
        createAlphabetLI();


    }
    let number_btn = document.getElementById('number-btn');
    number_btn.onclick = function(e) {
        e.preventDefault();
        reset();
        createNumberLI();
    }
}

function inputFocus() {
    let input = document.getElementById('random-letter');
    input.focus();
}

// Let's roll
window.onload = () => {
    setupInputHandlers();
    inputFocus();
};