import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '../../../prisma/prisma.service';
import { ApplicationStatus, AssessmentStatus, DocumentType } from '@prisma/client';
import { SubmitAssessmentDto } from '../dto/assessment.dto';
import { AssessmentRepository } from '../repositories/assessment.repository';
import { ApplicationRepository } from '../../application/repositories/application.repository';
import { ApplicationSubmissionService } from './application-submission.service';
import { AssessmentScoringService } from './assessment-scoring.service';
import { AssessmentEvents } from '../events/assessment.events';

@Injectable()
export class AssessmentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
    private readonly repository: AssessmentRepository,
    private readonly submissionService: ApplicationSubmissionService,
    private readonly scoringService: AssessmentScoringService,
    private readonly applicationRepository: ApplicationRepository
  ) {}

  async submitAssessment(
    dto: SubmitAssessmentDto,
  ) {
    const attempt =
      await this.repository.getAttemptForSubmission(
        dto.attemptId,
      );

    if (!attempt) {
      throw new NotFoundException(
        'Assessment attempt not found',
      );
    }
    if (!attempt.application) {
      throw new NotFoundException(
        'Assessment attempt is not linked to an application.',
      );
    }
    const application = attempt.application;

    if (
      attempt.status ===
      AssessmentStatus.COMPLETED
    ) {
      throw new ConflictException(
        'Assessment has already been submitted.',
      );
    }

    const answerMap = new Map(
      dto.mcqAnswers.map((answer) => [
        answer.questionId,
        answer.selectedOptionId,
      ]),
    );

    const score =
      this.scoringService.calculate(
        attempt.generatedQuestions.map(q => q.question),
        answerMap,
      );

    const passed =
      score.percentage >=
      attempt.assessment.passingScore;

    const transactionResult =
      await this.prisma.$transaction(
        async (tx) => {

          const existingCandidate =
            await tx.candidate.findUnique({
              where: {
                id:
                  application.candidateId,
              },
            });

          if (!existingCandidate) {
            throw new NotFoundException('Candidate not found');
          }

          // const existingApplication =
          //   await tx.application.findUnique({
          //     where: {
          //       jobId_candidateId: {
          //         jobId:
          //           attempt.assessment.jobId,

          //         candidateId:
          //           existingCandidate.id,
          //       },
          //     },
          //   });

          // if (existingApplication) {
          //   throw new ConflictException(
          //     'You already applied for this role',
          //   );
          // }

          const documents: Array<{
            candidateId: string;
            type: DocumentType;
            fileUrl: string;
          }> = [];

          if (
            dto.documents.photoUrl
          ) {
            documents.push({
              candidateId:
                existingCandidate.id,

              type: DocumentType.PHOTO,

              fileUrl:
                dto.documents.photoUrl,
            });
          }

          if (
            dto.documents.cvUrl
          ) {
            documents.push({
              candidateId:
                existingCandidate.id,

              type: DocumentType.CV,

              fileUrl:
                dto.documents.cvUrl,
            });
          }

          if (
            dto.documents
              .driversLicenseUrl
          ) {
            documents.push({
              candidateId:
                existingCandidate.id,

              type:
                DocumentType.DRIVERS_LICENSE,

              fileUrl:
                dto.documents
                  .driversLicenseUrl,
            });
          }

          if (
            dto.documents.nyscUrl
          ) {
            documents.push({
              candidateId:
                existingCandidate.id,

              type:
                DocumentType.NYSC,

              fileUrl:
                dto.documents.nyscUrl,
            });
          }

          if (documents.length) {
            await tx.candidateDocument.createMany({
              data: documents,
            });
          }

          await tx.assessmentAttempt.update({
            where: {
              id: attempt.id,
            },

            data: {
              score: score.percentage,
              passed,
              status: AssessmentStatus.COMPLETED,
              submittedAt: new Date(),
            },
          });

          await tx.assessmentAnswer.createMany({
            data:
              dto.mcqAnswers.map(
                (answer) => ({
                  attemptId:
                    attempt.id,

                  questionId:
                    answer.questionId,

                  selectedOptionId:
                    answer.selectedOptionId,
                }),
              ),
          });

          await tx.rolePlayAnswer.createMany({
            data:
              dto.rolePlayAnswers.map(
                (answer) => ({
                  attemptId:
                    attempt.id,

                  questionId:
                    answer.questionId,

                  answer:
                    answer.answer,
                }),
              ),
          });

          const updatedApplication = 
            await tx.application.update({
              where: {
                jobId_candidateId: {
                  jobId: attempt.assessment.jobId,
                  candidateId: existingCandidate.id,
                },
              },

              data: {
                status: ApplicationStatus.ASSESSMENT_COMPLETED,
              },
            });

          await tx.applicationStatusHistory.create({
            data: {
              applicationId: application.id,
              status: ApplicationStatus.ASSESSMENT_COMPLETED,
            },
          });

          return {
            candidateId: existingCandidate.id,
            applicationId: application.id,
            assessmentId: attempt.assessmentId,
            score: score.percentage,
            passed,
          };
    
        },
      );

    this.eventEmitter.emit(
      AssessmentEvents.ASSESSMENT_COMPLETED,
      {
        candidateId:
          application.candidateId,
        applicationId:
          application.id,
        assessmentId:
          attempt.assessmentId,
        score:
          score.percentage,
        passed,
      },
    );
    // if (
    //   transactionResult.candidateCreated
    // ) {
    //   this.eventEmitter.emit(
    //     AssessmentEvents.CANDIDATE_CREATED,
    //     {
    //       candidateId:
    //         transactionResult.candidateId,
    //     },
    //   );
    // }

    // this.eventEmitter.emit(
    //   AssessmentEvents.APPLICATION_SUBMITTED,
    //   {
    //     applicationId:
    //       transactionResult.applicationId,
    //   },
    // );

    // this.eventEmitter.emit(
    //   AssessmentEvents.ASSESSMENT_COMPLETED,
    //   {
    //     candidateId:
    //       transactionResult.candidateId,

    //     applicationId:
    //       transactionResult.applicationId,

    //     score:
    //       transactionResult.score,

    //     passed:
    //       transactionResult.passed,
    //   },
    // );

    return transactionResult;
  }

  // keep
  async getAssessments() {
    return this.repository.findAll();
  }

  // keep
  async getAssessmentForJob(id: string) {
    const assessment =
      await this.repository.findByIdForJob(id);

    if (!assessment) {
      throw new NotFoundException(
        'Assessment for job not found',
      );
    }

    return {
      id: assessment.id,
      jobId: assessment.jobId,
      slug: assessment.slug,
      title: assessment.title,
      durationMinutes:
        assessment.durationMinutes,
      passingScore:
        assessment.passingScore,
      createdAt: assessment.createdAt,
    };
  }

  /**
   * Generate Assessment Attempt
   *
   * Creates a fresh randomized assessment
   * from QuestionBank and RolePlayBank.
   *
   * Frontend should call this first
   * before rendering questions.
   */
  async generateAssessmentAttempt(
    assessmentId: string,
    applicationId: string,
  ) {
    const application = await this.applicationRepository.findApplication(applicationId);
    if (!application) throw new NotFoundException('Application not found');
  
    return this.repository.generateAttempt(
      assessmentId,
      application.id,
    );
  }

  /**
   * Fetch generated MCQs
   */
  async fetchQuestions(
    attemptId: string,
  ) {
    const attempt =
      await this.repository.getAttemptQuestions(
        attemptId,
      );

    if (!attempt) {
      throw new NotFoundException(
        'Assessment attempt not found',
      );
    }

    const totalMarks =
      attempt.generatedQuestions.reduce(
        (sum, item) =>
          sum + item.question.weight,
        0,
      );

    return {
      attemptId: attempt.id,

      assessmentId:
        attempt.assessment.id,

      title:
        attempt.assessment.title,

      durationMinutes:
        attempt.assessment
          .durationMinutes,

      passingScore:
        attempt.assessment
          .passingScore,

      totalQuestions:
        attempt.generatedQuestions.length,

      totalMarks,

      questions:
        attempt.generatedQuestions.map(
          (item) => ({
            id: item.question.id,

            order:
              item.displayOrder,

            category:
              item.question.category,

            difficulty:
              item.question
                .difficulty,

            question:
              item.question.question,

            weight:
              item.question.weight,

            options:
              item.question.options.map(
                (option) => ({
                  id: option.id,
                  text:
                    option.optionText,
                }),
              ),
          }),
        ),
    };
  }

  /**
   * Fetch generated Roleplays
   */
  async fetchRolePlayQuestions(
    attemptId: string,
  ) {
    const attempt =
      await this.repository.getAttemptRolePlays(
        attemptId,
      );

    if (!attempt) {
      throw new NotFoundException(
        'Assessment attempt not found',
      );
    }

    return {
      attemptId: attempt.id,

      assessmentId:
        attempt.assessment.id,

      title:
        attempt.assessment.title,

      minimumCharacters: 20,

      totalQuestions:
        attempt.generatedRolePlays.length,

      questions:
        attempt.generatedRolePlays.map(
          (item) => ({
            id: item.question.id,

            order:
              item.displayOrder,

            category:
              item.question.category,

            prompt:
              item.question.prompt,
          }),
        ),
    };
  }
}