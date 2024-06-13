"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eur = void 0;
const constants_1 = require("./constants");
const helpers_1 = require("./helpers");
const database_1 = require("./database");
const eur = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Obtener la fecha de la petición
    const formatedDate = (0, helpers_1.getSQLDateFormat)(new Date());
    try {
        // Verificar si existe una entrada en la base de datos tipo_cambio con la misma fecha y el tipo de cambio EUR
        const dbResponse = yield database_1.client.query(`SELECT * FROM tipo_cambio WHERE fecha = '${formatedDate}' AND tipo = 'EUR'`);
        if (dbResponse.rows.length > 0) { // si existe una entrada en la base de datos
            return res.json({
                message: 'Tipo de cambio obtenido correctamente',
                data: {
                    tipo: 'MXN a EUR',
                    fecha: dbResponse.rows[0].fecha,
                    cambio: dbResponse.rows[0].cambio
                },
                source: 'DB'
            });
        }
        else { // crear una nueva entrada en la base de datos
            // Obtener el tipo de cambio de MXN a EUR
            const response = yield fetch(`${constants_1.EUR_URI}/${formatedDate}/${formatedDate}`, {
                headers: {
                    'Bmx-Token': constants_1.BMX_TOKEN
                }
            });
            const values = yield response.json();
            // Verificar si la respuesta es un error de tipo 400
            if (response.status === 400) {
                return res.status(400).json({
                    message: values.error.mensaje,
                    data: null
                });
            }
            // Verificar si la respuesta es un error de tipo 500
            if (response.status !== 200) {
                return res.status(500).json({
                    message: 'Ocurrió un problema al realizar la consulta',
                    data: null
                });
            }
            // Crear una nueva entrada en la base de datos
            yield database_1.client.query(`INSERT INTO tipo_cambio (fecha, tipo, cambio) VALUES ('${formatedDate}', 'EUR', ${values.bmx.series[0].datos[0].dato})`);
            // Mostrar la respuesta
            return res.json({
                message: 'Tipo de cambio obtenido correctamente',
                data: {
                    tipo: 'MXN a EUR',
                    fecha: values.bmx.series[0].datos[0].fecha,
                    cambio: values.bmx.series[0].datos[0].dato
                },
                source: 'API'
            });
        }
    }
    catch (err) {
        return res.status(500).json({
            message: 'Ocurrió un problema al realizar la consulta',
            data: null
        });
    }
});
exports.eur = eur;
//# sourceMappingURL=eur.controller.js.map