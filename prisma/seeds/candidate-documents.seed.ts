import {
  DocumentType,
  PrismaClient,
} from '@prisma/client';

export async function seedCandidateDocuments(
  prisma: PrismaClient,
) {
  const documents = [
    {
      candidateId: 'd7a1865c-5839-4961-8b43-81c833fdb5f5',
      documents: [
        {
          type: DocumentType.CV,
          fileUrl:
            'candidate-documents/temp/44cf1e2c-ef7c-4471-9930-a3821e50f522/cv.pdf',
        },
        {
          // Use whichever photo is correct
          type: DocumentType.PHOTO,
          fileUrl:
            'candidate-documents/temp/bcdc46d7-5c36-47a6-afa0-469c061ea53f/photo.jpg',
        },
      ],
    },

    {
      candidateId: 'be67d704-25f5-4686-aca0-bd4ece83d2b6',
      documents: [
        {
          type: DocumentType.CV,
          fileUrl:
            'candidate-documents/temp/ffa41f48-7da8-4357-b2f1-e93a6b4c878c/cv.pdf',
        },
        {
          type: DocumentType.PHOTO,
          fileUrl:
            'candidate-documents/temp/7555e710-59a5-4ce7-aaf4-85231e2c5516/photo.jpg',
        },
        {
          type: DocumentType.DRIVERS_LICENSE,
          fileUrl:
            'candidate-documents/temp/6b5b95dc-72e2-4c09-a0b6-db57e30b25e9/drivers-license.jpg',
        },
      ],
    },

    {
      candidateId: '727e9284-2a74-456d-9d1f-9efa75aef78f',
      documents: [
        {
          type: DocumentType.NYSC,
          fileUrl:
            'candidate-documents/temp/e2b44752-b878-4469-b4d0-ebfccccddc13/nysc.jpg',
        },
        {
          type: DocumentType.PHOTO,
          fileUrl:
            'candidate-documents/temp/cdaf2901-b7bd-4f4a-8226-a5b08f60b4dc/photo.jpg',
        },
        {
          type: DocumentType.DRIVERS_LICENSE,
          fileUrl:
            'candidate-documents/temp/6ad995c7-8917-4aa7-8217-5d425efb47c7/drivers-license.jpg',
        },
      ],
    },

    {
      candidateId: '7410045f-4459-4416-b196-b47835f67cd6',
      documents: [
        {
          type: DocumentType.CV,
          fileUrl:
            'candidate-documents/temp/e94bbd4f-399d-4809-ad8b-e7bf04d3982f/cv.pdf',
        },
        {
          type: DocumentType.NYSC,
          fileUrl:
            'candidate-documents/temp/dbc3639e-8d26-47ea-a3f2-f0dfcc8c9b7b/nysc.pdf',
        },
        {
          type: DocumentType.PHOTO,
          fileUrl:
            'candidate-documents/temp/3a577dae-0100-449d-9ca4-8901a5a4b7ef/photo.jpg',
        },
      ],
    },

    {
      candidateId: 'a52b6024-e9e7-441f-92fe-bf1b4940d6ca',
      documents: [
        {
          type: DocumentType.CV,
          fileUrl:
            'candidate-documents/temp/33c90ad0-f0fe-44af-9afa-996acf624f89/cv.pdf',
        },
        {
          type: DocumentType.DRIVERS_LICENSE,
          fileUrl:
            'candidate-documents/temp/9166f23a-7c6c-44a7-a31f-27ab742eab48/drivers-license.jpg',
        },
      ],
    },
  ];

  let seeded = 0;

  for (const candidate of documents) {
    for (const document of candidate.documents) {
      await prisma.candidateDocument.upsert({
        where: {
          candidateId_type: {
            candidateId: candidate.candidateId,
            type: document.type,
          },
        },
        create: {
          candidateId: candidate.candidateId,
          type: document.type,
          fileUrl: document.fileUrl,
        },
        update: {
          fileUrl: document.fileUrl,
        },
      });

      seeded++;
    }
  }

  console.log(
    `✅ Seeded ${seeded} candidate documents.`,
  );
}