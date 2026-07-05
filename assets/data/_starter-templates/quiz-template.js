// Copy this file into /books/assets/data/{book}/page-{number}.js
// Then fill the page metadata and the payload.questions array.
window.BookPlatform.registerPageData({
  book: "your-book-code",
  page: 1,
  title: "Your Quiz Title",
  type: "quiz",
  metaDescription: "Short description for this printed page.",
  metaImage: "",
  payload: {
    activityTitle: "Your Quiz Activity",
    restartLabel: "Restart",
    completion: {
      title: "Great job!",
      message: "You completed this page."
    },
    sounds: {
      correct: "",
      wrong: "",
      complete: "",
      restart: ""
    },
    questions: [
      {
        image: "",
        imageAlt: "Question image",
        question: "What is the correct answer?",
        correct: "Option A",
        options: ["Option A", "Option B", "Option C", "Option D"]
      }
    ]
  }
});
