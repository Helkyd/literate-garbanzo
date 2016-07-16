// Copyright (c) 2016, Helio de Jesus and contributors
// For license information, please see license.txt

frappe.query_reports["Recibos_v"] = {
	"filters": [
		{
			"fieldname":"nome_empresa",
 		        "label": __("Nome da Empresa"),
            		"fieldtype": "Link",
            		"options": "Empresa",
            		"default": frappe.defaults.get_user_default("nome_empresa")
        	},


	]
}
