"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePlayAnswerDto = exports.DocumentsDto = exports.CandidateDto = void 0;
class CandidateDto {
    fullName;
    email;
    phone;
    whatsapp;
    residentialAddress;
    gender;
    dateOfBirth;
    stateOfOrigin;
    currentLocation;
    highestQualification;
    yearsOfExperience;
}
exports.CandidateDto = CandidateDto;
class DocumentsDto {
    photoUrl;
    cvUrl;
    driversLicenseUrl;
    nyscUrl;
}
exports.DocumentsDto = DocumentsDto;
class RolePlayAnswerDto {
    questionId;
    answer;
}
exports.RolePlayAnswerDto = RolePlayAnswerDto;
//# sourceMappingURL=candidate.dto.js.map