"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROFESSIONAL_ATTITUDE_QUESTIONS = void 0;
const client_1 = require("@prisma/client");
exports.PROFESSIONAL_ATTITUDE_QUESTIONS = [
    {
        category: client_1.QuestionCategory.PROFESSIONAL_ATTITUDE,
        difficulty: client_1.QuestionDifficulty.EASY,
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
        category: client_1.QuestionCategory.PROFESSIONAL_ATTITUDE,
        difficulty: client_1.QuestionDifficulty.EASY,
        weight: 3,
        question: 'A professional employee should:',
        options: [
            { optionText: 'Arrive on time consistently', isCorrect: true },
            { optionText: 'Come whenever convenient', isCorrect: false },
            { optionText: 'Ignore schedules', isCorrect: false },
            { optionText: 'Leave work early daily', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.PROFESSIONAL_ATTITUDE,
        difficulty: client_1.QuestionDifficulty.EASY,
        weight: 3,
        question: 'Professional communication should be:',
        options: [
            { optionText: 'Clear and respectful', isCorrect: true },
            { optionText: 'Aggressive', isCorrect: false },
            { optionText: 'Dismissive', isCorrect: false },
            { optionText: 'Rude', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.PROFESSIONAL_ATTITUDE,
        difficulty: client_1.QuestionDifficulty.EASY,
        weight: 3,
        question: 'Company policies should be:',
        options: [
            { optionText: 'Followed consistently', isCorrect: true },
            { optionText: 'Ignored if inconvenient', isCorrect: false },
            { optionText: 'Optional', isCorrect: false },
            { optionText: 'Used only when customers complain', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.PROFESSIONAL_ATTITUDE,
        difficulty: client_1.QuestionDifficulty.MEDIUM,
        weight: 5,
        question: 'A passenger requests a favor that violates company policy. What should you do?',
        options: [
            { optionText: 'Follow policy and politely decline', isCorrect: true },
            { optionText: 'Accept to gain a tip', isCorrect: false },
            { optionText: 'Ignore the passenger', isCorrect: false },
            { optionText: 'Argue with the passenger', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.PROFESSIONAL_ATTITUDE,
        difficulty: client_1.QuestionDifficulty.MEDIUM,
        weight: 5,
        question: 'When receiving criticism from a supervisor:',
        options: [
            { optionText: 'Listen objectively and improve', isCorrect: true },
            { optionText: 'Take it personally', isCorrect: false },
            { optionText: 'Ignore it', isCorrect: false },
            { optionText: 'Argue immediately', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.PROFESSIONAL_ATTITUDE,
        difficulty: client_1.QuestionDifficulty.MEDIUM,
        weight: 5,
        question: 'Professional integrity means:',
        options: [
            {
                optionText: 'Doing the right thing even when nobody is watching',
                isCorrect: true,
            },
            { optionText: 'Avoiding responsibility', isCorrect: false },
            { optionText: 'Blaming others', isCorrect: false },
            { optionText: 'Working only when supervised', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.PROFESSIONAL_ATTITUDE,
        difficulty: client_1.QuestionDifficulty.MEDIUM,
        weight: 5,
        question: 'You accidentally damage company property. What is the most professional response?',
        options: [
            { optionText: 'Report it immediately', isCorrect: true },
            { optionText: 'Hide the damage', isCorrect: false },
            { optionText: 'Blame someone else', isCorrect: false },
            { optionText: 'Wait for someone to notice', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.PROFESSIONAL_ATTITUDE,
        difficulty: client_1.QuestionDifficulty.MEDIUM,
        weight: 5,
        question: 'Accountability means:',
        options: [
            { optionText: 'Taking responsibility for your actions', isCorrect: true },
            { optionText: 'Avoiding blame', isCorrect: false },
            { optionText: 'Making excuses', isCorrect: false },
            { optionText: 'Deflecting responsibility', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.PROFESSIONAL_ATTITUDE,
        difficulty: client_1.QuestionDifficulty.MEDIUM,
        weight: 5,
        question: 'A professional driver represents:',
        options: [
            { optionText: 'The company brand', isCorrect: true },
            { optionText: 'Only themselves', isCorrect: false },
            { optionText: 'Nobody', isCorrect: false },
            { optionText: 'Only management', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.PROFESSIONAL_ATTITUDE,
        difficulty: client_1.QuestionDifficulty.HARD,
        weight: 8,
        question: 'A customer offers a personal payment to ignore company procedures. What should you do?',
        options: [
            { optionText: 'Decline and follow procedures', isCorrect: true },
            { optionText: 'Accept because no one will know', isCorrect: false },
            { optionText: 'Accept if the amount is significant', isCorrect: false },
            { optionText: 'Negotiate for more money', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.PROFESSIONAL_ATTITUDE,
        difficulty: client_1.QuestionDifficulty.HARD,
        weight: 8,
        question: 'A coworker repeatedly breaks company rules but asks you not to report it. What is the best action?',
        options: [
            {
                optionText: 'Follow reporting procedures appropriately',
                isCorrect: true,
            },
            { optionText: 'Ignore it', isCorrect: false },
            { optionText: 'Cover for them', isCorrect: false },
            { optionText: 'Warn customers yourself', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.PROFESSIONAL_ATTITUDE,
        difficulty: client_1.QuestionDifficulty.HARD,
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
        category: client_1.QuestionCategory.PROFESSIONAL_ATTITUDE,
        difficulty: client_1.QuestionDifficulty.HARD,
        weight: 8,
        question: 'You discover an error that benefits you financially but harms the company. What should you do?',
        options: [
            { optionText: 'Report the error immediately', isCorrect: true },
            { optionText: 'Keep the benefit', isCorrect: false },
            { optionText: 'Wait and see', isCorrect: false },
            { optionText: 'Tell only close friends', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.PROFESSIONAL_ATTITUDE,
        difficulty: client_1.QuestionDifficulty.HARD,
        weight: 8,
        question: 'A supervisor gives an instruction that appears to conflict with written policy. What is the best response?',
        options: [
            { optionText: 'Seek clarification before proceeding', isCorrect: true },
            { optionText: 'Ignore policy completely', isCorrect: false },
            { optionText: 'Argue publicly', isCorrect: false },
            { optionText: 'Refuse without discussion', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.PROFESSIONAL_ATTITUDE,
        difficulty: client_1.QuestionDifficulty.EASY,
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
        category: client_1.QuestionCategory.PROFESSIONAL_ATTITUDE,
        difficulty: client_1.QuestionDifficulty.MEDIUM,
        weight: 5,
        question: 'Continuous learning is important because:',
        options: [
            { optionText: 'Skills improve over time', isCorrect: true },
            { optionText: 'Training is unnecessary', isCorrect: false },
            { optionText: 'Experience never changes', isCorrect: false },
            { optionText: 'Learning wastes time', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.PROFESSIONAL_ATTITUDE,
        difficulty: client_1.QuestionDifficulty.MEDIUM,
        weight: 5,
        question: 'Strong teamwork contributes to:',
        options: [
            { optionText: 'Better customer experiences', isCorrect: true },
            { optionText: 'More confusion', isCorrect: false },
            { optionText: 'Less accountability', isCorrect: false },
            { optionText: 'Reduced performance', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.PROFESSIONAL_ATTITUDE,
        difficulty: client_1.QuestionDifficulty.HARD,
        weight: 8,
        question: 'What is the primary purpose of workplace ethics?',
        options: [
            { optionText: 'To guide responsible decision-making', isCorrect: true },
            { optionText: 'To increase paperwork', isCorrect: false },
            { optionText: 'To punish employees', isCorrect: false },
            { optionText: 'To limit productivity', isCorrect: false },
        ],
    },
    {
        category: client_1.QuestionCategory.PROFESSIONAL_ATTITUDE,
        difficulty: client_1.QuestionDifficulty.MEDIUM,
        weight: 5,
        question: 'A professional employee is best described as:',
        options: [
            { optionText: 'Reliable, respectful and accountable', isCorrect: true },
            { optionText: 'Talented but inconsistent', isCorrect: false },
            { optionText: 'Popular among coworkers', isCorrect: false },
            { optionText: 'Focused only on earnings', isCorrect: false },
        ],
    },
];
//# sourceMappingURL=professional-attitude.constant.js.map