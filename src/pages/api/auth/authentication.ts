import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuid } from "uuid";
import { prismaClient } from "../../../utils/prisma";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body;
    const _user = await prismaClient.user.findFirst({
        where: {
            email: email
        },
        select: {
            password: true,
            id: true,
            name: true
        }
    });

    if (!_user) {
        return res.send({
            success: false,
            msg: "Usuário não existe!"
        });
    }

    if (_user.password === password) {
        return res.send({
            token: uuid(),
            success: true,
            user: {
                name: _user.name,
                id: _user.id,
                email: email
            },
            msg: "Usuário logado com  sucesso!"
        }) 

    } else {
        return res.send({ 
            success: false,
            msg: "Senha Inválida!"
        });

    }

    

}
