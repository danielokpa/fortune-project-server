"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedQuestionBank = seedQuestionBank;
const constants_1 = require("../constants");
async function seedQuestionBank(prisma) {
    console.log('🌱 Seeding Question Bank...');
    const mcqQuestions = [
        ...constants_1.PROFESSIONAL_ATTITUDE_QUESTIONS,
        ...constants_1.EMOTIONAL_INTELLIGENCE_QUESTIONS,
        ...constants_1.CUSTOMER_SERVICE_QUESTIONS,
        ...constants_1.SAFETY_QUESTIONS,
        ...constants_1.AVAILABILITY_QUESTIONS,
    ];
    const questionRecords = mcqQuestions.map((question) => ({
        category: question.category,
        difficulty: question.difficulty,
        question: question.question,
        weight: question.weight,
    }));
    await prisma.questionBank.createMany({
        data: questionRecords,
        skipDuplicates: true,
    });
    const dbQuestions = await prisma.questionBank.findMany({
        select: {
            id: true,
            question: true,
        },
    });
    const questionMap = new Map(dbQuestions.map((q) => [q.question, q.id]));
    const optionRecords = mcqQuestions.flatMap((question) => {
        const questionId = questionMap.get(question.question);
        if (!questionId) {
            throw new Error(`Question not found after insert: ${question.question}`);
        }
        return question.options.map((option) => ({
            questionId,
            optionText: option.optionText,
            isCorrect: option.isCorrect,
        }));
    });
    await prisma.questionBankOption.createMany({
        data: optionRecords,
        skipDuplicates: true,
    });
    if (constants_1.ROLEPLAY_QUESTIONS.length) {
        await prisma.rolePlayBank.createMany({
            data: constants_1.ROLEPLAY_QUESTIONS.map((question) => ({
                category: question.category,
                prompt: question.prompt,
            })),
            skipDuplicates: true,
        });
    }
    console.log(`✅ Seeded ${mcqQuestions.length} MCQ questions`);
    console.log(`✅ Seeded ${optionRecords.length} MCQ options`);
    console.log(`✅ Seeded ${constants_1.ROLEPLAY_QUESTIONS.length} roleplay questions`);
}
//# sourceMappingURL=questions.seed.js.map