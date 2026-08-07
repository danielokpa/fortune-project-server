import { RolePlayCategory, JobRole, RolePlayAnswerType } from '@prisma/client';

export const MANDATORY_ROLEPLAY_QUESTIONS = [
  {
    category: RolePlayCategory.PROFESSIONALISM,
    jobRole: JobRole.DRIVER,
    prompt: 'Have you driven with Uber/Bolt/inDrive?',
    isMandatory: true,
  },
  {
    category: RolePlayCategory.PROFESSIONALISM,
    jobRole: JobRole.DRIVER,
    prompt: 'Do you have an existing account with Uber/Bolt/inDrive? If yes, upload your account(Upload atleast two of these:\n1. Account Status: Showing active/approved status. \n2. Driver Rating: Total lifetime stars (e.g., 4.9 stars).\n3. Trip History: Lifetime number of completed trips.\n4. Acceptance/Cancellation Rates: Metric percentages of accepted or dropped rides.\n5. Profile Picture: Legal name alongside the approved clear selfie.).',
    isMandatory: true,
    answerType: RolePlayAnswerType.TEXT_AND_FILE,
    minFiles: 2,
    maxFile: 5,
  },
]