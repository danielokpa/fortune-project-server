import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // 1. Pass the URL and Token config object directly to the adapter
    // Use the TURSO_DATABASE_URL if available, otherwise fall back to local
    const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL || 'file:./prisma/dev.db';

    const prisma = new PrismaClient({
      adapter: new PrismaLibSql({ 
        url,
        authToken: process.env.TURSO_AUTH_TOKEN 
      }),
    });

    // 2. Initialize the PrismaClient with the adapter
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
