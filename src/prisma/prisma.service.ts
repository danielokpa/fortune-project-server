import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // 1. Pass the URL and Token config object directly to the adapter
    const adapter = new PrismaLibSql({
      url: process.env.DATABASE_URL || 'file:./prisma/dev.db',
      authToken: process.env.TURSO_AUTH_TOKEN, // Add this if your Turso DB uses a token
    });

    // 2. Initialize the PrismaClient with the adapter
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
