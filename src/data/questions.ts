import { Question } from "@/types";

// Sample DSA questions for levels 1-8
export const questions: Question[] = [
  {
    id: 1,
    level: 1,
    problemStatement: "A structure stores elements in a continuous block of memory. Each element can be accessed directly using an index number starting from 0.",
    question: "What data structure is this?",
    options: [
      { id: "A", text: "Linked List" },
      { id: "B", text: "Stack" },
      { id: "C", text: "Array" },
      { id: "D", text: "Queue" }
    ],
    correctAnswer: "C",
    xpReward: 10
  },
  {
    id: 2,
    level: 2,
    problemStatement: "Each element contains data + the address of the next element. The elements are not stored in consecutive memory locations.",
    question: "What data structure is this?",
    options: [
      { id: "A", text: "Linked List" },
      { id: "B", text: "Array" },
      { id: "C", text: "Tree" },
      { id: "D", text: "Queue" }
    ],
    correctAnswer: "A",
    xpReward: 15
  },
  {
    id: 3,
    level: 3,
    problemStatement: "A linear data structure that follows LIFO (Last In First Out) principle. Elements are added and removed from the same end.",
    question: "Which data structure is this?",
    options: [
      { id: "A", text: "Queue" },
      { id: "B", text: "Stack" },
      { id: "C", text: "Array" },
      { id: "D", text: "Linked List" }
    ],
    correctAnswer: "B",
    xpReward: 15
  },
  {
    id: 4,
    level: 4,
    problemStatement: "A linear data structure that follows FIFO (First In First Out) principle. Elements are added at the rear and removed from the front.",
    question: "Which data structure is this?",
    options: [
      { id: "A", text: "Stack" },
      { id: "B", text: "Queue" },
      { id: "C", text: "Tree" },
      { id: "D", text: "Graph" }
    ],
    correctAnswer: "B",
    xpReward: 20
  },
  {
    id: 5,
    level: 5,
    problemStatement: "A hierarchical data structure with a root node and child nodes. Each node can have multiple children, forming parent-child relationships.",
    question: "What data structure is this?",
    options: [
      { id: "A", text: "Graph" },
      { id: "B", text: "Array" },
      { id: "C", text: "Tree" },
      { id: "D", text: "Linked List" }
    ],
    correctAnswer: "C",
    xpReward: 20
  },
  {
    id: 6,
    level: 6,
    problemStatement: "A special type of tree where each node has at most two children, referred to as left child and right child.",
    question: "What is this tree called?",
    options: [
      { id: "A", text: "Binary Tree" },
      { id: "B", text: "AVL Tree" },
      { id: "C", text: "B-Tree" },
      { id: "D", text: "Red-Black Tree" }
    ],
    correctAnswer: "A",
    xpReward: 25
  },
  {
    id: 7,
    level: 7,
    problemStatement: "A collection of nodes (vertices) and edges that connect pairs of nodes. Can be directed or undirected.",
    question: "What data structure is this?",
    options: [
      { id: "A", text: "Tree" },
      { id: "B", text: "Graph" },
      { id: "C", text: "Heap" },
      { id: "D", text: "Trie" }
    ],
    correctAnswer: "B",
    xpReward: 25
  },
  {
    id: 8,
    level: 8,
    problemStatement: "A data structure that maps keys to values using a hash function. Provides average O(1) time complexity for search, insert, and delete operations.",
    question: "What data structure is this?",
    options: [
      { id: "A", text: "Binary Search Tree" },
      { id: "B", text: "Hash Table" },
      { id: "C", text: "Priority Queue" },
      { id: "D", text: "Skip List" }
    ],
    correctAnswer: "B",
    xpReward: 30
  }
];

// Get question by level
export const getQuestionByLevel = (level: number): Question | undefined => {
  return questions.find(q => q.level === level);
};

// Get all questions for a level range
export const getQuestionsByLevelRange = (startLevel: number, endLevel: number): Question[] => {
  return questions.filter(q => q.level >= startLevel && q.level <= endLevel);
};
