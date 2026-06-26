// import { Injectable } from '@nestjs/common';
// import { Token, Prisma, TokenSubject } from '@prisma/client';
// import { PrismaService } from '../../../prisma/prisma.service';
// // import { TokenSubject } from 'src/enums/token.enum';
// import { handleDatabaseError } from 'src/utils/db-error-handler.util';

// @Injectable()
// export class TokenRepository {
//   constructor(private readonly prisma: PrismaService) {}

//   async create(tokenData: Prisma.TokenCreateInput): Promise<Token> {
//     try {
//       const token = await this.prisma.token.create({
//         data: tokenData,
//       });

//       return token;
//     } catch (error) {
//       handleDatabaseError(error);
//     }
//   }

//   async findByToken(token: string): Promise<Token | null> {
//     try {
//       const tokenRecord = await this.prisma.token.findFirst({
//         where: { token },
//       });

//       return tokenRecord;
//     } catch (error) {
//       handleDatabaseError(error);
//     }
//   }

//   async findByPhoneOrEmailToken(
//     token: string,
//     phoneNo: string,
//     email: string,
//   ): Promise<Token | null> {
//     try {
//       const tokenRecord = await this.prisma.token.findFirst({
//         where: {
//           OR: [{ email }, { phoneNo }, { token }],
//         },
//       });

//       return tokenRecord;
//     } catch (error) {
//       handleDatabaseError(error);
//     }
//   }

//   async findByEmailToken(token: string, email: string): Promise<Token | null> {
//     try {
//       const tokenRecord = await this.prisma.token.findFirst({
//         where: {
//           email,
//           token,
//         },
//       });

//       return tokenRecord;
//     } catch (error) {
//       handleDatabaseError(error);
//     }
//   }

//   async findByTokenEmailAndSubject(
//     token: string,
//     email: string,
//     subject: TokenSubject,
//   ): Promise<Token | null> {
//     try {
//       const tokenRecord = await this.prisma.token.findFirst({
//         where: {
//           email,
//           token,
//           subject,
//         },
//       });

//       return tokenRecord;
//     } catch (error) {
//       handleDatabaseError(error);
//     }
//   }

//   async findByPhoneToken(
//     token: string,
//     phoneNo: string,
//   ): Promise<Token | null> {
//     try {
//       const tokenRecord = await this.prisma.token.findFirst({
//         where: {
//           phoneNo,
//           token,
//         },
//       });

//       return tokenRecord;
//     } catch (error) {
//       handleDatabaseError(error);
//     }
//   }

//   async delete(id: string): Promise<boolean> {
//     try {
//       await this.prisma.token.delete({
//         where: { id },
//       });

//       return true;
//     } catch (error) {
//       handleDatabaseError(error);
//     }
//   }

//   async deleteByToken(token: string): Promise<number> {
//     try {
//       const result = await this.prisma.token.deleteMany({
//         where: { token },
//       });

//       return result.count;
//     } catch (error) {
//       handleDatabaseError(error);
//     }
//   }
// }
