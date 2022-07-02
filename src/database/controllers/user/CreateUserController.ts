import { User } from "@prisma/client";
import { prismaClient } from "../../../utils/prisma";

export interface UserCreate {
    name: string
    email: string
    password: string

}

export interface UserCreateReturn {
    success: boolean
    msg: string
    user: { name: string, email: string } | null
    err?: any | null
}

export default class CreateUserController {
    async register (user: UserCreate): Promise<UserCreateReturn> {
        try {
            const _user = await prismaClient.user.findFirst({
                where: {
                    email: user.email
                }
            });
    
            if (_user) 
                return {
                    success: true,
                    msg: `O Email ${user.email} já está cadastrado`,
                    user: null
                }
    
            const __user = await prismaClient.user.create({
                data: user,
                select: {
                    name: true,
                    email: true
                }
            });
    
            return {
                success: true,
                msg: "Usuário criado com sucesso!",
                user: __user
            }
        } catch (err) {
            return {
                success: false,
                msg: "Houve um erro ao criar o usuário",
                user: null,
                err
            }
        }

    }

}
