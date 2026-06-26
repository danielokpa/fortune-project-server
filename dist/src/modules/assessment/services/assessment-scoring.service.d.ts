export declare class AssessmentScoringService {
    calculate(questions: any[], answerMap: Map<string, string>): {
        totalWeight: number;
        earnedWeight: number;
        percentage: number;
    };
}
