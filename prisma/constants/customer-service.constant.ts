import { QuestionCategory, QuestionDifficulty, JobRole } from '@prisma/client';

export const CUSTOMER_SERVICE_QUESTIONS = [
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'A passenger enters your vehicle carrying heavy luggage. What should you do?',
    options: [
      {
        optionText: 'Politely offer assistance where appropriate',
        isCorrect: true,
      },
      { optionText: 'Remain seated', isCorrect: false },
      { optionText: 'Tell them to manage alone', isCorrect: false },
      { optionText: 'Ignore them', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'A passenger greets you when entering your vehicle. What should you do?',
    options: [
      { optionText: 'Respond politely and professionally', isCorrect: true },
      { optionText: 'Ignore them', isCorrect: false },
      { optionText: 'Continue using your phone', isCorrect: false },
      { optionText: 'Say nothing', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question: 'Excellent customer service means:',
    options: [
      {
        optionText: 'Making customers feel safe, respected and valued',
        isCorrect: true,
      },
      { optionText: 'Driving as fast as possible', isCorrect: false },
      { optionText: 'Avoiding communication', isCorrect: false },
      { optionText: 'Only reaching the destination', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question: 'A passenger thanks you after a trip. What should you do?',
    options: [
      { optionText: 'Thank them politely', isCorrect: true },
      { optionText: 'Ignore them', isCorrect: false },
      { optionText: 'Ask for more money', isCorrect: false },
      { optionText: 'Walk away', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A passenger complains that the vehicle is too warm. What should you do?',
    options: [
      {
        optionText: 'Apologize and adjust the temperature if possible',
        isCorrect: true,
      },
      { optionText: 'Tell them to endure it', isCorrect: false },
      { optionText: 'Ignore the complaint', isCorrect: false },
      { optionText: 'End the trip', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A passenger asks a question about the service that you cannot answer. What should you do?',
    options: [
      {
        optionText: 'Admit you are unsure and direct them to support',
        isCorrect: true,
      },
      { optionText: 'Make up an answer', isCorrect: false },
      { optionText: 'Ignore the question', isCorrect: false },
      { optionText: 'Guess confidently', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A passenger appears elderly and struggles to enter the vehicle. What should you do?',
    options: [
      {
        optionText: 'Offer appropriate assistance respectfully',
        isCorrect: true,
      },
      { optionText: 'Rush them', isCorrect: false },
      { optionText: 'Ignore them', isCorrect: false },
      { optionText: 'Complain about delays', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question: 'A passenger seems unfamiliar with the area. What should you do?',
    options: [
      {
        optionText: 'Provide helpful information when appropriate',
        isCorrect: true,
      },
      { optionText: 'Ignore them', isCorrect: false },
      { optionText: 'Mock them', isCorrect: false },
      { optionText: 'Give misleading information', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A passenger requests a short stop during the trip. What should you do?',
    options: [
      {
        optionText: 'Follow company policy and communicate clearly',
        isCorrect: true,
      },
      { optionText: 'Refuse immediately', isCorrect: false },
      { optionText: 'Ignore the request', isCorrect: false },
      { optionText: 'Argue with the passenger', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A passenger accidentally spills a drink in the vehicle. What should you do?',
    options: [
      {
        optionText: 'Remain professional and handle it calmly',
        isCorrect: true,
      },
      { optionText: 'Shout at them', isCorrect: false },
      { optionText: 'End the trip immediately', isCorrect: false },
      { optionText: 'Insult them', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A passenger forgets a mobile phone in your vehicle. What should you do?',
    options: [
      {
        optionText: 'Report it immediately through company procedures',
        isCorrect: true,
      },
      { optionText: 'Keep it until they call', isCorrect: false },
      { optionText: 'Take it home', isCorrect: false },
      { optionText: 'Ignore it', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A passenger offers a cash tip in exchange for bypassing company policy. What should you do?',
    options: [
      { optionText: 'Politely decline and follow policy', isCorrect: true },
      { optionText: 'Accept if the amount is large', isCorrect: false },
      { optionText: 'Negotiate a larger tip', isCorrect: false },
      { optionText: 'Ignore company rules', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A passenger becomes upset because of a service issue beyond your control. What is the best response?',
    options: [
      {
        optionText: 'Show empathy and direct them to proper support channels',
        isCorrect: true,
      },
      { optionText: "Tell them it isn't your problem", isCorrect: false },
      { optionText: 'Argue with them', isCorrect: false },
      { optionText: 'Ignore them', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A passenger claims they were charged incorrectly. What should you do?',
    options: [
      {
        optionText:
          'Explain that billing issues should be handled through official support',
        isCorrect: true,
      },
      { optionText: 'Offer a personal refund', isCorrect: false },
      { optionText: 'Ignore them', isCorrect: false },
      { optionText: 'Argue about pricing', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question: 'Which action is most likely to increase passenger trust?',
    options: [
      { optionText: 'Clear communication and consistency', isCorrect: true },
      { optionText: 'Making promises you cannot guarantee', isCorrect: false },
      { optionText: 'Avoiding interaction', isCorrect: false },
      { optionText: 'Rushing conversations', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question: 'Customer satisfaction is highest when passengers feel:',
    options: [
      { optionText: 'Safe, respected and valued', isCorrect: true },
      { optionText: 'Ignored', isCorrect: false },
      { optionText: 'Confused', isCorrect: false },
      { optionText: 'Pressured', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question: 'A passenger is travelling with a child. What should you do?',
    options: [
      {
        optionText: 'Drive safely and remain attentive to passenger needs',
        isCorrect: true,
      },
      { optionText: 'Drive aggressively', isCorrect: false },
      { optionText: 'Ignore safety concerns', isCorrect: false },
      { optionText: 'Rush the trip', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A regular passenger requests preferential treatment that violates company policy. What should you do?',
    options: [
      { optionText: 'Apply policy fairly to all customers', isCorrect: true },
      { optionText: 'Make an exception', isCorrect: false },
      { optionText: 'Hide the request', isCorrect: false },
      { optionText: 'Ignore company guidelines', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question: 'When handling complaints, the first priority is:',
    options: [
      { optionText: 'Understanding the concern', isCorrect: true },
      { optionText: 'Defending yourself', isCorrect: false },
      { optionText: 'Ending the discussion', isCorrect: false },
      { optionText: 'Assigning blame', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question: 'What best demonstrates a customer-first mindset?',
    options: [
      {
        optionText: 'Balancing passenger needs with safety and policy',
        isCorrect: true,
      },
      { optionText: 'Agreeing to every request', isCorrect: false },
      { optionText: 'Ignoring company standards', isCorrect: false },
      { optionText: 'Prioritizing convenience over service', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'A customer calls asking about their fare. What should you do?',
    options: [
      {
        optionText: 'Calmly explain the fare breakdown clearly',
        isCorrect: true,
      },
      { optionText: 'Hang up the call', isCorrect: false },
      { optionText: 'Tell them to figure it out themselves', isCorrect: false },
      { optionText: 'Give a vague answer', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'A customer greets you when the call connects. What should you do?',
    options: [
      { optionText: 'Ignore the greeting', isCorrect: false },
      {
        optionText: 'Greet them politely and professionally',
        isCorrect: true,
      },
      { optionText: 'Respond rudely', isCorrect: false },
      { optionText: 'Stay silent', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question: 'Good customer support means:',
    options: [
      {
        optionText: 'Resolving issues efficiently while making the customer feel heard',
        isCorrect: true,
      },
      { optionText: 'Avoiding difficult questions', isCorrect: false },
      { optionText: 'Reading from a script without listening', isCorrect: false },
      { optionText: 'Ending calls as quickly as possible', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'A customer thanks you for resolving their issue. What should you do?',
    options: [
      { optionText: 'End the call abruptly', isCorrect: false },
      { optionText: 'Move on without acknowledgment', isCorrect: false },
      { optionText: 'Ask for a tip', isCorrect: false },
      {
        optionText: 'Thank them and ask if there\'s anything else you can help with',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'A customer asks how to update their payment method. What should you do?',
    options: [
      {
        optionText: 'Guide them through the steps clearly',
        isCorrect: true,
      },
      { optionText: 'Refuse to help', isCorrect: false },
      { optionText: 'Give incomplete instructions', isCorrect: false },
      { optionText: 'Tell them to search online themselves', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'A customer\'s chat message contains a typo making it hard to understand. What should you do?',
    options: [
      {
        optionText: 'Politely ask them to clarify',
        isCorrect: true,
      },
      { optionText: 'Ignore the message', isCorrect: false },
      { optionText: 'Point out their typo critically', isCorrect: false },
      { optionText: 'Guess what they meant and respond', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'A customer ends the call abruptly without saying goodbye. What should you do?',
    options: [
      { optionText: 'Leave the ticket unresolved', isCorrect: false },
      { optionText: 'Call them back to demand a goodbye', isCorrect: false },
      { optionText: 'Mark the interaction as a complaint', isCorrect: false },
      {
        optionText: 'Note the resolution and close the ticket professionally',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A customer is mildly frustrated about a delayed driver. What should you do?',
    options: [
      { optionText: 'Blame the driver directly', isCorrect: false },
      { optionText: 'Promise an arrival time you\'re not sure of', isCorrect: false },
      {
        optionText: 'Empathize and provide an honest update',
        isCorrect: true,
      },
      { optionText: 'Dismiss their frustration', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A customer requests a refund for a trip but provides no details. What should you do?',
    options: [
      { optionText: 'Deny the refund outright', isCorrect: false },
      { optionText: 'Ignore the request', isCorrect: false },
      { optionText: 'Process a refund without verification', isCorrect: false },
      {
        optionText: 'Politely ask for the trip ID or details first',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A customer asks for an update on a previously submitted complaint. What should you do?',
    options: [
      { optionText: 'Tell them you have no idea', isCorrect: false },
      {
        optionText: 'Check the ticket status and provide an honest update',
        isCorrect: true,
      },
      { optionText: 'Ask them to resubmit the complaint', isCorrect: false },
      { optionText: 'Make up a status to end the conversation', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A driver calls asking why their payout is lower than expected. What should you do?',
    options: [
      {
        optionText: 'Explain the payout breakdown clearly and check for errors',
        isCorrect: true,
      },
      { optionText: 'Promise to fix it without checking', isCorrect: false },
      { optionText: 'Ignore the question', isCorrect: false },
      { optionText: 'Tell them payouts are never wrong', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A customer reports being charged twice for one trip. What should you do?',
    options: [
      {
        optionText: 'Apologize, investigate the transaction, and escalate if needed',
        isCorrect: true,
      },
      { optionText: 'Dismiss the claim as unlikely', isCorrect: false },
      { optionText: 'Refund without checking the records', isCorrect: false },
      { optionText: 'Tell them it\'s not your problem', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A customer asks a policy question you\'re unsure about. What should you do?',
    options: [
      { optionText: 'Guess and hope it\'s correct', isCorrect: false },
      { optionText: 'Avoid answering at all', isCorrect: false },
      {
        optionText: 'Admit uncertainty and confirm with a supervisor before responding',
        isCorrect: true,
      },
      { optionText: 'Make up a policy', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A customer wants to change their pickup location after booking. What should you do?',
    options: [
      {
        optionText: 'Explain the available options professionally',
        isCorrect: true,
      },
      { optionText: 'Change it without verifying feasibility', isCorrect: false },
      { optionText: 'Ignore the request', isCorrect: false },
      { optionText: 'Tell them it\'s impossible without checking', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A non-native speaker is having difficulty explaining their issue. What should you do?',
    options: [
      { optionText: 'Show visible frustration', isCorrect: false },
      { optionText: 'Speak quickly to save time', isCorrect: false },
      {
        optionText: 'Be patient and use simple, clear language',
        isCorrect: true,
      },
      { optionText: 'End the call due to the language barrier', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A customer is upset about being matched with a low-rated driver. What should you do?',
    options: [
      { optionText: 'Dismiss the concern', isCorrect: false },
      {
        optionText: 'Acknowledge concern and explain the matching/safety process',
        isCorrect: true,
      },
      { optionText: 'Promise a specific driver next time', isCorrect: false },
      { optionText: 'Tell them ratings don\'t matter', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question: 'A customer asks to speak to a manager. What should you do?',
    options: [
      {
        optionText: 'Calmly escalate the request through proper channels',
        isCorrect: true,
      },
      { optionText: 'Pretend to be a manager', isCorrect: false },
      { optionText: 'Refuse the request', isCorrect: false },
      { optionText: 'Argue that it\'s unnecessary', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'Multiple customers are waiting in the queue during high call volume. What should you do?',
    options: [
      { optionText: 'Ignore queue order entirely', isCorrect: false },
      { optionText: 'Rush every call equally without assessment', isCorrect: false },
      {
        optionText: 'Prioritize based on urgency while staying efficient',
        isCorrect: true,
      },
      { optionText: 'Skip complex cases to save time', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A customer\'s account shows conflicting information from what they\'re describing. What should you do?',
    options: [
      {
        optionText: 'Verify details carefully before responding',
        isCorrect: true,
      },
      { optionText: 'Respond with the first detail you see', isCorrect: false },
      { optionText: 'Ignore the discrepancy', isCorrect: false },
      { optionText: 'Assume the customer is mistaken', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A customer asks about a promo code that didn\'t apply. What should you do?',
    options: [
      { optionText: 'Apply the promo without checking eligibility', isCorrect: false },
      { optionText: 'Dismiss the inquiry', isCorrect: false },
      { optionText: 'Tell them promos never work', isCorrect: false },
      {
        optionText: 'Check the promo terms and explain or escalate',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A driver complains about an unfair rating from a passenger. What should you do?',
    options: [
      { optionText: 'Remove the rating immediately without review', isCorrect: false },
      {
        optionText: 'Explain the review process and how disputes are handled',
        isCorrect: true,
      },
      { optionText: 'Tell them ratings can\'t be disputed', isCorrect: false },
      { optionText: 'Ignore the complaint', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A customer is unhappy that a previous agent gave incorrect information. What should you do?',
    options: [
      { optionText: 'Blame the other agent to the customer', isCorrect: false },
      {
        optionText: 'Apologize for the confusion and correct it',
        isCorrect: true,
      },
      { optionText: 'Avoid addressing the error', isCorrect: false },
      { optionText: 'Insist the previous information was correct', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A customer requests their personal data be deleted. What should you do?',
    options: [
      {
        optionText: 'Explain the process per data privacy policy',
        isCorrect: true,
      },
      { optionText: 'Delete it immediately without verification', isCorrect: false },
      { optionText: 'Refuse without explanation', isCorrect: false },
      { optionText: 'Ignore the request', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A customer becomes verbally abusive on the phone. What should you do?',
    options: [
      { optionText: 'Hang up immediately without warning', isCorrect: false },
      {
        optionText: 'Stay calm, set boundaries, and follow de-escalation procedure',
        isCorrect: true,
      },
      { optionText: 'Respond with equal hostility', isCorrect: false },
      { optionText: 'Argue back to defend yourself', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A customer threatens legal action over a dispute. What should you do?',
    options: [
      { optionText: 'Argue about the legal merits yourself', isCorrect: false },
      { optionText: 'Promise a settlement on the spot', isCorrect: false },
      { optionText: 'Dismiss the threat', isCorrect: false },
      {
        optionText: 'Document the issue accurately and escalate to the appropriate team',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A customer reports a safety incident during a trip. What should you do?',
    options: [
      { optionText: 'Ask the customer to handle it themselves', isCorrect: false },
      { optionText: 'Treat it as a routine complaint', isCorrect: false },
      {
        optionText: 'Treat the report with urgency and follow the safety escalation protocol',
        isCorrect: true,
      },
      { optionText: 'Delay action until later', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'Two customers give conflicting accounts about the same incident. What should you do?',
    options: [
      {
        optionText: 'Investigate both sides objectively before concluding',
        isCorrect: true,
      },
      { optionText: 'Dismiss both accounts', isCorrect: false },
      { optionText: 'Make a quick assumption without checking', isCorrect: false },
      { optionText: 'Believe whichever customer called first', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A customer asks you to bend policy because of their loyalty. What should you do?',
    options: [
      { optionText: 'Make a special exception', isCorrect: false },
      { optionText: 'Promise to bend policy next time', isCorrect: false },
      {
        optionText: 'Politely decline and apply the policy fairly',
        isCorrect: true,
      },
      { optionText: 'Bend the rules quietly', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A customer\'s complaint involves a potential fraud case. What should you do?',
    options: [
      { optionText: 'Ignore the possibility of fraud', isCorrect: false },
      { optionText: 'Delay escalation until convenient', isCorrect: false },
      {
        optionText: 'Escalate to the fraud/security team immediately',
        isCorrect: true,
      },
      { optionText: 'Handle it yourself informally', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A customer demands an immediate refund that requires approval beyond your authority. What should you do?',
    options: [
      { optionText: 'Ignore the request', isCorrect: false },
      { optionText: 'Deny it outright without explanation', isCorrect: false },
      { optionText: 'Approve it anyway to avoid conflict', isCorrect: false },
      {
        optionText: 'Explain the process and escalate appropriately',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A customer shares sensitive personal information unprompted. What should you do?',
    options: [
      { optionText: 'Share it with colleagues casually', isCorrect: false },
      {
        optionText: 'Handle it confidentially per data protection guidelines',
        isCorrect: true,
      },
      { optionText: 'Ignore the sensitivity of the information', isCorrect: false },
      { optionText: 'Record it without safeguards', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A customer disputes a fare and provides screenshots that don\'t match system records. What should you do?',
    options: [
      { optionText: 'Refund automatically without checking', isCorrect: false },
      {
        optionText: 'Investigate discrepancies before responding',
        isCorrect: true,
      },
      { optionText: 'Accept the screenshots without verification', isCorrect: false },
      { optionText: 'Dismiss the screenshots without review', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A customer\'s issue requires coordination between support, operations, and driver teams. What should you do?',
    options: [
      { optionText: 'Handle it alone without involving other teams', isCorrect: false },
      { optionText: 'Pass it off without follow-up', isCorrect: false },
      { optionText: 'Delay coordination until it\'s urgent', isCorrect: false },
      {
        optionText: 'Coordinate clearly across teams to resolve it',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A customer is in visible distress while reporting an issue. What is the best response?',
    options: [
      { optionText: 'Stay clinical and detached', isCorrect: false },
      { optionText: 'Rush them off the call', isCorrect: false },
      {
        optionText: 'Show empathy, stay supportive, and prioritize resolution',
        isCorrect: true,
      },
      { optionText: 'Minimize their distress', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question: 'What best demonstrates effective customer support?',
    options: [
      { optionText: 'Avoiding escalations at all costs', isCorrect: false },
      { optionText: 'Following scripts rigidly without listening', isCorrect: false },
      { optionText: 'Closing tickets as fast as possible regardless of outcome', isCorrect: false },
      {
        optionText: 'Resolving issues accurately while maintaining empathy and professionalism',
        isCorrect: true,
      },
    ],
  },

  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'You receive an email from a colleague needing an urgent response. What should you do?',
    options: [
      {
        optionText: 'Reply promptly and professionally',
        isCorrect: true,
      },
      { optionText: 'Reply briefly without addressing the request', isCorrect: false },
      { optionText: 'Forward it without comment', isCorrect: false },
      { optionText: 'Leave it for later', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'An executive asks you to schedule a meeting. What should you do?',
    options: [
      { optionText: 'Delay sending the invite', isCorrect: false },
      { optionText: 'Send an invite with no details', isCorrect: false },
      { optionText: 'Schedule it without checking availability', isCorrect: false },
      {
        optionText: 'Confirm availability and send a clear invite',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question: 'Good administrative support means:',
    options: [
      { optionText: 'Avoiding responsibility for errors', isCorrect: false },
      { optionText: 'Waiting to be told every task', isCorrect: false },
      { optionText: 'Prioritizing speed over accuracy', isCorrect: false },
      {
        optionText: 'Being organized, professional, and proactive',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'A colleague thanks you for completing a task quickly. What should you do?',
    options: [
      { optionText: 'Brush off the thanks', isCorrect: false },
      { optionText: 'Ask for a favor in return', isCorrect: false },
      {
        optionText: 'Thank them and confirm if anything else is needed',
        isCorrect: true,
      },
      { optionText: 'Move on without response', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'You need to file a document for record-keeping. What should you do?',
    options: [
      {
        optionText: 'File it accurately according to company procedure',
        isCorrect: true,
      },
      { optionText: 'Delay filing until later', isCorrect: false },
      { optionText: 'File it wherever convenient', isCorrect: false },
      { optionText: 'Skip filing if busy', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'A vendor calls asking for a contact within the company. What should you do?',
    options: [
      { optionText: 'Give out personal contact details without checking', isCorrect: false },
      { optionText: 'Tell them to figure it out', isCorrect: false },
      {
        optionText: 'Politely direct them to the correct department',
        isCorrect: true,
      },
      { optionText: 'Ignore the call', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'You receive a calendar invite with no agenda. What should you do?',
    options: [
      { optionText: 'Assume the topic without asking', isCorrect: false },
      { optionText: 'Decline the meeting outright', isCorrect: false },
      { optionText: 'Attend without preparation', isCorrect: false },
      {
        optionText: 'Politely request an agenda before the meeting',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'Two meetings are scheduled at the same time by mistake. What should you do?',
    options: [
      {
        optionText: 'Reach out to reschedule one professionally and promptly',
        isCorrect: true,
      },
      { optionText: 'Ignore the conflict', isCorrect: false },
      { optionText: 'Cancel both meetings', isCorrect: false },
      { optionText: 'Let both proceed and hope for the best', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'An executive asks you to draft an important email on short notice. What should you do?',
    options: [
      { optionText: 'Send it without proofreading', isCorrect: false },
      {
        optionText: 'Draft it clearly, prioritizing accuracy and tone',
        isCorrect: true,
      },
      { optionText: 'Delay it until you have more time', isCorrect: false },
      { optionText: 'Copy a generic template without review', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A colleague repeatedly submits requests outside standard procedure. What should you do?',
    options: [
      { optionText: 'Ignore the pattern', isCorrect: false },
      { optionText: 'Process the requests anyway', isCorrect: false },
      {
        optionText: 'Politely remind them of proper procedure',
        isCorrect: true,
      },
      { optionText: 'Report them without first addressing it directly', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You discover a minor error in a report you already sent. What should you do?',
    options: [
      { optionText: 'Wait for someone to point it out', isCorrect: false },
      {
        optionText: 'Correct it and notify the recipient promptly',
        isCorrect: true,
      },
      { optionText: 'Hope no one notices', isCorrect: false },
      { optionText: 'Send a correction without explanation', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question: 'A meeting room is double-booked. What should you do?',
    options: [
      {
        optionText: 'Resolve professionally and notify both parties',
        isCorrect: true,
      },
      { optionText: 'Ignore the conflict', isCorrect: false },
      { optionText: 'Let the two groups figure it out themselves', isCorrect: false },
      { optionText: 'Cancel one meeting without notice', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You receive a request for confidential company information from an external party. What should you do?',
    options: [
      { optionText: 'Share the information immediately', isCorrect: false },
      { optionText: 'Refuse without checking who they are', isCorrect: false },
      { optionText: 'Ask a colleague to decide informally', isCorrect: false },
      {
        optionText: 'Verify authorization before sharing',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'An executive\'s schedule conflicts with a recurring stakeholder meeting. What should you do?',
    options: [
      { optionText: 'Ignore the conflict', isCorrect: false },
      { optionText: 'Let the executive find out at the meeting', isCorrect: false },
      {
        optionText: 'Communicate the conflict and propose alternatives',
        isCorrect: true,
      },
      { optionText: 'Cancel the stakeholder meeting without notice', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A colleague asks you to skip standard approval steps to save time. What should you do?',
    options: [
      {
        optionText: 'Politely decline and follow proper procedure',
        isCorrect: true,
      },
      { optionText: 'Ignore the request without addressing it', isCorrect: false },
      { optionText: 'Skip the steps to help them out', isCorrect: false },
      { optionText: 'Approve it informally', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You\'re asked to manage multiple urgent tasks at once. What should you do?',
    options: [
      {
        optionText: 'Prioritize based on deadlines and importance',
        isCorrect: true,
      },
      { optionText: 'Attempt all tasks simultaneously without prioritizing', isCorrect: false },
      { optionText: 'Delay all tasks until less busy', isCorrect: false },
      { optionText: 'Handle tasks strictly in the order they arrived regardless of urgency', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A document needs review from several departments before submission. What should you do?',
    options: [
      {
        optionText: 'Coordinate timely feedback methodically',
        isCorrect: true,
      },
      { optionText: 'Submit without waiting for all feedback', isCorrect: false },
      { optionText: 'Wait passively for departments to respond on their own', isCorrect: false },
      { optionText: 'Skip departments that are slow to respond', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'An executive is unhappy that a task was completed differently than expected. What should you do?',
    options: [
      { optionText: 'Ignore the feedback', isCorrect: false },
      {
        optionText: 'Listen, clarify expectations, and adjust',
        isCorrect: true,
      },
      { optionText: 'Defend your approach without listening', isCorrect: false },
      { optionText: 'Redo the task without understanding what went wrong', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You receive an unclear instruction from a senior executive. What should you do?',
    options: [
      { optionText: 'Guess what they meant', isCorrect: false },
      {
        optionText: 'Politely seek clarification before proceeding',
        isCorrect: true,
      },
      { optionText: 'Proceed with your own interpretation silently', isCorrect: false },
      { optionText: 'Ask a colleague instead of the executive', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A new employee asks you for help navigating administrative processes. What should you do?',
    options: [
      { optionText: 'Tell them to figure it out themselves', isCorrect: false },
      {
        optionText: 'Guide them patiently and clearly',
        isCorrect: true,
      },
      { optionText: 'Brush off their questions', isCorrect: false },
      { optionText: 'Give incomplete guidance', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You notice a scheduling conflict that hasn\'t been flagged yet. What should you do?',
    options: [
      { optionText: 'Ignore it since it\'s not your responsibility', isCorrect: false },
      { optionText: 'Wait until someone else notices', isCorrect: false },
      {
        optionText: 'Proactively raise it before it becomes a problem',
        isCorrect: true,
      },
      { optionText: 'Address it only if asked', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A vendor\'s invoice doesn\'t match the agreed contract terms. What should you do?',
    options: [
      { optionText: 'Process the payment as invoiced', isCorrect: false },
      { optionText: 'Adjust the contract without authorization', isCorrect: false },
      { optionText: 'Ignore the mismatch', isCorrect: false },
      {
        optionText: 'Flag the discrepancy before processing payment',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You\'re asked to organize a confidential meeting. What should you do?',
    options: [
      {
        optionText: 'Maintain discretion throughout the process',
        isCorrect: true,
      },
      { optionText: 'Discuss details with uninvolved colleagues', isCorrect: false },
      { optionText: 'Send details through unsecured channels', isCorrect: false },
      { optionText: 'Treat it like a routine meeting', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'An executive asks you to misrepresent the reason for a delayed report to stakeholders. What should you do?',
    options: [
      {
        optionText: 'Politely decline and suggest an honest explanation',
        isCorrect: true,
      },
      { optionText: 'Avoid the topic entirely', isCorrect: false },
      { optionText: 'Blame another department without basis', isCorrect: false },
      { optionText: 'Misrepresent it as instructed', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'You discover sensitive company information was accidentally shared externally. What should you do?',
    options: [
      { optionText: 'Delete evidence of the mistake', isCorrect: false },
      {
        optionText: 'Report the issue immediately through proper channels',
        isCorrect: true,
      },
      { optionText: 'Try to quietly fix it without telling anyone', isCorrect: false },
      { optionText: 'Wait to see if it causes a problem', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'Two senior executives give you conflicting instructions. What should you do?',
    options: [
      {
        optionText: 'Seek clarification and reconcile diplomatically',
        isCorrect: true,
      },
      { optionText: 'Ignore one executive\'s instructions', isCorrect: false },
      { optionText: 'Follow whichever instruction came first', isCorrect: false },
      { optionText: 'Decide based on personal preference', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A confidential document is requested by someone without clear authorization. What should you do?',
    options: [
      { optionText: 'Assume authorization is implied', isCorrect: false },
      {
        optionText: 'Verify authorization before releasing any information',
        isCorrect: true,
      },
      { optionText: 'Ask a junior colleague to decide', isCorrect: false },
      { optionText: 'Share it to avoid conflict', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'You\'re asked to approve an expense that seems outside policy. What should you do?',
    options: [
      { optionText: 'Reject it without explanation', isCorrect: false },
      { optionText: 'Ignore the policy', isCorrect: false },
      {
        optionText: 'Flag the concern before proceeding',
        isCorrect: true,
      },
      { optionText: 'Approve it to avoid confrontation', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'An important stakeholder meeting is jeopardized by a last-minute cancellation. What should you do?',
    options: [
      { optionText: 'Cancel without informing stakeholders', isCorrect: false },
      { optionText: 'Blame the person who cancelled', isCorrect: false },
      {
        optionText: 'Communicate promptly and propose solutions',
        isCorrect: true,
      },
      { optionText: 'Wait until the meeting time to address it', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A colleague asks you to backdate a document. What should you do?',
    options: [
      { optionText: 'Backdate it as a favor', isCorrect: false },
      {
        optionText: 'Decline and explain why this isn\'t appropriate',
        isCorrect: true,
      },
      { optionText: 'Ignore the request without addressing it', isCorrect: false },
      { optionText: 'Backdate it but tell no one', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'You\'re handling a legal or compliance-related document with strict deadlines. What should you do?',
    options: [
      { optionText: 'Delay it past the deadline if needed', isCorrect: false },
      { optionText: 'Rush it without checking accuracy', isCorrect: false },
      { optionText: 'Delegate it without review', isCorrect: false },
      {
        optionText: 'Ensure accuracy and meet the deadline carefully',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'An executive\'s personal and professional schedules conflict. What should you do?',
    options: [
      { optionText: 'Ignore the overlap', isCorrect: false },
      { optionText: 'Discuss the conflict with other staff', isCorrect: false },
      { optionText: 'Decide priorities yourself without asking', isCorrect: false },
      {
        optionText: 'Clarify priorities professionally and discreetly',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'You uncover a process inefficiency affecting multiple departments. What should you do?',
    options: [
      {
        optionText: 'Document it and propose improvements through proper channels',
        isCorrect: true,
      },
      { optionText: 'Fix it unilaterally without informing anyone', isCorrect: false },
      { optionText: 'Complain informally without proposing solutions', isCorrect: false },
      { optionText: 'Ignore it since it\'s not your department', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A high-pressure situation requires coordinating multiple departments quickly. What should you do?',
    options: [
      { optionText: 'Panic and delegate without direction', isCorrect: false },
      { optionText: 'Handle it alone without involving others', isCorrect: false },
      {
        optionText: 'Stay calm and coordinate clearly under pressure',
        isCorrect: true,
      },
      { optionText: 'Delay action until the pressure passes', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question: 'What best demonstrates strong executive support?',
    options: [
      { optionText: 'Waiting to be told exactly what to do', isCorrect: false },
      { optionText: 'Avoiding decisions to prevent mistakes', isCorrect: false },
      { optionText: 'Prioritizing speed over accuracy', isCorrect: false },
      {
        optionText: 'Anticipating needs while maintaining professionalism and discretion',
        isCorrect: true,
      },
    ],
  },

  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question: 'You receive a new stock delivery. What should you do?',
    options: [
      {
        optionText: 'Verify quantities against the purchase order before storing',
        isCorrect: true,
      },
      { optionText: 'Assume the quantities are correct', isCorrect: false },
      { optionText: 'Store it immediately without checking', isCorrect: false },
      { optionText: 'Skip verification if busy', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'A colleague asks where a specific item is located. What should you do?',
    options: [
      { optionText: 'Give an outdated location', isCorrect: false },
      { optionText: 'Tell them to search themselves', isCorrect: false },
      {
        optionText: 'Check the system and direct them accurately',
        isCorrect: true,
      },
      { optionText: 'Guess the location', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question: 'Good inventory management means:',
    options: [
      { optionText: 'Updating records only when convenient', isCorrect: false },
      {
        optionText: 'Maintaining accurate, organized, and up-to-date stock records',
        isCorrect: true,
      },
      { optionText: 'Relying on memory instead of records', isCorrect: false },
      { optionText: 'Storing items wherever there\'s space', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'A delivery driver thanks you for quick processing. What should you do?',
    options: [
      { optionText: 'Ask for a personal favor', isCorrect: false },
      {
        optionText: 'Thank them and confirm the next steps',
        isCorrect: true,
      },
      { optionText: 'End the interaction abruptly', isCorrect: false },
      { optionText: 'Ignore the thanks', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'You notice an item is mislabeled on the shelf. What should you do?',
    options: [
      { optionText: 'Ignore the error', isCorrect: false },
      { optionText: 'Leave it as is', isCorrect: false },
      {
        optionText: 'Correct the label and update records',
        isCorrect: true,
      },
      { optionText: 'Remove the label without replacing it', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question: 'You complete a stock count for the day. What should you do?',
    options: [
      {
        optionText: 'Record results accurately in the system',
        isCorrect: true,
      },
      { optionText: 'Skip recording if numbers match expectations', isCorrect: false },
      { optionText: 'Estimate the count instead of verifying', isCorrect: false },
      { optionText: 'Record it later from memory', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'A colleague greets you when starting their shift. What should you do?',
    options: [
      {
        optionText: 'Greet them and brief them on relevant updates',
        isCorrect: true,
      },
      { optionText: 'Respond curtly', isCorrect: false },
      { optionText: 'Ignore the greeting', isCorrect: false },
      { optionText: 'Skip the handover briefing', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A delivery arrives with fewer items than listed on the invoice. What should you do?',
    options: [
      {
        optionText: 'Document the discrepancy and report it',
        isCorrect: true,
      },
      { optionText: 'Adjust records to match the shipment quietly', isCorrect: false },
      { optionText: 'Accept the shipment without noting the shortage', isCorrect: false },
      { optionText: 'Ignore the discrepancy', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You find damaged goods during a stock check. What should you do?',
    options: [
      { optionText: 'Discard them without logging', isCorrect: false },
      { optionText: 'Ignore the damage', isCorrect: false },
      { optionText: 'Restock the damaged goods anyway', isCorrect: false },
      {
        optionText: 'Log the damage and follow disposal/return procedure',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A colleague asks you to skip verifying a delivery to save time. What should you do?',
    options: [
      { optionText: 'Skip verification to save time', isCorrect: false },
      {
        optionText: 'Politely decline and verify properly',
        isCorrect: true,
      },
      { optionText: 'Let the colleague verify it instead', isCorrect: false },
      { optionText: 'Verify only part of the delivery', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'Stock levels show a discrepancy from the system count. What should you do?',
    options: [
      { optionText: 'Assume it\'s a system error without checking', isCorrect: false },
      {
        optionText: 'Investigate the cause before adjusting records',
        isCorrect: true,
      },
      { optionText: 'Adjust the records immediately without investigating', isCorrect: false },
      { optionText: 'Ignore the discrepancy', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A driver is waiting for parts to be released urgently. What should you do?',
    options: [
      { optionText: 'Skip verification to save time', isCorrect: false },
      { optionText: 'Rush the process and risk errors', isCorrect: false },
      { optionText: 'Make them wait without explanation', isCorrect: false },
      {
        optionText: 'Process the request accurately without rushing carelessly',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You receive an order for an item that\'s out of stock. What should you do?',
    options: [
      { optionText: 'Tell them it\'s available anyway', isCorrect: false },
      { optionText: 'Cancel the order without explanation', isCorrect: false },
      {
        optionText: 'Communicate availability honestly and suggest alternatives',
        isCorrect: true,
      },
      { optionText: 'Ignore the order', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A vendor\'s shipment doesn\'t match the agreed specifications. What should you do?',
    options: [
      { optionText: 'Accept it and deal with issues later', isCorrect: false },
      {
        optionText: 'Flag the issue before accepting the shipment',
        isCorrect: true,
      },
      { optionText: 'Return it without documentation', isCorrect: false },
      { optionText: 'Ignore minor specification differences', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You\'re asked to prioritize one urgent request over a routine one. What should you do?',
    options: [
      { optionText: 'Delay both requests equally', isCorrect: false },
      {
        optionText: 'Assess urgency and reorder priorities appropriately',
        isCorrect: true,
      },
      { optionText: 'Ignore the urgent request', isCorrect: false },
      { optionText: 'Handle requests strictly in the order received', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question: 'A perishable item is expiring soon. What should you do?',
    options: [
      { optionText: 'Store it at the back of the shelf', isCorrect: false },
      { optionText: 'Discard it immediately without checking policy', isCorrect: false },
      {
        optionText: 'Flag it for prioritized use or disposal per FIFO',
        isCorrect: true,
      },
      { optionText: 'Ignore the expiration date', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A colleague made an error in the inventory log. What should you do?',
    options: [
      { optionText: 'Correct it without telling them', isCorrect: false },
      { optionText: 'Blame them publicly', isCorrect: false },
      { optionText: 'Leave the error uncorrected', isCorrect: false },
      {
        optionText: 'Correct it and inform them so it isn\'t repeated',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You notice unsafe stacking of stock in the warehouse. What should you do?',
    options: [
      {
        optionText: 'Correct it immediately to follow safety protocol',
        isCorrect: true,
      },
      { optionText: 'Ignore it if no one has complained', isCorrect: false },
      { optionText: 'Leave it for the next shift to handle', isCorrect: false },
      { optionText: 'Note it but take no action', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A new shipment requires reorganizing the storage layout. What should you do?',
    options: [
      { optionText: 'Delay reorganizing indefinitely', isCorrect: false },
      {
        optionText: 'Plan the reorganization methodically for efficiency',
        isCorrect: true,
      },
      { optionText: 'Reorganize randomly without a plan', isCorrect: false },
      { optionText: 'Reorganize without updating records', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'An internal team requests an urgent stock report. What should you do?',
    options: [
      { optionText: 'Delay the report until convenient', isCorrect: false },
      {
        optionText: 'Provide accurate data promptly',
        isCorrect: true,
      },
      { optionText: 'Ignore the request', isCorrect: false },
      { optionText: 'Provide an estimate without verifying', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You\'re asked to estimate stock needs for the coming month. What should you do?',
    options: [
      { optionText: 'Avoid estimating and order reactively', isCorrect: false },
      {
        optionText: 'Base estimates on historical data and trends',
        isCorrect: true,
      },
      { optionText: 'Guess based on intuition alone', isCorrect: false },
      { optionText: 'Use last year\'s numbers without adjustment', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A returned item needs to be reintegrated into inventory. What should you do?',
    options: [
      {
        optionText: 'Inspect it before restocking',
        isCorrect: true,
      },
      { optionText: 'Discard it automatically', isCorrect: false },
      { optionText: 'Restock it immediately without inspection', isCorrect: false },
      { optionText: 'Store it separately indefinitely without action', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You discover an item is stored in the wrong category. What should you do?',
    options: [
      { optionText: 'Leave it where it is', isCorrect: false },
      { optionText: 'Ignore the miscategorization', isCorrect: false },
      {
        optionText: 'Relocate it and correct the records',
        isCorrect: true,
      },
      { optionText: 'Update only the physical location, not the records', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'You suspect inventory theft based on recurring discrepancies. What should you do?',
    options: [
      { optionText: 'Adjust records quietly to hide the discrepancy', isCorrect: false },
      {
        optionText: 'Report your concerns through proper channels for investigation',
        isCorrect: true,
      },
      { optionText: 'Ignore the pattern', isCorrect: false },
      { optionText: 'Confront the suspected individual directly yourself', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A supplier consistently delivers less than what\'s invoiced. What should you do?',
    options: [
      { optionText: 'Accept it as normal', isCorrect: false },
      {
        optionText: 'Document the pattern and escalate formally',
        isCorrect: true,
      },
      { optionText: 'Stop working with the supplier without reporting it', isCorrect: false },
      { optionText: 'Address it informally without documentation', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A critical part is missing right before scheduled vehicle maintenance. What should you do?',
    options: [
      { optionText: 'Delay maintenance without informing anyone', isCorrect: false },
      { optionText: 'Substitute an incompatible part', isCorrect: false },
      { optionText: 'Ignore the shortage until it\'s noticed', isCorrect: false },
      {
        optionText: 'Communicate the shortage immediately and expedite sourcing',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'You\'re pressured to approve a shipment that doesn\'t meet quality standards. What should you do?',
    options: [
      {
        optionText: 'Decline and document the quality concern',
        isCorrect: true,
      },
      { optionText: 'Ignore the quality issue', isCorrect: false },
      { optionText: 'Approve it to avoid conflict', isCorrect: false },
      { optionText: 'Approve it but tell no one', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A major discrepancy is found just before an audit. What should you do?',
    options: [
      {
        optionText: 'Investigate and document it transparently before the audit',
        isCorrect: true,
      },
      { optionText: 'Ignore it and hope it\'s not noticed', isCorrect: false },
      { optionText: 'Hide the discrepancy until after the audit', isCorrect: false },
      { optionText: 'Adjust the numbers to match expectations', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'Two departments claim ownership of the same limited stock. What should you do?',
    options: [
      { optionText: 'Split it without assessing need', isCorrect: false },
      { optionText: 'Give it to whichever department asked first', isCorrect: false },
      {
        optionText: 'Resolve based on priority and documented need',
        isCorrect: true,
      },
      { optionText: 'Ignore both requests', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A colleague asks you to falsify inventory numbers to cover a shortage. What should you do?',
    options: [
      {
        optionText: 'Refuse and report the situation honestly',
        isCorrect: true,
      },
      { optionText: 'Falsify only part of the numbers', isCorrect: false },
      { optionText: 'Ignore the request without reporting it', isCorrect: false },
      { optionText: 'Falsify the numbers as asked', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A safety hazard is discovered in the storage area during a busy period. What should you do?',
    options: [
      { optionText: 'Note it but continue operations as normal', isCorrect: false },
      { optionText: 'Ignore it since it\'s a busy period', isCorrect: false },
      {
        optionText: 'Address the hazard immediately, even if it delays operations',
        isCorrect: true,
      },
      { optionText: 'Postpone fixing it until things slow down', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'You receive conflicting stock counts from two different systems. What should you do?',
    options: [
      { optionText: 'Average the two numbers without investigation', isCorrect: false },
      { optionText: 'Ignore the discrepancy', isCorrect: false },
      {
        optionText: 'Reconcile the discrepancy through careful verification',
        isCorrect: true,
      },
      { optionText: 'Pick whichever number seems more convenient', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'An urgent operational need conflicts with standard inventory procedure. What should you do?',
    options: [
      { optionText: 'Ignore the urgent need to follow procedure rigidly', isCorrect: false },
      { optionText: 'Skip documentation to save time', isCorrect: false },
      {
        optionText: 'Balance urgency with accuracy and proper documentation',
        isCorrect: true,
      },
      { optionText: 'Act without any verification', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A vendor offers a personal incentive to overlook a quality issue. What should you do?',
    options: [
      { optionText: 'Overlook the issue this one time', isCorrect: false },
      {
        optionText: 'Refuse and report the quality issue',
        isCorrect: true,
      },
      { optionText: 'Accept the incentive quietly', isCorrect: false },
      { optionText: 'Ignore the offer without reporting it', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question: 'What best demonstrates effective inventory management?',
    options: [
      {
        optionText: 'Maintaining accuracy, safety, and accountability at all times',
        isCorrect: true,
      },
      { optionText: 'Avoiding documentation to save time', isCorrect: false },
      { optionText: 'Prioritizing speed over accuracy', isCorrect: false },
      { optionText: 'Relying on memory instead of records', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'A driver calls in to report they\'re running late. What should you do?',
    options: [
      { optionText: 'Dismiss the delay as unimportant', isCorrect: false },
      { optionText: 'Ignore the call', isCorrect: false },
      {
        optionText: 'Acknowledge it and update the relevant systems/parties',
        isCorrect: true,
      },
      { optionText: 'Wait for the customer to complain first', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'A colleague asks for the current status of trip dispatching. What should you do?',
    options: [
      { optionText: 'Ignore the question', isCorrect: false },
      { optionText: 'Give an outdated status', isCorrect: false },
      {
        optionText: 'Provide an accurate, up-to-date status',
        isCorrect: true,
      },
      { optionText: 'Guess the status', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question: 'Good operations management means:',
    options: [
      { optionText: 'Avoiding coordination with other teams', isCorrect: false },
      { optionText: 'Prioritizing speed over safety', isCorrect: false },
      { optionText: 'Reacting only after problems occur', isCorrect: false },
      {
        optionText: 'Coordinating resources efficiently to keep services running smoothly',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'A driver thanks you for resolving a dispatch issue. What should you do?',
    options: [
      {
        optionText: 'Thank them and confirm everything is in order',
        isCorrect: true,
      },
      { optionText: 'Dismiss their gratitude', isCorrect: false },
      { optionText: 'Ignore the thanks', isCorrect: false },
      { optionText: 'End the interaction without confirmation', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'You receive a routine status update from the field team. What should you do?',
    options: [
      { optionText: 'Ignore routine updates', isCorrect: false },
      { optionText: 'Delay logging until later', isCorrect: false },
      {
        optionText: 'Log it and update relevant records',
        isCorrect: true,
      },
      { optionText: 'Discard it as unimportant', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'A colleague greets you at the start of a shift handover. What should you do?',
    options: [
      { optionText: 'Respond curtly', isCorrect: false },
      { optionText: 'Leave without briefing them', isCorrect: false },
      {
        optionText: 'Greet them and brief them on ongoing issues',
        isCorrect: true,
      },
      { optionText: 'Skip the handover briefing', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'You notice a minor scheduling gap for the next shift. What should you do?',
    options: [
      { optionText: 'Leave it for the next shift to discover', isCorrect: false },
      {
        optionText: 'Flag it and arrange coverage',
        isCorrect: true,
      },
      { optionText: 'Assume someone else will notice', isCorrect: false },
      { optionText: 'Ignore the gap', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A driver reports a vehicle breakdown mid-trip. What should you do?',
    options: [
      { optionText: 'Tell the driver to handle it alone', isCorrect: false },
      { optionText: 'Delay the response', isCorrect: false },
      { optionText: 'Ignore the report until the customer complains', isCorrect: false },
      {
        optionText: 'Coordinate immediate support and communicate with affected parties',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'Multiple trips are delayed due to traffic in one area. What should you do?',
    options: [
      {
        optionText: 'Communicate proactively with affected customers and drivers',
        isCorrect: true,
      },
      { optionText: 'Ignore the delays', isCorrect: false },
      { optionText: 'Wait for complaints before communicating', isCorrect: false },
      { optionText: 'Blame the traffic without informing anyone', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A new driver needs guidance on the dispatch process. What should you do?',
    options: [
      {
        optionText: 'Explain it clearly and patiently',
        isCorrect: true,
      },
      { optionText: 'Give a rushed, incomplete explanation', isCorrect: false },
      { optionText: 'Ignore their questions', isCorrect: false },
      { optionText: 'Tell them to figure it out themselves', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You notice an unusual spike in cancelled trips in one region. What should you do?',
    options: [
      { optionText: 'Assume it\'s a data error without checking', isCorrect: false },
      { optionText: 'Escalate immediately without investigating', isCorrect: false },
      { optionText: 'Ignore the spike', isCorrect: false },
      {
        optionText: 'Investigate the cause before escalating',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A driver requests a route change due to road closures. What should you do?',
    options: [
      { optionText: 'Approve any route without verification', isCorrect: false },
      { optionText: 'Ignore the request', isCorrect: false },
      {
        optionText: 'Verify and approve appropriate alternative routes',
        isCorrect: true,
      },
      { optionText: 'Deny the request without checking', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'Operations data shows a service area is understaffed during peak hours. What should you do?',
    options: [
      { optionText: 'Leave it to resolve itself', isCorrect: false },
      { optionText: 'Ignore the staffing gap', isCorrect: false },
      {
        optionText: 'Reallocate resources to address the gap',
        isCorrect: true,
      },
      { optionText: 'Wait until off-peak hours to address it', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A customer support agent escalates a complex driver-related issue to operations. What should you do?',
    options: [
      {
        optionText: 'Review the details and respond promptly',
        isCorrect: true,
      },
      { optionText: 'Delay the response indefinitely', isCorrect: false },
      { optionText: 'Send it back without reviewing', isCorrect: false },
      { optionText: 'Dismiss the escalation', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A driver\'s documentation is about to expire. What should you do?',
    options: [
      { optionText: 'Wait until it expires to act', isCorrect: false },
      {
        optionText: 'Notify them and the compliance team in advance',
        isCorrect: true,
      },
      { optionText: 'Notify only the driver without compliance', isCorrect: false },
      { optionText: 'Ignore the expiration', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You\'re asked to adjust scheduling to cover an unexpected demand surge. What should you do?',
    options: [
      { optionText: 'Ignore the surge', isCorrect: false },
      {
        optionText: 'Reallocate resources based on real-time demand',
        isCorrect: true,
      },
      { optionText: 'Reallocate without checking actual demand', isCorrect: false },
      { optionText: 'Stick to the original schedule regardless', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A scheduled maintenance conflicts with high-demand hours. What should you do?',
    options: [
      { optionText: 'Ignore the conflict', isCorrect: false },
      {
        optionText: 'Reschedule maintenance to minimize service disruption',
        isCorrect: true,
      },
      { optionText: 'Proceed with maintenance during peak hours regardless', isCorrect: false },
      { optionText: 'Cancel maintenance indefinitely', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A regional team reports inconsistent data between systems. What should you do?',
    options: [
      { optionText: 'Ignore the inconsistency', isCorrect: false },
      { optionText: 'Pick whichever data set is convenient', isCorrect: false },
      { optionText: 'Report it without investigation', isCorrect: false },
      {
        optionText: 'Investigate and reconcile the discrepancy',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A driver disputes an automated penalty for a missed trip. What should you do?',
    options: [
      { optionText: 'Dismiss the dispute', isCorrect: false },
      { optionText: 'Uphold the penalty automatically without review', isCorrect: false },
      {
        optionText: 'Review the case fairly before responding',
        isCorrect: true,
      },
      { optionText: 'Remove the penalty without checking', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You receive conflicting priorities from two different teams. What should you do?',
    options: [
      { optionText: 'Ignore one team\'s priority', isCorrect: false },
      { optionText: 'Delay action until forced to decide', isCorrect: false },
      { optionText: 'Choose a priority arbitrarily', isCorrect: false },
      {
        optionText: 'Clarify priorities through proper coordination',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'Weather conditions are expected to disrupt operations. What should you do?',
    options: [
      { optionText: 'Communicate updates only after problems arise', isCorrect: false },
      {
        optionText: 'Plan contingencies proactively and communicate updates',
        isCorrect: true,
      },
      { optionText: 'Ignore the forecast', isCorrect: false },
      { optionText: 'Wait until disruption occurs to act', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A new policy needs to be rolled out to field teams quickly. What should you do?',
    options: [
      { optionText: 'Assume teams will figure it out themselves', isCorrect: false },
      { optionText: 'Delay communication until convenient', isCorrect: false },
      {
        optionText: 'Communicate it clearly and ensure understanding',
        isCorrect: true,
      },
      { optionText: 'Roll it out without explanation', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You\'re asked to evaluate driver performance data for a region. What should you do?',
    options: [
      { optionText: 'Use outdated data for the evaluation', isCorrect: false },
      {
        optionText: 'Analyze the data objectively and accurately',
        isCorrect: true,
      },
      { optionText: 'Make assumptions without reviewing the data', isCorrect: false },
      { optionText: 'Skim the data quickly without analysis', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A major service disruption occurs during peak hours across multiple zones. What should you do?',
    options: [
      { optionText: 'Delay response until off-peak hours', isCorrect: false },
      { optionText: 'Wait for instructions before acting', isCorrect: false },
      { optionText: 'Address each zone independently without coordination', isCorrect: false },
      {
        optionText: 'Coordinate a swift, organized response across teams',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A safety incident is reported involving a driver and passenger. What should you do?',
    options: [
      {
        optionText: 'Treat it with urgency and escalate per safety protocol',
        isCorrect: true,
      },
      { optionText: 'Treat it as a routine matter', isCorrect: false },
      { optionText: 'Let the driver and passenger resolve it themselves', isCorrect: false },
      { optionText: 'Delay escalation until later', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'You discover a systemic issue causing repeated dispatch errors. What should you do?',
    options: [
      { optionText: 'Address each error individually without investigating the cause', isCorrect: false },
      { optionText: 'Assume it will resolve itself', isCorrect: false },
      { optionText: 'Ignore the pattern', isCorrect: false },
      {
        optionText: 'Investigate the root cause and propose a fix',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A regional manager pressures you to ignore a safety concern to meet targets. What should you do?',
    options: [
      {
        optionText: 'Refuse and prioritize safety over targets',
        isCorrect: true,
      },
      { optionText: 'Comply to meet the targets', isCorrect: false },
      { optionText: 'Ignore the concern quietly', isCorrect: false },
      { optionText: 'Delay addressing the concern until after targets are met', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'Conflicting reports come in about the cause of a major delay. What should you do?',
    options: [
      { optionText: 'Assume the most convenient explanation', isCorrect: false },
      {
        optionText: 'Investigate objectively before drawing conclusions',
        isCorrect: true,
      },
      { optionText: 'Dismiss all reports', isCorrect: false },
      { optionText: 'Believe the first report received', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A critical system outage affects dispatch operations nationwide. What should you do?',
    options: [
      {
        optionText: 'Coordinate an immediate response and clear communication',
        isCorrect: true,
      },
      { optionText: 'Wait for the system to recover on its own', isCorrect: false },
      { optionText: 'Address it region by region without coordination', isCorrect: false },
      { optionText: 'Delay communication until the issue is resolved', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'You must decide how to allocate limited drivers during an emergency. What should you do?',
    options: [
      { optionText: 'Delay allocation until more information arrives', isCorrect: false },
      { optionText: 'Allocate based on convenience', isCorrect: false },
      {
        optionText: 'Allocate based on greatest need and safety priority',
        isCorrect: true,
      },
      { optionText: 'Allocate evenly regardless of need', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A driver is suspected of falsifying trip data. What should you do?',
    options: [
      { optionText: 'Confront the driver directly yourself', isCorrect: false },
      { optionText: 'Ignore the suspicion', isCorrect: false },
      { optionText: 'Adjust records quietly without reporting', isCorrect: false },
      {
        optionText: 'Report the concern through proper investigative channels',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'An urgent operational decision must be made without complete information. What should you do?',
    options: [
      { optionText: 'Guess randomly without considering available data', isCorrect: false },
      { optionText: 'Wait indefinitely for complete information', isCorrect: false },
      { optionText: 'Avoid making any decision', isCorrect: false },
      {
        optionText: 'Make the best judgment call with available data, then verify',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'Two regions compete for the same limited resources during a crisis. What should you do?',
    options: [
      { optionText: 'Split resources evenly regardless of need', isCorrect: false },
      { optionText: 'Give resources to whichever region asks loudest', isCorrect: false },
      {
        optionText: 'Resolve based on documented priority and need',
        isCorrect: true,
      },
      { optionText: 'Ignore both requests', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A high-profile complaint requires coordination across several departments under time pressure. What should you do?',
    options: [
      {
        optionText: 'Coordinate calmly and efficiently across departments',
        isCorrect: true,
      },
      { optionText: 'Panic and skip proper channels', isCorrect: false },
      { optionText: 'Delay coordination until pressure eases', isCorrect: false },
      { optionText: 'Handle it alone without involving other departments', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question: 'What best demonstrates strong operations leadership?',
    options: [
      { optionText: 'Avoiding difficult decisions', isCorrect: false },
      { optionText: 'Prioritizing speed over safety', isCorrect: false },
      {
        optionText: 'Balancing efficiency, safety, and clear communication under pressure',
        isCorrect: true,
      },
      { optionText: 'Acting without communicating to the team', isCorrect: false },
    ],
  },
];