document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     HERO TYPING EFFECT
  ========================================= */

  const typingElement = document.getElementById("typing");

  const phrases = [
    "Software engineer & creative developer.",
    "I build thoughtful digital experiences.",
    "I turn ideas into intuitive interfaces."
  ];

  if (typingElement) {
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const type = () => {
      const phrase = phrases[phraseIndex];

      typingElement.textContent = phrase.slice(0, charIndex);

      if (!deleting && charIndex < phrase.length) {
        charIndex += 1;
        window.setTimeout(type, 52);
        return;
      }

      if (!deleting && charIndex === phrase.length) {
        deleting = true;
        window.setTimeout(type, 1200);
        return;
      }

      if (deleting && charIndex > 0) {
        charIndex -= 1;
        window.setTimeout(type, 27);
        return;
      }

      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;

      window.setTimeout(type, 250);
    };

    type();
  }

  /* =========================================
     REVEAL ANIMATIONS
  ========================================= */

  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-card"
  );

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("active");
    });
  }

  /* =========================================
     3D TILT EFFECT
  ========================================= */

  const canHover = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (canHover && !reducedMotion) {
    document.querySelectorAll("[data-tilt]").forEach((element) => {
      element.addEventListener("mousemove", (event) => {
        const rect = element.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        const rotateY = (x - 0.5) * 8;
        const rotateX = (0.5 - y) * 8;

        element.style.transform = `
          perspective(1200px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateY(-4px)
        `;
      });

      element.addEventListener("mouseleave", () => {
        element.style.transform = "";
      });
    });
  }

  /* =========================================
     MOBILE NAVIGATION
  ========================================= */

  const nav = document.getElementById("main-nav");
  const menuButton = document.querySelector(".menu-button");

  if (nav && menuButton) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );
      });
    });
  }

  /* =========================================
     ACTIVE NAVIGATION LINK
  ========================================= */

  const sections = [
    ...document.querySelectorAll("main section[id]")
  ];

  const navLinks = [
    ...document.querySelectorAll(".nav-link")
  ];

  const setActiveLink = () => {
    const scrollPosition = window.scrollY + 160;
    let currentId = "home";

    sections.forEach((section) => {
      if (section.offsetTop <= scrollPosition) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${currentId}`
      );
    });
  };

  window.addEventListener("scroll", setActiveLink, {
    passive: true
  });

  setActiveLink();
});