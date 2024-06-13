"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const pg_1 = require("pg");
exports.client = new pg_1.Client({
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'psql123',
    database: 'divisas'
});
exports.client.connect()
    .then(() => console.log('Conexión a la base de datos exitosa'))
    .catch(err => console.error('Error en la conexión', err.stack));
//# sourceMappingURL=database.js.map