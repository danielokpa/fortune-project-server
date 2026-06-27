import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { SubmitAssessmentDto } from '../dto/assessment.dto';
import { AssessmentRepository } from '../repositories/assessment.repository';
import { ApplicationSubmissionService } from './application-submission.service';

@Injectable()
export class AssessmentService {
  constructor(
    private readonly repository: AssessmentRepository,
    private readonly submissionService: ApplicationSubmissionService,
  ) {}

  // async submitAssessment(
  //   dto: SubmitAssessmentDto,
  // ) {
  //   return this.submissionService.submitAssessment(
  //     dto,
  //   );
  // }

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
  ) {
    return this.repository.generateAttempt(
      assessmentId,
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