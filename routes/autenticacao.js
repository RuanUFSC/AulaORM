import express from 'express'
const router = express.Router()
import { login, cadastrarUsuario, mostrarUsuario } from '../controllers/autenticacao.js'

// Login
router.post('/login', login)
// Cadastro de usuario
router.post('/cadastros', cadastrarUsuario)
// Verificar os usuários cadastrados
router.get('/nao-faca-isso', mostrarUsuario)

export default router