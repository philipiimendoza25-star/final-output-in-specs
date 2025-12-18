console.log("✅ Script loaded!");

const quotes = ["Greek mythology originated from ancient oral traditions, likely evolving from Minoan Crete around 3000–1100 BCE, before being recorded in writing by poets like Hesiod around 700 BCE. Hesiod's Theogony details the cosmos emerging from Chaos, birthing Gaia (Earth), who produced Uranus (Sky); their Titan children, led by Cronus, overthrew Uranus, only for Zeus to later depose Cronus and establish the Olympian pantheon on Mount Olympus"];

let timeLeft = 30, mistakes = 0, testActive = false;

const quoteEl = document.getElementById('quote');
const inputEl = document.getElementById('input');
const timerEl = document.getElementById('timer');
const mistakesEl = document.getElementById('mistakes');
const wpmEl = document.getElementById('wpm');
const startBtn = document.getElementById('start');
const resultEl = document.getElementById('result');
const finalWPMEl = document.getElementById('finalWPM');
const finalAccuracyEl = document.getElementById('finalAccuracy');

// ✅ ADD: Live typing checker
inputEl.addEventListener('input', checkTyping);

function checkTyping() {
    if (!testActive) return;

    const typed = inputEl.value;
    const quote = quotes[0];
    let mistakesCount = 0;

    // Count character mismatches
    for (let i = 0; i < typed.length; i++) {
        if (i < quote.length && typed[i] !== quote[i]) {
            mistakesCount++;
        }
    }

    mistakes = mistakesCount;
    mistakesEl.textContent = mistakes;

    // Live WPM
    const elapsed = 30 - timeLeft;
    if (elapsed > 0) {
        const liveWPM = Math.round(typed.length / 5 / (elapsed / 60));
        wpmEl.textContent = liveWPM;
    }
}

function startTest() {
    testActive = true;
    timeLeft = 30;
    mistakes = 0;
    inputEl.value = ''; // Clear input
    inputEl.disabled = false;
    inputEl.focus();
    startBtn.style.display = 'none';
    resultEl.style.display = 'none';
    quoteEl.textContent = quotes[0];
    timerEl.textContent = '30s';
    mistakesEl.textContent = '0';
    wpmEl.textContent = '0';

    const timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft + 's';
        if (timeLeft <= 0) {
            clearInterval(timer);
            endTest();
        }
    }, 1000);
}

function endTest() {
    testActive = false;
    inputEl.disabled = true;

    const typed = inputEl.value;
    const quote = quotes[0];
    const correctChars = typed.split('').filter((c, i) => i < quote.length && c === quote[i]).length;
    const total = Math.max(typed.length, quote.length);
    const accuracy = Math.round((correctChars / total) * 100) || 0;
    const wpm = Math.round(typed.length / 5 / 0.5); // 30s = 0.5 minutes

    finalWPMEl.textContent = wpm;
    finalAccuracyEl.textContent = accuracy + '%';
    resultEl.style.display = 'block';
    startBtn.style.display = 'inline-block';
    startBtn.textContent = 'New Test';
}

startBtn.addEventListener('click', startTest);