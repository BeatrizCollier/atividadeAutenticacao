const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const { sequelize } = require('./src/config/configDB');

const authRoute = require('./src/modulos/autenticacao/routes/autenticacao.route')
const operadorRoute = require('./src/modulos/operador/routes/operador.route')
const vagaRoute = require('./src/modulos/vaga/routes/vaga.route')
const veiculoRoute = require('./src/modulos/veiculo/routes/veiculo.route')

// Configuração do banco de dados
dotenv.config(); // Carrega variáveis de ambiente do arquivo .env

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // frontend React
    credentials: true               // permite enviar cookies (como refreshToken)
}));

app.use(express.json());

//rotas de vaga
//http:localhost:3001/api/vagas
////http:localhost:3001/api/vagas/:id
app.use('/api/', vagaRoute)

//rotas de veiculo
//http:localhost:3001/api/veiculos
////http:localhost:3001/api/veiculos/:id
app.use('/api/', veiculoRoute)



//rotas de operador
//http:localhost:3001/api/cadastrar
////http:localhost:3001/api/perfil
app.use('/api/', operadorRoute)

//rotas de autenticação
//http:localhost:3001/api/login
//http:localhost:3001/api/logout
//http:localhost:3001/api/refresh-token
app.use('/api/', authRoute)

const PORTA = process.env.PORTA;
app.listen(PORTA, async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');

    } catch (err) {
        console.error('Erro ao conectar ou sincronizar o banco de dados:', err);
    }
    console.log(`Servidor rodando na porta ${PORTA}`);
});