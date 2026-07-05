// Copy this file into /books/assets/data/{book}/page-{number}.js
// Then fill the page metadata and the payload.questions array.
window.BookPlatform.registerPageData({
  book: "kings",
  page: 3,
  title: "Kings Text 3",
  type: "quiz",
  metaDescription: "Short description for this printed page.",
  metaImage: "",
  payload: {
    activityTitle: "King Quiz Activity",
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
      },
      {
        image: "https://ik.imagekit.io/imaginetamilfc/Flash%20Cards%20-%20IT/Flash%20Card%20Images/F12%20-%20Birds/2.jpg",
        imageAlt: "Parrot illustration",
        question: "What is Parrot called in Tamil?",
        correct: "Kili",
        options: ["Parunthu", "Kili", "Annam", "Pura"]
      }
    ]

  }
});
