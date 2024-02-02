import express from 'express'
const router = express.Router()
import { criarHeroi, getHerois, atualizarHeroi, apagarHeroi, getHeroisPeloId } from '../controllers/herois.js'
import { login, validacao, cadastrarUsuario, mostrarUsuario } from '../controllers/autenticacao.js'
// 'Login'
router.post('/login', login)
router.post('/cadastrar', cadastrarUsuario)
router.get('/cadastrar', mostrarUsuario)
// 'Criação'
router.post('/herois', validacao, criarHeroi)
// 'Listagem de informações'
router.get('/herois', validacao, getHerois)
router.get('/herois/:id', validacao, getHeroisPeloId)
// 'Atualizacao'
router.put('/herois/:id', validacao, atualizarHeroi)
// 'Apagar'
router.delete('/herois/:id', validacao, apagarHeroi)

export { router }