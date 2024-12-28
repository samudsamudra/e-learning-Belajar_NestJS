    import {
        Controller,
        Post,
        Body,
        Get,
        Patch,
        Delete,
        Param,
        UnauthorizedException,
    } from '@nestjs/common';
    import { UserService } from './user.service';
    
    @Controller('users')
    export class UserController {
        constructor(private readonly userService: UserService) {}
    
        // Endpoint untuk login
        @Post('login')
        async login(@Body() body: { email: string; password: string }) {
        const user = await this.userService.validateUser(body.email, body.password);
        if (!user) {
            throw new UnauthorizedException('Email atau password salah!');
        }
    
        // Ucapan selamat berdasarkan peran pengguna
        const welcomeMessage =
            user.role === 'pelajar'
            ? `Selamat datang dan selamat belajar, ${user.email}!`
            : `Selamat mengajar, ${user.email}!`;
    
        return {
            message: welcomeMessage,
            user,
        };
        }
    
        // Endpoint untuk membuat user baru
        @Post()
        async createUser(@Body() body: { email: string; password: string; role?: string }) {
        return this.userService.createUser(body);
        }
    
        // Endpoint untuk mendapatkan semua user
        @Get()
        async getUsers() {
        return this.userService.getUsers();
        }
    
        // Endpoint untuk mendapatkan user berdasarkan ID
        @Get(':id')
        async getUserById(@Param('id') id: string) {
        return this.userService.getUserById(Number(id));
        }
    
        // Endpoint untuk mengupdate user
        @Patch(':id')
        async updateUser(
        @Param('id') id: string,
        @Body() body: Partial<{ email: string; password: string; role?: string }>,
        ) {
        return this.userService.updateUser(Number(id), body);
        }
    
        // Endpoint untuk menghapus user
        @Delete(':id')
        async deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(Number(id));
        }
    }
    