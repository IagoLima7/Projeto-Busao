require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    try {
        // Verificar se já existe um usuário com o email 'admin@example.com'
        const usuarioExistente = await prisma.usuario.findUnique({
            where: { email: 'admin@example.com' }
        });

        if (usuarioExistente) {
            console.log('Usuário de teste já existe');
            return;
        }

        // Criar um usuário de teste
        const senha = await bcrypt.hash('senha123', 10);

        const usuario = await prisma.usuario.create({
            data: {
                nome: 'Administrador',
                email: 'admin@example.com',
                senha: senha,
                tipo: 'admin'
            }
        });

        console.log('Usuário de teste criado com sucesso:', {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            tipo: usuario.tipo
        });
    } catch (error) {
        console.error('Erro ao criar usuário de teste:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main(); 