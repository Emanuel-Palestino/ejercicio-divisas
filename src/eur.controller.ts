import { BMX_TOKEN, EUR_URI } from './constants'
import { getSQLDateFormat } from './helpers'
import { client } from './database'
import { Request, Response } from 'express'


export const eur = async (req: Request, res: Response) => {
	// Obtener la fecha de la petición
	const formatedDate = getSQLDateFormat(new Date())

	try {
		// Verificar si existe una entrada en la base de datos tipo_cambio con la misma fecha y el tipo de cambio EUR
		const dbResponse = await client.query(`SELECT * FROM tipo_cambio WHERE fecha = '${formatedDate}' AND tipo = 'EUR'`)

		if (dbResponse.rows.length > 0) { // si existe una entrada en la base de datos
			return res.json({
				message: 'Tipo de cambio obtenido correctamente',
				data: {
					tipo: 'MXN a EUR',
					fecha: dbResponse.rows[0].fecha,
					cambio: dbResponse.rows[0].cambio
				},
				source: 'DB'
			})
		} else {	// crear una nueva entrada en la base de datos

			// Obtener el tipo de cambio de MXN a EUR
			const response = await fetch(`${EUR_URI}/${formatedDate}/${formatedDate}`, {
				headers: {
					'Bmx-Token': BMX_TOKEN
				}
			})

			const values = await response.json()

			// Verificar si la respuesta es un error de tipo 400
			if (response.status === 400) {
				return res.status(400).json({
					message: values.error.mensaje,
					data: null
				})
			}

			// Verificar si la respuesta es un error de tipo 500
			if (response.status !== 200) {
				return res.status(500).json({
					message: 'Ocurrió un problema al realizar la consulta',
					data: null
				})
			}

			// Crear una nueva entrada en la base de datos
			await client.query(`INSERT INTO tipo_cambio (fecha, tipo, cambio) VALUES ('${formatedDate}', 'EUR', ${values.bmx.series[0].datos[0].dato})`)

			// Mostrar la respuesta
			return res.json({
				message: 'Tipo de cambio obtenido correctamente',
				data: {
					tipo: 'MXN a EUR',
					fecha: values.bmx.series[0].datos[0].fecha,
					cambio: values.bmx.series[0].datos[0].dato
				},
				source: 'API'
			})
		}

	} catch (err) {

		return res.status(500).json({
			message: 'Ocurrió un problema al realizar la consulta',
			data: null
		})

	}
}
