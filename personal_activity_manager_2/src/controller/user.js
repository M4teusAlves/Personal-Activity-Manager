const { PrismaClient } = require("@prisma/client");
const httpStatus = require("http-status");

const prisma = new PrismaClient()

async function getAll(req, res) {
    try {

        const users = await prisma.user.findMany({
            include:{
                activities: {
                    include:{
                        category: true,
                    },
                },
            },
            
        });

        return res.status(httpStatus.OK).send(users);

    } catch (err) {
        console.log(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Erro na requisição")
    }
}

async function getById(req, res) {
    try {

        const user = await prisma.user.findUnique({
            include:{
                activities: {
                    include:{
                        category: true,
                    },
                },
            },
            where:{
                id:parseInt(req.params.id)
            }
        });

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        return res.status(httpStatus.OK).send(user);

    } catch (err) {
        console.log(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Erro na requisição")
    }
}

async function create(req, res) {
    try {

        const user = await prisma.user.create({
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            }
        });

        res.status(httpStatus.CREATED).send(user);
    } catch (error) {
        console.log(error);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Erro na requisição")
    }

    console.log(req.params.description);

}

async function update(req, res) {
    try {

        const user = await prisma.user.update({
            data: req.body,
            where: {
                id: parseInt(req.params.id)
            }
        })

        res.status(httpStatus.CREATED).send(user);

    } catch (error) {
        console.log(error);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Não atualizado!");
    }

}

async function deleteEntity(req, res) {
    try {

        await prisma.activity.deleteMany({
            where: {
                userId: parseInt(req.params.id)
            }
        })

        await prisma.user.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })

        

        res.status(httpStatus.OK).send("Usuário removida com sucesso!")

    } catch (error) {
        console.log(error);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Não removido!");
    }
}

module.exports = { getAll, getById, create, update, deleteEntity }