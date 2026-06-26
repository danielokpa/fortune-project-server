"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AVAILABILITY_QUESTIONS = void 0;
const client_1 = require("@prisma/client");
exports.AVAILABILITY_QUESTIONS = [
    {
        category: client_1.QuestionCategory.AVAILABILITY,
        difficulty: client_1.QuestionDifficulty.EASY,
        weight: 3,
        question: 'Are you willing to work from 7:00am to 4:00pm when required?',
        options: [
            { optionText: 'Yes, I am available for this shift', isCorrect: true },
            { optionText: 'No, I cannot work these hours', isCorrect: false },
            { optionText: 'Only occasionally', isCorrect: false },
            { optionText: 'Only if the hours are changed', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.AVAILABILITY,
        difficulty: client_1.QuestionDifficulty.EASY,
        weight: 3,
        question: 'Apart from salary and bonuses, would you welcome opportunities to earn additional income while working with PeppCruise?',
        options: [
            {
                optionText: 'Yes, I would welcome additional earning opportunities',
                isCorrect: true,
            },
            { optionText: 'No, salary is enough', isCorrect: false },
            { optionText: 'Only occasionally', isCorrect: false },
            { optionText: 'I am unsure', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.AVAILABILITY,
        difficulty: client_1.QuestionDifficulty.EASY,
        weight: 3,
        question: 'If assigned a route in a different part of the city, what would you do?',
        options: [
            {
                optionText: 'Accept the assignment and prepare appropriately',
                isCorrect: true,
            },
            { optionText: 'Refuse immediately', isCorrect: false },
            { optionText: 'Ignore the assignment', isCorrect: false },
            { optionText: 'Accept only if it is close to home', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.AVAILABILITY,
        difficulty: client_1.QuestionDifficulty.MEDIUM,
        weight: 5,
        question: 'Your supervisor asks you to cover a shift for an absent colleague. What is the most professional response?',
        options: [
            {
                optionText: 'Assess your availability and assist if possible',
                isCorrect: true,
            },
            { optionText: 'Refuse without consideration', isCorrect: false },
            { optionText: 'Ignore the request', isCorrect: false },
            { optionText: 'Complain publicly about the request', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.AVAILABILITY,
        difficulty: client_1.QuestionDifficulty.MEDIUM,
        weight: 5,
        question: 'Work schedules may occasionally change due to operational demands. What is the best approach?',
        options: [
            {
                optionText: 'Remain flexible within reasonable limits',
                isCorrect: true,
            },
            { optionText: 'Reject all schedule changes', isCorrect: false },
            { optionText: 'Arrive whenever convenient', isCorrect: false },
            { optionText: 'Ignore communication about schedules', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.AVAILABILITY,
        difficulty: client_1.QuestionDifficulty.MEDIUM,
        weight: 5,
        question: 'You are asked to attend a mandatory training session on your off day. What should you do?',
        options: [
            {
                optionText: 'Attend if required and communicate any genuine conflicts',
                isCorrect: true,
            },
            { optionText: 'Ignore the invitation', isCorrect: false },
            { optionText: 'Refuse without explanation', isCorrect: false },
            { optionText: 'Attend only if pressured', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.AVAILABILITY,
        difficulty: client_1.QuestionDifficulty.HARD,
        weight: 8,
        question: 'A family event conflicts with an already scheduled work shift. What is the most professional course of action?',
        options: [
            {
                optionText: 'Notify management early and follow company procedures',
                isCorrect: true,
            },
            { optionText: 'Fail to show up', isCorrect: false },
            {
                optionText: 'Inform management after the shift starts',
                isCorrect: false,
            },
            { optionText: 'Turn off your phone', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.AVAILABILITY,
        difficulty: client_1.QuestionDifficulty.HARD,
        weight: 8,
        question: 'Which quality best demonstrates work readiness?',
        options: [
            { optionText: 'Reliability and consistency', isCorrect: true },
            { optionText: 'Working only when convenient', isCorrect: false },
            { optionText: 'Avoiding responsibility', isCorrect: false },
            { optionText: 'Ignoring schedules', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.AVAILABILITY,
        difficulty: client_1.QuestionDifficulty.HARD,
        weight: 8,
        question: 'If business demand increases during holidays, what mindset is most valuable?',
        options: [
            {
                optionText: 'Being prepared for increased operational needs',
                isCorrect: true,
            },
            { optionText: 'Refusing all additional work', isCorrect: false },
            { optionText: 'Ignoring company communications', isCorrect: false },
            {
                optionText: 'Avoiding passengers during busy periods',
                isCorrect: false,
            },
        ],
    },
    {
        category: client_1.QuestionCategory.AVAILABILITY,
        difficulty: client_1.QuestionDifficulty.HARD,
        weight: 8,
        question: "A candidate's long-term success at PeppCruise depends most on:",
        options: [
            {
                optionText: 'Professionalism, reliability and adaptability',
                isCorrect: true,
            },
            { optionText: 'Luck', isCorrect: false },
            { optionText: 'Avoiding responsibility', isCorrect: false },
            { optionText: 'Working only under supervision', isCorrect: false },
        ],
    },
];
//# sourceMappingURL=availability.constant.js.map