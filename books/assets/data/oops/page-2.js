window.BookPlatform.registerPageData({
  book: "oops",
  page: 2,
  title: "Oops Page 2 Game 1",
  type: "game1",
  metaDescription: "Sample Game 1 page for the Oops book.",
  payload: {
    activityTitle: "Game 1 Sample",
    instructions: "This sample page shows how a non-quiz activity can be routed from the same master /books/ URL.",
    cards: [
      { title: "Prompt", text: "Add the real game1 prompt here." },
      { title: "Rule", text: "Add the rule or steps the learner should follow." },
      { title: "Content", text: "Keep actual page content in this page file, not in the renderer." }
    ]
  }
});
