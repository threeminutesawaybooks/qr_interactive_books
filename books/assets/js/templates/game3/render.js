(function() {
  const platform = window.BookPlatform;
  const { createElement } = platform.utils;

  platform.templates.game3 = function renderGame3(context) {
    const { mount, pageData } = context;
    const payload = pageData.payload || {};

    mount.innerHTML = "";
    const screen = createElement("section", "template-screen game3-screen");
    const card = createElement("div", "template-card");
    card.appendChild(createElement("span", "template-badge", "Game 3"));
    card.appendChild(createElement("h1", "template-title", payload.activityTitle || pageData.title || "Game 3"));
    card.appendChild(createElement("p", "template-copy", payload.instructions || "This sample renderer shows how a future game3 page can route into its own engine."));

    const grid = createElement("div", "template-grid");
    (payload.choices || []).forEach((choice) => {
      grid.appendChild(createElement("div", "template-grid-card", choice));
    });

    if (grid.children.length) {
      card.appendChild(grid);
    }

    screen.appendChild(card);
    mount.appendChild(screen);
  };
})();
