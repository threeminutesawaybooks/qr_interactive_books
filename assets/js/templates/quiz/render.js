(function() {
  const platform = window.BookPlatform;
  const { createElement, shuffle, playSound } = platform.utils;

  function normalizeQuestion(question) {
    return {
      image: question.image || question.img || "",
      imageAlt: question.imageAlt || question.alt || question.question || question.q || "Activity image",
      question: question.question || question.q || "",
      correct: question.correct || "",
      options: Array.isArray(question.options) ? question.options.slice() : []
    };
  }

  platform.templates.quiz = function renderQuiz(context) {
    const { mount, pageData } = context;
    const payload = pageData.payload || {};
    const questions = (payload.questions || []).map(normalizeQuestion).filter((item) => item.question && item.options.length);

    if (!questions.length) {
      platform.utils.renderStatus(mount, {
        label: "Quiz data missing",
        title: "No questions found for this page",
        message: "Add questions inside the payload.questions array."
      });
      return;
    }

    const sounds = Object.assign(
      {
        correct: "",
        wrong: "",
        complete: "",
        restart: ""
      },
      payload.sounds || {}
    );

    mount.innerHTML = "";

    const screen = createElement("section", "quiz-screen");
    const topbar = createElement("div", "quiz-topbar");
    const brand = createElement("div", "quiz-brand");
    const logo = createElement("img", "quiz-logo");
    logo.src = payload.logo || "https://ik.imagekit.io/letsimaginetamil/Brand%20Logo/Leaf%20logo.png";
    logo.alt = "Three Minutes Away";

    const titleWrap = createElement("div");
    titleWrap.appendChild(createElement("h1", "quiz-title", payload.activityTitle || pageData.title || `Book ${pageData.book} page ${pageData.page}`));
    titleWrap.appendChild(createElement("p", "quiz-subtitle", `${pageData.book.toUpperCase()} | Page ${pageData.page}`));

    brand.appendChild(logo);
    brand.appendChild(titleWrap);

    const controls = createElement("div", "quiz-controls");
    const progress = createElement("span", "quiz-chip", `0/${questions.length}`);
    const restart = createElement("button", "quiz-button", payload.restartLabel || "Restart");
    restart.type = "button";
    controls.appendChild(progress);
    controls.appendChild(restart);

    topbar.appendChild(brand);
    topbar.appendChild(controls);

    const card = createElement("div", "quiz-card");
    const mediaPanel = createElement("div", "quiz-media-panel");
    const mediaBox = createElement("div", "quiz-media-box");
    const media = createElement("img", "quiz-media");
    mediaBox.appendChild(media);
    mediaPanel.appendChild(mediaBox);

    const content = createElement("div", "quiz-content");
    const questionEl = createElement("h2", "quiz-question");
    const optionsEl = createElement("div", "quiz-options");
    content.appendChild(questionEl);
    content.appendChild(optionsEl);

    card.appendChild(mediaPanel);
    card.appendChild(content);

    const overlay = createElement("div", "quiz-overlay");
    const completeCard = createElement("div", "quiz-complete-card");
    completeCard.appendChild(createElement("h2", "quiz-complete-title", payload.completion?.title || "Great job!"));
    completeCard.appendChild(createElement("p", "quiz-complete-copy", payload.completion?.message || "You completed this activity."));
    const completeActions = createElement("div", "quiz-complete-actions");
    const playAgain = createElement("button", "quiz-button", payload.playAgainLabel || "Try Again");
    playAgain.type = "button";
    completeActions.appendChild(playAgain);
    completeCard.appendChild(completeActions);
    overlay.appendChild(completeCard);

    screen.appendChild(topbar);
    screen.appendChild(card);
    screen.appendChild(overlay);
    mount.appendChild(screen);

    const state = {
      order: [],
      index: 0,
      answered: 0,
      locked: false
    };

    function updateProgress() {
      progress.textContent = `${Math.min(state.index + 1, questions.length)}/${questions.length}`;
    }

    function loadQuestion() {
      const current = questions[state.order[state.index]];
      media.src = current.image;
      media.alt = current.imageAlt;
      questionEl.textContent = current.question;
      optionsEl.innerHTML = "";

      shuffle(current.options.slice()).forEach((option) => {
        const button = createElement("button", "quiz-option", option);
        button.type = "button";
        button.addEventListener("click", () => checkAnswer(button, option === current.correct));
        optionsEl.appendChild(button);
      });
    }

    function nextQuestion() {
      if (state.index >= questions.length - 1) {
        progress.textContent = `${questions.length}/${questions.length}`;
        playSound(sounds.complete);
        overlay.classList.add("is-active");
        return;
      }

      state.index += 1;
      state.locked = false;
      loadQuestion();
    }

    function checkAnswer(button, isCorrect) {
      if (state.locked) {
        return;
      }

      state.locked = true;

      if (isCorrect) {
        playSound(sounds.correct);
        button.classList.add("is-correct");
        state.answered += 1;
        updateProgress();
        window.setTimeout(() => {
          button.classList.remove("is-correct");
          nextQuestion();
        }, 450);
        return;
      }

      playSound(sounds.wrong);
      button.classList.add("is-wrong");
      window.setTimeout(() => {
        button.classList.remove("is-wrong");
        state.locked = false;
      }, 380);
    }

    function initGame() {
      playSound(sounds.restart);
      state.order = shuffle(Array.from({ length: questions.length }, (_, index) => index));
      state.index = 0;
      state.answered = 0;
      state.locked = false;
      overlay.classList.remove("is-active");
      updateProgress();
      loadQuestion();
    }

    restart.addEventListener("click", initGame);
    playAgain.addEventListener("click", initGame);

    initGame();
  };
})();
