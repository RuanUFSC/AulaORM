import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { Usuario } from '../models/Usuario.js'

const login = async (req, res) => {
    const { nome, senha } = req.body
    const senhaInformada = gerarCriptografia(senha)
    const usuarioBanco = await Usuario.findOne({ where: { nome } })
    const validacao = usuarioBanco.senha == senhaInformada
    if (!usuarioBanco.senha || !validacao) return res.status(400).send({ message: 'Credenciais incorretas' })
    const chave = process.env.CHAVE
    const permissoes = {}
    permissoes.tipo = usuarioBanco.nome === 'admin' ? 'admin' : 'comum'
    // Geração do token
    const token = jwt.sign(permissoes, chave, { expiresIn: 120 })
    return res.status(200).send({ token })
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
        res.status(201).send({ message: 'Usuario criado com sucesso' })
    } catch (erro) {
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
        res.status(200).send({ usuarios })
    } catch (erro) {
        res.status(500).send({ message: 'Falha na criacao' })
    }
}

export { login, cadastrarUsuario, mostrarUsuario }