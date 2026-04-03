document.addEventListener("DOMContentLoaded", () => {
  const texts = [
    "I build clean, user-focused web experiences.",
    "I love to code and design UI/UX",
    "I bring ideas to life through code."
  ];

  const el = document.getElementById("typing");
  if (!el) {
    console.error("No element found with id='typing'");
    return;
  }

  let textIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const TYPE_SPEED = 55;
  const DELETE_SPEED = 30;
  const HOLD_TIME = 900;

  function tick() {
    const current = texts[textIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        setTimeout(() => {
          deleting = true;
          tick();
        }, HOLD_TIME);
        return;
      }

      setTimeout(tick, TYPE_SPEED);
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === 0) {
        deleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(tick, 250);
        return;
      }

      setTimeout(tick, DELETE_SPEED);
    }
  }

  tick();
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
});

document.querySelectorAll(".reveal, .reveal-card").forEach(el => {
  observer.observe(el);
});
