document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.querySelector(".menu-icon");
  const icon = menuIcon?.querySelector("i");
  const mobileMenu = document.getElementById("mobile-menu");

  // Fade in logo
  setTimeout(() => {
    const logo = document.querySelector(".logo");
    logo?.classList.add("loaded");
  }, 100);

  // Toggle menu
  menuIcon?.addEventListener("click", () => {
    mobileMenu?.classList.toggle("active");
    const isOpen = mobileMenu?.classList.contains("active");
    if (isOpen) {
      icon?.classList.remove("fa-bars-staggered");
      icon?.classList.add("fa-xmark");
    } else {
      icon?.classList.add("fa-bars-staggered");
      icon?.classList.remove("fa-xmark");
    }
  });

  // Close menu on click
  document.querySelectorAll("#mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu?.classList.remove("active");
      icon?.classList.add("fa-bars-staggered");
      icon?.classList.remove("fa-xmark");
    });
  });

  // Close menu on resize
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (window.innerWidth > 768) {
        mobileMenu?.classList.remove("active");
        icon?.classList.add("fa-bars-staggered");
        icon?.classList.remove("fa-xmark");
      }
    }, 300);
  });
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    navMenu.classList.remove('active');
    menuIcon.classList.remove('open');
    updateMenuIcon();
  }
});


// Concerns Section Logic
document.addEventListener('DOMContentLoaded', () => {
const imgElement = document.querySelector('.jv-concern-img');
const questionElement = document.querySelector('.jv-concern-question');
const answers = document.querySelectorAll('.jv-concern-answer');
const concernsLeft = document.querySelector('.jv-concerns-left');
const concernsSection = document.querySelector('.jv-concerns-section');

// Question List 
const questions = [
  "Can we secure skilled engineers?",
  "Can we trust system development?",
  "Can we ensure quality?",
  "How do you maintain schedules?",
  "What about urgent support?",
  "What if delays occur?"
];
const intersectingAnswers = new Set();
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.target.classList.contains('jv-concern-answer')) {
        const answerId = entry.target.getAttribute('data-answer');
        if (entry.isIntersecting) {
          intersectingAnswers.add(answerId);
          entry.target.classList.add('visible');
          // update img, question 
          imgElement.src = `/asset/image/the corner/client${answerId}.jpg`;
          imgElement.setAttribute('alt', `Client ${answerId}`);
          questionElement.textContent = questions[answerId - 1];
          // effect 
          questionElement.classList.remove('fade-in');
          imgElement.classList.add('fade-out');
          questionElement.classList.add('fade-out');
          setTimeout(() => {
            imgElement.classList.remove('fade-out');
            questionElement.classList.remove('fade-out');
            imgElement.classList.add('fade-in');
            questionElement.classList.add('fade-in');
          }, 50);
        } else {
          intersectingAnswers.delete(answerId);
          entry.target.classList.remove('visible');
        }
      }
    });
        // responsive mobile 
    if (window.innerWidth <= 768) {
      const sectionRect = concernsSection.getBoundingClientRect();
      if (sectionRect.bottom < 0 || sectionRect.top > window.innerHeight) {
        concernsLeft.style.display = 'none';
      } else if (intersectingAnswers.size > 0) {
        concernsLeft.style.display = 'block';
      }
    } else {
      concernsLeft.style.display = 'block';
    }
  },
  { threshold: 0.3 }
);

answers.forEach((answer) => observer.observe(answer));

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    concernsLeft.style.display = 'block'; 
  } else if (intersectingAnswers.size === 0) {
    concernsLeft.style.display = 'none'; 
  }
});

  // Achievements Slider Logic
  const track = document.querySelector('.jv-achievement-track');
  const slides = Array.from(track.children);
  const prevButton = document.querySelector('.jv-slider-prev');
  const nextButton = document.querySelector('.jv-slider-next');
  
  let currentIndex = 0;
  const slideWidth = slides[0].getBoundingClientRect().width;
  const slideMargin = 80;
  const visibleSlides = 1;
  const totalSlideWidth = slideWidth + slideMargin;
  
  const moveToSlide = (index) => {
    if (index < 0) {
      index = slides.length - 1;
      track.style.transition = 'none';
      track.style.transform = `translateX(-${(slides.length) * totalSlideWidth}px)`;
      void track.offsetWidth;
      track.style.transition = 'transform 0.5s ease';
    } else if (index >= slides.length) {
      index = 0;
      track.style.transition = 'none';
      track.style.transform = 'translateX(0)';
      void track.offsetWidth;
      track.style.transition = 'transform 0.5s ease';
    }
    
    const newPosition = index * totalSlideWidth;
    track.style.transform = `translateX(-${newPosition}px)`;
    currentIndex = index;
  };
  
  let autoSlideInterval;
  const startAutoSlide = () => {
    autoSlideInterval = setInterval(() => {
      moveToSlide(currentIndex + 1);
    }, 3000);
  };
  
  const sliderContainer = document.querySelector('.jv-achievements-slider');
  sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
  });
  
  sliderContainer.addEventListener('mouseleave', startAutoSlide);
  
  let touchStartX = 0;
  let touchEndX = 0;
  
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(autoSlideInterval);
  }, {passive: true});
  
  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoSlide();
  }, {passive: true});
  
  const handleSwipe = () => {
    const threshold = 100;
    if (touchEndX < touchStartX - threshold) {
      moveToSlide(currentIndex + 1);
    } else if (touchEndX > touchStartX + threshold) {
      moveToSlide(currentIndex - 1);
    }
  };
  
  prevButton.addEventListener('click', () => {
    clearInterval(autoSlideInterval);
    moveToSlide(currentIndex - 1);
    startAutoSlide();
  });
  
  nextButton.addEventListener('click', () => {
    clearInterval(autoSlideInterval);
    moveToSlide(currentIndex + 1);
    startAutoSlide();
  });
  
  startAutoSlide();
  
  const handleResize = () => {
    const newSlideWidth = slides[0].getBoundingClientRect().width;
    const newPosition = currentIndex * (newSlideWidth + slideMargin);
    track.style.transform = `translateX(-${newPosition}px)`;
  };
  
  window.addEventListener('resize', handleResize);
});

// Testimonials
document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.jv-logo-slider');
  sliders.forEach(slider => {
    const track = slider.querySelector('.jv-logo-track');

    slider.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
    });

    slider.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
    });
  });
});

// About Us
document.addEventListener('DOMContentLoaded', () => {
  const aboutSection = document.querySelector('.jv-about-section');
  const servicesSection = document.querySelector('.jv-services-section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        aboutSection.style.transition = 'background-color 0.5s ease';
        servicesSection.style.transition = 'background-color 0.5s ease';
        aboutSection.style.backgroundColor = '#f64955';
        servicesSection.style.backgroundColor = '#f64955';
      } else {
        if (entry.boundingClientRect.top > 0) {
          aboutSection.style.transition = 'background-color 0.5s ease';
          servicesSection.style.transition = 'background-color 0.5s ease';
          aboutSection.style.backgroundColor = '#1a252f';
          servicesSection.style.backgroundColor = '#1a252f';
        }
      }
    });
  }, { threshold: 0.5 });

  observer.observe(aboutSection);
});

// Team
let items = document.querySelectorAll('.slider .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');

let active = 3;
function loadShow(){
    let stt = 0;
    items[active].style.transform = `none`;
    items[active].style.zIndex = 1;
    items[active].style.filter = 'none';
    items[active].style.opacity = 1;
    for(var i = active + 1; i < items.length; i++){
        stt++;
        items[i].style.transform = `translateX(${120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(-1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.opacity = stt > 3 ? 0 : 1;
    }
    stt = 0;
    for(var i = active - 1; i >= 0; i--){
        stt++;
        items[i].style.transform = `translateX(${-120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.opacity = stt > 3 ? 0 : 1;
    }
}
loadShow();

next.onclick = function(){
    active = active + 1 >= items.length ? 3 : active + 1;
    loadShow();
}
prev.onclick = function(){
    active = active - 1 < 0 ? 3 : active - 1;
    loadShow();
}


// navbar//
let lastScroll = 0;
  const navbar = document.querySelector('nav');
  const delay = 800; // 0.8s delay

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScroll && currentScroll > 50) {
      // Scroll down, hide navbar
      navbar.classList.add('hidden');
    } else {
      // Scroll up, show navbar after delay
      setTimeout(() => {
        if (window.scrollY < lastScroll || window.scrollY < 50) {
          navbar.classList.remove('hidden');
        }
      }, delay);
    }

    lastScroll = currentScroll;
  });

