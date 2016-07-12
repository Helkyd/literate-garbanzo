// Copyright (c) 2016, Helio de Jesus and contributors
// For license information, please see license.txt

frappe.views.calendar["GESTAO_QUARTOS"] = {
	field_map: {
		"start": "hora_entrada",
		"end": "hora_saida",
		"nome": "nome_quarto",		
		"title": "tipo_quarto",
		"status": "status",
	},	
	
	get_events_method: "gespensao.gestao_de_pensao.doctype.gestao_quartos.api.get_quartos"
}
