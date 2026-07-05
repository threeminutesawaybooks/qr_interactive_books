(function() {
  const platform = window.BookPlatform;
  const { createElement } = platform.utils;

  platform.templates.game1 = function renderGame1(context) {
    const { mount, pageData } = context;
    const payload = pageData.payload || {};

    mount.innerHTML = "";
    const screen = createElement("section", "template-screen game1-screen");
    const card = createElement("div", "template-card");
    card.appendChild(createElement("span", "template-badge", "Game 1"));
    card.appendChild(createElement("h1", "template-title", payload.activityTitle || pageData.title || "Game 1"));
    card.appendChild(createElement("p", "template-copy", payload.instructions || "Replace this sample content with your own game1 layout and data."));

    const grid = createElement("div", "template-grid");
    (payload.cards || []).forEach((cardItem) => {
      const item = createElement("div", "template-grid-card");
      item.appendChild(createElement("strong", "", cardItem.title || "Card"));
      if (cardItem.text) {
        item.appendChild(createElement("p", "template-copy", cardItem.text));
      }
      grid.appendChild(item);
    });

    if (grid.children.length) {
      card.appendChild(grid);
    }

    screen.appendChild(card);
    mount.appendChild(screen);
  };
})();
