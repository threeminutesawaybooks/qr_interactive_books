(function() {
  const platform = window.BookPlatform;
  const scriptCache = new Map();
  const styleCache = new Map();

  function loadScript(src, cacheKey) {
    if (scriptCache.has(cacheKey)) {
      return scriptCache.get(cacheKey);
    }

    const promise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.body.appendChild(script);
    });

    scriptCache.set(cacheKey, promise);
    return promise;
  }

  function loadStylesheet(href, cacheKey) {
    if (styleCache.has(cacheKey)) {
      return styleCache.get(cacheKey);
    }

    const existing = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).find((node) => node.href === new URL(href, window.location.href).href);
    if (existing) {
      const done = Promise.resolve();
      styleCache.set(cacheKey, done);
      return done;
    }

    const promise = new Promise((resolve) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.onload = () => resolve();
      link.onerror = () => resolve();
      document.head.appendChild(link);
    });

    styleCache.set(cacheKey, promise);
    return promise;
  }

  async function loadPageData(book, page) {
    const key = `${book}:${page}`;
    if (platform.pageRegistry.has(key)) {
      return platform.pageRegistry.get(key);
    }

    // Static page scripts keep GitHub Pages hosting simple and predictable.
    const src = `./assets/data/${book}/page-${page}.js`;
    await loadScript(src, `page:${key}`);

    if (!platform.pageRegistry.has(key)) {
      throw new Error(`Page data script loaded but did not register ${key}.`);
    }

    return platform.pageRegistry.get(key);
  }

  async function loadTemplate(type) {
    if (typeof platform.templates[type] === "function") {
      return platform.templates[type];
    }

    // Renderers are lazy-loaded so one master page can support multiple activity types.
    const src = `./assets/js/templates/${type}/render.js`;
    await loadScript(src, `template:${type}`);

    if (typeof platform.templates[type] !== "function") {
      throw new Error(`No renderer registered for activity type "${type}".`);
    }

    return platform.templates[type];
  }

  async function loadActivityStyles(type) {
    const href = `./assets/css/${type}.css`;
    await loadStylesheet(href, `style:${type}`);
  }

  platform.loader = {
    loadPageData,
    loadTemplate,
    loadActivityStyles
  };
})();
