export declare class AssessmentListItemDto {
    slug: string;
    title: string;
}
export declare class AssessmentOptionDto {
    id: string;
    optionText: string;
}
export declare class AssessmentQuestionDto {
    id: string;
    question: string;
    weight: number;
    options: AssessmentOptionDto[];
}
export declare class RolePlayQuestionDto {
    id: string;
    prompt: string;
}
export declare class AssessmentDetailsDto {
    id: string;
    slug: string;
    title: string;
    durationMinutes: number;
    passingScore: number;
    questions: AssessmentQuestionDto[];
    rolePlay: RolePlayQuestionDto[];
}
export declare class CandidateDto {
    fullName: string;
    email: string;
    phone: string;
    whatsapp?: string;
    residentialAddress?: string;
    gender?: string;
    stateOfOrigin?: string;
    currentLocation?: string;
    highestQualification?: string;
    yearsOfExperience?: number;
}
export declare class DocumentsDto {
    photoUrl?: string;
    cvUrl?: string;
    driversLicenseUrl?: string;
    nyscUrl?: string;
}
export declare class McqAnswerDto {
    questionId: string;
    selectedOptionId: string;
}
export declare class RolePlayAnswerDto {
    questionId: string;
    answer: string;
}
export declare class SubmitAssessmentDto {
    candidate: CandidateDto;
    documents: DocumentsDto;
    attemptId: string;
    mcqAnswers: McqAnswerDto[];
    rolePlayAnswers: RolePlayAnswerDto[];
}
export declare class AssessmentQuestionResponseDto {
    id: string;
    order: number;
    category: string;
    question: string;
    weight: number;
    options: {
        id: string;
        text: string;
    }[];
}
export declare class RolePlayQuestionResponseDto {
    id: string;
    order: number;
    prompt: string;
}
export declare class AssessmentQuestionsResponseDto {
    assessmentId: string;
    title: string;
    durationMinutes: number;
    passingScore: number;
    totalQuestions: number;
    totalMarks: number;
    questions: AssessmentQuestionResponseDto[];
}
export declare class RolePlayQuestionsResponseDto {
    assessmentId: string;
    title: string;
    minimumCharacters: number;
    totalQuestions: number;
    questions: RolePlayQuestionResponseDto[];
}
