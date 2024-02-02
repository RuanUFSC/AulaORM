// Importação de pacotes e arquivos
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import heroiRouter from './routes/herois.js'
import autenticacaoRouter from './routes/autenticacao.js'
import { sequelize } from './database.js'

// Sincronizando o banco de dados
try {
    sequelize.sync()
} catch (erro) {
    console.log(erro)
}

// Inicializando o pacote express
const app = express()

// Configurando o reconhecimento de JSON
app.use(express.json())

// Configurando as origens que vao poder utilizar a API
app.use(cors())

// Utilizando os arquivos de rotas importados na linha 3 e 4
app.use(heroiRouter)
app.use(autenticacaoRouter)

// Iniciando o servidor na porta 3000
app.listen(3000, () => console.log('Servidor iniciado'))
