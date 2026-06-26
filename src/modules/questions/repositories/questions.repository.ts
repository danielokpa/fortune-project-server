// async getRolePlayQuestions(
//   slug: string,
// ) {
//   return this.prisma.assessment.findUnique({
//     where: {
//       slug,
//     },

//     select: {
//       id: true,

//       title: true,

//       rolePlayQuestions: {
//         orderBy: {
//           displayOrder: 'asc',
//         },

//         select: {
//           id: true,

//           displayOrder: true,

//           prompt: true,
//         },
//       },
//     },
//   });
// }