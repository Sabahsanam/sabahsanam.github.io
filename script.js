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

  /* =========================================
     SABAH PORTFOLIO CHATBOT
  ========================================= */

  const sabahAgentLauncher = document.getElementById(
    "sabah-agent-launcher"
  );

  const sabahAgent = document.getElementById(
    "sabah-agent"
  );

  const sabahAgentClose = document.getElementById(
    "sabah-agent-close"
  );

  const sabahAgentMessages = document.getElementById(
    "sabah-agent-messages"
  );

  const sabahAgentInput = document.getElementById(
    "sabah-agent-input"
  );

  const sabahAgentSend = document.getElementById(
    "sabah-agent-send"
  );

  const sabahAgentQuestions = document.querySelectorAll(
    "[data-agent-question]"
  );

  const SABAH_EMAIL = "safroz@ncsu.edu";

  const SABAH_LINKEDIN =
    "https://www.linkedin.com/in/sabah-a-9b12311a3/";

  const SABAH_GITHUB =
    "https://github.com/Sabahsanam";

  const SABAH_RESUME =
    "./Sabah_Afroz_Resume.pdf";

  const SABAH_CALENDAR_LINK = "#";

  function openSabahAgent() {
    if (!sabahAgent || !sabahAgentLauncher) {
      return;
    }

    sabahAgent.classList.add("open");

    sabahAgent.setAttribute(
      "aria-hidden",
      "false"
    );

    sabahAgentLauncher.setAttribute(
      "aria-expanded",
      "true"
    );

    window.setTimeout(() => {
      sabahAgentInput?.focus();
    }, 200);
  }

  function closeSabahAgent() {
    if (!sabahAgent || !sabahAgentLauncher) {
      return;
    }

    sabahAgent.classList.remove("open");

    sabahAgent.setAttribute(
      "aria-hidden",
      "true"
    );

    sabahAgentLauncher.setAttribute(
      "aria-expanded",
      "false"
    );
  }

  function addSabahAgentMessage(message, sender) {
    if (!sabahAgentMessages) {
      return;
    }

    const wrapper = document.createElement("div");

    wrapper.className =
      sender === "user"
        ? "agent-message agent-message-user"
        : "agent-message agent-message-assistant";

    if (sender === "assistant") {
      const photo = document.createElement("img");

      photo.src = "./sabah.jpg";
      photo.alt = "";

      wrapper.appendChild(photo);
    }

    const content = document.createElement("div");

    content.className = "agent-message-content";

    const paragraph = document.createElement("p");

    paragraph.innerHTML = message;

    content.appendChild(paragraph);
    wrapper.appendChild(content);

    sabahAgentMessages.appendChild(wrapper);

    sabahAgentMessages.scrollTop =
      sabahAgentMessages.scrollHeight;
  }

  function showSabahAgentTyping() {
    if (!sabahAgentMessages) {
      return null;
    }

    const wrapper = document.createElement("div");

    wrapper.className =
      "agent-message agent-message-assistant agent-typing";

    wrapper.innerHTML = `
      <img src="./sabah.jpg" alt="" />

      <div class="agent-message-content">
        <span class="agent-typing-dot"></span>
        <span class="agent-typing-dot"></span>
        <span class="agent-typing-dot"></span>
      </div>
    `;

    sabahAgentMessages.appendChild(wrapper);

    sabahAgentMessages.scrollTop =
      sabahAgentMessages.scrollHeight;

    return wrapper;
  }

  function normalizeAgentQuestion(question) {
    return question
      .toLowerCase()
      .replace(/[^\w\s+#./'-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function getSabahAgentResponse(question) {
    const text = normalizeAgentQuestion(question);

    if (
      text.includes("graduate") ||
      text.includes("graduation") ||
      text.includes("graduating")
    ) {
      return `
        Sabah expects to graduate from North Carolina State University
        in December 2026 with a Bachelor of Science in Computer Science.
        She is preparing for full-time software engineering opportunities
        after graduation.
      `;
    }

    if (
      text.includes("availability") ||
      text.includes("available") ||
      text.includes("start date") ||
      text.includes("when can she start")
    ) {
      return `
        Sabah is targeting full-time software engineering opportunities
        beginning after her December 2026 graduation. Her exact start date
        may depend on the role, location, and onboarding timeline.

        You can
        <a href="mailto:${SABAH_EMAIL}?subject=Sabah%20Availability">
          email Sabah to confirm availability
        </a>.
      `;
    }

    if (
      text.includes("calendar") ||
      text.includes("schedule") ||
      text.includes("book") ||
      text.includes("meeting") ||
      text.includes("coffee chat")
    ) {
      if (SABAH_CALENDAR_LINK === "#") {
        return `
          Sabah’s public booking calendar has not been added yet.

          You can
          <a href="mailto:${SABAH_EMAIL}?subject=Meeting%20with%20Sabah">
            email her to schedule a conversation
          </a>.
        `;
      }

      return `
        You can schedule time with Sabah using her
        <a
          href="${SABAH_CALENDAR_LINK}"
          target="_blank"
          rel="noreferrer"
        >
          booking calendar
        </a>.
      `;
    }

    if (
      text.includes("who is sabah") ||
      text.includes("tell me about sabah") ||
      text.includes("about sabah") ||
      text === "who is she"
    ) {
      return `
        Sabah Afroz is a Computer Science student at NC State,
        software engineer, and creative developer based in Raleigh,
        North Carolina.

        She enjoys combining engineering, UI/UX, and creativity
        to build useful and memorable digital experiences.
      `;
    }

    if (
      text.includes("role") ||
      text.includes("looking for") ||
      text.includes("career goal") ||
      text.includes("job interest") ||
      text.includes("what kind of work")
    ) {
      return `
        Sabah is interested in full-time software engineering,
        frontend, full-stack, and creative technology roles.

        She is especially drawn to teams building thoughtful products,
        creative platforms, useful tools, and user-focused experiences.
      `;
    }

    if (
      text.includes("remote") ||
      text.includes("relocate") ||
      text.includes("relocation") ||
      text.includes("location preference")
    ) {
      return `
        Sabah is currently based in Raleigh, North Carolina.
        She is open to discussing remote, hybrid, and relocation
        opportunities depending on the role and team.
      `;
    }

    if (
      text.includes("baxter") ||
      text.includes("medical device") ||
      text.includes("risk analysis")
    ) {
      return `
        At Baxter International, Sabah is developing a system for
        medical-device software risk analysis.

        Her work involves requirements, technical documentation,
        source code, hazards, risks, workflow design, and processes
        aligned with ISO 14971 and IEC 62304.
      `;
    }

    if (
      text.includes("experience") ||
      text.includes("work history") ||
      text.includes("internship") ||
      text.includes("worked")
    ) {
      return `
        Sabah’s experience includes software engineering at Baxter
        International and UDPlatforms, technical support at NC State,
        and leadership as a Resident Advisor.

        Her background combines software development, troubleshooting,
        teamwork, communication, and leadership.
      `;
    }

    if (
      text.includes("skill") ||
      text.includes("tech stack") ||
      text.includes("programming") ||
      text.includes("technology") ||
      text.includes("language")
    ) {
      return `
        Sabah works with C, C++, Python, Java, JavaScript, and SQL.

        Her tools and frameworks include React, Node.js, FastAPI,
        MySQL, Git, GitHub, Postman, VS Code, and Figma.

        She also brings strengths in problem solving, UI/UX,
        collaboration, technical communication, and creative development.
      `;
    }

    if (
      text.includes("project") ||
      text.includes("portfolio") ||
      text.includes("built")
    ) {
      return `
        Sabah’s featured projects include WolfCafe, NewRoots,
        Casanova’s Revenge, and CoffeeMaker.

        These projects cover full-stack development, community-focused
        software, game development, object-oriented programming,
        UI/UX, and software testing.
      `;
    }

    if (
      text.includes("wolfcafe") ||
      text.includes("wolf cafe")
    ) {
      return `
        WolfCafe is a restaurant ordering and management system with
        menu, ordering, and inventory functionality.

        The project uses FastAPI, MySQL, Java, JavaScript,
        CRUD operations, validation, and Agile teamwork.
      `;
    }

    if (
      text.includes("newroots") ||
      text.includes("new roots")
    ) {
      return `
        NewRoots is a multilingual platform designed to help immigrants
        find healthcare, legal aid, food, and community resources.

        It includes language and cultural-background filtering
        to make resources easier to find.
      `;
    }

    if (
      text.includes("casanova") ||
      text.includes("game")
    ) {
      return `
        Casanova’s Revenge is a story-driven game combining gameplay,
        user-interface design, level design, and narrative storytelling.
      `;
    }

    if (
      text.includes("education") ||
      text.includes("school") ||
      text.includes("college") ||
      text.includes("ncsu") ||
      text.includes("nc state") ||
      text.includes("degree")
    ) {
      return `
        Sabah is pursuing a Bachelor of Science in Computer Science
        at North Carolina State University and expects to graduate
        in December 2026.
      `;
    }

    if (
      text.includes("resume") ||
      text.includes("résumé") ||
      text.includes("cv")
    ) {
      return `
        You can view Sabah’s
        <a
          href="${SABAH_RESUME}"
          target="_blank"
          rel="noreferrer"
        >
          résumé here
        </a>.
      `;
    }

    if (
      text.includes("contact") ||
      text.includes("email") ||
      text.includes("reach sabah") ||
      text.includes("hire sabah")
    ) {
      return `
        You can contact Sabah at
        <a href="mailto:${SABAH_EMAIL}">
          ${SABAH_EMAIL}
        </a>

        or connect with her on
        <a
          href="${SABAH_LINKEDIN}"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>.
      `;
    }

    if (text.includes("linkedin")) {
      return `
        You can view Sabah’s
        <a
          href="${SABAH_LINKEDIN}"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn profile here
        </a>.
      `;
    }

    if (text.includes("github")) {
      return `
        You can explore Sabah’s code and repositories on
        <a
          href="${SABAH_GITHUB}"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>.
      `;
    }

    if (
      text.includes("personality") ||
      text.includes("outside of work") ||
      text.includes("fun fact") ||
      text.includes("hobby")
    ) {
      return `
        Outside of software engineering, Sabah enjoys painting,
        singing, hiking, exploring new places, traveling,
        creative projects, coffee chats, and meeting new people.

        Creativity plays a major role in how she approaches technology.
      `;
    }

    if (
      text.includes("why hire") ||
      text.includes("good candidate") ||
      text.includes("strength")
    ) {
      return `
        Sabah combines technical problem solving with creativity,
        communication, empathy, and a strong willingness to learn.

        Her background spans software engineering, technical support,
        leadership, UI/UX thinking, and collaborative work.
      `;
    }

    if (
      text === "hi" ||
      text === "hello" ||
      text === "hey" ||
      text.startsWith("hi ")
    ) {
      return `
        Hi! You can ask me about Sabah’s experience, skills,
        graduation, availability, projects, résumé, career interests,
        or how to contact her.
      `;
    }

    if (text.includes("thank")) {
      return `
        You’re welcome! Feel free to ask another question about
        Sabah’s background, work, or availability.
      `;
    }

    return `
      I’m Sabah’s personal portfolio assistant.

      I can answer questions about her experience, technical skills,
      projects, graduation, availability, résumé, career goals,
      location, hobbies, and contact information.
    `;
  }

  function submitSabahAgentQuestion(question) {
    const cleanedQuestion = question.trim();

    if (!cleanedQuestion) {
      sabahAgentInput?.focus();
      return;
    }

    addSabahAgentMessage(
      cleanedQuestion,
      "user"
    );

    if (sabahAgentInput) {
      sabahAgentInput.value = "";
      sabahAgentInput.style.height = "auto";
    }

    const typingIndicator = showSabahAgentTyping();

    window.setTimeout(() => {
      typingIndicator?.remove();

      addSabahAgentMessage(
        getSabahAgentResponse(cleanedQuestion),
        "assistant"
      );
    }, 450);
  }

  sabahAgentLauncher?.addEventListener(
    "click",
    openSabahAgent
  );

  sabahAgentClose?.addEventListener(
    "click",
    closeSabahAgent
  );

  sabahAgentSend?.addEventListener(
    "click",
    () => {
      submitSabahAgentQuestion(
        sabahAgentInput?.value || ""
      );
    }
  );

  sabahAgentInput?.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key === "Enter" &&
        !event.shiftKey
      ) {
        event.preventDefault();

        submitSabahAgentQuestion(
          sabahAgentInput.value
        );
      }
    }
  );

  sabahAgentInput?.addEventListener(
    "input",
    () => {
      sabahAgentInput.style.height = "auto";

      sabahAgentInput.style.height =
        `${Math.min(
          sabahAgentInput.scrollHeight,
          95
        )}px`;
    }
  );

  sabahAgentQuestions.forEach((button) => {
    button.addEventListener("click", () => {
      submitSabahAgentQuestion(
        button.dataset.agentQuestion || ""
      );
    });
  });

  document.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key === "Escape" &&
        sabahAgent?.classList.contains("open")
      ) {
        closeSabahAgent();
      }
    }
  );
});
