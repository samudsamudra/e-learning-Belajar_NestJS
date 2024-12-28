import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, UserModule],  // Tambahkan PrismaModule di sini
  controllers: [],
  providers: [],
})
export class AppModule {}
