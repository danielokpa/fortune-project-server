import { Injectable } from '@nestjs/common';

@Injectable()
export class CandidateCodeService {
  generate(sequence: number) {
    const year = new Date().getFullYear();

    return `PC${year}${String(sequence).padStart(6, '0')}`;
  }
}

// const sequence =
//   await tx.candidateSequence.create({
//     data: {},
//   });

// const candidateCode =
//   candidateCodeService.generate(
//     sequence.sequence,
//   );