// import { QuestionCategory, QuestionDifficulty, JobRole } from '@prisma/client';
// export const EMOTIONAL_INTELLIGENCE_QUESTIONS = [
//   {
//     category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
//     jobRole: JobRole.DRIVER,
//     difficulty: QuestionDifficulty.EASY,
//     weight: 3,
//     question:
//       'A passenger accuses you of taking a longer route. What should you do?',
//     options: [
//       {
//         optionText:
//           'Remain calm, explain the route and offer support assistance',
//         isCorrect: true,
//       },
//       { optionText: 'Argue immediately', isCorrect: false },
//       { optionText: 'Ignore the passenger', isCorrect: false },
//       { optionText: 'End the trip', isCorrect: false },
//     ],
//   },

//   {
//     category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
//     jobRole: JobRole.DRIVER,
//     difficulty: QuestionDifficulty.EASY,
//     weight: 3,
//     question: 'A passenger speaks rudely to you. What is the best response?',
//     options: [
//       { optionText: 'Remain professional and respectful', isCorrect: true },
//       { optionText: 'Respond rudely', isCorrect: false },
//       { optionText: 'Insult the passenger', isCorrect: false },
//       { optionText: 'Stop the trip immediately', isCorrect: false },
//     ],
//   },

//   {
//     category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
//     jobRole: JobRole.DRIVER,
//     difficulty: QuestionDifficulty.EASY,
//     weight: 3,
//     question:
//       'You are having a difficult personal day before work. What should you do?',
//     options: [
//       {
//         optionText: 'Remain professional while serving customers',
//         isCorrect: true,
//       },
//       { optionText: 'Take frustrations out on passengers', isCorrect: false },
//       { optionText: 'Ignore customer requests', isCorrect: false },
//       { optionText: 'Complain to every passenger', isCorrect: false },
//     ],
//   },

//   {
//     category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
//     jobRole: JobRole.DRIVER,
//     difficulty: QuestionDifficulty.EASY,
//     weight: 3,
//     question: 'A customer is visibly upset. What should you do first?',
//     options: [
//       {
//         optionText: 'Listen calmly and understand the concern',
//         isCorrect: true,
//       },
//       { optionText: 'Tell them to relax', isCorrect: false },
//       { optionText: 'Ignore them', isCorrect: false },
//       { optionText: 'Defend yourself immediately', isCorrect: false },
//     ],
//   },

//   {
//     category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
//     jobRole: JobRole.DRIVER,
//     difficulty: QuestionDifficulty.MEDIUM,
//     weight: 5,
//     question:
//       'A passenger continuously criticizes your driving despite following all traffic laws. What is the best approach?',
//     options: [
//       {
//         optionText: 'Remain calm and continue professionally',
//         isCorrect: true,
//       },
//       { optionText: 'Criticize the passenger back', isCorrect: false },
//       { optionText: 'End the trip immediately', isCorrect: false },
//       { optionText: 'Ignore traffic rules to satisfy them', isCorrect: false },
//     ],
//   },

//   {
//     category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
//     jobRole: JobRole.DRIVER,
//     difficulty: QuestionDifficulty.MEDIUM,
//     weight: 5,
//     question:
//       'A customer blames you for an app issue outside your control. What should you do?',
//     options: [
//       {
//         optionText: 'Empathize and direct them to the proper support channel',
//         isCorrect: true,
//       },
//       { optionText: 'Argue with them', isCorrect: false },
//       {
//         optionText: "Accept responsibility for something you didn't do",
//         isCorrect: false,
//       },
//       { optionText: 'Ignore the complaint', isCorrect: false },
//     ],
//   },

//   {
//     category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
//     jobRole: JobRole.DRIVER,
//     difficulty: QuestionDifficulty.MEDIUM,
//     weight: 5,
//     question:
//       'A coworker unfairly blames you for a mistake. What should you do?',
//     options: [
//       {
//         optionText: 'Present facts calmly and professionally',
//         isCorrect: true,
//       },
//       { optionText: 'Shout at them', isCorrect: false },
//       { optionText: 'Seek revenge', isCorrect: false },
//       { optionText: 'Spread rumors about them', isCorrect: false },
//     ],
//   },

//   {
//     category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
//     jobRole: JobRole.DRIVER,
//     difficulty: QuestionDifficulty.MEDIUM,
//     weight: 5,
//     question:
//       'A passenger becomes frustrated because of traffic delays. What should you do?',
//     options: [
//       {
//         optionText: 'Acknowledge their frustration and remain calm',
//         isCorrect: true,
//       },
//       { optionText: 'Tell them traffic is not your problem', isCorrect: false },
//       { optionText: 'Argue about who is right', isCorrect: false },
//       { optionText: 'Ignore them completely', isCorrect: false },
//     ],
//   },

//   {
//     category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
//     jobRole: JobRole.DRIVER,
//     difficulty: QuestionDifficulty.MEDIUM,
//     weight: 5,
//     question: 'What is emotional self-control?',
//     options: [
//       {
//         optionText: 'Managing emotions appropriately under pressure',
//         isCorrect: true,
//       },
//       { optionText: 'Never feeling emotions', isCorrect: false },
//       { optionText: 'Avoiding people', isCorrect: false },
//       { optionText: 'Suppressing every feeling', isCorrect: false },
//     ],
//   },

//   {
//     category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
//     jobRole: JobRole.DRIVER,
//     difficulty: QuestionDifficulty.MEDIUM,
//     weight: 5,
//     question:
//       'A customer repeatedly interrupts you while speaking. What should you do?',
//     options: [
//       { optionText: 'Stay patient and continue respectfully', isCorrect: true },
//       { optionText: 'Interrupt them back', isCorrect: false },
//       { optionText: 'Ignore them', isCorrect: false },
//       { optionText: 'Become hostile', isCorrect: false },
//     ],
//   },

//   {
//     category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
//     jobRole: JobRole.DRIVER,
//     difficulty: QuestionDifficulty.HARD,
//     weight: 8,
//     question:
//       'A passenger falsely claims you behaved unprofessionally. What is the best response?',
//     options: [
//       {
//         optionText: 'Remain calm and follow company reporting procedures',
//         isCorrect: true,
//       },
//       { optionText: 'Confront them aggressively', isCorrect: false },
//       { optionText: 'Threaten legal action', isCorrect: false },
//       { optionText: 'Argue on social media', isCorrect: false },
//     ],
//   },

//   {
//     category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
//     jobRole: JobRole.DRIVER,
//     difficulty: QuestionDifficulty.HARD,
//     weight: 8,
//     question:
//       'You feel frustrated after several difficult customers in one day. What should you do?',
//     options: [
//       {
//         optionText: 'Reset emotionally and treat each customer independently',
//         isCorrect: true,
//       },
//       {
//         optionText: 'Become less patient with future customers',
//         isCorrect: false,
//       },
//       { optionText: 'Refuse to communicate', isCorrect: false },
//       { optionText: 'Take frustrations out on passengers', isCorrect: false },
//     ],
//   },

//   {
//     category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
//     jobRole: JobRole.DRIVER,
//     difficulty: QuestionDifficulty.HARD,
//     weight: 8,
//     question:
//       'A passenger makes a personal remark that offends you. What is the most professional response?',
//     options: [
//       {
//         optionText: 'Remain composed and avoid escalating the situation',
//         isCorrect: true,
//       },
//       { optionText: 'Respond with an insult', isCorrect: false },
//       { optionText: 'Stop the vehicle and argue', isCorrect: false },
//       { optionText: 'Threaten the passenger', isCorrect: false },
//     ],
//   },

//   {
//     category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
//     jobRole: JobRole.DRIVER,
//     difficulty: QuestionDifficulty.HARD,
//     weight: 8,
//     question: 'Which action best demonstrates emotional maturity?',
//     options: [
//       {
//         optionText: 'Responding thoughtfully instead of reacting impulsively',
//         isCorrect: true,
//       },
//       { optionText: 'Always proving you are right', isCorrect: false },
//       { optionText: 'Avoiding accountability', isCorrect: false },
//       { optionText: 'Winning every argument', isCorrect: false },
//     ],
//   },

//   {
//     category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
//     jobRole: JobRole.DRIVER,
//     difficulty: QuestionDifficulty.HARD,
//     weight: 8,
//     question:
//       'A customer becomes angry over a misunderstanding. What should be your priority?',
//     options: [
//       {
//         optionText: 'De-escalate the situation safely and professionally',
//         isCorrect: true,
//       },
//       { optionText: 'Prove the customer wrong', isCorrect: false },
//       { optionText: 'Match their energy', isCorrect: false },
//       { optionText: 'Ignore them', isCorrect: false },
//     ],
//   },

//   {
//     category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
//     jobRole: JobRole.DRIVER,
//     difficulty: QuestionDifficulty.MEDIUM,
//     weight: 5,
//     question: 'Empathy means:',
//     options: [
//       {
//         optionText: "Understanding another person's feelings and perspective",
//         isCorrect: true,
//       },
//       { optionText: 'Agreeing with everyone', isCorrect: false },
//       { optionText: 'Avoiding difficult conversations', isCorrect: false },
//       { optionText: 'Being emotional all the time', isCorrect: false },
//     ],
//   },

//   {
//     category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
//     jobRole: JobRole.DRIVER,
//     difficulty: QuestionDifficulty.MEDIUM,
//     weight: 5,
//     question: 'Why is active listening important?',
//     options: [
//       { optionText: 'It helps people feel understood', isCorrect: true },
//       { optionText: 'It shortens conversations', isCorrect: false },
//       { optionText: 'It prevents feedback', isCorrect: false },
//       { optionText: 'It avoids responsibility', isCorrect: false },
//     ],
//   },

//   {
//     category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
//     jobRole: JobRole.DRIVER,
//     difficulty: QuestionDifficulty.HARD,
//     weight: 8,
//     question:
//       'You strongly disagree with a company decision. What is the most professional response?',
//     options: [
//       {
//         optionText: 'Express concerns respectfully through proper channels',
//         isCorrect: true,
//       },
//       { optionText: 'Complain publicly', isCorrect: false },
//       { optionText: 'Ignore all future instructions', isCorrect: false },
//       { optionText: 'Encourage others to break policy', isCorrect: false },
//     ],
//   },

//   {
//     category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
//     jobRole: JobRole.DRIVER,
//     difficulty: QuestionDifficulty.MEDIUM,
//     weight: 5,
//     question: 'A passenger is nervous during a trip. What should you do?',
//     options: [
//       {
//         optionText: 'Provide reassurance while remaining professional',
//         isCorrect: true,
//       },
//       { optionText: 'Ignore them', isCorrect: false },
//       { optionText: 'Tell them to calm down', isCorrect: false },
//       { optionText: 'Mock their concerns', isCorrect: false },
//     ],
//   },

//   {
//     category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
//     jobRole: JobRole.DRIVER,
//     difficulty: QuestionDifficulty.HARD,
//     weight: 8,
//     question: 'Which behavior is most likely to build trust with passengers?',
//     options: [
//       { optionText: 'Remaining calm, honest and consistent', isCorrect: true },
//       { optionText: 'Making promises you cannot keep', isCorrect: false },
//       { optionText: 'Arguing frequently', isCorrect: false },
//       { optionText: 'Avoiding communication', isCorrect: false },
//     ],
//   },
// ];


import {
  QuestionCategory,
  QuestionDifficulty,
  JobRole,
} from "@prisma/client";

export const EMOTIONAL_INTELLIGENCE_QUESTIONS = [
  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      "A passenger complains that the vehicle is too cold because of the air conditioner. What should you do?",
    options: [
      { optionText: "Tell them to endure it until the trip ends", isCorrect: false },
      { optionText: "Adjust the temperature if it is safe and reasonable", isCorrect: true },
      { optionText: "Ignore the complaint", isCorrect: false },
      { optionText: "Tell them to open the window instead", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      "A passenger is clearly anxious because they may miss an appointment. What is your best response?",
    options: [
      { optionText: "Explain traffic conditions calmly and drive safely", isCorrect: true },
      { optionText: "Speed beyond legal limits", isCorrect: false },
      { optionText: "Tell them their problem is not yours", isCorrect: false },
      { optionText: "Ignore their concerns completely", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      "A passenger accidentally spills a drink inside your vehicle. How should you react?",
    options: [
      { optionText: "Become angry immediately", isCorrect: false },
      { optionText: "End the trip instantly", isCorrect: false },
      { optionText: "Remain calm and politely address the situation", isCorrect: true },
      { optionText: "Refuse to speak to the passenger", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      "What does empathy help a professional driver achieve?",
    options: [
      { optionText: "Ignore customer emotions", isCorrect: false },
      { optionText: "Better understand passengers' concerns", isCorrect: true },
      { optionText: "Win every disagreement", isCorrect: false },
      { optionText: "Avoid communication", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A passenger begins shouting because another driver caused traffic. What should you do?",
    options: [
      { optionText: "Shout back so they understand", isCorrect: false },
      { optionText: "Stay calm, acknowledge their frustration and continue safely", isCorrect: true },
      { optionText: "Stop listening completely", isCorrect: false },
      { optionText: "Cancel the trip immediately", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "You receive unfair criticism from a passenger after completing a safe trip. What should you do?",
    options: [
      { optionText: "Remain respectful and report the incident through company procedures", isCorrect: true },
      { optionText: "Insult the passenger before leaving", isCorrect: false },
      { optionText: "Threaten the passenger", isCorrect: false },
      { optionText: "Post about them on social media", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "Why is emotional self-awareness important for a driver?",
    options: [
      { optionText: "It helps recognize emotions before they affect decisions", isCorrect: true },
      { optionText: "It eliminates all stress permanently", isCorrect: false },
      { optionText: "It allows drivers to ignore passengers", isCorrect: false },
      { optionText: "It makes traffic disappear", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A passenger repeatedly interrupts while you're explaining something. What should you do?",
    options: [
      { optionText: "Interrupt them back", isCorrect: false },
      { optionText: "Continue respectfully and allow them to express themselves", isCorrect: true },
      { optionText: "Refuse to answer any more questions", isCorrect: false },
      { optionText: "Become visibly annoyed", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      "A passenger falsely accuses you of rude behavior after the trip. What demonstrates emotional intelligence?",
    options: [
      { optionText: "Calmly provide facts through the official complaint process", isCorrect: true },
      { optionText: "Confront the passenger publicly", isCorrect: false },
      { optionText: "Threaten legal action immediately", isCorrect: false },
      { optionText: "Argue on social media", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      "After several stressful trips, your patience is running low. What is the best decision?",
    options: [
      { optionText: "Continue working angrily", isCorrect: false },
      { optionText: "Treat the next passenger with less respect", isCorrect: false },
      { optionText: "Take a short break if possible and reset before continuing", isCorrect: true },
      { optionText: "Avoid speaking to passengers", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      "A passenger insults your driving skills despite following all regulations. What should be your priority?",
    options: [
      { optionText: "Prove them wrong by arguing", isCorrect: false },
      { optionText: "Remain professional and keep everyone safe", isCorrect: true },
      { optionText: "Drive aggressively to demonstrate confidence", isCorrect: false },
      { optionText: "Ask the passenger to leave immediately", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      "Which behavior best reflects emotional maturity in professional driving?",
    options: [
      { optionText: "Always winning arguments", isCorrect: false },
      { optionText: "Ignoring customer concerns", isCorrect: false },
      { optionText: "Responding calmly under pressure", isCorrect: true },
      { optionText: "Reacting emotionally to criticism", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "While driving, a passenger begins shouting because of traffic. What should you do?",
    options: [
      { optionText: "Remain calm and explain the traffic situation politely.", isCorrect: true },
      { optionText: "Argue with the passenger.", isCorrect: false },
      { optionText: "Ignore the passenger completely.", isCorrect: false },
      { optionText: "Stop the trip immediately.", isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A passenger apologizes for being rude after calming down. How should you respond?",
    options: [
      { optionText: "Tell them they embarrassed themselves.", isCorrect: false },
      { optionText: "Ignore them for the rest of the journey.", isCorrect: false },
      { optionText: "Accept the apology professionally and continue the trip.", isCorrect: true },
      { optionText: "Cancel the trip anyway.", isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A passenger appears anxious during heavy rain. What is the best response?",
    options: [
      { optionText: "Tell them to stop worrying.", isCorrect: false },
      { optionText: "Drive carefully and reassure the passenger.", isCorrect: true },
      { optionText: "Increase your speed to finish quickly.", isCorrect: false },
      { optionText: "Ignore their concerns.", isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "You accidentally miss a turn because of poor road signs. What should you do?",
    options: [
      { optionText: "Apologize, explain briefly, and continue safely.", isCorrect: true },
      { optionText: "Blame the passenger.", isCorrect: false },
      { optionText: "Pretend nothing happened.", isCorrect: false },
      { optionText: "Drive recklessly to recover lost time.", isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A passenger keeps giving driving instructions that conflict with GPS. What should you do?",
    options: [
      { optionText: "Ignore them completely.", isCorrect: false },
      { optionText: "Argue until they agree.", isCorrect: false },
      { optionText: "Respectfully discuss the safest route together.", isCorrect: true },
      { optionText: "End the trip.", isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "You notice you're becoming frustrated after multiple difficult trips. What should you do?",
    options: [
      { optionText: "Continue driving while angry.", isCorrect: false },
      { optionText: "Take a short break before accepting another ride.", isCorrect: true },
      { optionText: "Take your frustration out on passengers.", isCorrect: false },
      { optionText: "Ignore your emotions completely.", isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "Another driver cuts you off aggressively with passengers onboard. What should you do?",
    options: [
      { optionText: "Chase the other driver.", isCorrect: false },
      { optionText: "Shout and honk continuously.", isCorrect: false },
      { optionText: "Stay calm and focus on driving safely.", isCorrect: true },
      { optionText: "Brake suddenly to express anger.", isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A passenger thanks you for making them feel safe. What is the best response?",
    options: [
      { optionText: "Ignore the compliment.", isCorrect: false },
      { optionText: "Say 'I know I'm a good driver.'", isCorrect: false },
      { optionText: "Immediately end the conversation.", isCorrect: false },
      { optionText: "Thank them and wish them a pleasant day.", isCorrect: true },
    ],
  },
  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A passenger appears upset but doesn't say why. What should you do?",
    options: [
      { optionText: "Respect their privacy while remaining polite and professional.", isCorrect: true },
      { optionText: "Force them to explain.", isCorrect: false },
      { optionText: "Ignore all customer service.", isCorrect: false },
      { optionText: "Cancel the ride.", isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "You arrive late because of an unexpected accident on the road. How should you communicate?",
    options: [
      { optionText: "Say nothing.", isCorrect: false },
      { optionText: "Blame the company.", isCorrect: false },
      { optionText: "Apologize sincerely and explain briefly.", isCorrect: true },
      { optionText: "Tell the passenger it's not your problem.", isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A passenger is speaking angrily on the phone during the ride. What should you do?",
    options: [
      { optionText: "Tell them to stop talking.", isCorrect: false },
      { optionText: "Join their conversation.", isCorrect: false },
      { optionText: "Remain focused on driving and avoid unnecessary involvement.", isCorrect: true },
      { optionText: "Ask personal questions.", isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "What best demonstrates emotional intelligence as a professional driver?",
    options: [
      { optionText: "Always insisting you are right.", isCorrect: false },
      { optionText: "Managing your emotions while responding respectfully to passengers.", isCorrect: true },
      { optionText: "Avoiding all communication with passengers.", isCorrect: false },
      { optionText: "Prioritizing speed over professionalism.", isCorrect: false },
    ]
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "While driving, a passenger begins shouting because of traffic. What should you do?",
    options: [
      { optionText: "Argue with the passenger.", isCorrect: false },
      { optionText: "Remain calm and explain the traffic situation politely.", isCorrect: true },
      { optionText: "Stop the trip immediately.", isCorrect: false },
      { optionText: "Ignore the passenger completely.", isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A passenger apologizes for being rude after calming down. How should you respond?",
    options: [
      { optionText: "Tell them they embarrassed themselves.", isCorrect: false },
      { optionText: "Ignore them for the rest of the journey.", isCorrect: false },
      { optionText: "Accept the apology professionally and continue the trip.", isCorrect: true },
      { optionText: "Cancel the trip anyway.", isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A passenger appears anxious during heavy rain. What is the best response?",
    options: [
      { optionText: "Tell them to stop worrying.", isCorrect: false },
      { optionText: "Increase your speed to finish quickly.", isCorrect: false },
      { optionText: "Ignore their concerns.", isCorrect: false },
      { optionText: "Drive carefully and reassure the passenger.", isCorrect: true },
    ],
  },
  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "You accidentally miss a turn because of poor road signs. What should you do?",
    options: [
      { optionText: "Blame the passenger.", isCorrect: false },
      { optionText: "Apologize, explain briefly, and continue safely.", isCorrect: true },
      { optionText: "Drive recklessly to recover lost time.", isCorrect: false },
      { optionText: "Pretend nothing happened.", isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A passenger keeps giving driving instructions that conflict with GPS. What should you do?",
    options: [
      { optionText: "Ignore them completely.", isCorrect: false },
      { optionText: "End the trip.", isCorrect: false },
      { optionText: "Respectfully discuss the safest route together.", isCorrect: true },
      { optionText: "Argue until they agree.", isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "You notice you're becoming frustrated after multiple difficult trips. What should you do?",
    options: [
      { optionText: "Ignore your emotions completely.", isCorrect: false },
      { optionText: "Take your frustration out on passengers.", isCorrect: false },
      { optionText: "Continue driving while angry.", isCorrect: false },
      { optionText: "Take a short break before accepting another ride.", isCorrect: true },
    ],
  },
  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "Another driver cuts you off aggressively with passengers onboard. What should you do?",
    options: [
      { optionText: "Brake suddenly to express anger.", isCorrect: false },
      { optionText: "Stay calm and focus on driving safely.", isCorrect: true },
      { optionText: "Shout and honk continuously.", isCorrect: false },
      { optionText: "Chase the other driver.", isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A passenger thanks you for making them feel safe. What is the best response?",
    options: [
      { optionText: "Say 'I know I'm a good driver.'", isCorrect: false },
      { optionText: "Immediately end the conversation.", isCorrect: false },
      { optionText: "Thank them and wish them a pleasant day.", isCorrect: true },
      { optionText: "Ignore the compliment.", isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A passenger appears upset but doesn't say why. What should you do?",
    options: [
      { optionText: "Force them to explain.", isCorrect: false },
      { optionText: "Respect their privacy while remaining polite and professional.", isCorrect: true },
      { optionText: "Cancel the ride.", isCorrect: false },
      { optionText: "Ignore all customer service.", isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "You arrive late because of an unexpected accident on the road. How should you communicate?",
    options: [
      { optionText: "Blame the company.", isCorrect: false },
      { optionText: "Say nothing.", isCorrect: false },
      { optionText: "Apologize sincerely and explain briefly.", isCorrect: true },
      { optionText: "Tell the passenger it's not your problem.", isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A passenger is speaking angrily on the phone during the ride. What should you do?",
    options: [
      { optionText: "Ask personal questions.", isCorrect: false },
      { optionText: "Remain focused on driving and avoid unnecessary involvement.", isCorrect: true },
      { optionText: "Join their conversation.", isCorrect: false },
      { optionText: "Tell them to stop talking.", isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "What best demonstrates emotional intelligence as a professional driver?",
    options: [
      { optionText: "Prioritizing speed over professionalism.", isCorrect: false },
      { optionText: "Managing your emotions while responding respectfully to passengers.", isCorrect: true },
      { optionText: "Always insisting you are right.", isCorrect: false },
      { optionText: "Avoiding all communication with passengers.", isCorrect: false },
    ],
  },


  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A customer begins shouting because their issue has not been resolved. What should you do first?",
    options: [
      { optionText: "Tell them to lower their voice before you help.", isCorrect: false },
      { optionText: "End the conversation immediately.", isCorrect: false },
      { optionText: "Raise your voice so they understand your point.", isCorrect: false },
      { optionText: "Remain calm, listen carefully, and acknowledge their frustration.", isCorrect: true },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A customer apologizes after becoming angry earlier. How should you respond?",
    options: [
      { optionText: "Accept the apology professionally and continue assisting them.", isCorrect: true },
      { optionText: "Remind them how rude they were.", isCorrect: false },
      { optionText: "Ignore them completely.", isCorrect: false },
      { optionText: "Refuse to continue helping them.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A customer sounds worried about losing important information. What is the best response?",
    options: [
      { optionText: "Tell them to stop panicking.", isCorrect: false },
      { optionText: "Reassure them that you'll do your best to assist and explain the next steps.", isCorrect: true },
      { optionText: "Ignore their emotions and only discuss company policy.", isCorrect: false },
      { optionText: "Transfer the call without explanation.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "You realize you provided incorrect information to a customer. What should you do?",
    options: [
      { optionText: "Correct the mistake promptly and apologize sincerely.", isCorrect: true },
      { optionText: "Pretend nothing happened.", isCorrect: false },
      { optionText: "Blame another department.", isCorrect: false },
      { optionText: "Wait until the customer notices.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A customer repeatedly interrupts you while you're explaining a solution. What should you do?",
    options: [
      { optionText: "Interrupt them louder.", isCorrect: false },
      { optionText: "Tell them you're ending the conversation.", isCorrect: false },
      { optionText: "Ignore everything they say.", isCorrect: false },
      { optionText: "Patiently allow them to speak and continue respectfully.", isCorrect: true },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "After handling several difficult customers, you begin feeling frustrated. What should you do?",
    options: [
      { optionText: "Continue assisting customers while expressing your frustration.", isCorrect: false },
      { optionText: "Be less friendly to future customers.", isCorrect: false },
      { optionText: "Take a short break if possible and regain your composure.", isCorrect: true },
      { optionText: "Ignore your emotions completely.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A customer thanks you for resolving a difficult issue. What is the most professional response?",
    options: [
      { optionText: "I know, I handled it perfectly.", isCorrect: false },
      { optionText: "Say nothing and end the chat.", isCorrect: false },
      { optionText: "Ask them to leave immediately.", isCorrect: false },
      { optionText: "You're welcome. I'm glad I could help. Have a great day!", isCorrect: true },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A customer is clearly upset but remains polite. What should you do?",
    options: [
      { optionText: "Show empathy while working to resolve the issue.", isCorrect: true },
      { optionText: "Only focus on company policy.", isCorrect: false },
      { optionText: "Tell them their emotions are irrelevant.", isCorrect: false },
      { optionText: "Respond with short answers to finish quickly.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "Your colleague makes a mistake that affects a customer. How should you respond to the customer?",
    options: [
      { optionText: "Blame your colleague immediately.", isCorrect: false },
      { optionText: "Apologize on behalf of the company and focus on resolving the issue.", isCorrect: true },
      { optionText: "Tell the customer it's not your responsibility.", isCorrect: false },
      { optionText: "Refuse to help because you weren't involved.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "Which behavior best demonstrates emotional intelligence in customer support?",
    options: [
      { optionText: "Winning every argument with customers.", isCorrect: false },
      { optionText: "Avoiding communication whenever possible.", isCorrect: false },
      { optionText: "Understanding customers' emotions while communicating respectfully.", isCorrect: true },
      { optionText: "Treating every customer exactly the same regardless of their situation.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A customer becomes emotional after explaining how your service affected their business. What should you do?",
    options: [
      { optionText: "Tell them emotional stories are not relevant.", isCorrect: false },
      { optionText: "Acknowledge their feelings and work toward a solution.", isCorrect: true },
      { optionText: "Transfer the customer immediately without explanation.", isCorrect: false },
      { optionText: "Ask them to calm down before speaking.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A customer is frustrated because they have explained the same issue multiple times. What is the best response?",
    options: [
      { optionText: "Ask them to explain everything again from the beginning.", isCorrect: false },
      { optionText: "Acknowledge the inconvenience, apologize, and review the existing information.", isCorrect: true },
      { optionText: "Tell them the delay is unavoidable.", isCorrect: false },
      { optionText: "Ignore their frustration and continue normally.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A customer becomes impatient because your system is responding slowly. What should you do?",
    options: [
      { optionText: "Stay transparent about the delay and thank them for their patience.", isCorrect: true },
      { optionText: "Blame the internet provider immediately.", isCorrect: false },
      { optionText: "Pretend everything is working normally.", isCorrect: false },
      { optionText: "End the conversation until the system is faster.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A customer starts comparing your company negatively to a competitor. What should you do?",
    options: [
      { optionText: "Respectfully focus on resolving their concern rather than criticizing competitors.", isCorrect: true },
      { optionText: "Argue that your company is better.", isCorrect: false },
      { optionText: "Tell them to switch companies.", isCorrect: false },
      { optionText: "Ignore everything they said.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A customer sounds disappointed after hearing company policy. What should you do?",
    options: [
      { optionText: "Show empathy while clearly explaining available alternatives.", isCorrect: true },
      { optionText: "Repeat the policy word for word until they accept it.", isCorrect: false },
      { optionText: "Tell them company policy is not your problem.", isCorrect: false },
      { optionText: "Ignore their disappointment.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A customer thanks you for listening even though the issue isn't fully resolved. What should you do?",
    options: [
      { optionText: "Thank them for their patience and assure them you'll continue assisting.", isCorrect: true },
      { optionText: "Tell them you'll only help after they leave a positive review.", isCorrect: false },
      { optionText: "End the conversation immediately.", isCorrect: false },
      { optionText: "Ignore the compliment.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A customer begins crying while describing a personal situation related to their complaint. What should you do?",
    options: [
      { optionText: "Remain empathetic, give them time, and continue assisting respectfully.", isCorrect: true },
      { optionText: "Tell them emotions won't solve the problem.", isCorrect: false },
      { optionText: "Rush them to finish speaking.", isCorrect: false },
      { optionText: "Transfer the call immediately because they're emotional.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A customer repeatedly blames you personally for a company mistake. What is the best approach?",
    options: [
      { optionText: "Remain professional, avoid taking it personally, and focus on resolving the issue.", isCorrect: true },
      { optionText: "Defend yourself aggressively.", isCorrect: false },
      { optionText: "Blame another employee.", isCorrect: false },
      { optionText: "End the conversation immediately.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A customer is silent after hearing your explanation. What should you do?",
    options: [
      { optionText: "Politely ask if they have any questions or need further clarification.", isCorrect: true },
      { optionText: "Assume they understand and disconnect.", isCorrect: false },
      { optionText: "Repeat everything much louder.", isCorrect: false },
      { optionText: "Ignore the silence and wait indefinitely.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "Which action best reflects emotional intelligence when handling customers?",
    options: [
      { optionText: "Listening actively, showing empathy, and maintaining professionalism under pressure.", isCorrect: true },
      { optionText: "Responding emotionally whenever a customer is rude.", isCorrect: false },
      { optionText: "Prioritizing speed over understanding the customer's concerns.", isCorrect: false },
      { optionText: "Avoiding difficult conversations whenever possible.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A customer says they feel ignored because they have not received an update. What is the best response?",
    options: [
      { optionText: "Suggest they call back another day.", isCorrect: false },
      { optionText: "Tell them updates will come when they're ready.", isCorrect: false },
      { optionText: "Acknowledge their concern, apologize, and provide the latest available update.", isCorrect: true },
      { optionText: "Ignore their complaint and continue the conversation.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A customer is speaking very slowly because they are elderly. What should you do?",
    options: [
      { optionText: "Transfer them to another agent immediately.", isCorrect: false },
      { optionText: "Be patient, listen attentively, and speak clearly without rushing them.", isCorrect: true },
      { optionText: "Answer before they finish explaining.", isCorrect: false },
      { optionText: "Interrupt to speed up the conversation.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A customer repeatedly asks the same question because they don't understand your explanation. What should you do?",
    options: [
      { optionText: "End the conversation because it is taking too long.", isCorrect: false },
      { optionText: "Ignore the repeated questions.", isCorrect: false },
      { optionText: "Explain the information differently and check their understanding.", isCorrect: true },
      { optionText: "Tell them you've already answered the question.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A customer compliments another support representative while speaking with you. How should you respond?",
    options: [
      { optionText: "Criticize the other representative.", isCorrect: false },
      { optionText: "Ignore the compliment completely.", isCorrect: false },
      { optionText: "Thank them for the feedback and continue assisting professionally.", isCorrect: true },
      { optionText: "Tell them you are better than your colleague.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A customer becomes frustrated because you need time to investigate their issue. What should you do?",
    options: [
      { optionText: "End the conversation until you find the answer.", isCorrect: false },
      { optionText: "Explain why the investigation is necessary and reassure them you'll keep them informed.", isCorrect: true },
      { optionText: "Tell them to wait without explanation.", isCorrect: false },
      { optionText: "Guess an answer to satisfy them quickly.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A customer says they are disappointed but remains respectful. What should you do?",
    options: [
      { optionText: "Ignore their feelings and continue normally.", isCorrect: false },
      { optionText: "Transfer the conversation to another department immediately.", isCorrect: false },
      { optionText: "Show empathy, thank them for their patience, and work toward resolving the issue.", isCorrect: true },
      { optionText: "Tell them disappointment won't change company policy.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "You receive negative feedback from a customer after assisting them. How should you react?",
    options: [
      { optionText: "Ignore the feedback because it is subjective.", isCorrect: false },
      { optionText: "Accept the feedback professionally and look for ways to improve.", isCorrect: true },
      { optionText: "Report the customer for being critical.", isCorrect: false },
      { optionText: "Argue with the customer about their opinion.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A customer apologizes for misunderstanding your explanation. What is the best response?",
    options: [
      { optionText: "Ignore the apology and continue.", isCorrect: false },
      { optionText: "Remind them they wasted your time.", isCorrect: false },
      { optionText: "Tell them they should have listened better.", isCorrect: false },
      { optionText: "Thank them and reassure them that misunderstandings can happen.", isCorrect: true },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A customer says they are stressed because the issue is affecting their work. What should you do?",
    options: [
      { optionText: "Tell them everyone experiences stress.", isCorrect: false },
      { optionText: "Ask them to calm down before you continue.", isCorrect: false },
      { optionText: "Recognize their concern and prioritize finding the most appropriate solution.", isCorrect: true },
      { optionText: "Tell them their work is unrelated to the issue.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "Which quality is most important for demonstrating emotional intelligence in customer support?",
    options: [
      { optionText: "Following scripts without considering the customer's emotions.", isCorrect: false },
      { optionText: "Ending difficult conversations as quickly as possible.", isCorrect: false },
      { optionText: "Empathy, patience, and the ability to remain calm under pressure.", isCorrect: true },
      { optionText: "Always proving the customer is wrong.", isCorrect: false },
    ],
  },


  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A colleague becomes upset because an important meeting was scheduled without informing them. What should you do?",
    options: [
      { optionText: "Explain that mistakes happen and apologize while helping resolve the issue.", isCorrect: true },
      { optionText: "Tell them to check their own calendar next time.", isCorrect: false },
      { optionText: "Ignore their frustration and continue working.", isCorrect: false },
      { optionText: "Blame another department immediately.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A manager criticizes your report in front of others. What is the most emotionally intelligent response?",
    options: [
      { optionText: "Argue with the manager immediately.", isCorrect: false },
      { optionText: "Remain calm, accept the feedback professionally, and discuss improvements privately.", isCorrect: true },
      { optionText: "Walk out of the meeting.", isCorrect: false },
      { optionText: "Ignore all future feedback from the manager.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "An employee appears stressed while requesting assistance. How should you respond?",
    options: [
      { optionText: "Tell them to solve the issue themselves.", isCorrect: false },
      { optionText: "Offer support, listen carefully, and assist where possible.", isCorrect: true },
      { optionText: "Tell them everyone is stressed.", isCorrect: false },
      { optionText: "Ask them to return another day.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "Two coworkers begin arguing loudly near your desk. What should you do?",
    options: [
      { optionText: "Join the argument to defend one person.", isCorrect: false },
      { optionText: "Encourage both parties to remain calm and follow appropriate workplace procedures.", isCorrect: true },
      { optionText: "Pretend nothing is happening.", isCorrect: false },
      { optionText: "Record the argument and share it with colleagues.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "You accidentally send an email with incorrect information to several staff members. What should you do?",
    options: [
      { optionText: "Delete the email and hope nobody noticed.", isCorrect: false },
      { optionText: "Blame the IT department.", isCorrect: false },
      { optionText: "Send a correction promptly, apologize, and provide the correct information.", isCorrect: true },
      { optionText: "Wait until someone complains.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A visitor becomes impatient while waiting for a manager. What should you do?",
    options: [
      { optionText: "Ignore them until the manager arrives.", isCorrect: false },
      { optionText: "Politely acknowledge the delay, apologize, and provide updates if possible.", isCorrect: true },
      { optionText: "Tell them to leave if they cannot wait.", isCorrect: false },
      { optionText: "Avoid speaking with them.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "You notice you're becoming overwhelmed by multiple urgent tasks. What should you do?",
    options: [
      { optionText: "Take a moment to prioritize tasks and communicate if support is needed.", isCorrect: true },
      { optionText: "Rush through everything without planning.", isCorrect: false },
      { optionText: "Complain loudly to everyone nearby.", isCorrect: false },
      { optionText: "Ignore the workload until later.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A coworker thanks you for helping them complete an urgent assignment. How should you respond?",
    options: [
      { optionText: "Say they owe you a favor.", isCorrect: false },
      { optionText: "Accept the appreciation politely and encourage teamwork.", isCorrect: true },
      { optionText: "Ignore the compliment.", isCorrect: false },
      { optionText: "Take full credit for the assignment.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A colleague misunderstands your instructions and becomes defensive. What is the best approach?",
    options: [
      { optionText: "Raise your voice until they understand.", isCorrect: false },
      { optionText: "Calmly clarify the instructions and listen to their concerns.", isCorrect: true },
      { optionText: "Report them immediately without discussion.", isCorrect: false },
      { optionText: "End the conversation abruptly.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "Which behavior best demonstrates emotional intelligence for an Administrative Executive?",
    options: [
      { optionText: "Remaining calm, communicating respectfully, and considering others' perspectives.", isCorrect: true },
      { optionText: "Avoiding conversations whenever conflict arises.", isCorrect: false },
      { optionText: "Making decisions based only on emotions.", isCorrect: false },
      { optionText: "Always insisting your opinion is correct.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      "Two department heads disagree during a meeting and both expect you to support their position. What should you do?",
    options: [
      { optionText: "Support the department head with the higher rank.", isCorrect: false },
      { optionText: "Remain neutral, document the discussion accurately, and continue supporting the meeting professionally.", isCorrect: true },
      { optionText: "Publicly criticize both managers.", isCorrect: false },
      { optionText: "Leave the meeting immediately.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      "A senior executive unfairly blames you for a scheduling conflict that was outside your control. What is the best response?",
    options: [
      { optionText: "Raise your voice to defend yourself.", isCorrect: false },
      { optionText: "Calmly clarify the facts privately while maintaining professionalism.", isCorrect: true },
      { optionText: "Ignore the issue completely.", isCorrect: false },
      { optionText: "Complain to other employees.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      "A colleague is clearly struggling emotionally, but they insist everything is fine. What is the most appropriate action?",
    options: [
      { optionText: "Respect their privacy while letting them know you're available if they need support.", isCorrect: true },
      { optionText: "Tell everyone you're worried about them.", isCorrect: false },
      { optionText: "Force them to explain what's wrong.", isCorrect: false },
      { optionText: "Ignore the situation because they denied it.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      "A frustrated client begins speaking aggressively at the reception area. What should you do first?",
    options: [
      { optionText: "Respond with the same tone so they understand your frustration.", isCorrect: false },
      { optionText: "Remain calm, listen carefully, and attempt to de-escalate the situation respectfully.", isCorrect: true },
      { optionText: "Immediately ask security to remove them.", isCorrect: false },
      { optionText: "Walk away without responding.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      "You discover an error made by a coworker that could delay an important project. They ask you not to tell anyone. What is the emotionally intelligent response?",
    options: [
      { optionText: "Hide the mistake to protect your coworker.", isCorrect: false },
      { optionText: "Help correct the error while following the organization's reporting procedures if necessary.", isCorrect: true },
      { optionText: "Publicly expose your coworker.", isCorrect: false },
      { optionText: "Pretend you never noticed.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      "A manager sends you a strongly worded email that feels disrespectful. What should you do?",
    options: [
      { optionText: "Reply immediately while you're still angry.", isCorrect: false },
      { optionText: "Take time to remain calm, then respond professionally or discuss the matter respectfully in person.", isCorrect: true },
      { optionText: "Forward the email to everyone in the office.", isCorrect: false },
      { optionText: "Delete the email without responding.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      "Your workload is increasing rapidly while another colleague has very little work. What demonstrates emotional intelligence?",
    options: [
      { optionText: "Complain about the unfairness to everyone.", isCorrect: false },
      { optionText: "Discuss workload concerns constructively with your supervisor while remaining collaborative.", isCorrect: true },
      { optionText: "Slow down your own work deliberately.", isCorrect: false },
      { optionText: "Refuse new assignments immediately.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      "During a meeting, your idea is dismissed without discussion. What is the most emotionally intelligent response?",
    options: [
      { optionText: "Wait for an appropriate opportunity to clarify or present your idea professionally.", isCorrect: true },
      { optionText: "Interrupt everyone until they listen.", isCorrect: false },
      { optionText: "Leave the meeting angrily.", isCorrect: false },
      { optionText: "Refuse to contribute for the rest of the meeting.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      "An executive asks you to rearrange your priorities several times in one day, causing stress. What is the best response?",
    options: [
      { optionText: "Calmly confirm priorities with the executive and organize the tasks accordingly.", isCorrect: true },
      { optionText: "Ignore the latest instruction.", isCorrect: false },
      { optionText: "Tell the executive they are disorganized.", isCorrect: false },
      { optionText: "Complete whichever task seems easiest.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      "Which behavior best demonstrates advanced emotional intelligence in an Administrative Executive?",
    options: [
      { optionText: "Remaining aware of your emotions while managing workplace relationships with professionalism and empathy.", isCorrect: true },
      { optionText: "Avoiding all emotionally difficult conversations.", isCorrect: false },
      { optionText: "Making decisions purely based on logic without considering people.", isCorrect: false },
      { optionText: "Always agreeing with senior management regardless of the situation.", isCorrect: false },
    ]
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      "A visitor greets you with a smile when arriving at the office. What should you do?",
    options: [
      { optionText: "Smile, greet them politely, and offer assistance.", isCorrect: true },
      { optionText: "Ignore them until they speak first.", isCorrect: false },
      { optionText: "Tell them to wait without explanation.", isCorrect: false },
      { optionText: "Continue using your phone.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      "A coworker thanks you for helping organize office documents. What is the best response?",
    options: [
      { optionText: "Tell them it wasn't difficult and continue working.", isCorrect: false },
      { optionText: "Ignore their appreciation.", isCorrect: false },
      { optionText: "Thank them and say you're happy to help.", isCorrect: true },
      { optionText: "Ask them to thank your manager instead.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      "A colleague seems upset after receiving feedback. What should you do?",
    options: [
      { optionText: "Laugh about the situation.", isCorrect: false },
      { optionText: "Give them space while showing kindness and respect.", isCorrect: true },
      { optionText: "Tell everyone they were criticized.", isCorrect: false },
      { optionText: "Pretend not to notice them.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      "A visitor looks confused about where to go. What should you do?",
    options: [
      { optionText: "Point in a random direction.", isCorrect: false },
      { optionText: "Ignore them because someone else will help.", isCorrect: false },
      { optionText: "Politely ask if they need assistance and guide them.", isCorrect: true },
      { optionText: "Tell them to figure it out themselves.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      "You accidentally interrupt someone while they are speaking. What should you do?",
    options: [
      { optionText: "Continue talking because your point is important.", isCorrect: false },
      { optionText: "Apologize and allow them to finish speaking.", isCorrect: true },
      { optionText: "Pretend nothing happened.", isCorrect: false },
      { optionText: "Walk away from the conversation.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      "A coworker is having a busy day and seems stressed. What is a good response?",
    options: [
      { optionText: "Offer assistance if you're able to help.", isCorrect: true },
      { optionText: "Tell them everyone has problems.", isCorrect: false },
      { optionText: "Ignore them completely.", isCorrect: false },
      { optionText: "Complain about your own workload instead.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      "Your manager praises your work. What is the most professional response?",
    options: [
      { optionText: "Say thank you and continue doing your best.", isCorrect: true },
      { optionText: "Tell everyone you're the best employee.", isCorrect: false },
      { optionText: "Ignore the compliment.", isCorrect: false },
      { optionText: "Ask why they didn't praise you earlier.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      "A new employee appears nervous on their first day. What should you do?",
    options: [
      { optionText: "Ignore them because they'll adjust eventually.", isCorrect: false },
      { optionText: "Welcome them warmly and offer help if needed.", isCorrect: true },
      { optionText: "Tell them everyone is nervous.", isCorrect: false },
      { optionText: "Ask someone else to speak with them.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      "A coworker makes a small mistake and apologizes. What should you do?",
    options: [
      { optionText: "Accept the apology and move forward professionally.", isCorrect: true },
      { optionText: "Remind them of the mistake repeatedly.", isCorrect: false },
      { optionText: "Tell everyone about the mistake.", isCorrect: false },
      { optionText: "Refuse to work with them again.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      "Which behavior best demonstrates emotional intelligence in an Administrative Executive?",
    options: [
      { optionText: "Remaining respectful, calm, and considerate when interacting with others.", isCorrect: true },
      { optionText: "Ignoring coworkers' concerns.", isCorrect: false },
      { optionText: "Always speaking before listening.", isCorrect: false },
      { optionText: "Avoiding communication whenever possible.", isCorrect: false },
    ]
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A driver becomes frustrated after receiving multiple route changes during the day. What should you do?",
    options: [
      { optionText: "Explain the operational reasons calmly and listen to their concerns.", isCorrect: true },
      { optionText: "Tell them to stop complaining.", isCorrect: false },
      { optionText: "Ignore their concerns completely.", isCorrect: false },
      { optionText: "Assign them even more route changes.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "Two team members disagree about who is responsible for a delayed assignment. What should you do?",
    options: [
      { optionText: "Take sides immediately.", isCorrect: false },
      { optionText: "Encourage both parties to explain the situation and focus on resolving the issue.", isCorrect: true },
      { optionText: "Ignore the disagreement.", isCorrect: false },
      { optionText: "Blame both employees equally without discussion.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "An employee admits making a mistake that caused a minor operational delay. What is the best response?",
    options: [
      { optionText: "Publicly criticize them.", isCorrect: false },
      { optionText: "Thank them for being honest and work together to prevent future mistakes.", isCorrect: true },
      { optionText: "Ignore the issue.", isCorrect: false },
      { optionText: "Immediately suspend them.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A colleague appears overwhelmed during a busy operational period. What should you do?",
    options: [
      { optionText: "Offer support if possible and help prioritize urgent tasks.", isCorrect: true },
      { optionText: "Tell them everyone is busy.", isCorrect: false },
      { optionText: "Avoid speaking to them.", isCorrect: false },
      { optionText: "Give them additional work.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A warehouse employee becomes upset after receiving corrective feedback. What should you do?",
    options: [
      { optionText: "Continue criticizing them in front of everyone.", isCorrect: false },
      { optionText: "Acknowledge their feelings while reinforcing the purpose of the feedback respectfully.", isCorrect: true },
      { optionText: "Ignore them completely.", isCorrect: false },
      { optionText: "Withdraw the feedback to avoid conflict.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A customer is frustrated because a delivery is delayed due to unforeseen circumstances. How should you respond?",
    options: [
      { optionText: "Blame another department.", isCorrect: false },
      { optionText: "Apologize sincerely, explain the situation briefly, and provide realistic updates.", isCorrect: true },
      { optionText: "Tell them delays are normal.", isCorrect: false },
      { optionText: "Ignore the complaint.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "You notice you're becoming frustrated after dealing with several unexpected operational issues. What should you do?",
    options: [
      { optionText: "Pause briefly, regain composure, and continue making objective decisions.", isCorrect: true },
      { optionText: "Take your frustration out on the team.", isCorrect: false },
      { optionText: "Ignore your emotions completely.", isCorrect: false },
      { optionText: "Stop communicating with everyone.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "An employee thanks you for helping resolve a scheduling conflict. How should you respond?",
    options: [
      { optionText: "Tell them they should have solved it themselves.", isCorrect: false },
      { optionText: "Accept the appreciation politely and encourage teamwork.", isCorrect: true },
      { optionText: "Ignore their gratitude.", isCorrect: false },
      { optionText: "Take full credit in front of everyone.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A team member appears unusually quiet during an operations meeting. What is the best approach?",
    options: [
      { optionText: "Politely invite them to share their thoughts if they are comfortable.", isCorrect: true },
      { optionText: "Assume they have nothing useful to say.", isCorrect: false },
      { optionText: "Call them out for not participating.", isCorrect: false },
      { optionText: "Ignore them permanently.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "Which behavior best demonstrates emotional intelligence in an Operations Officer?",
    options: [
      { optionText: "Staying calm under pressure while communicating respectfully and making fair decisions.", isCorrect: true },
      { optionText: "Making quick decisions without considering others.", isCorrect: false },
      { optionText: "Avoiding communication during stressful situations.", isCorrect: false },
      { optionText: "Always blaming external factors for operational problems.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      "A colleague is having difficulty completing a task on time. What should you do?",
    options: [
      { optionText: "Offer assistance if you're available.", isCorrect: true },
      { optionText: "Ignore the situation because it's not your responsibility.", isCorrect: false },
      { optionText: "Report them immediately.", isCorrect: false },
      { optionText: "Criticize them in front of everyone.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      "A team member thanks you for helping them complete a task. How should you respond?",
    options: [
      { optionText: "Tell them they owe you a favor.", isCorrect: false },
      { optionText: "Say helping is part of working as a team.", isCorrect: true },
      { optionText: "Ignore them.", isCorrect: false },
      { optionText: "Take all the credit publicly.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      "You notice a coworker appears stressed before an important operation. What should you do?",
    options: [
      { optionText: "Laugh to lighten the mood.", isCorrect: false },
      { optionText: "Offer encouragement and ask if they need assistance.", isCorrect: true },
      { optionText: "Tell everyone they look stressed.", isCorrect: false },
      { optionText: "Ignore them.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      "When receiving instructions from your supervisor, what demonstrates emotional intelligence?",
    options: [
      { optionText: "Interrupt frequently.", isCorrect: false },
      { optionText: "Listen carefully and ask questions if necessary.", isCorrect: true },
      { optionText: "Pretend to understand without listening.", isCorrect: false },
      { optionText: "Complain before the task begins.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      "A coworker accidentally bumps into equipment while rushing. What is the best response?",
    options: [
      { optionText: "Mock them for being careless.", isCorrect: false },
      { optionText: "Help ensure everyone is safe before continuing work.", isCorrect: true },
      { optionText: "Leave immediately.", isCorrect: false },
      { optionText: "Blame another employee.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      "A new employee asks you for directions around the workplace. What should you do?",
    options: [
      { optionText: "Tell them to figure it out themselves.", isCorrect: false },
      { optionText: "Politely help them or direct them to someone who can.", isCorrect: true },
      { optionText: "Ignore them.", isCorrect: false },
      { optionText: "Send them to the wrong place as a joke.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      "If a teammate makes a small mistake, what is the best reaction?",
    options: [
      { optionText: "Correct them respectfully and help prevent future mistakes.", isCorrect: true },
      { optionText: "Tell everyone about the mistake.", isCorrect: false },
      { optionText: "Refuse to work with them again.", isCorrect: false },
      { optionText: "Insult them.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      "A meeting starts later than expected because of an emergency. What should you do?",
    options: [
      { optionText: "Remain patient and wait for further instructions.", isCorrect: true },
      { optionText: "Complain loudly to everyone.", isCorrect: false },
      { optionText: "Leave without informing anyone.", isCorrect: false },
      { optionText: "Refuse to participate afterward.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      "During a busy day, a coworker politely asks for help with a simple task. What should you do?",
    options: [
      { optionText: "Tell them they're on their own.", isCorrect: false },
      { optionText: "Help if possible or explain when you'll be available.", isCorrect: true },
      { optionText: "Ignore the request.", isCorrect: false },
      { optionText: "Report them for asking.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      "Which behavior best demonstrates emotional intelligence in operations?",
    options: [
      { optionText: "Remaining calm, communicating respectfully, and supporting teamwork.", isCorrect: true },
      { optionText: "Always blaming others for delays.", isCorrect: false },
      { optionText: "Ignoring coworkers' concerns.", isCorrect: false },
      { optionText: "Getting angry whenever plans change.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      "Two departments are blaming each other for an operational delay, and both managers expect you to take their side. What should you do?",
    options: [
      { optionText: "Support the manager with the higher position.", isCorrect: false },
      { optionText: "Gather facts objectively and focus on resolving the delay rather than assigning blame.", isCorrect: true },
      { optionText: "Stay silent and let them resolve it themselves.", isCorrect: false },
      { optionText: "Agree with whichever department complains first.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      "A frustrated team member publicly criticizes your coordination plan during a meeting. What is the best response?",
    options: [
      { optionText: "Remain calm, acknowledge their concern, and discuss solutions professionally.", isCorrect: true },
      { optionText: "Immediately remove them from the meeting.", isCorrect: false },
      { optionText: "Respond with the same level of criticism.", isCorrect: false },
      { optionText: "Ignore them completely.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      "An unexpected equipment failure causes major disruption, and your team is becoming anxious. What should you do first?",
    options: [
      { optionText: "Leave the team to figure things out independently.", isCorrect: false },
      { optionText: "Blame maintenance immediately.", isCorrect: false },
      { optionText: "Provide calm direction, prioritize safety, and coordinate the response.", isCorrect: true },
      { optionText: "Wait until management arrives before communicating.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      "A high-performing employee has recently become withdrawn and less productive. What demonstrates emotional intelligence?",
    options: [
      { optionText: "Issue a warning immediately.", isCorrect: false },
      { optionText: "Ignore the change because performance is personal.", isCorrect: false },
      { optionText: "Discuss the change privately and offer appropriate support while maintaining expectations.", isCorrect: true },
      { optionText: "Publicly question their commitment.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      "Two supervisors disagree on the best way to complete an urgent task, delaying the operation. What should you do?",
    options: [
      { optionText: "Choose one supervisor without listening to either.", isCorrect: false },
      { optionText: "Encourage a brief, solution-focused discussion and decide using operational priorities.", isCorrect: true },
      { optionText: "Allow the disagreement to continue until someone gives up.", isCorrect: false },
      { optionText: "Postpone the task indefinitely.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      "You realize your planning error contributed to a delay that affected multiple teams. What is the best approach?",
    options: [
      { optionText: "Shift responsibility to another department.", isCorrect: false },
      { optionText: "Quietly correct the issue without informing anyone.", isCorrect: false },
      { optionText: "Accept responsibility, communicate transparently, and implement corrective measures.", isCorrect: true },
      { optionText: "Wait to see if no one notices.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      "Several employees are frustrated after repeated overtime shifts. Which response best demonstrates emotional intelligence?",
    options: [
      { optionText: "Tell them overtime is part of the job and ignore their concerns.", isCorrect: false },
      { optionText: "Listen to their concerns, explain operational needs honestly, and explore ways to reduce unnecessary overtime.", isCorrect: true },
      { optionText: "Threaten disciplinary action for complaints.", isCorrect: false },
      { optionText: "Avoid speaking with the team.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      "A senior manager criticizes your team's performance in front of everyone, even though some information is inaccurate. What should you do?",
    options: [
      { optionText: "Calmly clarify the facts at an appropriate time while remaining respectful.", isCorrect: true },
      { optionText: "Argue loudly during the meeting.", isCorrect: false },
      { optionText: "Walk out of the meeting.", isCorrect: false },
      { optionText: "Publicly criticize the manager afterward.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      "An experienced employee refuses to adopt a new operational process because they believe the old method is better. What should you do?",
    options: [
      { optionText: "Threaten disciplinary action immediately.", isCorrect: false },
      { optionText: "Ignore the refusal.", isCorrect: false },
      { optionText: "Understand their concerns, explain the benefits of the new process, and encourage cooperation.", isCorrect: true },
      { optionText: "Allow everyone to choose whichever process they prefer.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      "Which behavior best demonstrates emotional intelligence in an Operations Officer during a high-pressure situation?",
    options: [
      { optionText: "Making quick decisions without consulting anyone.", isCorrect: false },
      { optionText: "Remaining calm, communicating clearly, managing emotions, and helping the team stay focused.", isCorrect: true },
      { optionText: "Prioritizing speed over safety.", isCorrect: false },
      { optionText: "Avoiding communication to prevent conflict.", isCorrect: false },
    ],
  },


  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A warehouse assistant becomes frustrated after repeatedly making stock entry mistakes. What should you do?",
    options: [
      { optionText: "Ignore the mistakes and continue working.", isCorrect: false },
      { optionText: "Calmly identify the issue, offer guidance, and encourage improvement.", isCorrect: true },
      { optionText: "Publicly criticize the assistant.", isCorrect: false },
      { optionText: "Remove them from inventory duties immediately.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A colleague becomes upset after discovering missing inventory during their shift. What is the best response?",
    options: [
      { optionText: "Help investigate the issue objectively without assigning blame.", isCorrect: true },
      { optionText: "Tell everyone they were careless.", isCorrect: false },
      { optionText: "Ignore the situation because it isn't your problem.", isCorrect: false },
      { optionText: "Accuse them of theft immediately.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "Another department complains that inventory requests are taking too long. How should you respond?",
    options: [
      { optionText: "Explain the situation respectfully, listen to their concerns, and work toward a solution.", isCorrect: true },
      { optionText: "Tell them inventory is more important than their department.", isCorrect: false },
      { optionText: "Ignore their complaints.", isCorrect: false },
      { optionText: "Argue until they stop complaining.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A coworker points out a mistake you made in the inventory records. What should you do?",
    options: [
      { optionText: "Become defensive and deny the mistake.", isCorrect: false },
      { optionText: "Accept the feedback professionally and correct the error.", isCorrect: true },
      { optionText: "Blame the inventory system.", isCorrect: false },
      { optionText: "Ignore the mistake.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "You notice a teammate looks overwhelmed during stock counting. What should you do?",
    options: [
      { optionText: "Offer assistance if your workload allows.", isCorrect: true },
      { optionText: "Tell them to work faster.", isCorrect: false },
      { optionText: "Complain about slowing down the team.", isCorrect: false },
      { optionText: "Ignore them completely.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A supplier becomes impatient while waiting for inventory verification. What should you do?",
    options: [
      { optionText: "Tell them they can leave if they don't want to wait.", isCorrect: false },
      { optionText: "Remain courteous, explain the verification process, and thank them for their patience.", isCorrect: true },
      { optionText: "Ignore the supplier.", isCorrect: false },
      { optionText: "Rush the verification and skip required checks.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "A junior employee asks several questions while you're busy preparing inventory reports. What should you do?",
    options: [
      { optionText: "Tell them to stop asking questions.", isCorrect: false },
      { optionText: "Answer briefly or arrange a suitable time to assist them.", isCorrect: true },
      { optionText: "Ignore them until they leave.", isCorrect: false },
      { optionText: "Ask another employee to deal with them without explanation.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "An inventory audit discovers several discrepancies that involve multiple teams. What demonstrates emotional intelligence?",
    options: [
      { optionText: "Blame the newest employees first.", isCorrect: false },
      { optionText: "Work collaboratively to identify the root cause without making assumptions.", isCorrect: true },
      { optionText: "Hide the discrepancies.", isCorrect: false },
      { optionText: "Argue with the auditors.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "After resolving a difficult inventory issue, a teammate thanks you for staying calm. How should you respond?",
    options: [
      { optionText: "Tell them they should have handled it themselves.", isCorrect: false },
      { optionText: "Thank them and acknowledge that teamwork helped solve the problem.", isCorrect: true },
      { optionText: "Ignore the compliment.", isCorrect: false },
      { optionText: "Take full credit for the solution.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      "Which behavior best demonstrates emotional intelligence as an Inventory Coordinator?",
    options: [
      { optionText: "Remaining calm, communicating respectfully, and collaborating to solve inventory challenges.", isCorrect: true },
      { optionText: "Always blaming others for stock discrepancies.", isCorrect: false },
      { optionText: "Avoiding communication whenever problems occur.", isCorrect: false },
      { optionText: "Prioritizing speed over accuracy and teamwork.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      "A colleague accidentally places items on the wrong shelf. What should you do?",
    options: [
      { optionText: "Report them immediately without speaking to them.", isCorrect: false },
      { optionText: "Quietly correct the mistake and explain the proper location.", isCorrect: true },
      { optionText: "Ignore the mistake.", isCorrect: false },
      { optionText: "Move the items somewhere else without telling anyone.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      "You notice a coworker looks overwhelmed during stock counting. What is the best response?",
    options: [
      { optionText: "Continue working without acknowledging them.", isCorrect: false },
      { optionText: "Offer assistance if your workload allows.", isCorrect: true },
      { optionText: "Tell them to work faster.", isCorrect: false },
      { optionText: "Complain about their pace.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      "A supervisor corrects your mistake in front of others. How should you react?",
    options: [
      { optionText: "Accept the feedback professionally and improve.", isCorrect: true },
      { optionText: "Walk away angrily.", isCorrect: false },
      { optionText: "Argue immediately.", isCorrect: false },
      { optionText: "Blame another employee.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      "A delivery driver is frustrated because unloading is taking longer than expected. What should you do?",
    options: [
      { optionText: "Explain the situation politely while continuing efficiently.", isCorrect: true },
      { optionText: "Ignore the driver completely.", isCorrect: false },
      { optionText: "Tell the driver to stop complaining.", isCorrect: false },
      { optionText: "Delay the unloading even more.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      "A teammate thanks you for helping with inventory. What is the best response?",
    options: [
      { optionText: "Tell them they owe you a favor.", isCorrect: false },
      { optionText: "Thank them and continue working together.", isCorrect: true },
      { optionText: "Ignore them.", isCorrect: false },
      { optionText: "Say they should have managed alone.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      "You accidentally scan an item twice. What should you do?",
    options: [
      { optionText: "Delete random entries without checking.", isCorrect: false },
      { optionText: "Correct the error immediately and notify the appropriate person if necessary.", isCorrect: true },
      { optionText: "Leave it because someone else will notice.", isCorrect: false },
      { optionText: "Hide the mistake.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      "A coworker is upset after making an error. What should you do?",
    options: [
      { optionText: "Mock them so they learn.", isCorrect: false },
      { optionText: "Encourage them and help if appropriate.", isCorrect: true },
      { optionText: "Tell everyone about the mistake.", isCorrect: false },
      { optionText: "Avoid speaking to them.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      "You receive instructions you don't fully understand. What should you do?",
    options: [
      { optionText: "Pretend you understand.", isCorrect: false },
      { optionText: "Politely ask for clarification before proceeding.", isCorrect: true },
      { optionText: "Guess what to do.", isCorrect: false },
      { optionText: "Ignore the instructions.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      "A supplier becomes impatient while waiting for paperwork. What is the best response?",
    options: [
      { optionText: "Explain the delay respectfully and keep them informed.", isCorrect: true },
      { optionText: "Tell them to wait quietly.", isCorrect: false },
      { optionText: "Ignore their concerns.", isCorrect: false },
      { optionText: "Walk away without responding.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      "Which behavior best demonstrates emotional intelligence in inventory management?",
    options: [
      { optionText: "Blaming coworkers whenever mistakes happen.", isCorrect: false },
      { optionText: "Working independently without communicating.", isCorrect: false },
      { optionText: "Staying calm, communicating respectfully, and cooperating with others.", isCorrect: true },
      { optionText: "Ignoring feedback from supervisors.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      "During stock reconciliation, you discover a discrepancy that could delay an important shipment. Your supervisor is unavailable. What should you do?",
    options: [
      { optionText: "Proceed with the shipment and fix the records later.", isCorrect: false },
      { optionText: "Investigate the discrepancy, document your findings, and escalate to the appropriate authority before proceeding.", isCorrect: true },
      { optionText: "Ignore the discrepancy because delays upset customers.", isCorrect: false },
      { optionText: "Delete the incorrect records to balance the inventory.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      "A coworker becomes defensive after you point out an inventory mistake they made. What is the best response?",
    options: [
      { optionText: "Calmly explain the issue and focus on correcting the inventory together.", isCorrect: true },
      { optionText: "Report them immediately without further discussion.", isCorrect: false },
      { optionText: "Argue until they admit they were wrong.", isCorrect: false },
      { optionText: "Ignore the mistake completely.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      "A supplier insists that your warehouse received all ordered items, but your records show otherwise. What should you do?",
    options: [
      { optionText: "Accept the supplier's explanation without checking.", isCorrect: false },
      { optionText: "Remain professional, verify all documentation, and discuss the findings respectfully.", isCorrect: true },
      { optionText: "Accuse the supplier of dishonesty immediately.", isCorrect: false },
      { optionText: "Change the inventory records to match the supplier's claim.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      "A new employee repeatedly asks questions that slow down your work. How should you respond?",
    options: [
      { optionText: "Tell them to stop asking questions.", isCorrect: false },
      { optionText: "Answer patiently while helping them become more independent.", isCorrect: true },
      { optionText: "Ignore their requests for help.", isCorrect: false },
      { optionText: "Ask another employee to deal with them every time.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      "You notice tension growing between the receiving and dispatch teams over delayed deliveries. What should you do?",
    options: [
      { optionText: "Join one side of the disagreement.", isCorrect: false },
      { optionText: "Encourage respectful communication and focus discussions on solving the operational issue.", isCorrect: true },
      { optionText: "Ignore the conflict because it doesn't involve you directly.", isCorrect: false },
      { optionText: "Spread information about the disagreement to other departments.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      "While conducting an audit, a colleague asks you to overlook a small inventory error because they are under pressure. What should you do?",
    options: [
      { optionText: "Correct the error accurately while remaining respectful toward your colleague.", isCorrect: true },
      { optionText: "Ignore the issue since it is small.", isCorrect: false },
      { optionText: "Change the figures without informing anyone.", isCorrect: false },
      { optionText: "Publicly criticize the colleague.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      "After several stressful shifts, you realize your frustration is affecting how you speak to coworkers. What should you do?",
    options: [
      { optionText: "Continue working because emotions shouldn't matter.", isCorrect: false },
      { optionText: "Recognize the issue, manage your emotions, and communicate more respectfully.", isCorrect: true },
      { optionText: "Avoid speaking to anyone for the rest of the day.", isCorrect: false },
      { optionText: "Blame your coworkers for your mood.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      "A warehouse worker admits they accidentally damaged inventory but is worried about disciplinary action. What should you do?",
    options: [
      { optionText: "Tell them to hide the damage.", isCorrect: false },
      { optionText: "Encourage honest reporting so the issue can be resolved properly.", isCorrect: true },
      { optionText: "Ignore the damage to avoid paperwork.", isCorrect: false },
      { optionText: "Immediately accuse them of negligence in front of everyone.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      "You receive criticism from your supervisor about inventory accuracy even though you believe you followed procedures correctly. What should you do?",
    options: [
      { optionText: "Become defensive and refuse to discuss it.", isCorrect: false },
      { optionText: "Listen carefully, ask for clarification, and learn from the feedback.", isCorrect: true },
      { optionText: "Ignore the feedback because you disagree.", isCorrect: false },
      { optionText: "Argue with your supervisor immediately.", isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      "Which behavior best demonstrates emotional intelligence during inventory operations?",
    options: [
      { optionText: "Correcting mistakes respectfully, communicating clearly, and remaining calm under pressure.", isCorrect: true },
      { optionText: "Focusing only on speed regardless of teamwork.", isCorrect: false },
      { optionText: "Ignoring feedback from coworkers.", isCorrect: false },
      { optionText: "Avoiding communication whenever problems occur.", isCorrect: false },
    ],
  },
];