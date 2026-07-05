(function() {
  const platform = window.BookPlatform;
  const { createElement } = platform.utils;

  platform.templates.game2 = function renderGame2(context) {
    const { mount, pageData } = context;
    const payload = pageData.payload || {};

    mount.innerHTML = "";
    const screen = createElement("section", "template-screen game2-screen");
    const card = createElement("div", "template-card");
    card.appendChild(createElement("span", "template-badge", "Game 2"));
    card.appendChild(createElement("h1", "template-title", payload.activityTitle || pageData.title || "Game 2"));
    card.appendChild(createElement("p", "template-copy", payload.instructions || "Use this renderer as the shared engine for your second activity type."));

    const list = createElement("div", "template-list");
    (payload.steps || []).forEach((step, index) => {
      list.appendChild(createElement("div", "template-list-item", `${index + 1}. ${step}`));
    });

    if (list.children.length) {
      card.appendChild(list);
    }

    screen.appendChild(card);
    mount.appendChild(screen);
  };
})();
