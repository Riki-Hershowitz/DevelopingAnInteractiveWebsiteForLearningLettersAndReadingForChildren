function initializeSlideshow(slideshowId) {
    let slideIndex = 0;
    let slides = document.querySelectorAll(`#${slideshowId} .slides`);
    let imageDisplayTime = 250; // זמן תצוגה עבור תמונות במילישניות

    function showSlides() {
        slides.forEach(slide => {
            slide.classList.remove('show'); // החבא את כל השקופיות
        });

        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }

        let currentSlide = slides[slideIndex - 1];
        currentSlide.classList.add('show'); // הצג את השקופית הנוכחית

        let video = currentSlide.querySelector('video');
        if (video) {
            video.currentTime = 0;
            video.play();
            video.onended = function () {
                setTimeout(showSlides, 0); // עבור לתמונה הבאה מיד לאחר סיום הסרטון
            };
        } else {
            setTimeout(showSlides, imageDisplayTime); // זמן תצוגה עבור תמונה
        }
    }

    showSlides();
}

// אתחול של כל קרוסלה
initializeSlideshow("slideshow1");


document.addEventListener('DOMContentLoaded', () => {

    const user = JSON.parse(localStorage.getItem('user')) || null;

    // הפעלת המודל אחרי 10 שניות
    if(!user){
        setTimeout(() => {
            const modal = document.getElementById('game-modal');
            if (modal) {
                modal.style.display = 'block';
            }
        }, 10000); // 10 שניות (10000 מילישניות)
}
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


    // סגירת המודל כשלוחצים מחוץ לתוכן שלו
    window.onclick = function (event) {
        const modal = document.getElementById('game-modal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
});



