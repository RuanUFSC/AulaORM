import express from 'express'
const router = express.Router()
import { criarHeroi, getHerois, atualizarHeroi, apagarHeroi, getHeroisPeloId } from '../controllers/herois.js'
import { validacao } from '../middlewares/verificacao.js'

// Criação
router.post('/herois', validacao, criarHeroi)
// Listagem de informações
router.get('/herois', validacao, getHerois)
router.get('/herois/:id', validacao, getHeroisPeloId)
// Atualizacao
router.put('/herois/:id', validacao, atualizarHeroi)
// Apagar
router.delete('/herois/:id', validacao, apagarHeroi)

export default router