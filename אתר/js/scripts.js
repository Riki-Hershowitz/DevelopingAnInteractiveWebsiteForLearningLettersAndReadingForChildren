document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];



    const updateCartPage = () => {
        const cartItemsContainer = document.getElementById('cart-items');
        const totalPriceElements = document.querySelectorAll('.total-price');

        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
            let totalPrice = 0;

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p>הוסיפו מוצרים לעגלה</p>';
            } else {
                cart.forEach((item, index) => {
                    const itemElement = document.createElement('div');
                    itemElement.className = 'cart-item';
                    itemElement.innerHTML = `
                        <img src="${item.imageUrl}" alt="${item.name}" style="width: 50px; height: 50px;">
                        <h4>${item.name}</h4>
                        <p>מחיר: ₪${item.price}</p>
                        <p>כמות: 
                            <button class="decrease-quantity" data-index="${index}">-</button>
                            ${item.quantity}
                            <button class="increase-quantity" data-index="${index}">+</button>
                        </p>
                        <p>סה"כ למוצר זה: ₪${(item.price * item.quantity).toFixed(2)}</p>
                        <span class="remove-item" data-index="${index}" style="cursor: pointer; color: red;"><i class="fas fa-trash-alt"></i></span>
                    `;
                    cartItemsContainer.appendChild(itemElement);
                    totalPrice += item.price * item.quantity;
                });

                totalPriceElements.forEach(element => {
                    element.textContent = `סה"כ: ₪${totalPrice.toFixed(2)}`;
                });
            }

            addEventListeners();
        }
    };

    const addEventListeners = () => {
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.currentTarget.dataset.index;
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartPage();
            });
        });

        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.currentTarget.dataset.index;
                cart[index].quantity++;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartPage();
            });
        });

        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.currentTarget.dataset.index;
                cart[index].quantity--;
                if (cart[index].quantity === 0) {
                    cart.splice(index, 1);
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartPage();
            });
        });

    };

    const imageUrls = [
        '../images/products/1.png',
        '../images/products/2.png',
        '../images/products/3.png',
        '../images/products/4.png',
        '../images/products/5.png',
        '../images/products/6.png',
        '../images/products/7.png'
    ];

    const productNames = [
        'משחק מודעות פונולוגית',
        'נקודאות - הצירה והסגול',
        'נקודאות - הקובוץ והשורוק',
        'נקודאות - החיריק והשוא',
        'נקודאות - החולם',
        'דפי עבודה - קמץ פתח',
        'סיפורים קצרים - כל התנועות'
    ];

    const productPrices = [
        90,
        59.90,
        45,
        59.90,
        59.90,
        54.80,
        63
    ];

    const addProduct = (id, name, price, imageUrl) => {
        const productsTable = document.getElementById('products-table');
        const row = productsTable.insertRow();
        const cell = row.insertCell(0);
        cell.className = 'product-item';
        cell.innerHTML = `
            <img src="${imageUrl}" alt="${name}">
            <h3>${name}</h3>
            <p>מחיר: ₪${price}</p>
            <button data-id="${id}" data-name="${name}" data-price="${price}" data-image="${imageUrl}" class="add-to-cart">הוסף לסל</button>
        `;
    };

    const addProductsWithImages = () => {
        imageUrls.forEach((imageUrl, index) => {
            const id = index + 1;
            const name = productNames[index];
            const price = productPrices[index];
            addProduct(id, name, price, imageUrl);
        });
    };

    addProductsWithImages();

    if (document.getElementById('checkout-form')) {
        updateCartPage();
    }

        // הוספת מוצר לעגלת הקניות
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.dataset.id;
                const name = button.dataset.name;
                const price = parseFloat(button.dataset.price);
                const imageUrl = button.dataset.image; // הנחת שבטעות הוספת גם את התמונה
    
                // הוספת פרטי המוצר לעגלת הקניות
                const item = cart.find(item => item.id === id);
                if (item) {
                    item.quantity++;
                } else {
                    cart.push({ id, name, price, imageUrl, quantity: 1 });
                }
    
                localStorage.setItem('cart', JSON.stringify(cart));
                alert(`${name} נוסף לעגלת הקניות!`);
                updateCartPage();
            });
        });

    updateCartPage();
    updateWelcomeMessage();
});

document.addEventListener('DOMContentLoaded', () => {
    // דגם של עגלת קניות מקומית
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const user = JSON.parse(localStorage.getItem('user')) || null;

    //מעבר לתשלום בעמוד עגלת קניות
    document.getElementById('checkout-button').addEventListener('click', () => {
        window.location.href = 'checkout.html';
    });

    const totalPriceElements = document.querySelectorAll('.total-price'); // שימוש ב-querySelectorAll

    // עדכון עגלת הקניות בעמוד עגלת הקניות
const updateCartPage = () => {
    const cartItemsContainer = document.getElementById('cart-items');

    if (cartItemsContainer && totalPriceElements) {
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>הוסיפו מוצרים לעגלה</p>';
        } else {
            cart.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <img src="${item.imageUrl}" alt="${item.name}" style="width: 50px; height: 50px;">
                    <h4>${item.name}</h4>
                    <p>מחיר: ₪${item.price}</p>
                    <p>כמות: 
                        <button class="decrease-quantity" data-index="${index}">-</button>
                        ${item.quantity}
                        <button class="increase-quantity" data-index="${index}">+</button>
                    </p>
                    <p>סה"כ למוצר זה: ₪${(item.price * item.quantity).toFixed(2)}</p>
                    <span class="remove-item" data-index="${index}" style="cursor: pointer; color: red; display: block; ">🗑</span>
                `;
                cartItemsContainer.appendChild(itemElement);
                totalPrice += item.price * item.quantity;
            });
        }

        // עדכון כל האלמנטים עם ה-class 'total-price'
        totalPriceElements.forEach(element => {
            element.textContent = `סה"כ: ₪${totalPrice.toFixed(2)}`;
        });
    }

    addEventListeners();
};


    // עדכון התצוגה בעמוד התשלום
    if (document.getElementById('checkout-form')) {
        updateCartPage();
        totalPriceElements.forEach(element => {
            element.textContent = `סה"כ: ₪${totalPrice.toFixed(2)}`;
        });
    }

    const addEventListeners = () => {
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.currentTarget.dataset.index;
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartPage();
            });
        });

        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.currentTarget.dataset.index;
                cart[index].quantity++;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartPage();
            });
        });

        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.currentTarget.dataset.index;
                cart[index].quantity--;
                if (cart[index].quantity === 0) {
                    cart.splice(index, 1);
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartPage();
            });
        });
    };

    // עדכון הודעת ברוך הבא עם שם המשתמש
    const updateWelcomeMessage = () => {
        if (user && document.getElementById('welcome-message')) {
            document.getElementById('welcome-message').textContent = `שלום, ${user.username}!`;
        }
    };


    // הצגת פרטי המוצר בעמוד פרטי המוצר
    if (document.getElementById('product-info')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        const products = JSON.parse(localStorage.getItem('products')) || {};

        const product = products[productId];

        if (product) {
            const imageElement = document.getElementById('product-image');
            imageElement.src = product.image;
            imageElement.dataset.defaultImage = product.image;

            document.getElementById('product-name').textContent = product.name;
            document.getElementById('product-price').textContent = `מחיר: ₪${product.price}`;
            document.getElementById('product-description').textContent = product.description;

            const colorSelect = document.getElementById('color-select');
            product.colors.forEach(color => {
                const option = document.createElement('option');
                option.value = color;
                option.textContent = color.charAt(0).toUpperCase() + color.slice(1);
                colorSelect.appendChild(option);
            });

            // רכישה מיידית
            document.getElementById('buy-now').addEventListener('click', () => {
                localStorage.setItem('cart', JSON.stringify([...cart, { id: productId, name: product.name, price: product.price, quantity: 1 }]));
                window.location.href = 'checkout.html';
            });
        } else {
            alert('המוצר לא נמצא.');
        }
    }

    // זכוכית מגדלת בעמוד פרטי המוצר
    const productImage = document.getElementById('product-image');
    const magnifyingGlass = document.getElementById('magnifying-glass');

    if (productImage) {
        productImage.addEventListener('mousemove', (e) => {
            const rect = productImage.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            magnifyingGlass.style.backgroundImage = `url('${productImage.src}')`;
            magnifyingGlass.style.backgroundPosition = `-${x * 2}px -${y * 2}px`;
            magnifyingGlass.style.left = `${e.clientX - rect.left - magnifyingGlass.offsetWidth / 2}px`;
            magnifyingGlass.style.top = `${e.clientY - rect.top - magnifyingGlass.offsetHeight / 2}px`;
            magnifyingGlass.style.display = 'block';
        });

        productImage.addEventListener('mouseleave', () => {
            magnifyingGlass.style.display = 'none';
        });
    }

    // קריאה לפונקציות בעת טעינת העמוד
    updateCartPage();
    updateWelcomeMessage();

    // קריאה לעדכון עגלת הקניות כאשר העמוד הוא עמוד העגלה
    if (document.getElementById('cart-items')) {
        updateCartPage();
    }
});

// פונקציה לעדכון הודעת "שלום"
const updateWelcomeMessage = () => {
    const welcomeMessage = document.getElementById('welcome-message');
    const currentUser = JSON.parse(localStorage.getItem('user')) || null;
    
    if (currentUser && welcomeMessage) {
        welcomeMessage.textContent = `שלום, ${currentUser.username}!`;
    } else if (welcomeMessage) {
        welcomeMessage.textContent = `מצב אורח`;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    let points=0;
    
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // בדיקת התאמת סיסמאות
            if (password !== confirmPassword) {
                alert('הסיסמאות אינן תואמות. אנא בדוק שוב.');
                return;
            }

            // קבלת רשימת המשתמשים מה-localStorage או יצירת מערך חדש אם לא קיים
            const users = JSON.parse(localStorage.getItem('users')) || [];
 
            // בדיקת קיום המשתמש
            const userExists = users.some(user => user.username === username);
            if (userExists) {
                alert('שם המשתמש כבר קיים. אנא בחר שם משתמש אחר.');
            } else {
                let index=users.length;
                // הוספת משתמש חדש למערך
                users.push({ username, password, points, index});

                // שמירת המשתמשים ב-localStorage
                localStorage.setItem('users', JSON.stringify(users));

                // שמירת המשתמש המחובר כרגע
                localStorage.setItem('user', JSON.stringify({username, password , points, index}));

                alert('נרשמת בהצלחה!');

                // עדכון הודעת הברכה לאחר ההרשמה
                updateWelcomeMessage();

                // הפניה לדף הבית
                window.location.href = '../index.html';
                }
        });
    }

    // ניהול התחברות
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // קבלת רשימת המשתמשים מה-localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];

            // בדיקה אם המשתמש קיים
            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                updateWelcomeMessage();
                alert('התחברת בהצלחה!');
                // הפניה לדף הבית
                window.location.href = '../index.html';
            } else {
                alert('שם משתמש או סיסמה לא נכונים.');
            }
        });
    }

    // ניהול התנתקות
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        const currentUser = JSON.parse(localStorage.getItem('user')) || null;
        const gamesLink = document.getElementById('gameslink');
        const gameModal = document.getElementById('game-modal');

        if (currentUser) {
            logoutButton.style.display = 'block';
        } else {
            logoutButton.style.display = 'none';
            gamesLink.addEventListener('click', (e) => {
                e.preventDefault(); // מניעת הפעולה הדיפולטיבית של הקישור
                if (gameModal) {
                    gameModal.style.display = 'block';
                }
            });
        }

        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('user');
            updateWelcomeMessage();
            alert('התנתקת בהצלחה!');
            // הפניה לדף הבית
            window.location.href = 'index.html';
        });
    }

    // קריאה לעדכון הודעת ברוך הבא בעת טעינת העמוד
    updateWelcomeMessage();
});

console.log(localStorage);

     