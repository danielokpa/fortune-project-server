// import {
//   HttpStatus,
//   Injectable,
//   NotFoundException,
//   BadRequestException,
// } from '@nestjs/common';
// import { Prisma, ClientDevice } from '@prisma/client';
// import { ClientDeviceRepository } from '../repositories/client-device.repository';
// import { UserType } from 'src/enums';

// @Injectable()
// export class ClientDeviceService {
//   constructor(
//     private readonly clientDeviceRepository: ClientDeviceRepository,
//   ) {}

//   async findById(id: string): Promise<ClientDevice | null> {
//     const data = await this.clientDeviceRepository.findById(id);
//     if (!data) throw new NotFoundException('Device token not found');
//     return data;
//   }

//   async findByUserId(userId: string) {
//     const devices = await this.clientDeviceRepository.findByUserId(userId);
//     return devices;
//   }

//   /** Distinct FCM tokens for a passenger (users table id). */
//   async getFcmTokensForUserId(userId: string): Promise<string[]> {
//     const rows = await this.clientDeviceRepository.findWithFcmByUserId(userId);
//     return [
//       ...new Set(
//         rows
//           .map((d) => d.deviceFCMToken)
//           .filter((t): t is string => Boolean(t)),
//       ),
//     ];
//   }

//   async findByIpAddress(ipAddress: string) {
//     const devices =
//       await this.clientDeviceRepository.findByIpAddress(ipAddress);
//     return devices;
//   }

//   async findByUserIdAndDeviceToken(
//     userId: string,
//     deviceFCMToken: string,
//   ): Promise<ClientDevice | null> {
//     return await this.clientDeviceRepository.findByUserIdAndDeviceToken(
//       userId,
//       deviceFCMToken,
//     );
//   }

//   async findAll(options?: any) {
//     const devices = await this.clientDeviceRepository.findAll(options);
//     return devices;
//   }

//   async create(
//     clientDeviceData: Prisma.ClientDeviceUncheckedCreateInput,
//   ): Promise<ClientDevice> {
//     const data = await this.clientDeviceRepository.create(clientDeviceData);
//     if (!data) throw new BadRequestException('Failed to create device token');
//     return data;
//   }

//   // async update(
//   //   id: string,
//   //   clientDeviceData: Partial<ClientDevice>,
//   // ): Promise<ClientDevice> {
//   //   const data = await this.clientDeviceRepository.update(id, clientDeviceData);
//   //   if (!data) throw new NotFoundException('Device token not found');
//   //   return data;
//   // }

//   async delete(id: string): Promise<boolean> {
//     return await this.clientDeviceRepository.delete(id);
//   }

//   async registerDevice(deviceData: {
//     ipAddress: string;
//     deviceFCMToken?: string;
//     name?: string;
//     userId: string;
//     driverId?: string;
//     userType?: UserType;
//   }) {
//     const device =
//       await this.clientDeviceRepository.updateOrCreateDevice(deviceData);
//     return device;
//   }

//   async updateDeviceToken(clientDeviceId: string, deviceFCMToken: string) {
//     const updatedDevice = await this.clientDeviceRepository.update(
//       clientDeviceId,
//       {
//         deviceFCMToken,
//       },
//     );

//     if (!updatedDevice) {
//       throw new NotFoundException('Device not found!');
//     }

//     return updatedDevice;
//   }
// }
