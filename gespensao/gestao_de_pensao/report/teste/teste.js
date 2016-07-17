// Copyright (c) 2016, Helio de Jesus and contributors
// For license information, please see license.txt

frappe.query_reports["teste"] = {
	"filters": [
		{
			"fieldname":"check_in",
			"label": __("Data de Entrada"),
			"fieldtype": "Date",
			"width": "80"
		},
		{
			"fieldname":"check_out",
			"label": __("Data de Saida"),
			"fieldtype": "Date"

		},
		{
			"fieldname":"number_days",
			"label": __("Numero de Dias"),
			"fieldtype": "Data"
		},

		{
			"fieldname":"numero_cliente",
			"label": __("Nome do Cliente"),
			"fieldtype": "Link",
			"options": "CLIENTES"
		},
		{
			"fieldname":"reservation_status",
			"label": __("Status da Reserva"),
			"fieldtype": "Data"
		},
		{
			"fieldname":"preco",
			"label": __("Preco"),
			"fieldtype": "Currency"
		},
		{
			"fieldname":"total_reserva",
			"label": __("Total da Reserva"),
			"fieldtype": "Currency"
		}



	]
}

