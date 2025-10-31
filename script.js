const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav-links");
const year = document.getElementById("year");
const carousel = document.querySelector(".hero-carousel");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    toggle.setAttribute(
      "aria-expanded",
      toggle.getAttribute("aria-expanded") === "true" ? "false" : "true"
    );
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });
}

if (carousel) {
  const track = carousel.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const prev = carousel.querySelector(".carousel-control.prev");
  const next = carousel.querySelector(".carousel-control.next");
  const indicators = Array.from(carousel.querySelectorAll(".carousel-indicators button"));
  let index = slides.findIndex((slide) => slide.classList.contains("is-active"));
  let autoRotate;

  const applyState = () => {
    slides.forEach((slide, idx) => {
      slide.classList.toggle("is-active", idx === index);
    });
    indicators.forEach((indicator, idx) => {
      indicator.classList.toggle("is-active", idx === index);
      indicator.setAttribute("aria-current", idx === index ? "true" : "false");
    });
    track.style.transform = `translateX(-${index * 100}%)`;
  };

  const goTo = (targetIndex) => {
    index = (targetIndex + slides.length) % slides.length;
    applyState();
  };

  const startAutoRotate = () => {
    if (slides.length <= 1) {
      return;
    }
    stopAutoRotate();
    autoRotate = setInterval(() => goTo(index + 1), 6000);
  };

  const stopAutoRotate = () => {
    if (autoRotate) {
      clearInterval(autoRotate);
      autoRotate = undefined;
    }
  };

  if (slides.length <= 1) {
    if (prev) {
      prev.setAttribute("hidden", "hidden");
    }
    if (next) {
      next.setAttribute("hidden", "hidden");
    }
    const indicatorWrapper = carousel.querySelector(".carousel-indicators");
    if (indicatorWrapper) {
      indicatorWrapper.setAttribute("hidden", "hidden");
    }
  } else {
    if (prev) {
      prev.addEventListener("click", () => {
        goTo(index - 1);
        startAutoRotate();
      });
    }
    if (next) {
      next.addEventListener("click", () => {
        goTo(index + 1);
        startAutoRotate();
      });
    }
    indicators.forEach((indicator, idx) => {
      indicator.addEventListener("click", () => {
        goTo(idx);
        startAutoRotate();
      });
    });

    carousel.addEventListener("mouseenter", stopAutoRotate);
    carousel.addEventListener("mouseleave", startAutoRotate);
  }

  if (index < 0) {
    index = 0;
  }
  applyState();
  startAutoRotate();
}
