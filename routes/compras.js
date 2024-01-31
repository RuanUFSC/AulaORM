import express from 'express'
const router = express.Router()
import { getCompras } from '../controllers/compras.js'

// 'Listagem de informações'
router.get('/compras', getCompras)
// 'Criação'
// router.post('/compras', criarCompras)
// 'Atualizacao'
// router.put('/compras', atualizarCompras)
// 'Apagar'
// router.delete('/compras', apagarCompras)

export { router }