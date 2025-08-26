const payNow = document.getElementById('payNow');
payNow.addEventListener('click', () =>{
    alert("התשלום בוצע בהצלחה!")
});
document.addEventListener('DOMContentLoaded', function() {
    const letters = 'אבגדהוזחטיכלמםנןסעפףצץקרשת'.split('');
    const letterNames = {
        'א': 'אָלֶף',
        'ב': 'בֵּת',
        'ג': 'גִּימֶל',
        'ד': 'דָּלֶת',
        'ה': 'הֵי',
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

    let sequence = [];
    let userSequence = [];
    let level = 0;
    let score = 0;
    let scoretotal = 0;
    let canClick = false;

    // קבלת הפניות לאלמנטים מה-DOM
    const lettersContainer = document.getElementById('letters-container');
    const startButton = document.getElementById('start-button');
    const messageDiv = document.getElementById('message');
    const scoreDiv = document.getElementById('score');
    const scoretotalDiv = document.getElementById('score-total');
    const settingsIcon = document.getElementById('settings-icon');
    const settingsMenu = document.querySelector('.settings-menu');
    const backgroundSelector = document.getElementById('background-selector');
    const shapeSelector = document.getElementById('shape-selector');
    const colorPicker = document.getElementById('color-picker');
    const uploadBackground = document.getElementById('upload-background');

    letters.forEach(letter => {
        const letterButton = document.createElement('div');
        letterButton.classList.add('letter');
        letterButton.textContent = letter;
        letterButton.addEventListener('click', () => handleUserInput(letter));
        lettersContainer.appendChild(letterButton);
    });

    startButton.addEventListener('click', startGame);

    document.addEventListener('keydown', (event) => {
        const pressedLetter = event.key;
        if (letters.includes(pressedLetter)) {
            handleUserInput(pressedLetter);
        }
    });

    function startGame() {
        level = 0;
        sequence = [];
        score = 0;
        nextLevel();
    }

    function nextLevel() {
        level++;
        messageDiv.textContent = `רמה ${level}`;
        const nextLetter = letters[Math.floor(Math.random() * letters.length)];
        sequence.push(nextLetter);
        playSequence();
    }

    function playSequence() {
        let delay = 500;
        sequence.forEach((letter, index) => {
            setTimeout(() => {
                highlightLetter(letter);
            }, delay * (index + 1));
        });
        setTimeout(() => {
            canClick = true;
            userSequence = [];
        }, delay * sequence.length);
    }

    function highlightLetter(letter) {
        const letterButton = [...lettersContainer.children].find(btn => btn.textContent === letter);
        letterButton.classList.add('highlight');
        setTimeout(() => {
            letterButton.classList.remove('highlight');
        }, 300);
    }

    function handleUserInput(letter) {
        if (!canClick) return;
        userSequence.push(letter);
        highlightLetter(letter);

        if (sequence[userSequence.length - 1] !== letter) {
            messageDiv.textContent = 'טעות! נסה שוב.';
            canClick = false;
        } else if (userSequence.length === sequence.length) {
            canClick = false;
            score += 5;
            scoretotal += 10;
            scoreDiv.textContent = `ציון: ${score}`;
            scoretotalDiv.textContent = `ציון כולל: ${scoretotal}`;
            setTimeout(nextLevel, 1000);
        }
    }

    settingsIcon.addEventListener('click', () => {
        settingsMenu.classList.toggle('open');
    });

    backgroundSelector.addEventListener('change', (event) => {
        document.body.style.backgroundImage = `url('${event.target.value}')`;
    });

    shapeSelector.addEventListener('change', (event) => {
        const shape = event.target.value;
        lettersContainer.querySelectorAll('.letter').forEach(letterButton => {
            letterButton.style.borderRadius = shape === 'circle' ? '50%' : shape === 'triangle' ? '0' : '5px';
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

    lettersContainer.addEventListener('mouseover', (event) => {
        if (event.target.classList.contains('letter')) {
            const letter = event.target.textContent;
            messageDiv.textContent = `זו האות ${letterNames[letter]}`;
        }
    });

    lettersContainer.addEventListener('mouseout', () => {
        messageDiv.textContent = '';
    });
});
