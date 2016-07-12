// Copyright (c) 2016, Helio de Jesus and contributors
// For license information, please see license.txt

// render
frappe.listview_settings['GESTAO_QUARTOS'] = {
	add_fields: ["status","tipo_quarto"],

	get_indicator: function(doc) {

		console.log(doc.status)
		if (doc.status== "Livre" ) {
			return [__("Livre - " + doc.tipo_quarto), "green"]
		} else if (doc.status== "Ocupado" ) {
			return [__("" + doc.tipo_quarto), "red"]
		
		}
	},

	
};

