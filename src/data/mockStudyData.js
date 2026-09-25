const mockStudyData = {
  topic: "DBMS Transactions",

  flashcards: [
    {
      question: "What is a transaction?",
      answer:
        "A transaction is a sequence of database operations treated as a single logical unit of work.",
    },
    {
      question: "What does ACID stand for?",
      answer:
        "ACID stands for Atomicity, Consistency, Isolation, and Durability.",
    },
    {
      question: "What is Atomicity?",
      answer:
        "Atomicity ensures that all operations in a transaction are completed, or none of them are.",
    },
    {
      question: "What is Isolation?",
      answer:
        "Isolation ensures that concurrent transactions do not improperly interfere with each other.",
    },
  ],

  quiz: [
    {
      question: "Which property provides all-or-nothing execution?",
      options: ["Consistency", "Atomicity", "Isolation", "Durability"],
      correctAnswer: 1,
    },
    {
      question: "Which of the following is an ACID property?",
      options: [
        "Compilation",
        "Isolation",
        "Inheritance",
        "Polymorphism",
      ],
      correctAnswer: 1,
    },
  ],
};

export default mockStudyData;