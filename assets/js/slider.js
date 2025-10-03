// slider.js
(function() {
  const slidesTrack = document.querySelector(".slides");
  const slides = Array.from(document.querySelectorAll(".slide"));
  const dotsContainer = document.querySelector(".dots");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let currentIndex = 0;
  const slideCount = slides.length;
  let intervalId = null;
  const AUTO_DELAY = 5000;

  if (!slidesTrack || slideCount === 0) return;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-selected", i === 0 ? "true" : "false");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.querySelectorAll("span"));

  function updateSlider() {
    slidesTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((d, idx) => {
      d.classList.toggle("active", idx === currentIndex);
      d.setAttribute("aria-selected", idx === currentIndex ? "true" : "false");
    });
  }

  function goToSlide(index) {
    currentIndex = (index + slideCount) % slideCount;
    updateSlider();
    restartAuto();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlider();
  }
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateSlider();
  }

  nextBtn.addEventListener("click", () => { nextSlide(); restartAuto(); });
  prevBtn.addEventListener("click", () => { prevSlide(); restartAuto(); });

  // Auto play with pause on hover
  function startAuto() {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(nextSlide, AUTO_DELAY);
  }
  function stopAuto() {
    if (intervalId) clearInterval(intervalId);
  }
  function restartAuto() {
    stopAuto();
    startAuto();
  }

  // pause on hover
  const sliderEl = document.querySelector(".slider");
  sliderEl.addEventListener("mouseenter", stopAuto);
  sliderEl.addEventListener("mouseleave", startAuto);

  // Start
  updateSlider();
  startAuto();

  // small accessibility: keyboard arrows
  document.addEventListener("keydown", function(e) {
    if (e.key === "ArrowRight") { nextSlide(); restartAuto(); }
    if (e.key === "ArrowLeft")  { prevSlide(); restartAuto(); }
  });

  // Recompute visual transform if window resized (keeps the transform crisp)
  window.addEventListener("resize", updateSlider);
})();
