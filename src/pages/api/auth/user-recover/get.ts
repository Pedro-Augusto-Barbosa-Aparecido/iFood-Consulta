import { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../../../utils/prisma";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const { email } = req.body;
    
    const user = await prismaClient.user.findFirst({
        where: {
            id: email
        },
        select: {
            name: true,
            email: true,
            id: true
        }
    });

    return res.send({
        user
    });

}
