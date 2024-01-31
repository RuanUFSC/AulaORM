// import { sequelize } from '../database.js'
import { Heroi } from '../models/Heroi.js'

const getCompras = async (_, res) => {
    // console.log('iniciou')
    // const novoHeroi = {
    //     nome: 'Super-homem', pontosDePoder: 1000
    // }
    // const heroi = await Heroi.create(novoHeroi)
    const herois = await Heroi.findAll()
    // const compras = await database.query('SELECT * FROM COMPRAS')
    // console.log(compras.rows)
    res.status(200).send({ dados: herois })
}

export { getCompras }