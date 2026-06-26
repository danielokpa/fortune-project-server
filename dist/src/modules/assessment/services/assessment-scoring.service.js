"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssessmentScoringService = void 0;
const common_1 = require("@nestjs/common");
let AssessmentScoringService = class AssessmentScoringService {
    calculate(questions, answerMap) {
        let totalWeight = 0;
        let earnedWeight = 0;
        for (const question of questions) {
            totalWeight += question.weight;
            const correctOption = question.options.find((option) => option.isCorrect);
            const selectedOptionId = answerMap.get(question.id);
            if (selectedOptionId &&
                correctOption &&
                selectedOptionId ===
                    correctOption.id) {
                earnedWeight += question.weight;
            }
        }
        return {
            totalWeight,
            earnedWeight,
            percentage: totalWeight === 0
                ? 0
                : Number(((earnedWeight /
                    totalWeight) *
                    100).toFixed(2)),
        };
    }
};
exports.AssessmentScoringService = AssessmentScoringService;
exports.AssessmentScoringService = AssessmentScoringService = __decorate([
    (0, common_1.Injectable)()
], AssessmentScoringService);
//# sourceMappingURL=assessment-scoring.service.js.map