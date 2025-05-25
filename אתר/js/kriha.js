document.addEventListener('DOMContentLoaded', () => {
    const letters = [
        {
            "image": "../images/reading/apple.png",
            "word": "ת",
            "options": ["ח", "ת", "ל", "ב", "נ"]
        },
        {
            "image": "../images/reading/bananas.png",
            "word": "ב",
            "options": ["ב", "ט", "נ", "ע", "ח"]
        },
        {
            "image": "../images/reading/beach-ball.png",
            "word": "כ",
            "options": ["נ", "ב", "ע", "א", "כ"]
        },
        {
            "image": "../images/reading/bell-pepper.png",
            "word": "פ",
            "options": ["ז", "פ", "ב", "ט", "ת"]
        },
        {
            "image": "../images/reading/bicycle.png",
            "word": "א",
            "options": ["ס", "א", "ג", "ה", "ע"]
        },
        {
            "image": "../images/reading/butterfly.png",
            "word": "פ",
            "options": ["ס", "כ", "פ", "ב", "נ"]
        },
        {
            "image": "../images/reading/car.png",
            "word": "מ",
            "options": ["מ", "ט", "נ", "ג", "ש"]
        },
        {
            "image": "../images/reading/carrot.png",
            "word": "ג",
            "options": ["ו", "ל", "ק", "ג", "צ"]
        },
        {
            "image": "../images/reading/cat.png",
            "word": "ח",
            "options": ["מ", "כ", "ב", "ח", "ת"]
        },
        {
            "image": "../images/reading/cherries.png",
            "word": "ד",
            "options": ["ע", "ר", "ד", "ה", "ז"]
        },
        {
            "image": "../images/reading/duck.png",
            "word": "ב",
            "options": ["ס", "ו", "כ", "ב", "נ"]
        },
        {
            "image": "../images/reading/eggplant.png",
            "word": "ח",
            "options": ["ב", "ח", "נ", "א", "כ"]
        },
        {
            "image": "../images/reading/elephant.png",
            "word": "פ",
            "options": ["פ", "י", "ע", "ס", "ל"]
        },
        {
            "image": "../images/reading/flashlight.png",
            "word": "פ",
            "options": ["כ", "ח", "ב", "ה", "פ"]
        },
        {
            "image": "../images/reading/fish.png",
            "word": "ד",
            "options": ["ד", "א", "ג", "ח", "ע"]
        }
    ];

    const Syllables = [
        {
            "image": "../images/reading/bananas.png",
            "word": "בָּ",
            "options": ["בִּ", "בָּ", "בּוּ", "בֵּ", "בּוֹ"]
        },
        {
            "image": "../images/reading/apple.png",
            "word": "תַּ",
            "options": ["תֵּ", "תִּ", "תּוּ", "תַּ", "תּוֹ"]
        },
        {
            "image": "../images/reading/grapes.png",
            "word": "עֲ",
            "options": ["עֲ", "עֵ", "עוֹ", "עִ", "עוּ"]
        },
        {
            "image": "../images/reading/orange.png",
            "word": "תַּ",
            "options": ["תֵּ", "תִּ", "תּוֹ", "תּוּ", "תַּ",]
        },
        {
            "image": "../images/reading/bicycle.png",
            "word": "אוֹ",
            "options": ["אָ", "אֶ", "אוֹ", "אוּ", "אִ"]
        }
    ];

    const Words = [
        {
            "image": "../images/reading/bananas.png",
            "word": "בָּנָנָה",
            "options": ["בִּנָנָה", "בָּנָנָה", "בָּנָנֶּה", "בָּנִנַה", "בָּנֶנָה"]
        },
        {
            "image": "../images/reading/apple.png",
            "word": "תַּפּוּחַ",
            "options": ["תֶּפּוּחַ", "תַּפּוּחַ", "תַּפּוֹחַ", "תִּפּוּחַ", "תַּפּוּח"]
        },
        {
            "image": "../images/reading/grapes.png",
            "word": "עֲנָב",
            "options": ["עֲנָב", "עֵנָב", "עַנֵב", "עֵנַב", "עָנִב"]
        },
        {
            "image": "../images/reading/orange.png",
            "word": "תַּפּוּז",
            "options": ["תַּפּוּזַ", "תִּפּוּז", "תֵּפּוּז", "תַּפּוּז", "תַּפּוֹז"]
        }
    ];

    const time = [30, 30, 15, 10, 7];

    let currentIndex = 0;
    let shuffledItems = [];
    let score = 0;
    let attempts = 0;
    let hearts = 3;
    let currentStage = 1;
    let questionsAnswered = 0;
    let timeLeft;
    let timerInterval;
    let items = letters;




    let currentCube = 0; // מתחילים עם הקוביה השנייה
    const cubes = document.querySelectorAll('.wooden-cube');
    const character = document.getElementById('character');
    const white = document.getElementById('white');
    const stageNumberElement = document.getElementById('stage-number');


    function updateScoreDisplay(score) {
        username = user.username;
        password = user.password;
        points = user.points;
        index = user.index;
        points += score;
        // שמירת המשתמש המחובר כרגע
        localStorage.setItem('user', JSON.stringify({ username, password, points, index }));
    }

    function setCharacterPosition() {
        currentCube = 0;
        const firstCube = cubes[0];
        character.style.left = firstCube.style.left;
        character.style.bottom = '10vw'; // התאמת הגובה לגובה הקוביה
    }

    function playTransitionSound() {
        const audio = new Audio('../sound/1.wav');
        audio.play();
    }

    function triggerStageTransition() {
        white.classList.add('stages');
        playTransitionSound();

        white.addEventListener('animationend', () => {
            white.classList.remove('stages');
        }, { once: true });
    }

    function moveToNextCube() {
        if (currentCube < cubes.length - 1) { // שינוי: לא להגיע לקוביה האחרונה מיד
            currentCube++;
            const nextCube = cubes[currentCube];
            character.classList.add('jump');
            setTimeout(() => {
                character.style.left = nextCube.style.left;
                character.style.bottom = '10vw'; // התאמת הגובה לקוביה
                character.classList.add('jump');
            }, 250); // זמן שמתואם עם האנימציה של הקפיצה
        }
        if (currentCube === cubes.length - 1) {
            // עיכוב לפני העלאה לשלב הבא
            setTimeout(() => {
                currentStage++; // עדכון השלב
                if (currentStage < time.length) {
                    triggerStageTransition();

                    white.style.opacity = '1';
                    document.body.style.backgroundImage = `url('../images/diyuk/${currentStage + 1}.jpg')`;
                    stageNumberElement.textContent = `שלב: ${currentStage + 1}`;
                    document.getElementById('level-up').style.display = 'block';
                    white.style.opacity = '0';
                    startNextStage(); // פונקציה שמתחילה את השלב הבא
                } else {
                    // אם הגענו לסוף כל השלבים
                    alert("כל השלבים הסתיימו!");
                    score += 50;
                    updateScoreDisplay(score);
                }
            }, 1000); // זמן עיכוב של שנייה אחת
        }
    }

    function startNextStage() {
        setCharacterPosition(); // החזרת הדמות להתחלה
        timeLeft = time[currentStage]; // עדכון זמן הטיימר לשלב החדש
        document.getElementById('timer').textContent = timeLeft; // עדכון תצוגת הזמן
        document.getElementById('level-up').style.display = 'none'; // הסתרת ההודעה של עליית שלב
        startTimer(); // התחלת הטיימר לשלב החדש
    }


    function moveToPreviousCube() {
        if (currentCube > 0) { // מתחילים עם הקוביה השנייה
            currentCube--;
            const previousCube = cubes[currentCube];
            character.classList.add('jump');
            setTimeout(() => {
                character.style.left = previousCube.style.left;
                character.style.bottom = '10vw'; // התאמת הגובה לקוביה
                character.classList.remove('jump');
            }, 250); // זמן שמתואם עם האנימציה של הקפיצה
        }
    }

    // התחלת המשחק
    setCharacterPosition();


    const optionsContainer = document.getElementById('options-container');
    const message = document.getElementById('message');
    const objectImage = document.getElementById('object-image');
    const startGameButton = document.getElementById('start-game-button');
    const imageContainer = document.getElementById('image-container');
    const gameDescription = document.getElementById('game-description');
    const gameContainer = document.getElementById('game-container');
    const heartsElement = document.getElementById('hearts');
    const levelSelect = document.getElementById('level-select');
    const endgame = document.getElementById('endgame');
    const butonOption = document.getElementsByName('option');
    const user = JSON.parse(localStorage.getItem('user')) || null;

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // בחירת רמה
    document.getElementById('level-select').addEventListener('change', function () {
        let currentLevel = parseInt(this.value, 10);
        console.log(` Parsed level: ${currentLevel}`); // הדפסת הערכים לקונסול
        switch (currentLevel) {
            case 1:
                items = letters;
                break;
            case 2:
                items = Syllables;
                break;
            case 3:
                items = Words;
                break;
            default:
                items = letters;
                break;
        }
    });

    function loadItem(index) {
        const item = shuffledItems[index];
        objectImage.src = item.image;
        optionsContainer.innerHTML = '';
        item.options.forEach(option => {
            const button = document.createElement('button');
            button.classList.add('option');
            button.textContent = option;
            button.addEventListener('click', () => checkAnswer(option, item.word, button));
            optionsContainer.appendChild(button);
        });
        attempts = 0;
    }

    function updateTimer() {
        document.getElementById('timer').textContent = timeLeft; // עדכון התצוגה של הזמן שנשאר
        if (timeLeft > 0) {
            timeLeft--; // הורדה של שנייה מהזמן שנשאר
        } else {
            clearInterval(timerInterval); // עצירת הטיימר כאשר הזמן מגיע לאפס
            endGame();
        }
    }

    function startTimer() {
        clearInterval(timerInterval); // עצירת כל טיימר פעיל לפני התחלת חדש
        timerInterval = setInterval(updateTimer, 1000); // התחלת טיימר חדש
    }

    function checkAnswer(selected, correct, button) {
        attempts++;
        if (selected === correct) {
            message.textContent = `${user.username}, כל הכבוד! הצלחת! תשובה נכונה 😍 `;
            message.style.color = "green";
            moveToNextCube();
            updateScore();
            questionsAnswered++;
            setTimeout(() => {
                message.textContent = "";
                currentIndex = (currentIndex + 1) % shuffledItems.length;
                loadItem(currentIndex);
                timeLeft = time[currentStage]; // עדכון הזמן לפי השלב הנוכחי
            }, 2000);
        } else {
            message.textContent = `${user.username}, תעית הפעם 🙁 לא נורא, אפשר לנסות שוב 😃 `;
            message.style.color = "red";
            moveToPreviousCube();
            readText(selected);
            highlightWord(button);
            hearts--;
            updateHeartsDisplay();
            if (hearts <= 0) {
                endGame();
            }
            setTimeout(() => {
                button.style.backgroundColor = "";
            }, 2000);
        }
    }

    function updateScore() {
        let points;
        switch (attempts) {
            case 1:
                points = 10;
                break;
            case 2:
                points = 7;
                break;
            case 3:
                points = 4;
                break;
            case 4:
                points = 2;
                break;
            default:
                points = 0;
                break;
        }
        score += points;
        document.getElementById('points').textContent = ` ניקוד במשחק זה: ${score}`;
        updateScoreDisplay(score);
    }

    const setting = document.getElementById('setting');

    setting.addEventListener('click', () => {
        const modal = document.getElementById('game-modal');
        if (modal) {
            modal.style.display = 'block';
        }
    });

    // סגירת המודל כשלוחצים על כפתור ה-X
    const closeModal = document.getElementsByClassName('close')[0];
    if (closeModal) {
        closeModal.onclick = function () {
            const modal = document.getElementById('game-modal');
            if (modal) {
                modal.style.display = 'none';
            }
        };
    }
    const modal = document.getElementById('game-modal');

    // סגירת המודל כשלוחצים מחוץ לתוכן שלו
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    const imageUrls = [
        '../images/reading/caracters/caracter (12).gif',
        '../images/reading/caracters/caracter (13).gif',
        '../images/reading/caracters/caracter (14).gif',
        '../images/reading/caracters/caracter (15).gif',
        '../images/reading/caracters/caracter (2).gif',
        '../images/reading/caracters/caracter (3).gif',
        '../images/reading/caracters/caracter (4).gif',
        '../images/reading/caracters/caracter (5).gif',
        '../images/reading/caracters/caracter (6).gif',
        '../images/reading/caracters/caracter (8).gif',
        '../images/reading/caracters/caracter (11).gif'
    ];

    const productPrices = [
        5,
        55,
        200,
        300,
        2,
        100,
        800,
        300,
        2,
        100,
        99
    ];

    const Caracrets = (price, imageUrl) => {
        const productsTable = document.getElementById('caracter-table');
        const row = productsTable.insertRow();
        const cell = row.insertCell(0);
        cell.className = 'characterToAad';
        cell.innerHTML = `
            <img src="${imageUrl}">
            <p>נקודות: ${price}</p>
            <button data-price="${price}" data-image="${imageUrl}" class="character-to">הוסף דמות</button>
        `;
    };

    function caractersTable() {
        for (let i = 0; i < 11; i++) {
            let priceBuy = productPrices[i];
            let caracterBuy = imageUrls[i];
            Caracrets(priceBuy, caracterBuy);
        }
    }

    caractersTable();

    // הוספת דמות למשחק
    document.querySelectorAll('.character-to').forEach(button => {
        button.addEventListener('click', () => {
            const price = parseFloat(button.dataset.price);
            const imageUrl = button.dataset.image;
            if (user.points < price) {
                alert("אין לך מספיק נקודות 😕, תמשיך לשחק ותצבור נקודות")
            }
            else {
                user.points -= price;
                character.style.backgroundImage = `url('${imageUrl}')`;
                alert("הדמות שבחרת הצטרפה למשחק שלך 😍, התחל לשחק ותהנה!")
                modal.style.display = 'none';
            }
        });
    });

    function disableOptions() {
        document.querySelectorAll('.option').forEach(option => {
            option.disabled = true;
        });
    }

    function readText(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'he';
        window.speechSynthesis.speak(utterance);
    }

    function highlightWord(element) {
        element.style.backgroundColor = "yellow";
        setTimeout(() => {
            element.style.backgroundColor = "";
        }, 2000);
    }

    function updateHeartsDisplay() {
        switch (hearts) {
            case 1:
                heartsElement.textContent = "לבבות: 💖";
                break;
            case 2:
                heartsElement.textContent = "לבבות: 💖 💖";
                break;
            case 3:
                heartsElement.textContent = "לבבות: 💖 💖 💖";
                break;
            default:
                heartsElement.textContent = "לבבות:";
                break;
        }
    }

    function endGame() {
        clearInterval(timerInterval);
        message.textContent = "המשחק הסתיים 🙄";
        message.style.color = "red";
        disableOptions();
        gameDescription.style.display = 'block';
        gameDescription.style.color = "white"
        startGameButton.style.display = 'block';
        levelSelect.style.display = 'block';
        endgame.style.display = 'block';
        username = user.username;
        password = user.password;
        points = user.points;
        index = user.index;
        const users = JSON.parse(localStorage.getItem('users')) || [];
        // הוספת משתמש חדש למערך
        users[index] = { username, password, points, index };
        // שמירת המשתמשים ב-localStorage
        localStorage.setItem('users', JSON.stringify(users));
    }

    function startGame() {
        shuffledItems = [...items];
        shuffleArray(shuffledItems);
        currentIndex = 0;
        attempts = 0;
        score = 0;
        hearts = 3;
        currentStage = 0; // אתחול השלב לערך ההתחלה
        timeLeft = time[currentStage];
        questionsAnswered = 0;
        loadItem(currentIndex);
        startGameButton.style.display = 'none';
        levelSelect.style.display = 'none';
        imageContainer.style.display = 'block';
        optionsContainer.style.display = 'block';
        gameDescription.style.display = 'none';
        gameContainer.style.display = 'block';
        document.getElementById('your-score').style.display = 'block';
        document.getElementById('points').style.display = 'block';
        document.getElementById('your-score').textContent = `ניקוד ממשחקים קודמים: ${user.points}`;
        endgame.style.display = 'none';
        updateHeartsDisplay();
        setCharacterPosition();
        stageNumberElement.textContent = `שלב: ${currentStage + 1}`; // הצגת השלב הנוכחי
        startTimer();  // הפעלת הטיימר רק אחרי התחלת המשחק
        message.textContent = "";
        updateScoreDisplay(0);
    }


    startGameButton.addEventListener('click', startGame);
});