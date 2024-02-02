import jwt from 'jsonwebtoken'

// Função intermediária para validação de token jwt
const validacao = (req, res, next) => {
    try {
        const { authorization } = req.headers
        const chave = process.env.CHAVE
        const verificacao = jwt.verify(authorization, chave)
        if (!verificacao.tipo) {
            return res.status(400).send({ message: 'Token invalido' })
        }
        req.tipoUsuario = verificacao.tipo
        next()
    } catch (erro) {
        res.status(400).send({ message: 'Falha na autenticação' })
    }
}

export { validacao }