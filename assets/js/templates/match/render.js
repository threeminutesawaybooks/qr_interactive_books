(function() {
  const platform = window.BookPlatform;
  const { createElement } = platform.utils;

  platform.templates.match = function renderMatch(context) {
    const { mount, pageData } = context;
    const payload = pageData.payload || {};

    mount.innerHTML = "";
    const screen = createElement("section", "template-screen match-screen");
    const card = createElement("div", "template-card");
    card.appendChild(createElement("span", "template-badge", "Match"));
    card.appendChild(createElement("h1", "template-title", payload.activityTitle || pageData.title || "Match Activity"));
    card.appendChild(createElement("p", "template-copy", payload.instructions || "Use this template for matching activities. Replace the sample pairs with your own content."));

    const pairs = createElement("div", "match-pairs");
    (payload.pairs || []).forEach((pair) => {
      const row = createElement("div", "match-pair");
      row.appendChild(createElement("div", "match-pill", pair.left || ""));
      row.appendChild(createElement("div", "template-copy", "<->"));
      row.appendChild(createElement("div", "match-pill", pair.right || ""));
      pairs.appendChild(row);
    });

    if (pairs.children.length) {
      card.appendChild(pairs);
    }

    screen.appendChild(card);
    mount.appendChild(screen);
  };
})();
