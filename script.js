const texts = [
  "I build clean, user-focused web experiences.",
  "I love to code and design UI/UX",
  "I bring ideas to life through code."
];

const typingEl = document.getElementById("typing");

let textIndex = 0;     // which sentence
let charIndex = 0;     // which character
let isDeleting = false;

function tick() {
  const current = texts[textIndex];

  // Type or delete
  if (!isDeleting) {
    charIndex++;
  } else {
    charIndex--;
  }

  // Render
  typingEl.textContent = current.substring(0, charIndex);

  // Timing
  let delay = isDeleting ? 40 : 70;

  // If finished typing, pause then start deleting
  if (!isDeleting && charIndex === current.length) {
    delay = 1400;          // pause at full sentence
    isDeleting = true;
  }

  // If finished deleting, move to next sentence
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length; // <-- rotates through all 3
    delay = 350;           // small pause before typing next
  }

  setTimeout(tick, delay);
}

// Start when page loads
tick();