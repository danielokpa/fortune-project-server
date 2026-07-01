import { QuestionCategory, QuestionDifficulty, JobRole } from '@prisma/client';
export const PROFESSIONAL_ATTITUDE_QUESTIONS = [
  {
    category: QuestionCategory.PROFESSIONAL_ATTITUDE,
    jobRole: JobRole.GENERAL,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question: 'Why do you want to work with PeppCruise?',
    options: [
      { optionText: 'I need money only', isCorrect: false },
      {
        optionText: 'I enjoy driving and serving people professionally',
        isCorrect: true,
      },
      { optionText: 'My friend asked me to apply', isCorrect: false },
      { optionText: 'I have no other option', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.PROFESSIONAL_ATTITUDE,
    jobRole: JobRole.GENERAL,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question: 'A professional employee should:',
    options: [
      { optionText: 'Come whenever convenient', isCorrect: false },
      { optionText: 'Ignore schedules', isCorrect: false },
      { optionText: 'Arrive on time consistently', isCorrect: true },
      { optionText: 'Leave work early daily', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.PROFESSIONAL_ATTITUDE,
    jobRole: JobRole.GENERAL,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question: 'Professional communication should be:',
    options: [
      { optionText: 'Rude', isCorrect: false },
      { optionText: 'Clear and respectful', isCorrect: true },
      { optionText: 'Aggressive', isCorrect: false },
      { optionText: 'Dismissive', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.PROFESSIONAL_ATTITUDE,
    jobRole: JobRole.GENERAL,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question: 'Company policies should be:',
    options: [
      { optionText: 'Used only when customers complain', isCorrect: false },
      { optionText: 'Followed consistently', isCorrect: true },
      { optionText: 'Ignored if inconvenient', isCorrect: false },
      { optionText: 'Optional', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.PROFESSIONAL_ATTITUDE,
    jobRole: JobRole.GENERAL,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A passenger requests a favor that violates company policy. What should you do?',
    options: [
      { optionText: 'Follow policy and politely decline', isCorrect: true },
      { optionText: 'Accept to gain a tip', isCorrect: false },
      { optionText: 'Ignore the passenger', isCorrect: false },
      { optionText: 'Argue with the passenger', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.PROFESSIONAL_ATTITUDE,
    jobRole: JobRole.GENERAL,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question: 'When receiving criticism from a supervisor:',
    options: [
      { optionText: 'Take it personally', isCorrect: false },
      { optionText: 'Ignore it', isCorrect: false },
      { optionText: 'Listen objectively and improve', isCorrect: true },
      { optionText: 'Argue immediately', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.PROFESSIONAL_ATTITUDE,
    jobRole: JobRole.GENERAL,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question: 'Professional integrity means:',
    options: [
      { optionText: 'Avoiding responsibility', isCorrect: false },
      {
        optionText: 'Doing the right thing even when nobody is watching',
        isCorrect: true,
      },
      { optionText: 'Blaming others', isCorrect: false },
      { optionText: 'Working only when supervised', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.PROFESSIONAL_ATTITUDE,
    jobRole: JobRole.GENERAL,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You accidentally damage company property. What is the most professional response?',
    options: [
      { optionText: 'Report it immediately', isCorrect: true },
      { optionText: 'Hide the damage', isCorrect: false },
      { optionText: 'Blame someone else', isCorrect: false },
      { optionText: 'Wait for someone to notice', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.PROFESSIONAL_ATTITUDE,
    jobRole: JobRole.GENERAL,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question: 'Accountability means:',
    options: [
      { optionText: 'Avoiding blame', isCorrect: false },
      { optionText: 'Taking responsibility for your actions', isCorrect: true },
      { optionText: 'Making excuses', isCorrect: false },
      { optionText: 'Deflecting responsibility', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.PROFESSIONAL_ATTITUDE,
    jobRole: JobRole.GENERAL,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question: 'A professional driver represents:',
    options: [
      { optionText: 'Only themselves', isCorrect: false },
      { optionText: 'Nobody', isCorrect: false },
      { optionText: 'Only management', isCorrect: false },
      { optionText: 'The company brand', isCorrect: true },
    ],
  },

  {
    category: QuestionCategory.PROFESSIONAL_ATTITUDE,
    jobRole: JobRole.GENERAL,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A customer offers a personal payment to ignore company procedures. What should you do?',
    options: [
      { optionText: 'Accept because no one will know', isCorrect: false },
      { optionText: 'Decline and follow procedures', isCorrect: true },
      { optionText: 'Accept if the amount is significant', isCorrect: false },
      { optionText: 'Negotiate for more money', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.PROFESSIONAL_ATTITUDE,
    jobRole: JobRole.GENERAL,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A coworker repeatedly breaks company rules but asks you not to report it. What is the best action?',
    options: [
      { optionText: 'Ignore it', isCorrect: false },
      { optionText: 'Cover for them', isCorrect: false },
      {
        optionText: 'Follow reporting procedures appropriately',
        isCorrect: true,
      },
      { optionText: 'Warn customers yourself', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.PROFESSIONAL_ATTITUDE,
    jobRole: JobRole.GENERAL,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question: 'Which behavior best demonstrates long-term professionalism?',
    options: [
      {
        optionText: 'Consistent adherence to standards under pressure',
        isCorrect: true,
      },
      { optionText: 'Working hard only when monitored', isCorrect: false },
      { optionText: 'Prioritizing convenience over policy', isCorrect: false },
      { optionText: 'Avoiding responsibility', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.PROFESSIONAL_ATTITUDE,
    jobRole: JobRole.GENERAL,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'You discover an error that benefits you financially but harms the company. What should you do?',
    options: [
      { optionText: 'Keep the benefit', isCorrect: false },
      { optionText: 'Wait and see', isCorrect: false },
      { optionText: 'Report the error immediately', isCorrect: true },
      { optionText: 'Tell only close friends', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.PROFESSIONAL_ATTITUDE,
    jobRole: JobRole.GENERAL,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A supervisor gives an instruction that appears to conflict with written policy. What is the best response?',
    options: [
      { optionText: 'Ignore policy completely', isCorrect: false },
      { optionText: 'Seek clarification before proceeding', isCorrect: true },
      { optionText: 'Argue publicly', isCorrect: false },
      { optionText: 'Refuse without discussion', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.PROFESSIONAL_ATTITUDE,
    jobRole: JobRole.GENERAL,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question: 'Respect in the workplace means:',
    options: [
      { optionText: 'Treating everyone fairly', isCorrect: true },
      { optionText: 'Favoring some people', isCorrect: false },
      { optionText: 'Ignoring coworkers', isCorrect: false },
      { optionText: 'Being hostile', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.PROFESSIONAL_ATTITUDE,
    jobRole: JobRole.GENERAL,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question: 'Continuous learning is important because:',
    options: [
      { optionText: 'Training is unnecessary', isCorrect: false },
      { optionText: 'Experience never changes', isCorrect: false },
      { optionText: 'Skills improve over time', isCorrect: true },
      { optionText: 'Learning wastes time', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.PROFESSIONAL_ATTITUDE,
    jobRole: JobRole.GENERAL,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question: 'Strong teamwork contributes to:',
    options: [
      { optionText: 'More confusion', isCorrect: false },
      { optionText: 'Less accountability', isCorrect: false },
      { optionText: 'Reduced performance', isCorrect: false },
      { optionText: 'Better customer experiences', isCorrect: true },
    ],
  },
  {
    category: QuestionCategory.PROFESSIONAL_ATTITUDE,
    jobRole: JobRole.GENERAL,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question: 'What is the primary purpose of workplace ethics?',
    options: [
      { optionText: 'To increase paperwork', isCorrect: false },
      { optionText: 'To guide responsible decision-making', isCorrect: true },
      { optionText: 'To punish employees', isCorrect: false },
      { optionText: 'To limit productivity', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.PROFESSIONAL_ATTITUDE,
    jobRole: JobRole.GENERAL,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question: 'A professional employee is best described as:',
    options: [
      { optionText: 'Talented but inconsistent', isCorrect: false },
      { optionText: 'Popular among coworkers', isCorrect: false },
      { optionText: 'Reliable, respectful and accountable', isCorrect: true },
      { optionText: 'Focused only on earnings', isCorrect: false },
    ],
  },
];
