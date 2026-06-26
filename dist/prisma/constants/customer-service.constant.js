"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CUSTOMER_SERVICE_QUESTIONS = void 0;
const client_1 = require("@prisma/client");
exports.CUSTOMER_SERVICE_QUESTIONS = [
    {
        category: client_1.QuestionCategory.CUSTOMER_SERVICE,
        difficulty: client_1.QuestionDifficulty.EASY,
        weight: 3,
        question: 'A passenger enters your vehicle carrying heavy luggage. What should you do?',
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
        category: client_1.QuestionCategory.CUSTOMER_SERVICE,
        difficulty: client_1.QuestionDifficulty.EASY,
        weight: 3,
        question: 'A passenger greets you when entering your vehicle. What should you do?',
        options: [
            { optionText: 'Respond politely and professionally', isCorrect: true },
            { optionText: 'Ignore them', isCorrect: false },
            { optionText: 'Continue using your phone', isCorrect: false },
            { optionText: 'Say nothing', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.CUSTOMER_SERVICE,
        difficulty: client_1.QuestionDifficulty.EASY,
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
        category: client_1.QuestionCategory.CUSTOMER_SERVICE,
        difficulty: client_1.QuestionDifficulty.EASY,
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
        category: client_1.QuestionCategory.CUSTOMER_SERVICE,
        difficulty: client_1.QuestionDifficulty.MEDIUM,
        weight: 5,
        question: 'A passenger complains that the vehicle is too warm. What should you do?',
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
        category: client_1.QuestionCategory.CUSTOMER_SERVICE,
        difficulty: client_1.QuestionDifficulty.MEDIUM,
        weight: 5,
        question: 'A passenger asks a question about the service that you cannot answer. What should you do?',
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
        category: client_1.QuestionCategory.CUSTOMER_SERVICE,
        difficulty: client_1.QuestionDifficulty.MEDIUM,
        weight: 5,
        question: 'A passenger appears elderly and struggles to enter the vehicle. What should you do?',
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
        category: client_1.QuestionCategory.CUSTOMER_SERVICE,
        difficulty: client_1.QuestionDifficulty.MEDIUM,
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
        category: client_1.QuestionCategory.CUSTOMER_SERVICE,
        difficulty: client_1.QuestionDifficulty.MEDIUM,
        weight: 5,
        question: 'A passenger requests a short stop during the trip. What should you do?',
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
        category: client_1.QuestionCategory.CUSTOMER_SERVICE,
        difficulty: client_1.QuestionDifficulty.MEDIUM,
        weight: 5,
        question: 'A passenger accidentally spills a drink in the vehicle. What should you do?',
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
        category: client_1.QuestionCategory.CUSTOMER_SERVICE,
        difficulty: client_1.QuestionDifficulty.HARD,
        weight: 8,
        question: 'A passenger forgets a mobile phone in your vehicle. What should you do?',
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
        category: client_1.QuestionCategory.CUSTOMER_SERVICE,
        difficulty: client_1.QuestionDifficulty.HARD,
        weight: 8,
        question: 'A passenger offers a cash tip in exchange for bypassing company policy. What should you do?',
        options: [
            { optionText: 'Politely decline and follow policy', isCorrect: true },
            { optionText: 'Accept if the amount is large', isCorrect: false },
            { optionText: 'Negotiate a larger tip', isCorrect: false },
            { optionText: 'Ignore company rules', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.CUSTOMER_SERVICE,
        difficulty: client_1.QuestionDifficulty.HARD,
        weight: 8,
        question: 'A passenger becomes upset because of a service issue beyond your control. What is the best response?',
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
        category: client_1.QuestionCategory.CUSTOMER_SERVICE,
        difficulty: client_1.QuestionDifficulty.HARD,
        weight: 8,
        question: 'A passenger claims they were charged incorrectly. What should you do?',
        options: [
            {
                optionText: 'Explain that billing issues should be handled through official support',
                isCorrect: true,
            },
            { optionText: 'Offer a personal refund', isCorrect: false },
            { optionText: 'Ignore them', isCorrect: false },
            { optionText: 'Argue about pricing', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.CUSTOMER_SERVICE,
        difficulty: client_1.QuestionDifficulty.HARD,
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
        category: client_1.QuestionCategory.CUSTOMER_SERVICE,
        difficulty: client_1.QuestionDifficulty.MEDIUM,
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
        category: client_1.QuestionCategory.CUSTOMER_SERVICE,
        difficulty: client_1.QuestionDifficulty.MEDIUM,
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
        category: client_1.QuestionCategory.CUSTOMER_SERVICE,
        difficulty: client_1.QuestionDifficulty.HARD,
        weight: 8,
        question: 'A regular passenger requests preferential treatment that violates company policy. What should you do?',
        options: [
            { optionText: 'Apply policy fairly to all customers', isCorrect: true },
            { optionText: 'Make an exception', isCorrect: false },
            { optionText: 'Hide the request', isCorrect: false },
            { optionText: 'Ignore company guidelines', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.CUSTOMER_SERVICE,
        difficulty: client_1.QuestionDifficulty.MEDIUM,
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
        category: client_1.QuestionCategory.CUSTOMER_SERVICE,
        difficulty: client_1.QuestionDifficulty.HARD,
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
];
//# sourceMappingURL=customer-service.constant.js.map