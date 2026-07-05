// Copy this file into /books/assets/data/{book}/page-{number}.js
window.BookPlatform.registerPageData({
  book: "your-book-code",
  page: 1,
  title: "Game 1 Page",
  type: "game1",
  metaDescription: "Short description for this printed page.",
  payload: {
    activityTitle: "Game 1 Activity",
    instructions: "Explain how this page should work.",
    cards: [
      { title: "Card 1", text: "Replace with your content." },
      { title: "Card 2", text: "Replace with your content." }
    ]
  }
});
