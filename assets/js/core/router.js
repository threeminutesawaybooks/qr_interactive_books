(function() {
  const platform = window.BookPlatform;

  async function startBooksApp() {
    const mount = document.getElementById("app");
    const request = platform.utils.getBookRequest();

    if (!request.book || !request.page) {
      platform.utils.renderStatus(mount, {
        label: "Missing URL parameters",
        title: "Book page not found",
        message: 'Use a URL like "/books/?book=oops&page=1".',
        detail: `Received book="${request.rawBook || "-"}", page="${request.rawPage || "-"}".`
      });
      return;
    }

    platform.utils.renderStatus(mount, {
      label: "Loading",
      title: `Opening ${request.book} page ${request.page}`,
      message: "Loading page data and activity template.",
      actionHref: "",
      actionLabel: ""
    });

    let pageData;

    try {
      // Resolve the permanent QR URL into a specific static page data file.
      pageData = await platform.loader.loadPageData(request.book, request.page);
    } catch (error) {
      platform.utils.renderStatus(mount, {
        label: "Missing page data",
        title: "This QR page is not ready yet",
        message: "The requested book/page data file could not be found.",
        detail: `Expected ./assets/data/${request.book}/page-${request.page}.js`
      });
      return;
    }

    if (!pageData || pageData.book !== request.book || Number(pageData.page) !== request.page) {
      platform.utils.renderStatus(mount, {
        label: "Invalid page data",
        title: "This page data file is malformed",
        message: "The file loaded, but its book/page values do not match the URL."
      });
      return;
    }

    if (!pageData.type) {
      platform.utils.renderStatus(mount, {
        label: "Missing activity type",
        title: "Activity type is not defined",
        message: "Every page file must declare a type field."
      });
      return;
    }

    let renderer;

    try {
      // The page data chooses the activity type; the router loads the matching renderer.
      renderer = await platform.loader.loadTemplate(pageData.type);
    } catch (error) {
      platform.utils.renderStatus(mount, {
        label: "Unknown activity type",
        title: `Renderer not found for "${pageData.type}"`,
        message: "Add a renderer file inside assets/js/templates/{type}/render.js."
      });
      return;
    }

    await platform.loader.loadActivityStyles(pageData.type);

    platform.utils.setDocumentMeta(pageData);

    try {
      renderer({
        mount,
        pageData,
        platform
      });
    } catch (error) {
      platform.utils.renderStatus(mount, {
        label: "Render error",
        title: "The activity could not be rendered",
        message: "The page data loaded, but the renderer failed while building the UI.",
        detail: error.message
      });
    }
  }

  document.addEventListener("DOMContentLoaded", startBooksApp);
})();
