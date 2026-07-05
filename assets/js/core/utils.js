window.BookPlatform = window.BookPlatform || {};
window.BookPlatform.templates = window.BookPlatform.templates || {};
window.BookPlatform.pageRegistry = window.BookPlatform.pageRegistry || new Map();

(function() {
  const platform = window.BookPlatform;

  function createElement(tag, className, textContent) {
    const element = document.createElement(tag);
    if (className) {
      element.className = className;
    }
    if (textContent !== undefined) {
      element.textContent = textContent;
    }
    return element;
  }

  function getBookRequest() {
    const params = new URLSearchParams(window.location.search);
    const rawBook = (params.get("book") || "").trim().toLowerCase();
    const rawPage = (params.get("page") || "").trim();
    const book = /^[a-z0-9-]+$/.test(rawBook) ? rawBook : "";
    const pageNumber = /^\d+$/.test(rawPage) ? Number(rawPage) : NaN;

    return {
      book,
      page: Number.isFinite(pageNumber) && pageNumber > 0 ? pageNumber : null,
      rawBook,
      rawPage
    };
  }

  function updateMetaTag(selector, content, attributeName) {
    const node = document.querySelector(selector);
    if (node) {
      node.setAttribute(attributeName, content);
    }
  }

  function setDocumentMeta(pageData) {
    // Keep share/canonical metadata aligned with the permanent printed QR URL.
    const pageUrl = window.location.href;
    const title = pageData.title || `${pageData.book} page ${pageData.page}`;
    const description = pageData.metaDescription || `Book activity for ${pageData.book}, page ${pageData.page}.`;
    const image = pageData.metaImage || "https://ik.imagekit.io/letsimaginetamil/Brand%20Logo/Leaf%20logo.png";

    document.title = title;
    updateMetaTag('meta[name="description"]', description, "content");
    updateMetaTag('meta[property="og:title"]', title, "content");
    updateMetaTag('meta[property="og:description"]', description, "content");
    updateMetaTag('meta[property="og:image"]', image, "content");
    updateMetaTag('meta[property="og:url"]', pageUrl, "content");
    updateMetaTag('meta[name="twitter:title"]', title, "content");
    updateMetaTag('meta[name="twitter:description"]', description, "content");
    updateMetaTag('meta[name="twitter:image"]', image, "content");
    updateMetaTag('meta[name="twitter:url"]', pageUrl, "content");
    updateMetaTag("#canonicalLink", pageUrl, "href");

    const jsonLd = document.getElementById("jsonLd");
    if (jsonLd) {
      jsonLd.textContent = JSON.stringify({
        "@context": "http://schema.org",
        "@type": "WebPage",
        name: title,
        description,
        image,
        url: pageUrl,
        publisher: {
          "@type": "Organization",
          name: "Three Minutes Away",
          url: "https://www.threeminutesaway.com"
        }
      });
    }
  }

  function renderStatus(mount, options) {
    const config = Object.assign(
      {
        label: "Books",
        title: "Something went wrong",
        message: "Please check the book and page values in the URL.",
        detail: "",
        actionHref: "./?book=oops&page=1",
        actionLabel: "Open sample page"
      },
      options || {}
    );

    mount.innerHTML = "";

    const card = createElement("section", "status-card");
    card.appendChild(createElement("p", "status-label", config.label));
    card.appendChild(createElement("h1", "status-title", config.title));
    card.appendChild(createElement("p", "status-message", config.message));

    if (config.detail) {
      card.appendChild(createElement("p", "status-meta", config.detail));
    }

    if (config.actionHref && config.actionLabel) {
      const link = createElement("a", "status-link", config.actionLabel);
      link.href = config.actionHref;
      card.appendChild(link);
    }

    mount.appendChild(card);
  }

  function shuffle(items) {
    return items
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((entry) => entry.item);
  }

  function playSound(source) {
    if (!source) {
      return;
    }
    const audio = new Audio(source);
    audio.play().catch(() => {});
  }

  function registerPageData(pageData) {
    if (!pageData || !pageData.book || !pageData.page) {
      return;
    }
    // Each page data file self-registers after its script is loaded by the router.
    const key = `${String(pageData.book).toLowerCase()}:${pageData.page}`;
    platform.pageRegistry.set(key, pageData);
  }

  platform.registerPageData = registerPageData;
  platform.utils = {
    createElement,
    getBookRequest,
    setDocumentMeta,
    renderStatus,
    shuffle,
    playSound
  };
})();
