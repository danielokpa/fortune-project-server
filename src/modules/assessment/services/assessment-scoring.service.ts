import { Injectable } from '@nestjs/common';

@Injectable()
export class AssessmentScoringService {
  calculate(
    questions: any[],
    answerMap: Map<string, string>,
  ) {
    let totalWeight = 0;

    let earnedWeight = 0;

    for (const question of questions) {
      totalWeight += question.weight;

      const correctOption =
        question.options.find(
          (option) => option.isCorrect,
        );

      const selectedOptionId =
        answerMap.get(question.id);

      if (
        selectedOptionId &&
        correctOption &&
        selectedOptionId ===
          correctOption.id
      ) {
        earnedWeight += question.weight;
      }
    }

    return {
      totalWeight,

      earnedWeight,

      percentage:
        totalWeight === 0
          ? 0
          : Number(
              (
                (earnedWeight /
                  totalWeight) *
                100
              ).toFixed(2),
            ),
    };
  }
}