// Copyright (c) 2016, Helio de Jesus and contributors
// For license information, please see license.txt

frappe.ui.form.on('QUARTOS', {
	refresh: function(frm) {

	}
});


frappe.ui.form.on('QUARTOS','tipo_quarto',function(frm,cdt,cdn){

	cur_frm.add_fetch('tipo_quarto','preco','preco')
	cur_frm.refresh_fields()

});
