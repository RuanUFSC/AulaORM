import { Heroi } from '../models/Heroi.js'

const criarHeroi = async (req, res) => {
    try {
        const { nome, pontosDePoder } = req.body
        if (!nome || !pontosDePoder) {
            return res.status(400).send({ message: 'Dados incompletos' })
        }
        // const novoHeroi = { nome: nome, pontosDePoder: pontosDePoder }
        const novoHeroi = { nome, pontosDePoder }
        const resultado = await Heroi.create(novoHeroi)
        res.status(201).send({ message: 'Heroi criado com sucesso', data: resultado, tipo: req.tipoUsuario })
    } catch (err) {
        res.status(500).send({ message: 'Houve um erro na criação' })
    }
}

const getHerois = async (req, res) => {
    try {
        const herois = await Heroi.findAll()
        // findByPk(1)
        // findOne({ where: { nome: 'Batman'} })
        res.status(200).send({ message: 'Herois encontrados', data: herois })
    } catch (err) {
        res.status(500).send({ message: 'Houve um erro na busca' })
    }
}

const atualizarHeroi = async (req, res) => {
    try {
        // const id = req.params.id
        const { id } = req.params
        const { nome, pontosDePoder } = req.body

        if (!nome || !pontosDePoder || !id) {
            return res.status(400).send({ message: 'Dados incompletos' })
        }
        const heroiAtualizado = { nome, pontosDePoder }
        const resultado = await Heroi.update(heroiAtualizado, { where: { id: id } })
        res.status(200).send({ message: 'Heroi atualizado', resultado: resultado })
    } catch (err) {
        res.status(500).send({ message: 'Erro na atualizacao' })
    }
}

const apagarHeroi = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(404).send({ message: 'Id nao informado' })
        }
        await Heroi.destroy({ where: { id: id } })
        res.status(200).send({ message: 'Heroi excluido' })
    } catch (err) {
        res.status(500).send({ message: 'Erro ao excluir heroi' })
    }
}

const getHeroisPeloId = async (req, res) => {
    try {
        const { id } = req.params
        if(!id) {
            return res.status(400).send({ message: 'Favor informar o id' })
        }
        const heroi = await Heroi.findByPk(id)
        // const heroi = await Heroi.findOne({ where: { id } })
        if(heroi){
            res.status(200).send({ message: 'Heroi encontrado', heroi })
        } else {
            res.status(204).send({ message: 'Heroi nao encontrado' })
        }
    } catch (err) {
        res.status(500).send({ message: 'Erro ao buscar heroi' })
    }
}

export { getHerois, criarHeroi, atualizarHeroi, apagarHeroi, getHeroisPeloId }