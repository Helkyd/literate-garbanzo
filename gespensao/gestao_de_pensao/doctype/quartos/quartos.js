// Copyright (c) 2016, Helio de Jesus and contributors
// For license information, please see license.txt

frappe.ui.form.on('QUARTOS', {
	onload: function(frm) {

		if (frm.doc.name != (frm.doc.numero + "-" + frm.doc.nome)){

			cur_frm.toggle_enable("status",false)
		}else if ((frm.doc.status=="Ocupado") || (frm.doc.status=="Reservado")){
			cur_frm.toggle_enable("status",false)
		}

	}
});

frappe.ui.form.on('QUARTOS', {
	refresh: function(frm) {
	
	}
});


frappe.ui.form.on('QUARTOS','tipo_quarto',function(frm,cdt,cdn){

	cur_frm.add_fetch('tipo_quarto','preco','preco')
	cur_frm.refresh_fields()

});




