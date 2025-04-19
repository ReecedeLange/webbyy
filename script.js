document.addEventListener("DOMContentLoaded", function() {

    // Section Navigation + Music Logic
    const links = document.querySelectorAll(".dropdown-content a");
    const sections = document.querySelectorAll(".section");
    const audio = document.getElementById("background-music");

    if (!audio) {
        console.error("Audio element not found!");
        return;
    }

    links.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();

            const target = this.getAttribute("data-section");

            // Show only the selected section
            sections.forEach(section => {
                section.style.display = (section.id === target) ? 'block' : 'none';
            });

            // Choose music for each section
            let musicPath = "";
            switch(target) {
                case "love":
                    musicPath = "music/tadow.mp3";
                    break;
                case "places":
                    musicPath = "music/light-piano.mp3";
                    break;
                case "surprise":
                    musicPath = "music/let-me-love-you.mp3";
                    break;
                default:
                    audio.pause();
                    return;
            }

            audio.pause(); // stop current track
            audio.src = musicPath; // set new track
            audio.volume = 0.3;
            audio.play().catch(err => console.warn("Autoplay might be blocked:", err));
        });
    });

    // Hide all sections except the first one on load
    sections.forEach((section, index) => {
        section.style.display = index === 0 ? 'block' : 'none';
    });

    // Floating Hearts on Hover
    const countryLinks = document.querySelectorAll('#places li a');
    countryLinks.forEach(link => {
        link.addEventListener('mouseover', event => {
            createHeart(event.pageX, event.pageY, link.textContent.trim());
        });
    });

    function createHeart(x, y, country) {
        const heart = document.createElement('div');
        heart.classList.add('heart');

        switch(country) {
            case 'Indonesia': heart.style.background = 'red'; break;
            case 'Japan': heart.style.background = 'pink'; break;
            case 'South Korea': heart.style.background = 'purple'; break;
            case 'Thailand': heart.style.background = 'orange'; break;
            case 'Brazil': heart.style.background = 'green'; break;
            case 'Italy': heart.style.background = 'tomato'; break;
            case 'Netherlands': heart.style.background = 'dodgerblue'; break;
            default: heart.style.background = 'red';
        }

        heart.style.left = `${x - 15}px`;
        heart.style.top = `${y - 15}px`;
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 3000);
    }

    // Image Slider Logic
    let currentIndex = 0;
    const slides = document.querySelector('.slides');
    const images = document.querySelectorAll('.slides img');
    const totalImages = images.length;

    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    if (nextBtn && prevBtn) { // Make sure slider buttons exist
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalImages;
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            updateSlider();
        });
    }

    function updateSlider() {
        if (slides) {
            slides.style.transform = `translateX(-${currentIndex * 600}px)`;
        }
    }

});
