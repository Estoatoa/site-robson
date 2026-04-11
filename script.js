// CURSOR
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  if (!cursor) return;
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

document.querySelectorAll("a, button, .work-card").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    if (!cursor) return;
    cursor.style.width = "42px";
    cursor.style.height = "42px";
  });

  item.addEventListener("mouseleave", () => {
    if (!cursor) return;
    cursor.style.width = "22px";
    cursor.style.height = "22px";
  });
});

// MENU MOBILE
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    siteNav.classList.toggle("is-open");
  });
}

// REVEAL ON SCROLL
const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
    }
  });
}, { threshold: 0.18 });

revealItems.forEach((item) => observer.observe(item));

// HOVER VIDEO
const hoverVideos = document.querySelectorAll(".hover-video");

hoverVideos.forEach((video) => {
  video.addEventListener("mouseenter", () => {
    video.play().catch(() => {});
  });

  video.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
  });
});

// VIDEO MODAL
const videoTriggers = document.querySelectorAll(".video-trigger");
const videoModal = document.getElementById("videoModal");
const videoFrame = document.getElementById("videoFrame");
const videoClose = document.getElementById("videoClose");

videoTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const src = trigger.dataset.video;
    if (!src || !videoModal || !videoFrame) return;

    videoFrame.src = src;
    videoModal.classList.add("is-open");
    videoModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

function closeVideoModal() {
  if (!videoModal || !videoFrame) return;
  videoModal.classList.remove("is-open");
  videoModal.setAttribute("aria-hidden", "true");
  videoFrame.src = "";
  document.body.style.overflow = "";
}

if (videoClose) {
  videoClose.addEventListener("click", closeVideoModal);
}

if (videoModal) {
  videoModal.addEventListener("click", (e) => {
    if (e.target === videoModal) closeVideoModal();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeVideoModal();
});

// ========================
// SLIDER (FUNCIONAL)
// ========================

document.addEventListener("DOMContentLoaded", () => {
  const showcase = document.getElementById("featuredShowcase");
  if (!showcase) return;

  const slides = Array.from(showcase.querySelectorAll(".featured-slide"));
  const prevBtn = showcase.querySelector(".featured-nav.prev");
  const nextBtn = showcase.querySelector(".featured-nav.next");
  const dotsWrap = showcase.querySelector(".featured-dots");

  if (!slides.length || !prevBtn || !nextBtn || !dotsWrap) return;

  let current = 0;
  let autoplay = null;
  const delay = 4000;

  function goToSlide(index) {
    current = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === current);
    });

    const dots = dotsWrap.querySelectorAll(".featured-dot");
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === current);
    });
  }

  function createDots() {
    dotsWrap.innerHTML = "";

    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = "featured-dot";

      dot.addEventListener("click", () => {
        goToSlide(index);
        restartAutoplay();
      });

      dotsWrap.appendChild(dot);
    });
  }

  function nextSlide() {
    goToSlide(current + 1);
  }

  function prevSlide() {
    goToSlide(current - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplay = setInterval(nextSlide, delay);
  }

  function stopAutoplay() {
    if (autoplay) {
      clearInterval(autoplay);
      autoplay = null;
    }
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  nextBtn.addEventListener("click", () => {
    nextSlide();
    restartAutoplay();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    restartAutoplay();
  });

  showcase.addEventListener("mouseenter", stopAutoplay);
  showcase.addEventListener("mouseleave", startAutoplay);

  createDots();
  goToSlide(0);
  startAutoplay();
});
