import { QuestionCategory, QuestionDifficulty, JobRole } from '@prisma/client';
export const AVAILABILITY_QUESTIONS = [
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question: 'Are you willing to work from 7:00am to 4:00pm when required?',
    options: [
      { optionText: 'No, I cannot work these hours', isCorrect: false },
      { optionText: 'Yes, I am available for this shift', isCorrect: true },
      { optionText: 'Only occasionally', isCorrect: false },
      { optionText: 'Only if the hours are changed', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'Apart from salary and bonuses, would you welcome opportunities to earn additional income while working with PeppCruise?',
    options: [
      { optionText: 'No, salary is enough', isCorrect: false },
      { optionText: 'Only occasionally', isCorrect: false },
      { optionText: 'I am unsure', isCorrect: false },
      {
        optionText: 'Yes, I would welcome additional earning opportunities',
        isCorrect: true,
      },
    ],
  },

  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'If assigned a route in a different part of the city, what would you do?',
    options: [
      { optionText: 'Refuse immediately', isCorrect: false },
      {
        optionText: 'Accept the assignment and prepare appropriately',
        isCorrect: true,
      },
      { optionText: 'Ignore the assignment', isCorrect: false },
      { optionText: 'Accept only if it is close to home', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'Your supervisor asks you to cover a shift for an absent colleague. What is the most professional response?',
    options: [
      { optionText: 'Refuse without consideration', isCorrect: false },
      { optionText: 'Ignore the request', isCorrect: false },
      {
        optionText: 'Assess your availability and assist if possible',
        isCorrect: true,
      },
      { optionText: 'Complain publicly about the request', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'Work schedules may occasionally change due to operational demands. What is the best approach?',
    options: [
      { optionText: 'Reject all schedule changes', isCorrect: false },
      { optionText: 'Arrive whenever convenient', isCorrect: false },
      {
        optionText: 'Remain flexible within reasonable limits',
        isCorrect: true,
      },
      { optionText: 'Ignore communication about schedules', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You are asked to attend a mandatory training session on your off day. What should you do?',
    options: [
      { optionText: 'Ignore the invitation', isCorrect: false },
      {
        optionText: 'Attend if required and communicate any genuine conflicts',
        isCorrect: true,
      },
      { optionText: 'Refuse without explanation', isCorrect: false },
      { optionText: 'Attend only if pressured', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A family event conflicts with an already scheduled work shift. What is the most professional course of action?',
    options: [
      { optionText: 'Fail to show up', isCorrect: false },
      {
        optionText: 'Inform management after the shift starts',
        isCorrect: false,
      },
      { optionText: 'Turn off your phone', isCorrect: false },
      {
        optionText: 'Notify management early and follow company procedures',
        isCorrect: true,
      },
    ],
  },

  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question: 'Which quality best demonstrates work readiness?',
    options: [
      { optionText: 'Working only when convenient', isCorrect: false },
      { optionText: 'Reliability and consistency', isCorrect: true },
      { optionText: 'Avoiding responsibility', isCorrect: false },
      { optionText: 'Ignoring schedules', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'If business demand increases during holidays, what mindset is most valuable?',
    options: [
      { optionText: 'Refusing all additional work', isCorrect: false },
      { optionText: 'Ignoring company communications', isCorrect: false },
      {
        optionText: 'Being prepared for increased operational needs',
        isCorrect: true,
      },
      {
        optionText: 'Avoiding passengers during busy periods',
        isCorrect: false,
      },
    ],
  },

  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.DRIVER,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question: "A candidate's long-term success at PeppCruise depends most on:",
    options: [
      { optionText: 'Avoiding responsibility', isCorrect: false },
      {
        optionText: 'Professionalism, reliability and adaptability',
        isCorrect: true,
      },
      { optionText: 'Luck', isCorrect: false },
      { optionText: 'Working only under supervision', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'Are you willing to work rotating shifts, including evenings, when required?',
    options: [
      { optionText: 'I am unsure', isCorrect: false },
      { optionText: 'No, I can only work mornings', isCorrect: false },
      { optionText: 'Only if I choose the days', isCorrect: false },
      {
        optionText: 'Yes, I am available for rotating shifts',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'Apart from your base salary, would you welcome opportunities to handle extra support shifts for additional pay?',
    options: [
      {
        optionText: 'Yes, I would welcome additional shift opportunities',
        isCorrect: true,
      },
      { optionText: 'Only occasionally', isCorrect: false },
      { optionText: 'No, my salary is enough', isCorrect: false },
      { optionText: 'I am unsure', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'If assigned to a different support queue, such as chat instead of calls, what would you do?',
    options: [
      { optionText: 'Ignore the assignment', isCorrect: false },
      { optionText: 'Refuse immediately', isCorrect: false },
      {
        optionText: 'Accept the assignment and adapt accordingly',
        isCorrect: true,
      },
      { optionText: 'Accept only if it\'s easier', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'Are you willing to work weekends when the support team needs coverage?',
    options: [
      { optionText: 'Only if paid extra every time', isCorrect: false },
      {
        optionText: 'Yes, I am available to work weekends when needed',
        isCorrect: true,
      },
      { optionText: 'No, I cannot work weekends', isCorrect: false },
      { optionText: 'I am unsure', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'Your manager asks if you can start your shift 30 minutes early during a busy period. What is your response?',
    options: [
      { optionText: 'Ignore the request', isCorrect: false },
      { optionText: 'Arrive late instead', isCorrect: false },
      { optionText: 'Refuse without explanation', isCorrect: false },
      {
        optionText: 'Agree if reasonably possible and communicate clearly',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'Would you be comfortable handling support tickets outside your usual specialty when needed?',
    options: [
      { optionText: 'I am unsure', isCorrect: false },
      {
        optionText: 'Yes, I am willing to assist wherever needed',
        isCorrect: true,
      },
      { optionText: 'No, I will only handle my specialty', isCorrect: false },
      { optionText: 'Only if instructed repeatedly', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'Your supervisor asks you to cover a colleague\'s support shift on short notice. What is the most professional response?',
    options: [
      {
        optionText: 'Assess your availability and assist if possible',
        isCorrect: true,
      },
      { optionText: 'Complain publicly about the request', isCorrect: false },
      { optionText: 'Ignore the request', isCorrect: false },
      { optionText: 'Refuse without consideration', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'Support schedules may occasionally change due to call volume demands. What is the best approach?',
    options: [
      { optionText: 'Arrive whenever convenient', isCorrect: false },
      {
        optionText: 'Remain flexible within reasonable limits',
        isCorrect: true,
      },
      { optionText: 'Reject all schedule changes', isCorrect: false },
      { optionText: 'Ignore communication about schedules', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You\'re asked to attend a mandatory product training session on your day off. What should you do?',
    options: [
      { optionText: 'Refuse without explanation', isCorrect: false },
      { optionText: 'Ignore the invitation', isCorrect: false },
      { optionText: 'Attend only if pressured', isCorrect: false },
      {
        optionText: 'Attend if required and communicate any genuine conflicts',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A scheduling conflict arises between two support shifts you were assigned. What should you do?',
    options: [
      {
        optionText: 'Flag it promptly so it can be resolved',
        isCorrect: true,
      },
      { optionText: 'Wait for someone else to notice', isCorrect: false },
      { optionText: 'Skip both shifts', isCorrect: false },
      { optionText: 'Pick one shift and ignore the other silently', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You\'re informed your shift will extend by two hours due to high ticket volume. What should you do?',
    options: [
      { optionText: 'Refuse without discussion', isCorrect: false },
      { optionText: 'Leave at your original time regardless', isCorrect: false },
      {
        optionText: 'Accept if possible and confirm your availability',
        isCorrect: true,
      },
      { optionText: 'Ignore the notice', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You are asked to be on standby for an upcoming product launch that may require extra hours. What should you do?',
    options: [
      {
        optionText: 'Confirm your availability and prepare accordingly',
        isCorrect: true,
      },
      { optionText: 'Agree but not show up', isCorrect: false },
      { optionText: 'Decline without reason', isCorrect: false },
      { optionText: 'Ignore the request', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A new shift pattern is being trialed and you\'re asked to participate. What is the best response?',
    options: [
      { optionText: 'Refuse to try anything new', isCorrect: false },
      {
        optionText: 'Approach it with an open and flexible mindset',
        isCorrect: true,
      },
      { optionText: 'Participate half-heartedly', isCorrect: false },
      { optionText: 'Complain before trying it', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You\'re asked whether you can be reached after hours for urgent escalations. What should you do?',
    options: [
      { optionText: 'Avoid answering the question', isCorrect: false },
      { optionText: 'Agree but ignore calls', isCorrect: false },
      {
        optionText: 'Confirm your availability within reasonable limits',
        isCorrect: true,
      },
      { optionText: 'Say you\'re never reachable after hours', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'Management is considering split shifts to cover peak call times. What mindset is most valuable?',
    options: [
      {
        optionText: 'Openness to adapting your schedule for operational needs',
        isCorrect: true,
      },
      { optionText: 'Indifference to operational needs', isCorrect: false },
      { optionText: 'Insisting on a fixed routine only', isCorrect: false },
      { optionText: 'Resistance to any schedule changes', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You\'re asked to swap shifts with a colleague who has a personal emergency. What should you do?',
    options: [
      { optionText: 'Ignore the request', isCorrect: false },
      { optionText: 'Refuse immediately without considering it', isCorrect: false },
      { optionText: 'Agree but cancel later without notice', isCorrect: false },
      {
        optionText: 'Consider the request and help if your schedule allows',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'Your team is short-staffed for an upcoming weekend due to planned leave. What is the best response?',
    options: [
      { optionText: 'Assume someone else will cover it', isCorrect: false },
      { optionText: 'Take leave as well without notice', isCorrect: false },
      {
        optionText: 'Offer to help cover if you\'re available',
        isCorrect: true,
      },
      { optionText: 'Ignore the staffing gap', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You\'re notified of a schedule change with only a day\'s notice. What should you do?',
    options: [
      { optionText: 'Ignore the notification', isCorrect: false },
      { optionText: 'Assume it doesn\'t apply to you', isCorrect: false },
      {
        optionText: 'Confirm your availability promptly and adjust if possible',
        isCorrect: true,
      },
      { optionText: 'Refuse to acknowledge the change', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A high-priority client issue requires support coverage outside normal hours. What should you do?',
    options: [
      { optionText: 'Delegate without informing anyone', isCorrect: false },
      {
        optionText: 'Make yourself available if reasonably possible',
        isCorrect: true,
      },
      { optionText: 'Decline without considering the urgency', isCorrect: false },
      { optionText: 'Ignore the request', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You\'re asked to take on a temporary assignment in a different support team for a few weeks. What should you do?',
    options: [
      {
        optionText: 'Approach the temporary assignment professionally and adaptably',
        isCorrect: true,
      },
      { optionText: 'Treat it half-heartedly since it\'s temporary', isCorrect: false },
      { optionText: 'Refuse the temporary assignment outright', isCorrect: false },
      { optionText: 'Ignore the request', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A family event conflicts with an already scheduled shift. What is the most professional course of action?',
    options: [
      { optionText: 'Fail to show up', isCorrect: false },
      { optionText: 'Inform management after the shift starts', isCorrect: false },
      { optionText: 'Turn off your phone', isCorrect: false },
      {
        optionText: 'Notify management early and follow company procedures',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'Which quality best demonstrates work readiness in a support role?',
    options: [
      { optionText: 'Working only when convenient', isCorrect: false },
      { optionText: 'Ignoring schedules', isCorrect: false },
      {
        optionText: 'Reliability and consistency',
        isCorrect: true,
      },
      { optionText: 'Avoiding responsibility', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'If support demand spikes during a major holiday sale, what mindset is most valuable?',
    options: [
      {
        optionText: 'Being prepared for increased operational needs',
        isCorrect: true,
      },
      { optionText: 'Ignoring company communications', isCorrect: false },
      { optionText: 'Refusing all additional work', isCorrect: false },
      { optionText: 'Avoiding customers during busy periods', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A candidate\'s long-term success in customer support depends most on:',
    options: [
      { optionText: 'Avoiding responsibility', isCorrect: false },
      {
        optionText: 'Professionalism, reliability and adaptability',
        isCorrect: true,
      },
      { optionText: 'Luck', isCorrect: false },
      { optionText: 'Working only under supervision', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'You\'re repeatedly asked to extend shifts during a prolonged system outage. What should you do?',
    options: [
      { optionText: 'Disappear without notice', isCorrect: false },
      { optionText: 'Agree to everything regardless of your limits', isCorrect: false },
      { optionText: 'Refuse all extensions outright', isCorrect: false },
      {
        optionText: 'Communicate your honest availability while supporting the team where possible',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'You discover your availability was misreported in the system, affecting your schedule. What should you do?',
    options: [
      {
        optionText: 'Promptly correct it through proper channels',
        isCorrect: true,
      },
      { optionText: 'Complain without addressing it formally', isCorrect: false },
      { optionText: 'Leave it uncorrected', isCorrect: false },
      { optionText: 'Work around it without telling anyone', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'You\'re asked to be part of an on-call rotation for emergency escalations. What should you do?',
    options: [
      { optionText: 'Agree without considering your actual capacity', isCorrect: false },
      { optionText: 'Refuse without discussion', isCorrect: false },
      {
        optionText: 'Evaluate your capacity honestly and respond accordingly',
        isCorrect: true,
      },
      { optionText: 'Accept but ignore on-call duties', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'Two team leads request your availability for overlapping urgent shifts. What should you do?',
    options: [
      { optionText: 'Pick one without informing the other', isCorrect: false },
      { optionText: 'Ignore both requests', isCorrect: false },
      { optionText: 'Agree to both and miss one', isCorrect: false },
      {
        optionText: 'Communicate the conflict and let them coordinate priority',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'Your personal circumstances change, affecting your long-term shift availability. What should you do?',
    options: [
      {
        optionText: 'Communicate the change to management as early as possible',
        isCorrect: true,
      },
      { optionText: 'Keep it to yourself indefinitely', isCorrect: false },
      { optionText: 'Wait until it causes a problem', isCorrect: false },
      { optionText: 'Quit without explanation', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A company-wide policy now requires occasional weekend on-call duty. What is the best response?',
    options: [
      { optionText: 'Complain without engaging with it', isCorrect: false },
      { optionText: 'Ignore the policy change', isCorrect: false },
      { optionText: 'Refuse to comply with the new policy', isCorrect: false },
      {
        optionText: 'Adjust your expectations and plan accordingly',
        isCorrect: true,
      },
    ],
  },

  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'Are you willing to work standard office hours, with occasional early starts for executive meetings?',
    options: [
      {
        optionText: 'Yes, I am available for this kind of schedule',
        isCorrect: true,
      },
      { optionText: 'Only if compensated separately every time', isCorrect: false },
      { optionText: 'No, I can only work fixed hours', isCorrect: false },
      { optionText: 'I am unsure', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'Apart from your salary, would you welcome opportunities to take on additional responsibilities for growth?',
    options: [
      { optionText: 'No, my role is enough', isCorrect: false },
      { optionText: 'Only occasionally', isCorrect: false },
      { optionText: 'I am unsure', isCorrect: false },
      {
        optionText: 'Yes, I would welcome additional opportunities',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'If asked to support a different department temporarily, what would you do?',
    options: [
      { optionText: 'Refuse immediately', isCorrect: false },
      { optionText: 'Accept only if convenient', isCorrect: false },
      {
        optionText: 'Accept the assignment and prepare appropriately',
        isCorrect: true,
      },
      { optionText: 'Ignore the assignment', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'Are you available to stay slightly later when an executive has a last-minute deadline?',
    options: [
      { optionText: 'I am unsure', isCorrect: false },
      { optionText: 'Only with a week\'s notice', isCorrect: false },
      {
        optionText: 'Yes, I am willing to stay later when reasonably needed',
        isCorrect: true,
      },
      { optionText: 'No, I leave exactly on time always', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'Your manager asks if you can come in slightly earlier for a board meeting setup. What is your response?',
    options: [
      { optionText: 'Ignore the request', isCorrect: false },
      { optionText: 'Arrive at the usual time regardless', isCorrect: false },
      { optionText: 'Refuse without explanation', isCorrect: false },
      {
        optionText: 'Agree if reasonably possible and confirm clearly',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'Would you be comfortable assisting with tasks outside your usual job description occasionally?',
    options: [
      { optionText: 'Only if forced', isCorrect: false },
      { optionText: 'I am unsure', isCorrect: false },
      {
        optionText: 'Yes, I am willing to assist where reasonably needed',
        isCorrect: true,
      },
      { optionText: 'No, I will only do my listed duties', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'Your manager asks you to cover for a colleague\'s administrative duties while they\'re on leave. What is the most professional response?',
    options: [
      { optionText: 'Ignore the request', isCorrect: false },
      { optionText: 'Complain publicly about the extra work', isCorrect: false },
      { optionText: 'Refuse without consideration', isCorrect: false },
      {
        optionText: 'Assess your capacity and assist if possible',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'Office schedules may occasionally shift due to executive travel needs. What is the best approach?',
    options: [
      {
        optionText: 'Remain flexible within reasonable limits',
        isCorrect: true,
      },
      { optionText: 'Reject all schedule changes', isCorrect: false },
      { optionText: 'Ignore communication about schedule changes', isCorrect: false },
      { optionText: 'Arrive whenever convenient', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You\'re asked to attend a mandatory compliance training on a non-working day. What should you do?',
    options: [
      { optionText: 'Attend only if pressured', isCorrect: false },
      { optionText: 'Refuse without explanation', isCorrect: false },
      { optionText: 'Ignore the invitation', isCorrect: false },
      {
        optionText: 'Attend if required and communicate any genuine conflicts',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'Two executives request your support for overlapping meetings. What should you do?',
    options: [
      { optionText: 'Pick one without informing the other', isCorrect: false },
      {
        optionText: 'Flag the conflict promptly so priorities can be set',
        isCorrect: true,
      },
      { optionText: 'Ignore both requests', isCorrect: false },
      { optionText: 'Agree to both and miss one', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You\'re informed a quarterly reporting deadline will require extended hours this week. What should you do?',
    options: [
      { optionText: 'Leave at your usual time regardless', isCorrect: false },
      { optionText: 'Ignore the notice', isCorrect: false },
      { optionText: 'Refuse without discussion', isCorrect: false },
      {
        optionText: 'Accept if possible and confirm your availability',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You\'re asked to be reachable during an executive\'s overseas trip for urgent matters. What should you do?',
    options: [
      { optionText: 'Say you\'re never reachable after hours', isCorrect: false },
      {
        optionText: 'Confirm your availability within reasonable limits',
        isCorrect: true,
      },
      { optionText: 'Agree but ignore messages', isCorrect: false },
      { optionText: 'Avoid answering the question', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A new flexible scheduling system is being trialed in the office. What is the best response?',
    options: [
      { optionText: 'Participate half-heartedly', isCorrect: false },
      {
        optionText: 'Approach it with an open and flexible mindset',
        isCorrect: true,
      },
      { optionText: 'Complain before trying it', isCorrect: false },
      { optionText: 'Refuse to try anything new', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A colleague asks to swap a workday with you due to a personal emergency. What should you do?',
    options: [
      { optionText: 'Ignore the request', isCorrect: false },
      {
        optionText: 'Consider the request and help if your schedule allows',
        isCorrect: true,
      },
      { optionText: 'Agree but cancel later without notice', isCorrect: false },
      { optionText: 'Refuse immediately without considering it', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'The office is short-staffed for an upcoming high-stakes event due to planned leave. What is the best response?',
    options: [
      { optionText: 'Ignore the staffing gap', isCorrect: false },
      {
        optionText: 'Offer to help cover if you\'re available',
        isCorrect: true,
      },
      { optionText: 'Take leave as well without notice', isCorrect: false },
      { optionText: 'Assume someone else will cover it', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'Your work schedule is changed by the office with only a day\'s notice. What should you do?',
    options: [
      {
        optionText: 'Confirm your availability promptly and adjust if possible',
        isCorrect: true,
      },
      { optionText: 'Ignore the notification', isCorrect: false },
      { optionText: 'Assume it doesn\'t apply to you', isCorrect: false },
      { optionText: 'Refuse to acknowledge the change', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'An urgent executive request requires support outside normal hours. What should you do?',
    options: [
      { optionText: 'Delegate without informing anyone', isCorrect: false },
      { optionText: 'Ignore the request', isCorrect: false },
      {
        optionText: 'Make yourself available if reasonably possible',
        isCorrect: true,
      },
      { optionText: 'Decline without considering the urgency', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You\'re asked to take on a temporary assignment supporting a different executive for a few weeks. What should you do?',
    options: [
      { optionText: 'Refuse the temporary assignment outright', isCorrect: false },
      {
        optionText: 'Approach the temporary assignment professionally and adaptably',
        isCorrect: true,
      },
      { optionText: 'Treat it half-heartedly since it\'s temporary', isCorrect: false },
      { optionText: 'Ignore the request', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'Your work schedule conflicts with a personal appointment you can reschedule. What should you do?',
    options: [
      { optionText: 'Ignore your schedule obligations', isCorrect: false },
      { optionText: 'Skip work without notice', isCorrect: false },
      { optionText: 'Demand the schedule be changed immediately', isCorrect: false },
      {
        optionText: 'Reschedule the appointment if reasonably possible',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You\'re asked about your long-term availability for occasional travel with executives. What should you do?',
    options: [
      { optionText: 'Avoid answering directly', isCorrect: false },
      { optionText: 'Agree without meaning it', isCorrect: false },
      { optionText: 'Refuse to discuss it', isCorrect: false },
      {
        optionText: 'Give an honest, clear answer about your availability',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A family event conflicts with an already scheduled work commitment. What is the most professional course of action?',
    options: [
      {
        optionText: 'Notify management early and follow company procedures',
        isCorrect: true,
      },
      { optionText: 'Fail to show up', isCorrect: false },
      { optionText: 'Turn off your phone', isCorrect: false },
      { optionText: 'Inform management after the commitment starts', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'Which quality best demonstrates work readiness in an administrative role?',
    options: [
      {
        optionText: 'Reliability and consistency',
        isCorrect: true,
      },
      { optionText: 'Working only when convenient', isCorrect: false },
      { optionText: 'Ignoring schedules', isCorrect: false },
      { optionText: 'Avoiding responsibility', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'If administrative demand spikes during a major company event, what mindset is most valuable?',
    options: [
      { optionText: 'Ignoring company communications', isCorrect: false },
      {
        optionText: 'Being prepared for increased operational needs',
        isCorrect: true,
      },
      { optionText: 'Avoiding colleagues during busy periods', isCorrect: false },
      { optionText: 'Refusing all additional work', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A candidate\'s long-term success in an executive support role depends most on:',
    options: [
      {
        optionText: 'Professionalism, reliability and adaptability',
        isCorrect: true,
      },
      { optionText: 'Working only under supervision', isCorrect: false },
      { optionText: 'Avoiding responsibility', isCorrect: false },
      { optionText: 'Luck', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'You\'re repeatedly asked to extend hours during a prolonged executive transition period. What should you do?',
    options: [
      {
        optionText: 'Communicate your honest availability while supporting the team where possible',
        isCorrect: true,
      },
      { optionText: 'Disappear without notice', isCorrect: false },
      { optionText: 'Agree to everything regardless of your limits', isCorrect: false },
      { optionText: 'Refuse all extensions outright', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'Two senior executives request your availability for overlapping urgent tasks. What should you do?',
    options: [
      {
        optionText: 'Communicate the conflict and let them coordinate priority',
        isCorrect: true,
      },
      { optionText: 'Ignore both requests', isCorrect: false },
      { optionText: 'Agree to both and miss one', isCorrect: false },
      { optionText: 'Pick one without informing the other', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'Your personal circumstances change, affecting your long-term work availability. What should you do?',
    options: [
      {
        optionText: 'Communicate the change to management as early as possible',
        isCorrect: true,
      },
      { optionText: 'Quit without explanation', isCorrect: false },
      { optionText: 'Keep it to yourself indefinitely', isCorrect: false },
      { optionText: 'Wait until it causes a problem', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'You\'re asked to be part of a rotation providing after-hours support for urgent approvals. What should you do?',
    options: [
      { optionText: 'Accept but ignore the duty', isCorrect: false },
      {
        optionText: 'Evaluate your capacity honestly and respond accordingly',
        isCorrect: true,
      },
      { optionText: 'Refuse without discussion', isCorrect: false },
      { optionText: 'Agree without considering your actual capacity', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'You\'re asked to confirm availability for a critical year-end reporting period. What should you do?',
    options: [
      { optionText: 'Delay your response indefinitely', isCorrect: false },
      { optionText: 'Give a vague non-answer', isCorrect: false },
      {
        optionText: 'Respond honestly and promptly so coverage can be planned',
        isCorrect: true,
      },
      { optionText: 'Ignore the request entirely', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'An executive\'s last-minute international trip requires you to extend your working hours significantly with short notice. What should you do?',
    options: [
      { optionText: 'Refuse outright without discussion', isCorrect: false },
      { optionText: 'Agree without considering your actual limits', isCorrect: false },
      { optionText: 'Avoid responding to the request', isCorrect: false },
      {
        optionText: 'Communicate honestly about what you can manage and support where possible',
        isCorrect: true,
      },
    ],
  },

  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'Are you willing to work early morning shifts to receive deliveries?',
    options: [
      { optionText: 'Only occasionally', isCorrect: false },
      { optionText: 'I am unsure', isCorrect: false },
      { optionText: 'No, I can only work afternoons', isCorrect: false },
      {
        optionText: 'Yes, I am available for early morning shifts',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'Apart from your salary, would you welcome opportunities to earn extra income through overtime?',
    options: [
      { optionText: 'No, my salary is enough', isCorrect: false },
      { optionText: 'I am unsure', isCorrect: false },
      { optionText: 'Only occasionally', isCorrect: false },
      {
        optionText: 'Yes, I would welcome additional overtime opportunities',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'If assigned to a different section of the warehouse, what would you do?',
    options: [
      { optionText: 'Accept only if it\'s close to your usual area', isCorrect: false },
      {
        optionText: 'Accept the assignment and prepare appropriately',
        isCorrect: true,
      },
      { optionText: 'Refuse immediately', isCorrect: false },
      { optionText: 'Ignore the assignment', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'Are you available to work weekends during high-volume stock periods?',
    options: [
      { optionText: 'I am unsure', isCorrect: false },
      { optionText: 'Only if paid extra every time', isCorrect: false },
      {
        optionText: 'Yes, I am available to work weekends when needed',
        isCorrect: true,
      },
      { optionText: 'No, I cannot work weekends', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'Your supervisor asks if you can start your shift an hour early during a large delivery. What is your response?',
    options: [
      {
        optionText: 'Agree if reasonably possible and communicate clearly',
        isCorrect: true,
      },
      { optionText: 'Arrive late instead', isCorrect: false },
      { optionText: 'Refuse without explanation', isCorrect: false },
      { optionText: 'Ignore the request', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'Would you be comfortable handling tasks outside your usual section when needed?',
    options: [
      { optionText: 'I am unsure', isCorrect: false },
      {
        optionText: 'Yes, I am willing to assist wherever needed',
        isCorrect: true,
      },
      { optionText: 'Only if instructed repeatedly', isCorrect: false },
      { optionText: 'No, I will only handle my section', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'Your supervisor asks you to cover a colleague\'s shift on short notice. What is the most professional response?',
    options: [
      { optionText: 'Ignore the request', isCorrect: false },
      { optionText: 'Refuse without consideration', isCorrect: false },
      {
        optionText: 'Assess your availability and assist if possible',
        isCorrect: true,
      },
      { optionText: 'Complain publicly about the request', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'Warehouse schedules may occasionally change due to delivery volume. What is the best approach?',
    options: [
      { optionText: 'Arrive whenever convenient', isCorrect: false },
      { optionText: 'Reject all schedule changes', isCorrect: false },
      {
        optionText: 'Remain flexible within reasonable limits',
        isCorrect: true,
      },
      { optionText: 'Ignore communication about schedules', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You\'re asked to attend a mandatory safety training session on your day off. What should you do?',
    options: [
      { optionText: 'Ignore the invitation', isCorrect: false },
      {
        optionText: 'Attend if required and communicate any genuine conflicts',
        isCorrect: true,
      },
      { optionText: 'Refuse without explanation', isCorrect: false },
      { optionText: 'Attend only if pressured', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You notice you\'ve been assigned to two overlapping warehouse shifts. What should you do?',
    options: [
      { optionText: 'Skip both shifts', isCorrect: false },
      { optionText: 'Pick one shift and ignore the other silently', isCorrect: false },
      {
        optionText: 'Flag it promptly so it can be resolved',
        isCorrect: true,
      },
      { optionText: 'Wait for someone else to notice', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You\'re informed your shift will extend by two hours due to a large incoming shipment. What should you do?',
    options: [
      { optionText: 'Refuse without discussion', isCorrect: false },
      {
        optionText: 'Accept if possible and confirm your availability',
        isCorrect: true,
      },
      { optionText: 'Leave at your original time regardless', isCorrect: false },
      { optionText: 'Ignore the notice', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You are asked to be on standby for an upcoming bulk delivery that may require extra hours. What should you do?',
    options: [
      { optionText: 'Agree but not show up', isCorrect: false },
      {
        optionText: 'Confirm your availability and prepare accordingly',
        isCorrect: true,
      },
      { optionText: 'Ignore the request', isCorrect: false },
      { optionText: 'Decline without reason', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A new shift rotation is being trialed in the warehouse. What is the best response?',
    options: [
      { optionText: 'Complain before trying it', isCorrect: false },
      { optionText: 'Participate half-heartedly', isCorrect: false },
      {
        optionText: 'Approach it with an open and flexible mindset',
        isCorrect: true,
      },
      { optionText: 'Refuse to try anything new', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You\'re asked whether you can be reached for urgent stock issues outside your shift. What should you do?',
    options: [
      {
        optionText: 'Confirm your availability within reasonable limits',
        isCorrect: true,
      },
      { optionText: 'Avoid answering the question', isCorrect: false },
      { optionText: 'Say you\'re never reachable after hours', isCorrect: false },
      { optionText: 'Agree but ignore calls', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'Management is considering split shifts to cover peak delivery times. What mindset is most valuable?',
    options: [
      { optionText: 'Resistance to any schedule changes', isCorrect: false },
      { optionText: 'Insisting on a fixed routine only', isCorrect: false },
      {
        optionText: 'Openness to adapting your schedule for operational needs',
        isCorrect: true,
      },
      { optionText: 'Indifference to operational needs', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A warehouse colleague asks you to swap shifts due to a personal emergency. What should you do?',
    options: [
      { optionText: 'Agree but cancel later without notice', isCorrect: false },
      { optionText: 'Ignore the request', isCorrect: false },
      { optionText: 'Refuse immediately without considering it', isCorrect: false },
      {
        optionText: 'Consider the request and help if your schedule allows',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'Your team is short-staffed for an upcoming weekend stock count due to planned leave. What is the best response?',
    options: [
      { optionText: 'Assume someone else will cover it', isCorrect: false },
      { optionText: 'Take leave as well without notice', isCorrect: false },
      {
        optionText: 'Offer to help cover if you\'re available',
        isCorrect: true,
      },
      { optionText: 'Ignore the staffing gap', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'Your warehouse shift is changed with only a day\'s notice. What should you do?',
    options: [
      {
        optionText: 'Confirm your availability promptly and adjust if possible',
        isCorrect: true,
      },
      { optionText: 'Refuse to acknowledge the change', isCorrect: false },
      { optionText: 'Assume it doesn\'t apply to you', isCorrect: false },
      { optionText: 'Ignore the notification', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'An urgent stock shortage requires warehouse coverage outside normal hours. What should you do?',
    options: [
      { optionText: 'Delegate without informing anyone', isCorrect: false },
      {
        optionText: 'Make yourself available if reasonably possible',
        isCorrect: true,
      },
      { optionText: 'Ignore the request', isCorrect: false },
      { optionText: 'Decline without considering the urgency', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You\'re asked to take on a temporary assignment in a different warehouse for a few weeks. What should you do?',
    options: [
      { optionText: 'Ignore the request', isCorrect: false },
      { optionText: 'Refuse the temporary assignment outright', isCorrect: false },
      { optionText: 'Treat it half-heartedly since it\'s temporary', isCorrect: false },
      {
        optionText: 'Approach the temporary assignment professionally and adaptably',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A family event conflicts with an already scheduled warehouse shift. What is the most professional course of action?',
    options: [
      { optionText: 'Inform management after the shift starts', isCorrect: false },
      { optionText: 'Fail to show up', isCorrect: false },
      { optionText: 'Turn off your phone', isCorrect: false },
      {
        optionText: 'Notify management early and follow company procedures',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'Which quality best demonstrates work readiness in a warehouse role?',
    options: [
      {
        optionText: 'Reliability and consistency',
        isCorrect: true,
      },
      { optionText: 'Working only when convenient', isCorrect: false },
      { optionText: 'Avoiding responsibility', isCorrect: false },
      { optionText: 'Ignoring schedules', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'If stock volume spikes during a major holiday season, what mindset is most valuable?',
    options: [
      { optionText: 'Ignoring company communications', isCorrect: false },
      { optionText: 'Refusing all additional work', isCorrect: false },
      { optionText: 'Avoiding tasks during busy periods', isCorrect: false },
      {
        optionText: 'Being prepared for increased operational needs',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A candidate\'s long-term success in an inventory role depends most on:',
    options: [
      { optionText: 'Luck', isCorrect: false },
      { optionText: 'Avoiding responsibility', isCorrect: false },
      { optionText: 'Working only under supervision', isCorrect: false },
      {
        optionText: 'Professionalism, reliability and adaptability',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'You\'re repeatedly asked to extend shifts during a prolonged supply shortage. What should you do?',
    options: [
      { optionText: 'Disappear without notice', isCorrect: false },
      { optionText: 'Refuse all extensions outright', isCorrect: false },
      {
        optionText: 'Communicate your honest availability while supporting the team where possible',
        isCorrect: true,
      },
      { optionText: 'Agree to everything regardless of your limits', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'You discover the warehouse scheduling system has your availability recorded incorrectly. What should you do?',
    options: [
      { optionText: 'Complain without addressing it formally', isCorrect: false },
      { optionText: 'Work around it without telling anyone', isCorrect: false },
      { optionText: 'Leave it uncorrected', isCorrect: false },
      {
        optionText: 'Promptly correct it through proper channels',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'You\'re asked to be part of an on-call rotation for urgent stock emergencies. What should you do?',
    options: [
      { optionText: 'Accept but ignore on-call duties', isCorrect: false },
      {
        optionText: 'Evaluate your capacity honestly and respond accordingly',
        isCorrect: true,
      },
      { optionText: 'Agree without considering your actual capacity', isCorrect: false },
      { optionText: 'Refuse without discussion', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'Two supervisors request your availability for overlapping urgent tasks. What should you do?',
    options: [
      {
        optionText: 'Communicate the conflict and let them coordinate priority',
        isCorrect: true,
      },
      { optionText: 'Ignore both requests', isCorrect: false },
      { optionText: 'Agree to both and miss one', isCorrect: false },
      { optionText: 'Pick one without informing the other', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'Your personal circumstances change in a way that affects your ability to keep your usual warehouse shifts. What should you do?',
    options: [
      { optionText: 'Quit without explanation', isCorrect: false },
      {
        optionText: 'Communicate the change to management as early as possible',
        isCorrect: true,
      },
      { optionText: 'Wait until it causes a problem', isCorrect: false },
      { optionText: 'Keep it to yourself indefinitely', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.INVENTORY,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A company-wide policy now requires occasional weekend on-call duty for inventory emergencies. What is the best response?',
    options: [
      { optionText: 'Refuse to comply with the new policy', isCorrect: false },
      { optionText: 'Ignore the policy change', isCorrect: false },
      {
        optionText: 'Adjust your expectations and plan accordingly',
        isCorrect: true,
      },
      { optionText: 'Complain without engaging with it', isCorrect: false },
    ],
  },

  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'Are you willing to work rotating shifts, including nights, when required?',
    options: [
      {
        optionText: 'Yes, I am available for rotating shifts including nights',
        isCorrect: true,
      },
      { optionText: 'Only occasionally', isCorrect: false },
      { optionText: 'I am unsure', isCorrect: false },
      { optionText: 'No, I can only work daytime', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'Apart from your salary, would you welcome opportunities to take on extra on-call shifts for additional pay?',
    options: [
      { optionText: 'Only occasionally', isCorrect: false },
      {
        optionText: 'Yes, I would welcome additional on-call opportunities',
        isCorrect: true,
      },
      { optionText: 'I am unsure', isCorrect: false },
      { optionText: 'No, my salary is enough', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'If assigned to monitor a different region temporarily, what would you do?',
    options: [
      { optionText: 'Accept only if it\'s familiar territory', isCorrect: false },
      {
        optionText: 'Accept the assignment and prepare appropriately',
        isCorrect: true,
      },
      { optionText: 'Refuse immediately', isCorrect: false },
      { optionText: 'Ignore the assignment', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'Are you available to work weekends during peak demand periods?',
    options: [
      { optionText: 'I am unsure', isCorrect: false },
      {
        optionText: 'Yes, I am available to work weekends when needed',
        isCorrect: true,
      },
      { optionText: 'Only if paid extra every time', isCorrect: false },
      { optionText: 'No, I cannot work weekends', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'Your supervisor asks if you can start your shift early during a major operational event. What is your response?',
    options: [
      { optionText: 'Arrive late instead', isCorrect: false },
      { optionText: 'Refuse without explanation', isCorrect: false },
      {
        optionText: 'Agree if reasonably possible and communicate clearly',
        isCorrect: true,
      },
      { optionText: 'Ignore the request', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.EASY,
    weight: 3,
    question:
      'Would you be comfortable monitoring a different operational area when needed?',
    options: [
      { optionText: 'No, I will only monitor my usual area', isCorrect: false },
      {
        optionText: 'Yes, I am willing to assist wherever needed',
        isCorrect: true,
      },
      { optionText: 'I am unsure', isCorrect: false },
      { optionText: 'Only if instructed repeatedly', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'Your supervisor asks you to cover a colleague\'s dispatch shift on short notice. What is the most professional response?',
    options: [
      { optionText: 'Complain publicly about the request', isCorrect: false },
      { optionText: 'Ignore the request', isCorrect: false },
      { optionText: 'Refuse without consideration', isCorrect: false },
      {
        optionText: 'Assess your availability and assist if possible',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'Operations schedules may occasionally change due to demand fluctuations. What is the best approach?',
    options: [
      { optionText: 'Reject all schedule changes', isCorrect: false },
      {
        optionText: 'Remain flexible within reasonable limits',
        isCorrect: true,
      },
      { optionText: 'Arrive whenever convenient', isCorrect: false },
      { optionText: 'Ignore communication about schedules', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You\'re asked to attend a mandatory emergency-response training session on your day off. What should you do?',
    options: [
      {
        optionText: 'Attend if required and communicate any genuine conflicts',
        isCorrect: true,
      },
      { optionText: 'Refuse without explanation', isCorrect: false },
      { optionText: 'Ignore the invitation', isCorrect: false },
      { optionText: 'Attend only if pressured', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You notice you\'ve been assigned to two overlapping dispatch shifts. What should you do?',
    options: [
      {
        optionText: 'Flag it promptly so it can be resolved',
        isCorrect: true,
      },
      { optionText: 'Skip both shifts', isCorrect: false },
      { optionText: 'Pick one shift and ignore the other silently', isCorrect: false },
      { optionText: 'Wait for someone else to notice', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You\'re informed your shift will extend by two hours due to an ongoing service disruption. What should you do?',
    options: [
      { optionText: 'Refuse without discussion', isCorrect: false },
      {
        optionText: 'Accept if possible and confirm your availability',
        isCorrect: true,
      },
      { optionText: 'Ignore the notice', isCorrect: false },
      { optionText: 'Leave at your original time regardless', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You are asked to be on standby for an upcoming high-demand weekend that may require extra hours. What should you do?',
    options: [
      {
        optionText: 'Confirm your availability and prepare accordingly',
        isCorrect: true,
      },
      { optionText: 'Agree but not show up', isCorrect: false },
      { optionText: 'Decline without reason', isCorrect: false },
      { optionText: 'Ignore the request', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A new shift pattern is being trialed for the dispatch team. What is the best response?',
    options: [
      {
        optionText: 'Approach it with an open and flexible mindset',
        isCorrect: true,
      },
      { optionText: 'Refuse to try anything new', isCorrect: false },
      { optionText: 'Complain before trying it', isCorrect: false },
      { optionText: 'Participate half-heartedly', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You\'re asked whether you can be reached for urgent operational issues outside your shift. What should you do?',
    options: [
      { optionText: 'Avoid answering the question', isCorrect: false },
      {
        optionText: 'Confirm your availability within reasonable limits',
        isCorrect: true,
      },
      { optionText: 'Say you\'re never reachable after hours', isCorrect: false },
      { optionText: 'Agree but ignore calls', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'Management is considering split shifts to cover peak dispatch times. What mindset is most valuable?',
    options: [
      {
        optionText: 'Openness to adapting your schedule for operational needs',
        isCorrect: true,
      },
      { optionText: 'Insisting on a fixed routine only', isCorrect: false },
      { optionText: 'Indifference to operational needs', isCorrect: false },
      { optionText: 'Resistance to any schedule changes', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A dispatch teammate asks you to swap shifts due to a personal emergency. What should you do?',
    options: [
      {
        optionText: 'Consider the request and help if your schedule allows',
        isCorrect: true,
      },
      { optionText: 'Agree but cancel later without notice', isCorrect: false },
      { optionText: 'Ignore the request', isCorrect: false },
      { optionText: 'Refuse immediately without considering it', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'Your team is short-staffed for an upcoming high-demand weekend due to planned leave. What is the best response?',
    options: [
      { optionText: 'Ignore the staffing gap', isCorrect: false },
      { optionText: 'Take leave as well without notice', isCorrect: false },
      {
        optionText: 'Offer to help cover if you\'re available',
        isCorrect: true,
      },
      { optionText: 'Assume someone else will cover it', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'Your dispatch shift is changed with only a day\'s notice. What should you do?',
    options: [
      { optionText: 'Refuse to acknowledge the change', isCorrect: false },
      { optionText: 'Ignore the notification', isCorrect: false },
      {
        optionText: 'Confirm your availability promptly and adjust if possible',
        isCorrect: true,
      },
      { optionText: 'Assume it doesn\'t apply to you', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'A major service disruption requires operations coverage outside normal hours. What should you do?',
    options: [
      { optionText: 'Decline without considering the urgency', isCorrect: false },
      {
        optionText: 'Make yourself available if reasonably possible',
        isCorrect: true,
      },
      { optionText: 'Delegate without informing anyone', isCorrect: false },
      { optionText: 'Ignore the request', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.MEDIUM,
    weight: 5,
    question:
      'You\'re asked to take on a temporary assignment supporting a different region for a few weeks. What should you do?',
    options: [
      { optionText: 'Refuse the temporary assignment outright', isCorrect: false },
      {
        optionText: 'Approach the temporary assignment professionally and adaptably',
        isCorrect: true,
      },
      { optionText: 'Treat it half-heartedly since it\'s temporary', isCorrect: false },
      { optionText: 'Ignore the request', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A family event conflicts with an already scheduled operations shift. What is the most professional course of action?',
    options: [
      { optionText: 'Turn off your phone', isCorrect: false },
      { optionText: 'Fail to show up', isCorrect: false },
      { optionText: 'Inform management after the shift starts', isCorrect: false },
      {
        optionText: 'Notify management early and follow company procedures',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'Which quality best demonstrates work readiness in an operations role?',
    options: [
      { optionText: 'Ignoring schedules', isCorrect: false },
      { optionText: 'Avoiding responsibility', isCorrect: false },
      { optionText: 'Working only when convenient', isCorrect: false },
      {
        optionText: 'Reliability and consistency',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'If operational demand spikes during a major event or holiday, what mindset is most valuable?',
    options: [
      { optionText: 'Avoiding tasks during busy periods', isCorrect: false },
      {
        optionText: 'Being prepared for increased operational needs',
        isCorrect: true,
      },
      { optionText: 'Refusing all additional work', isCorrect: false },
      { optionText: 'Ignoring company communications', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A candidate\'s long-term success in an operations role depends most on:',
    options: [
      { optionText: 'Working only under supervision', isCorrect: false },
      {
        optionText: 'Professionalism, reliability and adaptability',
        isCorrect: true,
      },
      { optionText: 'Avoiding responsibility', isCorrect: false },
      { optionText: 'Luck', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'You\'re repeatedly asked to extend shifts during a prolonged service crisis. What should you do?',
    options: [
      {
        optionText: 'Communicate your honest availability while supporting the team where possible',
        isCorrect: true,
      },
      { optionText: 'Agree to everything regardless of your limits', isCorrect: false },
      { optionText: 'Refuse all extensions outright', isCorrect: false },
      { optionText: 'Disappear without notice', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'You discover the dispatch scheduling system has your availability recorded incorrectly. What should you do?',
    options: [
      { optionText: 'Complain without addressing it formally', isCorrect: false },
      {
        optionText: 'Promptly correct it through proper channels',
        isCorrect: true,
      },
      { optionText: 'Work around it without telling anyone', isCorrect: false },
      { optionText: 'Leave it uncorrected', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'You\'re asked to be part of an on-call rotation for emergency operational response. What should you do?',
    options: [
      { optionText: 'Accept but ignore on-call duties', isCorrect: false },
      { optionText: 'Agree without considering your actual capacity', isCorrect: false },
      { optionText: 'Refuse without discussion', isCorrect: false },
      {
        optionText: 'Evaluate your capacity honestly and respond accordingly',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'Two regional managers request your availability for overlapping urgent tasks. What should you do?',
    options: [
      { optionText: 'Ignore both requests', isCorrect: false },
      { optionText: 'Agree to both and miss one', isCorrect: false },
      { optionText: 'Pick one without informing the other', isCorrect: false },
      {
        optionText: 'Communicate the conflict and let them coordinate priority',
        isCorrect: true,
      },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'Your personal circumstances change in a way that affects your ability to keep your usual operations shifts. What should you do?',
    options: [
      { optionText: 'Quit without explanation', isCorrect: false },
      {
        optionText: 'Communicate the change to management as early as possible',
        isCorrect: true,
      },
      { optionText: 'Keep it to yourself indefinitely', isCorrect: false },
      { optionText: 'Wait until it causes a problem', isCorrect: false },
    ],
  },
  {
    category: QuestionCategory.AVAILABILITY,
    jobRole: JobRole.OPERATIONS,
    difficulty: QuestionDifficulty.HARD,
    weight: 8,
    question:
      'A company-wide policy now requires occasional weekend on-call duty for operational emergencies. What is the best response?',
    options: [
      { optionText: 'Complain without engaging with it', isCorrect: false },
      { optionText: 'Ignore the policy change', isCorrect: false },
      { optionText: 'Refuse to comply with the new policy', isCorrect: false },
      {
        optionText: 'Adjust your expectations and plan accordingly',
        isCorrect: true,
      },
    ],
  },
];