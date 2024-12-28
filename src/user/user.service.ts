    import { Injectable } from '@nestjs/common';
    import { PrismaClient } from '@prisma/client';

    @Injectable()
    export class UserService {
    constructor(private prisma: PrismaClient) {}

    // Validasi user berdasarkan email dan password
    async validateUser(email: string, password: string) {
        const user = await this.prisma.user.findUnique({
        where: { email },
        });

        // Sementara menggunakan password plaintext (nanti kita hashing)
        if (user && user.password === password) {
        return user;
        }
        return null;
    }

    // Membuat user baru
    async createUser(data: { email: string; password: string; role?: string }) {
        return this.prisma.user.create({
        data,
        });
    }

    // Mendapatkan semua user
    async getUsers() {
        return this.prisma.user.findMany();
    }

    // Mendapatkan user berdasarkan ID
    async getUserById(id: number) {
        return this.prisma.user.findUnique({
        where: { id },
        });
    }

    // Mengupdate user berdasarkan ID
    async updateUser(id: number, data: Partial<{ email: string; password: string; role?: string }>) {
        return this.prisma.user.update({
        where: { id },
        data,
        });
    }

    // Menghapus user berdasarkan ID
    async deleteUser(id: number) {
        return this.prisma.user.delete({
        where: { id },
        });
    }
    }
