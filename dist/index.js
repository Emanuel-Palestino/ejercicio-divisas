"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const constants_1 = require("./constants");
const usd_controller_1 = require("./usd.controller");
const eur_controller_1 = require("./eur.controller");
const app = (0, express_1.default)();
// Endpoint para obtener el tipo de cambio de MXN a USD
app.get('/usd', usd_controller_1.usd);
// Enpoint para obtener el tipo de cambio de MXN a EUR
app.get('/eur', eur_controller_1.eur);
// Ejecutar servidor
app.listen(constants_1.API_PORT, () => {
    return console.log(`Servidor ejecutandose en https://localhost:${constants_1.API_PORT}`);
});
//# sourceMappingURL=index.js.map