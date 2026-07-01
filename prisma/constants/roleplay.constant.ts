import { RolePlayCategory, JobRole } from '@prisma/client';

export const ROLEPLAY_QUESTIONS = [
  {
    category: RolePlayCategory.PROFESSIONALISM,
    jobRole: JobRole.GENERAL,
    prompt:
      'You realize you will be a few minutes late to work due to unexpected circumstances. Describe how you would communicate this and what you would do upon arrival.',
  },
  {
    category: RolePlayCategory.INTEGRITY,
    jobRole: JobRole.GENERAL,
    prompt:
      'You accidentally make a mistake that affects a coworker\'s task, and no one else has noticed yet. Walk through how you would handle it.',
  },
  {
    category: RolePlayCategory.CONFLICT_RESOLUTION,
    jobRole: JobRole.GENERAL,
    prompt:
      'A coworker takes credit for an idea that was actually yours during a team meeting. Explain how you would address this professionally.',
  },
  {
    category: RolePlayCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.GENERAL,
    prompt:
      'You are dealing with a stressful personal situation but still need to perform well at work today. Describe how you would manage this.',
  },
  {
    category: RolePlayCategory.PROBLEM_SOLVING,
    jobRole: JobRole.GENERAL,
    prompt:
      'You are given a task with unclear instructions and your supervisor is currently unavailable. Explain the steps you would take to proceed.',
  },
  {
    category: RolePlayCategory.SAFETY,
    jobRole: JobRole.GENERAL,
    prompt:
      'You notice a potential safety hazard in a common area of your workplace. Walk through what you would do next.',
  },
  {
    category: RolePlayCategory.PROFESSIONALISM,
    jobRole: JobRole.GENERAL,
    prompt:
      'A coworker regularly interrupts you during meetings. Describe how you would address this while maintaining a positive working relationship.',
  },
  {
    category: RolePlayCategory.INTEGRITY,
    jobRole: JobRole.GENERAL,
    prompt:
      'You discover that a close friend at work has been bending company rules for their own convenience. Explain how you would handle this.',
  },
  {
    category: RolePlayCategory.CONFLICT_RESOLUTION,
    jobRole: JobRole.GENERAL,
    prompt:
      'You strongly disagree with feedback given by your manager during a performance review. Describe how you would respond in the moment and afterward.',
  },
  {
    category: RolePlayCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.GENERAL,
    prompt:
      'A new team member seems overwhelmed and hesitant to ask for help. Describe how you would support them.',
  },
  {
    category: RolePlayCategory.PROBLEM_SOLVING,
    jobRole: JobRole.GENERAL,
    prompt:
      'You are assigned two urgent tasks with the same deadline by two different people. Walk through how you would handle the situation.',
  },
  {
    category: RolePlayCategory.SAFETY,
    jobRole: JobRole.GENERAL,
    prompt:
      'You witness a coworker skipping a required safety step to save time. Explain what you would do.',
  },
  {
    category: RolePlayCategory.PROFESSIONALISM,
    jobRole: JobRole.GENERAL,
    prompt:
      'You are asked to work with a colleague you have had past disagreements with on an important project. Describe how you would approach this.',
  },
  {
    category: RolePlayCategory.INTEGRITY,
    jobRole: JobRole.GENERAL,
    prompt:
      'You overhear confidential company information that was not meant for you. Explain how you would handle this.',
  },
  {
    category: RolePlayCategory.CONFLICT_RESOLUTION,
    jobRole: JobRole.GENERAL,
    prompt:
      'A teammate consistently misses deadlines, which is affecting your own work. Describe how you would address this with them.',
  },

  {
    category: RolePlayCategory.PROBLEM_SOLVING,
    jobRole: JobRole.DRIVER,
    prompt:
      'You arrive at the pickup point and cannot locate the passenger despite the GPS pin being accurate. Walk through how you would proceed.',
  },
  {
    category: RolePlayCategory.SAFETY,
    jobRole: JobRole.DRIVER,
    prompt:
      'Heavy rain suddenly reduces visibility significantly during a trip. Describe how you would adjust your driving and communicate with the passenger.',
  },
  {
    category: RolePlayCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.DRIVER,
    prompt:
      'A passenger asks you to wait outside a store for 20 minutes while they run an errand, which was not part of the original booking. How do you respond?',
  },
  {
    category: RolePlayCategory.INTEGRITY,
    jobRole: JobRole.DRIVER,
    prompt:
      'A passenger asks you to falsely confirm a trip did not happen so they can dispute the charge. Explain how you would respond.',
  },
  {
    category: RolePlayCategory.CONFLICT_RESOLUTION,
    jobRole: JobRole.DRIVER,
    prompt:
      'A passenger disputes the fare shown at the end of the trip, insisting it should be lower. Explain how you would handle the disagreement.',
  },
  {
    category: RolePlayCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    prompt:
      'A passenger appears to be crying quietly in the back seat during the trip. Describe how you would respond appropriately.',
  },
  {
    category: RolePlayCategory.PROFESSIONALISM,
    jobRole: JobRole.DRIVER,
    prompt:
      'You are scheduled for a long shift but begin to feel fatigued halfway through. Describe what actions you would take.',
  },
  {
    category: RolePlayCategory.SAFETY,
    jobRole: JobRole.DRIVER,
    prompt:
      'A passenger asks to bring an unrestrained pet into the vehicle for the trip. Explain how you would handle this request.',
  },
  {
    category: RolePlayCategory.PROBLEM_SOLVING,
    jobRole: JobRole.DRIVER,
    prompt:
      'You realize partway through a trip that you took a wrong turn and are heading away from the destination. Walk through how you would handle it.',
  },
  {
    category: RolePlayCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.DRIVER,
    prompt:
      'A passenger with mobility equipment needs extra time and assistance getting into the vehicle. Describe how you would assist them.',
  },
  {
    category: RolePlayCategory.INTEGRITY,
    jobRole: JobRole.DRIVER,
    prompt:
      'You notice the fare estimate shown to the passenger is lower than what the meter will actually charge due to a system error. Explain what you would do.',
  },
  {
    category: RolePlayCategory.CONFLICT_RESOLUTION,
    jobRole: JobRole.DRIVER,
    prompt:
      'A passenger becomes upset because another driver cut you off in traffic, and they blame you for the near-miss. Explain how you would respond.',
  },
  {
    category: RolePlayCategory.PROFESSIONALISM,
    jobRole: JobRole.DRIVER,
    prompt:
      'You are asked by a passenger to turn off the trip recording or dashcam during the ride. Describe how you would respond.',
  },
  {
    category: RolePlayCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.DRIVER,
    prompt:
      'A passenger is nervous about a big life event they are traveling to, such as a job interview. Describe how you would support a positive experience.',
  },
  {
    category: RolePlayCategory.SAFETY,
    jobRole: JobRole.DRIVER,
    prompt:
      'You feel drowsy while driving late at night on a long trip. Walk through the steps you would take.',
  },

  {
    category: RolePlayCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    prompt:
      'A customer contacts you extremely frustrated after multiple failed attempts to resolve their issue with other agents. Describe how you would handle the conversation.',
  },
  {
    category: RolePlayCategory.CONFLICT_RESOLUTION,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    prompt:
      'A customer insists they were promised a refund by a previous agent, but there is no record of this in the system. Explain how you would resolve this.',
  },
  {
    category: RolePlayCategory.PROBLEM_SOLVING,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    prompt:
      'A customer\'s issue requires a solution that falls outside your standard troubleshooting scripts. Walk through how you would approach it.',
  },
  {
    category: RolePlayCategory.INTEGRITY,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    prompt:
      'You realize you gave a customer incorrect information in a previous interaction that they may have already acted on. Describe what you would do.',
  },
  {
    category: RolePlayCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    prompt:
      'A customer becomes emotional and mentions they are going through a difficult personal situation while explaining their issue. Describe how you would respond.',
  },
  {
    category: RolePlayCategory.PROFESSIONALISM,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    prompt:
      'You are handling several chats at once and one customer becomes impatient waiting for a response. Explain how you would manage this.',
  },
  {
    category: RolePlayCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    prompt:
      'A customer asks for a feature or accommodation the company does not currently offer. Describe how you would respond.',
  },
  {
    category: RolePlayCategory.CONFLICT_RESOLUTION,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    prompt:
      'A customer threatens to leave a negative public review unless you bypass policy to satisfy their demand. Explain how you would handle this.',
  },
  {
    category: RolePlayCategory.PROBLEM_SOLVING,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    prompt:
      'A system outage prevents you from accessing customer account details during a live chat. Walk through how you would keep the customer informed and assisted.',
  },
  {
    category: RolePlayCategory.INTEGRITY,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    prompt:
      'A customer asks you to note their account in a way that would help them get around a legitimate policy. Explain how you would respond.',
  },
  {
    category: RolePlayCategory.EMOTIONAL_INTELLIGENCE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    prompt:
      'You have handled several difficult calls in a row and now need to greet a new customer warmly. Describe how you would reset and stay engaged.',
  },
  {
    category: RolePlayCategory.PROFESSIONALISM,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    prompt:
      'A customer uses inappropriate language toward you during a support call. Describe how you would handle the interaction.',
  },
  {
    category: RolePlayCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    prompt:
      'A long-time customer is confused about a recent change in company policy that affects them negatively. Describe how you would explain it.',
  },
  {
    category: RolePlayCategory.CONFLICT_RESOLUTION,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    prompt:
      'Two different departments have given a customer conflicting information about the same issue. Explain how you would resolve the confusion.',
  },
  {
    category: RolePlayCategory.PROBLEM_SOLVING,
    jobRole: JobRole.CUSTOMER_SUPPORT,
    prompt:
      'A customer\'s complaint reveals a pattern that suggests a broader product issue affecting others. Walk through how you would handle this beyond the individual ticket.',
  },

  {
    category: RolePlayCategory.PROFESSIONALISM,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    prompt:
      'You are asked to prepare materials for an urgent meeting with very little notice. Walk through how you would prioritize and execute the task.',
  },
  {
    category: RolePlayCategory.CONFLICT_RESOLUTION,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    prompt:
      'Two executives you support both need your assistance at the same time for conflicting priorities. Describe how you would manage this.',
  },
  {
    category: RolePlayCategory.INTEGRITY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    prompt:
      'You are asked to alter a document\'s date to make it appear it was submitted on time. Explain how you would respond.',
  },
  {
    category: RolePlayCategory.PROBLEM_SOLVING,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    prompt:
      'A scheduling error causes two important meetings to overlap on an executive\'s calendar. Walk through how you would resolve it.',
  },
  {
    category: RolePlayCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    prompt:
      'A visiting client arrives for a meeting that the executive forgot to prepare for. Describe how you would handle the situation.',
  },
  {
    category: RolePlayCategory.SAFETY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    prompt:
      'You notice unauthorized access attempts on a shared company system. Explain the steps you would take.',
  },
  {
    category: RolePlayCategory.PROFESSIONALISM,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    prompt:
      'You are copied on an email thread containing a heated disagreement between two senior staff members. Describe how you would handle your involvement.',
  },
  {
    category: RolePlayCategory.INTEGRITY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    prompt:
      'You discover a discrepancy in an expense report submitted by an executive you support. Explain how you would handle it.',
  },
  {
    category: RolePlayCategory.CONFLICT_RESOLUTION,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    prompt:
      'A colleague accuses you of mishandling a task that was actually delayed due to someone else\'s error. Describe how you would address this.',
  },
  {
    category: RolePlayCategory.PROBLEM_SOLVING,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    prompt:
      'A critical file needed for a same-day presentation appears to be missing or corrupted. Walk through how you would resolve this under time pressure.',
  },
  {
    category: RolePlayCategory.CUSTOMER_SERVICE,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    prompt:
      'An external partner calls upset about a delayed response from your office. Describe how you would handle the call.',
  },
  {
    category: RolePlayCategory.SAFETY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    prompt:
      'You receive a suspicious email requesting sensitive company information, appearing to be from a senior executive. Explain how you would respond.',
  },
  {
    category: RolePlayCategory.PROFESSIONALISM,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    prompt:
      'You are asked to manage an executive\'s personal errands in addition to your professional duties. Describe how you would handle this request.',
  },
  {
    category: RolePlayCategory.INTEGRITY,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    prompt:
      'You are asked to withhold certain information from an internal audit request. Explain how you would respond.',
  },
  {
    category: RolePlayCategory.CONFLICT_RESOLUTION,
    jobRole: JobRole.ADMIN_EXECUTIVE,
    prompt:
      'An executive publicly criticizes your work in front of other staff over a misunderstanding. Describe how you would handle the moment and the follow-up.',
  },

  {
    category: RolePlayCategory.PROBLEM_SOLVING,
    jobRole: JobRole.INVENTORY,
    prompt:
      'A physical stock count does not match the inventory system by a significant margin. Walk through how you would investigate and resolve this.',
  },
  {
    category: RolePlayCategory.SAFETY,
    jobRole: JobRole.INVENTORY,
    prompt:
      'You notice a coworker operating a forklift without proper certification. Describe how you would handle the situation.',
  },
  {
    category: RolePlayCategory.INTEGRITY,
    jobRole: JobRole.INVENTORY,
    prompt:
      'You suspect a coworker has been removing inventory for personal use. Explain the steps you would take.',
  },
  {
    category: RolePlayCategory.CONFLICT_RESOLUTION,
    jobRole: JobRole.INVENTORY,
    prompt:
      'A shipping deadline is at risk because another team member did not complete their part of an order on time. Describe how you would address this.',
  },
  {
    category: RolePlayCategory.PROFESSIONALISM,
    jobRole: JobRole.INVENTORY,
    prompt:
      'You are asked to certify a stock count that you have not personally verified due to time pressure. Explain how you would respond.',
  },
  {
    category: RolePlayCategory.SAFETY,
    jobRole: JobRole.INVENTORY,
    prompt:
      'A shipment arrives with damaged packaging that may contain hazardous material residue. Walk through how you would handle it.',
  },
  {
    category: RolePlayCategory.PROBLEM_SOLVING,
    jobRole: JobRole.INVENTORY,
    prompt:
      'The warehouse management system goes offline during a busy shift. Describe how you would continue operations safely and accurately.',
  },
  {
    category: RolePlayCategory.INTEGRITY,
    jobRole: JobRole.INVENTORY,
    prompt:
      'A supervisor asks you to adjust inventory records to hide a shortage before an audit. Explain how you would respond.',
  },
  {
    category: RolePlayCategory.CONFLICT_RESOLUTION,
    jobRole: JobRole.INVENTORY,
    prompt:
      'A coworker disputes your count during a joint inventory audit, insisting their number is correct. Describe how you would resolve the disagreement.',
  },
  {
    category: RolePlayCategory.PROFESSIONALISM,
    jobRole: JobRole.INVENTORY,
    prompt:
      'You notice recurring errors in a new coworker\'s stock entries. Describe how you would address this with them.',
  },
  {
    category: RolePlayCategory.SAFETY,
    jobRole: JobRole.INVENTORY,
    prompt:
      'You discover a fire exit in the warehouse has been partially blocked by pallets. Walk through what you would do.',
  },
  {
    category: RolePlayCategory.PROBLEM_SOLVING,
    jobRole: JobRole.INVENTORY,
    prompt:
      'An urgent customer order requires an item that shows in stock but cannot be physically located. Explain how you would handle this.',
  },
  {
    category: RolePlayCategory.INTEGRITY,
    jobRole: JobRole.INVENTORY,
    prompt:
      'You receive extra stock in a delivery that was not recorded on the packing slip. Describe the correct process you would follow.',
  },
  {
    category: RolePlayCategory.CONFLICT_RESOLUTION,
    jobRole: JobRole.INVENTORY,
    prompt:
      'A colleague blames you for a shipping error that was actually caused by a system glitch. Explain how you would address this.',
  },
  {
    category: RolePlayCategory.PROFESSIONALISM,
    jobRole: JobRole.INVENTORY,
    prompt:
      'You are asked to skip a required quality check to meet a shipping deadline. Describe how you would respond.',
  },

  {
    category: RolePlayCategory.PROBLEM_SOLVING,
    jobRole: JobRole.OPERATIONS,
    prompt:
      'A critical piece of equipment fails unexpectedly during peak operating hours. Walk through how you would manage the immediate response.',
  },
  {
    category: RolePlayCategory.SAFETY,
    jobRole: JobRole.OPERATIONS,
    prompt:
      'You observe a coworker bypassing a safety lockout procedure to save time. Describe how you would respond.',
  },
  {
    category: RolePlayCategory.INTEGRITY,
    jobRole: JobRole.OPERATIONS,
    prompt:
      'You discover that quality control records from a previous shift appear to have been falsified. Explain how you would handle this.',
  },
  {
    category: RolePlayCategory.CONFLICT_RESOLUTION,
    jobRole: JobRole.OPERATIONS,
    prompt:
      'A team member disagrees with a process change you were asked to implement. Describe how you would handle the disagreement.',
  },
  {
    category: RolePlayCategory.PROFESSIONALISM,
    jobRole: JobRole.OPERATIONS,
    prompt:
      'You are short-staffed for a shift and tempted to skip a routine safety briefing to save time. Explain how you would handle this.',
  },
  {
    category: RolePlayCategory.PROBLEM_SOLVING,
    jobRole: JobRole.OPERATIONS,
    prompt:
      'A vendor delivers materials that do not meet quality specifications right before a production run. Walk through how you would respond.',
  },
  {
    category: RolePlayCategory.SAFETY,
    jobRole: JobRole.OPERATIONS,
    prompt:
      'During an emergency evacuation drill, you notice some staff are not taking it seriously. Describe how you would address this.',
  },
  {
    category: RolePlayCategory.INTEGRITY,
    jobRole: JobRole.OPERATIONS,
    prompt:
      'A manager instructs you to exceed a safe operating capacity to meet production targets. Explain how you would respond.',
  },
  {
    category: RolePlayCategory.CONFLICT_RESOLUTION,
    jobRole: JobRole.OPERATIONS,
    prompt:
      'Two shifts have different interpretations of a standard operating procedure, causing friction between teams. Describe how you would resolve this.',
  },
  {
    category: RolePlayCategory.PROFESSIONALISM,
    jobRole: JobRole.OPERATIONS,
    prompt:
      'You are asked to train a new hire while also managing your own full workload. Explain how you would balance these responsibilities.',
  },
  {
    category: RolePlayCategory.PROBLEM_SOLVING,
    jobRole: JobRole.OPERATIONS,
    prompt:
      'A scheduled maintenance window is at risk of being skipped due to a busy production schedule. Walk through how you would handle this.',
  },
  {
    category: RolePlayCategory.SAFETY,
    jobRole: JobRole.OPERATIONS,
    prompt:
      'You notice an unmarked hazardous area on the production floor. Describe the steps you would take.',
  },
  {
    category: RolePlayCategory.INTEGRITY,
    jobRole: JobRole.OPERATIONS,
    prompt:
      'You are asked to sign off on a process as complete when a step was actually skipped. Explain how you would respond.',
  },
  {
    category: RolePlayCategory.CONFLICT_RESOLUTION,
    jobRole: JobRole.OPERATIONS,
    prompt:
      'A new operations process you are enforcing conflicts with a workaround staff have used for years and prefer. Describe how you would handle the pushback.',
  },
  {
    category: RolePlayCategory.PROFESSIONALISM,
    jobRole: JobRole.OPERATIONS,
    prompt:
      'You notice a recurring inefficiency in a process but implementing a fix is outside your usual role. Explain how you would proceed.',
  },
];