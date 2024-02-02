import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { Usuario } from '../models/Usuario.js'

const login = (req, res) => {
    const { usuario, senha } = req.body
    const senhaInformada = gerarCriptografia(senha)
    const usuarioBanco = Usuario.findOne({ where: {nome: usuario}})
    const validacao = usuarioBanco.senha == senhaInformada
    if(!usuarioBanco.senha || !validacao) return res.status(400).send({ message: 'Credenciais incorretas' })

    const permissoes = { tipo: 'comum' }
    const chave = process.env.CHAVE
    // Geração do token
    const token = jwt.sign(permissoes, chave, { expiresIn: 120 })
    return res.status(200).send({ token })
}

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

const cadastrarUsuario = async (req, res) => {
    try {
        const { nome, senha } = req.body
        if (!nome || !senha) {
            return res.status(400).send({ message: 'Informações incompletas' })
        }
        const senhaParaArmazenar = gerarCriptografia(senha)
        // Ideal verificar se ja existe usuario antes de criar
        await Usuario.create({ nome: nome, senha: senhaParaArmazenar })
        res.status(201).send({ message: 'Usuario criado com sucesso'})
    } catch(erro){
        console.log(erro)
        res.status(500).send({ message: 'Falha na criacao' })
    }
}

const gerarCriptografia = (senha) => {
    const salt = process.env.SALT
    const novaSenha = crypto.createHash('sha256').update(senha + salt).digest('base64')
    return novaSenha
}

const mostrarUsuario = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll()
        res.status(200).send({ usuarios})
    } catch(erro) {
        res.status(500).send({ message: 'Falha na criacao' })
    }
}

export { login, validacao, cadastrarUsuario, mostrarUsuario }