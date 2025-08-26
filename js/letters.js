// משתנה שמכיל את כל האותיות בעברית ושמותיהן המלאים
const letters = 'אבגדהוזחטיכלמםנןסעפףצץקרשת'.split('');
const letterNames = {
    'א': 'אָלֶף',
    'ב': 'בֵּת',
    'ג': 'גִּמֶל',
    'ד': 'דָּלֶת',
    'ה': 'הֵ',
    'ו': 'וָו',
    'ז': 'זַיִן',
    'ח': 'חֵת',
    'ט': 'טֵת',
    'י': 'יוּד',
    'כ': 'כָּף',
    'ך': 'כָף סוֹפִית',
    'ל': 'לָמֶד',
    'מ': 'מֵם',
    'ם': 'מֵם סוֹפִית',
    'נ': 'נוּן',
    'ן': 'נוּן סוֹפִית',
    'ס': 'סָמֶךְ',
    'ע': 'עַיִן',
    'פ': 'פֵּי',
    'ף': 'פֵיי סוֹפִית',
    'צ': 'צָדִי',
    'ץ': 'צָדִי סוֹפִית',
    'ק': 'קוּף',
    'ר': 'רֵישׁ',
    'ש': 'שִׁין',
    'ת': 'תָו'
};

// משתנים לשמירת רצף האותיות של המשחק ורצף האותיות שהמשתמש לחץ עליהן
let sequence = [];
let userSequence = [];
// משתנה לשמירת השלב הנוכחי
let level = 0;
// משתנה לציון המשתמש
let score = 0;
let scoretotal=0;
// משתנה שמציין אם המשחק במצב שמאפשר למשתמש ללחוץ על הכפתורים
let canClick = false;

// קבלת הפניות לאלמנטים מה-DOM
const lettersContainer = document.getElementById('letters-container');
const startButton = document.getElementById('start-button');
const messageDiv = document.getElementById('message');
const scoreDiv = document.getElementById('score');
const scoretotalDiv = document.getElementById('score-total');
const settingsIcon = document.getElementById('settings-icon');
const backgroundSelector = document.getElementById('background-selector');
const shapeSelector = document.getElementById('shape-selector');
const colorPicker = document.getElementById('color-picker');
const uploadBackground = document.getElementById('upload-background');
const settingsContent = document.getElementById('settings-content');

settingsIcon.addEventListener('click', () => {
    settingsContent.style.display = 'block';
});

// סגירת המודל כשלוחצים מחוץ לתוכן שלו
window.onclick = function(event) {
    if (event.target != settingsContent && event.target != settingsIcon) {
        settingsContent.style.display = 'none';
    }
};

// יצירת כפתורים לכל אות והוספתם לקונטיינר של האותיות
letters.forEach(letter => {
    const letterButton = document.createElement('div');
    letterButton.classList.add('letter');
    letterButton.textContent = letter;
    letterButton.addEventListener('click', () => handleUserInput(letter));
    lettersContainer.appendChild(letterButton);
});

// הוספת מאזין לאירוע לחיצה על כפתור ההתחלה
startButton.addEventListener('click', startGame);

// הוספת מאזין לאירוע לחיצה על מקש במקלדת
document.addEventListener('keydown', (event) => {
    const pressedLetter = event.key;
    if (letters.includes(pressedLetter)) {
        handleUserInput(pressedLetter);
    }
});

// פונקציה שמתחילה את המשחק
function startGame() {
    level = 0;
    score = 0; // איפוס הציון
    updateScore(); // עדכון הציון על המסך
    sequence = [];
    userSequence = [];
    messageDiv.textContent = '';
    nextLevel();
}

// פונקציה שמתחילה את השלב הבא
function nextLevel() {
    level++;
    userSequence = [];
    const nextLetter = letters[Math.floor(Math.random() * letters.length)];
    sequence.push(nextLetter);
    canClick = false;
    setButtonsState(false);
    playSequence();
}

// פונקציה שמנגנת את רצף האותיות הנוכחי
function playSequence() {
    let delay = 1500; // הגדלת הזמן בין ההדגשות ל-1000 מ"ל (1 שניה)
    sequence.forEach((letter, index) => {
        setTimeout(() => {
            speakLetter(letter);
            highlightLetter(letter);
        }, delay * (index + 1));
    });
    setTimeout(() => {
        messageDiv.textContent = `שלב ${level}: לחץ על האותיות בסדר הנכון`;
        canClick = true;
        setButtonsState(true);
    }, delay * (sequence.length + 1));
}

// פונקציה שמטפלת בלחיצת המשתמש על אות מסוימת
function handleUserInput(letter) {
    if (!canClick) return;
    
    const letterElement = [...lettersContainer.children].find(el => el.textContent === letter);
    letterElement.classList.add('pressed');
    setTimeout(() => {
        letterElement.classList.remove('pressed');
    }, 200);

    userSequence.push(letter);
    if (!compareSequences()) {
        const correctLetter = sequence[userSequence.length - 1];
        highlightWrongLetter(letter, correctLetter);
        return;
    }
    if (userSequence.length === sequence.length) {
        score += 5; // הוספת 5 נקודות לציון על כל רצף נכון
        scoretotal+=5;
        updateScore(); // עדכון הציון על המסך
        messageDiv.textContent = 'כל הכבוד! שלב הבא.';
        setTimeout(nextLevel, 1000);
    }
}

backgroundSelector.addEventListener('change', (event) => {
    document.body.style.backgroundImage = `url('${event.target.value}')`;
});

shapeSelector.addEventListener('change', (event) => {
    const shape = event.target.value;
    lettersContainer.querySelectorAll('.letter').forEach(letterButton => {
        letterButton.classList.remove('circle', 'star', 'rectangle');
        
        if (shape === 'circle') {
            letterButton.classList.add('circle');
            letterButton.style.borderRadius = '50%';
        } else if (shape === 'star') {
            letterButton.classList.add('star');
        } else {
            letterButton.style.borderRadius = '5px'; // החזרת ברירת המחדל
        }
    });
});

colorPicker.addEventListener('input', (event) => {
    const color = event.target.value;
    lettersContainer.querySelectorAll('.letter').forEach(letterButton => {
        letterButton.style.backgroundColor = color;
    });
});

uploadBackground.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.body.style.backgroundImage = `url('${e.target.result}')`;
        };
        reader.readAsDataURL(file);
    }
});

// lettersContainer.addEventListener('mouseover', (event) => {
//     if (event.target.classList.contains('letter')) {
//         const letter = event.target.textContent;
//         messageDiv.textContent = `זו האות ${letterNames[letter]}`;
//     }
// });

// lettersContainer.addEventListener('mouseout', () => {
//     messageDiv.textContent = '';
// });

// פונקציה שמשווה את רצף האותיות של המשתמש לרצף האותיות של המשחק
function compareSequences() {
    for (let i = 0; i < userSequence.length; i++) {
        if (userSequence[i] !== sequence[i]) {
            return false;
        }
    }
    return true;
}

// פונקציה שמדגישה את האות שמושמעת
function highlightLetter(letter) {
    const letterElement = [...lettersContainer.children].find(el => el.textContent === letter);
    letterElement.classList.add('highlight');
    setTimeout(() => {
        letterElement.classList.remove('highlight');
    }, 1000); // הגדלת הזמן להדגשה ל-1000 מ"ל (1 שניה)
}

// פונקציה שמשמיעה את האות בקול
function speakLetter(letter) {
    const msg = new SpeechSynthesisUtterance(letterNames[letter]);
    msg.lang = 'he-IL';
    window.speechSynthesis.speak(msg);
}

// פונקציה שמדגישה את האות השגויה ואת האות הנכונה
function highlightWrongLetter(wrongLetter, correctLetter) {
    const wrongLetterElement = [...lettersContainer.children].find(el => el.textContent === wrongLetter);
    const correctLetterElement = [...lettersContainer.children].find(el => el.textContent === correctLetter);

    canClick = false;
    setButtonsState(false);

    wrongLetterElement.classList.add('wrong');
    speakLetter(wrongLetter);
    setTimeout(() => {
        wrongLetterElement.classList.remove('wrong');
        correctLetterElement.classList.add('wrong');
        speakLetter(correctLetter);
        setTimeout(() => {
            correctLetterElement.classList.remove('wrong');
            resetGame();
        }, 1000);
    }, 1000);
}

// פונקציה לאיפוס המשחק
function resetGame() {
    messageDiv.textContent = 'הייתה טעות. לחץ על הכפתור כדי להתחיל מחדש.';
    sequence = [];
    userSequence = [];
    level = 0;
    score = 0; // איפוס הציון במקרה של טעות
    updateScore(); // עדכון הציון על המסך
}

// פונקציה שמעדכנת את הציון על המסך
function updateScore() {
    scoreDiv.textContent = `ציון: ${score}`;
    scoretotalDiv.textContent = `סה"כ: ${scoretotal}`;
}

// פונקציה שמגדירה את מצב הכפתורים (אם אפשר ללחוץ או לא)
function setButtonsState(state) {
    const letterButtons = lettersContainer.querySelectorAll('.letter');
    letterButtons.forEach(button => {
        button.disabled = !state;
    });
}
