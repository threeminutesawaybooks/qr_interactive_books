// Copy this file into /books/assets/data/{book}/page-{number}.js
window.BookPlatform.registerPageData({
  book: "your-book-code",
  page: 1,
  title: "Match Page",
  type: "match",
  metaDescription: "Short description for this printed page.",
  payload: {
    activityTitle: "Match Activity",
    instructions: "Explain how the learner should match items.",
    pairs: [
      { left: "Item A", right: "Match A" },
      { left: "Item B", right: "Match B" }
    ]
  }
});
