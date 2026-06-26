"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMOTIONAL_INTELLIGENCE_QUESTIONS = void 0;
const client_1 = require("@prisma/client");
exports.EMOTIONAL_INTELLIGENCE_QUESTIONS = [
    {
        category: client_1.QuestionCategory.EMOTIONAL_INTELLIGENCE,
        difficulty: client_1.QuestionDifficulty.EASY,
        weight: 3,
        question: 'A passenger accuses you of taking a longer route. What should you do?',
        options: [
            {
                optionText: 'Remain calm, explain the route and offer support assistance',
                isCorrect: true,
            },
            { optionText: 'Argue immediately', isCorrect: false },
            { optionText: 'Ignore the passenger', isCorrect: false },
            { optionText: 'End the trip', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.EMOTIONAL_INTELLIGENCE,
        difficulty: client_1.QuestionDifficulty.EASY,
        weight: 3,
        question: 'A passenger speaks rudely to you. What is the best response?',
        options: [
            { optionText: 'Remain professional and respectful', isCorrect: true },
            { optionText: 'Respond rudely', isCorrect: false },
            { optionText: 'Insult the passenger', isCorrect: false },
            { optionText: 'Stop the trip immediately', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.EMOTIONAL_INTELLIGENCE,
        difficulty: client_1.QuestionDifficulty.EASY,
        weight: 3,
        question: 'You are having a difficult personal day before work. What should you do?',
        options: [
            {
                optionText: 'Remain professional while serving customers',
                isCorrect: true,
            },
            { optionText: 'Take frustrations out on passengers', isCorrect: false },
            { optionText: 'Ignore customer requests', isCorrect: false },
            { optionText: 'Complain to every passenger', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.EMOTIONAL_INTELLIGENCE,
        difficulty: client_1.QuestionDifficulty.EASY,
        weight: 3,
        question: 'A customer is visibly upset. What should you do first?',
        options: [
            {
                optionText: 'Listen calmly and understand the concern',
                isCorrect: true,
            },
            { optionText: 'Tell them to relax', isCorrect: false },
            { optionText: 'Ignore them', isCorrect: false },
            { optionText: 'Defend yourself immediately', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.EMOTIONAL_INTELLIGENCE,
        difficulty: client_1.QuestionDifficulty.MEDIUM,
        weight: 5,
        question: 'A passenger continuously criticizes your driving despite following all traffic laws. What is the best approach?',
        options: [
            {
                optionText: 'Remain calm and continue professionally',
                isCorrect: true,
            },
            { optionText: 'Criticize the passenger back', isCorrect: false },
            { optionText: 'End the trip immediately', isCorrect: false },
            { optionText: 'Ignore traffic rules to satisfy them', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.EMOTIONAL_INTELLIGENCE,
        difficulty: client_1.QuestionDifficulty.MEDIUM,
        weight: 5,
        question: 'A customer blames you for an app issue outside your control. What should you do?',
        options: [
            {
                optionText: 'Empathize and direct them to the proper support channel',
                isCorrect: true,
            },
            { optionText: 'Argue with them', isCorrect: false },
            {
                optionText: "Accept responsibility for something you didn't do",
                isCorrect: false,
            },
            { optionText: 'Ignore the complaint', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.EMOTIONAL_INTELLIGENCE,
        difficulty: client_1.QuestionDifficulty.MEDIUM,
        weight: 5,
        question: 'A coworker unfairly blames you for a mistake. What should you do?',
        options: [
            {
                optionText: 'Present facts calmly and professionally',
                isCorrect: true,
            },
            { optionText: 'Shout at them', isCorrect: false },
            { optionText: 'Seek revenge', isCorrect: false },
            { optionText: 'Spread rumors about them', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.EMOTIONAL_INTELLIGENCE,
        difficulty: client_1.QuestionDifficulty.MEDIUM,
        weight: 5,
        question: 'A passenger becomes frustrated because of traffic delays. What should you do?',
        options: [
            {
                optionText: 'Acknowledge their frustration and remain calm',
                isCorrect: true,
            },
            { optionText: 'Tell them traffic is not your problem', isCorrect: false },
            { optionText: 'Argue about who is right', isCorrect: false },
            { optionText: 'Ignore them completely', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.EMOTIONAL_INTELLIGENCE,
        difficulty: client_1.QuestionDifficulty.MEDIUM,
        weight: 5,
        question: 'What is emotional self-control?',
        options: [
            {
                optionText: 'Managing emotions appropriately under pressure',
                isCorrect: true,
            },
            { optionText: 'Never feeling emotions', isCorrect: false },
            { optionText: 'Avoiding people', isCorrect: false },
            { optionText: 'Suppressing every feeling', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.EMOTIONAL_INTELLIGENCE,
        difficulty: client_1.QuestionDifficulty.MEDIUM,
        weight: 5,
        question: 'A customer repeatedly interrupts you while speaking. What should you do?',
        options: [
            { optionText: 'Stay patient and continue respectfully', isCorrect: true },
            { optionText: 'Interrupt them back', isCorrect: false },
            { optionText: 'Ignore them', isCorrect: false },
            { optionText: 'Become hostile', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.EMOTIONAL_INTELLIGENCE,
        difficulty: client_1.QuestionDifficulty.HARD,
        weight: 8,
        question: 'A passenger falsely claims you behaved unprofessionally. What is the best response?',
        options: [
            {
                optionText: 'Remain calm and follow company reporting procedures',
                isCorrect: true,
            },
            { optionText: 'Confront them aggressively', isCorrect: false },
            { optionText: 'Threaten legal action', isCorrect: false },
            { optionText: 'Argue on social media', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.EMOTIONAL_INTELLIGENCE,
        difficulty: client_1.QuestionDifficulty.HARD,
        weight: 8,
        question: 'You feel frustrated after several difficult customers in one day. What should you do?',
        options: [
            {
                optionText: 'Reset emotionally and treat each customer independently',
                isCorrect: true,
            },
            {
                optionText: 'Become less patient with future customers',
                isCorrect: false,
            },
            { optionText: 'Refuse to communicate', isCorrect: false },
            { optionText: 'Take frustrations out on passengers', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.EMOTIONAL_INTELLIGENCE,
        difficulty: client_1.QuestionDifficulty.HARD,
        weight: 8,
        question: 'A passenger makes a personal remark that offends you. What is the most professional response?',
        options: [
            {
                optionText: 'Remain composed and avoid escalating the situation',
                isCorrect: true,
            },
            { optionText: 'Respond with an insult', isCorrect: false },
            { optionText: 'Stop the vehicle and argue', isCorrect: false },
            { optionText: 'Threaten the passenger', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.EMOTIONAL_INTELLIGENCE,
        difficulty: client_1.QuestionDifficulty.HARD,
        weight: 8,
        question: 'Which action best demonstrates emotional maturity?',
        options: [
            {
                optionText: 'Responding thoughtfully instead of reacting impulsively',
                isCorrect: true,
            },
            { optionText: 'Always proving you are right', isCorrect: false },
            { optionText: 'Avoiding accountability', isCorrect: false },
            { optionText: 'Winning every argument', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.EMOTIONAL_INTELLIGENCE,
        difficulty: client_1.QuestionDifficulty.HARD,
        weight: 8,
        question: 'A customer becomes angry over a misunderstanding. What should be your priority?',
        options: [
            {
                optionText: 'De-escalate the situation safely and professionally',
                isCorrect: true,
            },
            { optionText: 'Prove the customer wrong', isCorrect: false },
            { optionText: 'Match their energy', isCorrect: false },
            { optionText: 'Ignore them', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.EMOTIONAL_INTELLIGENCE,
        difficulty: client_1.QuestionDifficulty.MEDIUM,
        weight: 5,
        question: 'Empathy means:',
        options: [
            {
                optionText: "Understanding another person's feelings and perspective",
                isCorrect: true,
            },
            { optionText: 'Agreeing with everyone', isCorrect: false },
            { optionText: 'Avoiding difficult conversations', isCorrect: false },
            { optionText: 'Being emotional all the time', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.EMOTIONAL_INTELLIGENCE,
        difficulty: client_1.QuestionDifficulty.MEDIUM,
        weight: 5,
        question: 'Why is active listening important?',
        options: [
            { optionText: 'It helps people feel understood', isCorrect: true },
            { optionText: 'It shortens conversations', isCorrect: false },
            { optionText: 'It prevents feedback', isCorrect: false },
            { optionText: 'It avoids responsibility', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.EMOTIONAL_INTELLIGENCE,
        difficulty: client_1.QuestionDifficulty.HARD,
        weight: 8,
        question: 'You strongly disagree with a company decision. What is the most professional response?',
        options: [
            {
                optionText: 'Express concerns respectfully through proper channels',
                isCorrect: true,
            },
            { optionText: 'Complain publicly', isCorrect: false },
            { optionText: 'Ignore all future instructions', isCorrect: false },
            { optionText: 'Encourage others to break policy', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.EMOTIONAL_INTELLIGENCE,
        difficulty: client_1.QuestionDifficulty.MEDIUM,
        weight: 5,
        question: 'A passenger is nervous during a trip. What should you do?',
        options: [
            {
                optionText: 'Provide reassurance while remaining professional',
                isCorrect: true,
            },
            { optionText: 'Ignore them', isCorrect: false },
            { optionText: 'Tell them to calm down', isCorrect: false },
            { optionText: 'Mock their concerns', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.EMOTIONAL_INTELLIGENCE,
        difficulty: client_1.QuestionDifficulty.HARD,
        weight: 8,
        question: 'Which behavior is most likely to build trust with passengers?',
        options: [
            { optionText: 'Remaining calm, honest and consistent', isCorrect: true },
            { optionText: 'Making promises you cannot keep', isCorrect: false },
            { optionText: 'Arguing frequently', isCorrect: false },
            { optionText: 'Avoiding communication', isCorrect: false },
        ],
    },
];
//# sourceMappingURL=emotional-intelligence.constant.js.map