import express from 'express'
const router = express.Router()
import {  criarHeroi, getHerois, atualizarHeroi, apagarHeroi, getHeroisPeloId } from '../controllers/herois.js'

// 'Criação'
router.post('/herois', criarHeroi)
// 'Listagem de informações'
router.get('/herois', getHerois)
router.get('/herois/:id', getHeroisPeloId)
// 'Atualizacao'
router.put('/herois/:id', atualizarHeroi)
// 'Apagar'
router.delete('/herois/:id', apagarHeroi)

export { router }