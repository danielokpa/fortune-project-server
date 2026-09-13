import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const url = process.env.DATABASE_URL || 'file:./prisma/dev.db';
    const libsql = createClient({ url });
    const adapter = new PrismaLibSql(libsql);

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
