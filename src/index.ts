import express from 'express'
import { API_PORT } from './constants'
import { usd } from './usd.controller'
import { eur } from './eur.controller'


const app = express()


// Endpoint para obtener el tipo de cambio de MXN a USD
app.get('/usd', usd)


// Enpoint para obtener el tipo de cambio de MXN a EUR
app.get('/eur', eur)


// Ejecutar servidor
app.listen(API_PORT, () => {
	return console.log(`Servidor ejecutandose en https://localhost:${API_PORT}`)
})
