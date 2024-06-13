import { Client } from 'pg'


export const client = new Client({
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'psql123',
    database: 'divisas'
})


client.connect()
    .then(() => console.log('Conexión a la base de datos exitosa'))
    .catch(err => console.error('Error en la conexión', err.stack))
