import { PrismaClient } from '@prisma/client';

import {
  // PROFESSIONAL_ATTITUDE_QUESTIONS,
  // EMOTIONAL_INTELLIGENCE_QUESTIONS,
  // CUSTOMER_SERVICE_QUESTIONS,
  // SAFETY_QUESTIONS,
  // AVAILABILITY_QUESTIONS,
  // ROLEPLAY_QUESTIONS,
  MANDATORY_ROLEPLAY_QUESTIONS
} from '../constants';

export async function seedQuestionBank(prisma: PrismaClient) {
  console.log('🌱 Seeding Question Bank...');

  // const mcqQuestions = [
  //   ...PROFESSIONAL_ATTITUDE_QUESTIONS,
  //   ...EMOTIONAL_INTELLIGENCE_QUESTIONS,
  //   ...CUSTOMER_SERVICE_QUESTIONS,
  //   ...SAFETY_QUESTIONS,
  //   ...AVAILABILITY_QUESTIONS,
  // ];

  /**
   * =====================================================
   * QUESTION BANK
   * =====================================================
   */
  // const questionRecords = mcqQuestions.map((question) => ({
  //   category: question.category,
  //   jobRole: question.jobRole,
  //   difficulty: question.difficulty,
  //   question: question.question,
  //   weight: question.weight,
  // }));

  // await prisma.questionBank.createMany({
  //   data: questionRecords,
  //   skipDuplicates: true,
  // });

  /**
   * =====================================================
   * FETCH CREATED QUESTIONS
   * =====================================================
   */
  // const dbQuestions = await prisma.questionBank.findMany({
  //   select: {
  //     id: true,
  //     question: true,
  //   },
  // });

  // const questionMap = new Map(
  //   dbQuestions.map((q) => [q.question, q.id]),
  // );

  /**
   * =====================================================
   * OPTIONS
   * =====================================================
   */
  // const optionRecords = mcqQuestions.flatMap((question) => {
  //   const questionId = questionMap.get(question.question);

  //   if (!questionId) {
  //     throw new Error(
  //       `Question not found after insert: ${question.question}`,
  //     );
  //   }

  //   return question.options.map((option) => ({
  //     questionId,
  //     optionText: option.optionText,
  //     isCorrect: option.isCorrect,
  //   }));
  // });

  // await prisma.questionBankOption.createMany({
  //   data: optionRecords,
  //   skipDuplicates: true,
  // });

  /**
   * =====================================================
   * ROLEPLAY BANK
   * =====================================================
   */
  // if (ROLEPLAY_QUESTIONS.length) {
  //   await prisma.rolePlayBank.createMany({
  //     data: ROLEPLAY_QUESTIONS.map((question) => ({
  //       category: question.category,
  //       jobRole: question.jobRole,
  //       prompt: question.prompt,
  //     })),
  //     skipDuplicates: true,
  //   });
  // }

  if (MANDATORY_ROLEPLAY_QUESTIONS.length) {
    await prisma.rolePlayBank.createMany({
      data: MANDATORY_ROLEPLAY_QUESTIONS.map((question) => ({
        category: question.category,
        jobRole: question.jobRole,
        prompt: question.prompt,
      })),
      skipDuplicates: true,
    });
  }

  // console.log(
  //   `✅ Seeded ${mcqQuestions.length} MCQ questions`,
  // );

  // console.log(
  //   `✅ Seeded ${optionRecords.length} MCQ options`,
  // );

  console.log(
    `✅ Seeded ${MANDATORY_ROLEPLAY_QUESTIONS.length} roleplay questions`,
  );
}