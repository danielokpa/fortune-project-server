import { QuestionCategory, QuestionDifficulty } from '@prisma/client';
export const SAFETY_QUESTIONS = [
  {
    category: QuestionCategory.SAFETY,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question: 'Seat belts should be:',
    options: [
      { optionText: 'Used by all occupants', isCorrect: true },
      { optionText: 'Optional', isCorrect: false },
      { optionText: 'Used only on highways', isCorrect: false },
      { optionText: 'Used only at night', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.SAFETY,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'You receive a personal phone call while driving. What should you do?',
    options: [
      {
        optionText: 'Stop safely or use approved hands-free systems',
        isCorrect: true,
      },
      { optionText: 'Answer immediately', isCorrect: false },
      { optionText: 'Hold the phone while driving', isCorrect: false },
      { optionText: 'Ignore traffic laws', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.SAFETY,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'A passenger offers extra money if you exceed the speed limit. What should you do?',
    options: [
      { optionText: 'Politely refuse and obey traffic laws', isCorrect: true },
      { optionText: 'Accept and speed', isCorrect: false },
      { optionText: 'Speed on empty roads', isCorrect: false },
      { optionText: 'Negotiate a larger payment', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.SAFETY,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question: 'The primary responsibility of a professional driver is:',
    options: [
      { optionText: 'Safety', isCorrect: true },
      { optionText: 'Speed', isCorrect: false },
      { optionText: 'Profit', isCorrect: false },
      { optionText: 'Entertainment', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.SAFETY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'While driving, a passenger asks you to check a message on their phone. What should you do?',
    options: [
      { optionText: 'Decline and focus on driving safely', isCorrect: true },
      { optionText: 'Read it quickly', isCorrect: false },
      { optionText: 'Take the phone while driving', isCorrect: false },
      { optionText: 'Look when traffic is light', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.SAFETY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You notice a warning light appear on the dashboard during a trip. What should you do?',
    options: [
      {
        optionText: 'Assess the warning and follow safety procedures',
        isCorrect: true,
      },
      { optionText: 'Ignore it', isCorrect: false },
      { optionText: 'Drive faster to finish quickly', isCorrect: false },
      { optionText: 'Switch off the warning light', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.SAFETY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question: 'Fatigue while driving can:',
    options: [
      { optionText: 'Reduce reaction time and judgment', isCorrect: true },
      { optionText: 'Improve concentration', isCorrect: false },
      { optionText: 'Increase awareness', isCorrect: false },
      { optionText: 'Improve decision-making', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.SAFETY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question: 'A passenger is not wearing a seat belt. What should you do?',
    options: [
      {
        optionText: 'Politely remind them about safety requirements',
        isCorrect: true,
      },
      { optionText: 'Ignore it', isCorrect: false },
      { optionText: 'Start driving immediately', isCorrect: false },
      { optionText: 'Argue aggressively', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.SAFETY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question: 'What is defensive driving?',
    options: [
      {
        optionText: 'Driving in a way that anticipates hazards',
        isCorrect: true,
      },
      { optionText: 'Driving aggressively', isCorrect: false },
      { optionText: 'Driving faster than traffic', isCorrect: false },
      { optionText: 'Avoiding mirrors', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.SAFETY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'Weather conditions suddenly worsen during a trip. What should you do?',
    options: [
      { optionText: 'Adjust driving behavior for conditions', isCorrect: true },
      { optionText: 'Maintain normal speed', isCorrect: false },
      { optionText: 'Speed up to finish quickly', isCorrect: false },
      { optionText: 'Ignore visibility changes', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.SAFETY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'You are running behind schedule and risk receiving a poor rating. What should you do?',
    options: [
      { optionText: 'Maintain safe driving practices', isCorrect: true },
      { optionText: 'Drive faster than normal', isCorrect: false },
      { optionText: 'Ignore traffic regulations', isCorrect: false },
      { optionText: 'Take unsafe shortcuts', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.SAFETY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A passenger insists you make an illegal U-turn to save time. What should you do?',
    options: [
      {
        optionText: 'Politely refuse and follow traffic laws',
        isCorrect: true,
      },
      { optionText: 'Comply to satisfy the passenger', isCorrect: false },
      { optionText: 'Do it if traffic is light', isCorrect: false },
      { optionText: 'Do it only once', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.SAFETY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'You suspect another driver on the road is impaired. What is the safest action?',
    options: [
      { optionText: 'Maintain distance and avoid engagement', isCorrect: true },
      { optionText: 'Challenge the driver', isCorrect: false },
      { optionText: 'Race ahead', isCorrect: false },
      { optionText: 'Follow closely', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.SAFETY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'An EV battery is draining unusually quickly during a trip. What should you prioritize?',
    options: [
      {
        optionText: 'Passenger safety and contingency planning',
        isCorrect: true,
      },
      { optionText: 'Hiding the issue', isCorrect: false },
      { optionText: 'Increasing speed', isCorrect: false },
      { optionText: 'Ignoring battery warnings', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.SAFETY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A minor collision occurs with no visible injuries. What should you do first?',
    options: [
      {
        optionText: 'Ensure safety and follow incident procedures',
        isCorrect: true,
      },
      { optionText: 'Leave immediately', isCorrect: false },
      { optionText: 'Argue about fault', isCorrect: false },
      { optionText: 'Ignore reporting requirements', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.SAFETY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question: 'Safe following distance helps drivers:',
    options: [
      { optionText: 'React to unexpected hazards', isCorrect: true },
      { optionText: 'Reach destinations faster', isCorrect: false },
      { optionText: 'Reduce fuel use only', isCorrect: false },
      { optionText: 'Impress passengers', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.SAFETY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question: 'Vehicle inspections before work are important because:',
    options: [
      {
        optionText: 'Potential issues can be identified early',
        isCorrect: true,
      },
      { optionText: 'They are only paperwork', isCorrect: false },
      { optionText: 'They are optional', isCorrect: false },
      { optionText: 'They delay operations', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.SAFETY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question: 'Which action demonstrates the strongest safety culture?',
    options: [
      {
        optionText: 'Reporting hazards even when inconvenient',
        isCorrect: true,
      },
      { optionText: 'Ignoring minor risks', isCorrect: false },
      { optionText: 'Avoiding documentation', isCorrect: false },
      { optionText: 'Waiting for someone else to act', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.SAFETY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'If visibility becomes severely reduced during a trip, the best response is:',
    options: [
      { optionText: 'Slow down and adapt to conditions', isCorrect: true },
      { optionText: 'Maintain normal speed', isCorrect: false },
      { optionText: 'Speed up', isCorrect: false },
      { optionText: 'Ignore the situation', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.SAFETY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A passenger pressures you to break multiple safety rules because they are late. What should guide your decision?',
    options: [
      { optionText: 'Safety and legal compliance', isCorrect: true },
      { optionText: 'Passenger pressure', isCorrect: false },
      { optionText: 'Potential tips', isCorrect: false },
      { optionText: 'Ratings only', isCorrect: false },
    ],
  },
];
