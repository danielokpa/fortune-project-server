export interface AssessmentListResponse {
    id: string;
    slug: string;
    title: string;
}
export interface AssessmentDetailsResponse {
    id: string;
    slug: string;
    title: string;
    durationMinutes: number;
    passingScore: number;
    questions: {
        id: string;
        question: string;
        weight: number;
        options: {
            id: string;
            optionText: string;
        }[];
    }[];
    rolePlay: {
        id: string;
        prompt: string;
    }[];
}
export interface AssessmentScoreResult {
    totalWeight: number;
    earnedWeight: number;
    percentage: number;
}
