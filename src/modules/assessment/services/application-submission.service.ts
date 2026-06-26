import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  ApplicationStatus,
  AssessmentStatus,
  DocumentType,
} from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '../../../prisma/prisma.service';
import { AssessmentRepository } from '../repositories/assessment.repository';
import { AssessmentScoringService } from './assessment-scoring.service';
import { SubmitAssessmentDto } from '../dto/assessment.dto';
import { AssessmentEvents } from '../events/assessment.events';

@Injectable()
export class ApplicationSubmissionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly repository: AssessmentRepository,
    private readonly scoringService: AssessmentScoringService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  // async submitAssessment(
  //   dto: SubmitAssessmentDto,
  // ) {
  //   const attempt =
  //     await this.repository.getAttemptForSubmission(
  //       dto.attemptId,
  //     );

  //   if (!attempt) {
  //     throw new NotFoundException(
  //       'Assessment attempt not found',
  //     );
  //   }

  //   const answerMap = new Map(
  //     dto.mcqAnswers.map((answer) => [
  //       answer.questionId,
  //       answer.selectedOptionId,
  //     ]),
  //   );

  //   const score =
  //     this.scoringService.calculate(
  //       attempt.questions,
  //       answerMap,
  //     );

  //   const passed =
  //     score.percentage >=
  //     attempt.passingScore;

  //   const transactionResult =
  //     await this.prisma.$transaction(
  //       async (tx) => {
  //         let candidateCreated = false;

  //         const existingCandidate =
  //           await tx.candidate.findUnique({
  //             where: {
  //               email:
  //                 dto.candidate.email,
  //             },
  //           });

  //         const candidate =
  //           await tx.candidate.upsert({
  //             where: {
  //               email:
  //                 dto.candidate.email,
  //             },

  //             create: {
  //               ...dto.candidate,
  //             },

  //             update: {
  //               ...dto.candidate,
  //             },
  //           });

  //         if (!existingCandidate) {
  //           candidateCreated = true;
  //         }

  //         const existingApplication =
  //           await tx.application.findUnique({
  //             where: {
  //               jobId_candidateId: {
  //                 jobId:
  //                   assessment.jobId,

  //                 candidateId:
  //                   candidate.id,
  //               },
  //             },
  //           });

  //         if (existingApplication) {
  //           throw new ConflictException(
  //             'You already applied for this role',
  //           );
  //         }

  //         const documents: Array<{
  //           candidateId: string;
  //           type: DocumentType;
  //           fileUrl: string;
  //         }> = [];

  //         if (
  //           dto.documents.photoUrl
  //         ) {
  //           documents.push({
  //             candidateId:
  //               candidate.id,

  //             type: DocumentType.PHOTO,

  //             fileUrl:
  //               dto.documents.photoUrl,
  //           });
  //         }

  //         if (
  //           dto.documents.cvUrl
  //         ) {
  //           documents.push({
  //             candidateId:
  //               candidate.id,

  //             type: DocumentType.CV,

  //             fileUrl:
  //               dto.documents.cvUrl,
  //           });
  //         }

  //         if (
  //           dto.documents
  //             .driversLicenseUrl
  //         ) {
  //           documents.push({
  //             candidateId:
  //               candidate.id,

  //             type:
  //               DocumentType.DRIVERS_LICENSE,

  //             fileUrl:
  //               dto.documents
  //                 .driversLicenseUrl,
  //           });
  //         }

  //         if (
  //           dto.documents.nyscUrl
  //         ) {
  //           documents.push({
  //             candidateId:
  //               candidate.id,

  //             type:
  //               DocumentType.NYSC,

  //             fileUrl:
  //               dto.documents.nyscUrl,
  //           });
  //         }

  //         if (documents.length) {
  //           await tx.candidateDocument.createMany({
  //             data: documents,
  //           });
  //         }

  //         const application =
  //           await tx.application.create({
  //             data: {
  //               candidateId:
  //                 candidate.id,

  //               jobId:
  //                 assessment.jobId,

  //               status:
  //                 ApplicationStatus.ASSESSMENT_COMPLETED,
  //             },
  //           });

  //         await tx.applicationStatusHistory.create({
  //           data: {
  //             applicationId:
  //               application.id,

  //             status:
  //               ApplicationStatus.APPLIED,
  //           },
  //         });

  //         const attempt =
  //           await tx.assessmentAttempt.create({
  //             data: {
  //               assessmentId:
  //                 assessment.id,

  //               applicationId:
  //                 application.id,

  //               score:
  //                 score.percentage,

  //               passed,

  //               status:
  //                 AssessmentStatus.COMPLETED,

  //               submittedAt:
  //                 new Date(),
  //             },
  //           });

  //         await tx.assessmentAnswer.createMany({
  //           data:
  //             dto.mcqAnswers.map(
  //               (answer) => ({
  //                 attemptId:
  //                   attempt.id,

  //                 questionId:
  //                   answer.questionId,

  //                 selectedOptionId:
  //                   answer.selectedOptionId,
  //               }),
  //             ),
  //         });

  //         await tx.rolePlayAnswer.createMany({
  //           data:
  //             dto.rolePlayAnswers.map(
  //               (answer) => ({
  //                 attemptId:
  //                   attempt.id,

  //                 questionId:
  //                   answer.questionId,

  //                 answer:
  //                   answer.answer,
  //               }),
  //             ),
  //         });

  //         return {
  //           candidateCreated,

  //           candidateId:
  //             candidate.id,

  //           applicationId:
  //             application.id,

  //           score:
  //             score.percentage,

  //           passed: passed ? 1 : 0,
  //         };
  //       },
  //     );

  //   if (
  //     transactionResult.candidateCreated
  //   ) {
  //     this.eventEmitter.emit(
  //       AssessmentEvents.CANDIDATE_CREATED,
  //       {
  //         candidateId:
  //           transactionResult.candidateId,
  //       },
  //     );
  //   }

  //   this.eventEmitter.emit(
  //     AssessmentEvents.APPLICATION_SUBMITTED,
  //     {
  //       applicationId:
  //         transactionResult.applicationId,
  //     },
  //   );

  //   this.eventEmitter.emit(
  //     AssessmentEvents.ASSESSMENT_COMPLETED,
  //     {
  //       candidateId:
  //         transactionResult.candidateId,

  //       applicationId:
  //         transactionResult.applicationId,

  //       score:
  //         transactionResult.score,

  //       passed:
  //         transactionResult.passed,
  //     },
  //   );

  //   return transactionResult;
  // }
}