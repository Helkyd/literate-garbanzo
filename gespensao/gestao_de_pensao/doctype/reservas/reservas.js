// Copyright (c) 2016, Helio de Jesus and contributors
// For license information, please see license.txt


frappe.ui.form.on('RESERVAS', {
	onload: function(frm) {


	}

});


frappe.ui.form.on('RESERVAS', {
	refresh: function(frm) {

		cur_frm.fields_dict['numero_quarto'].get_query = function(doc){
			return{
				filters:{
					"status":"livre"
				}
			}
		}
		
	

	}
});


frappe.ui.form.on('RESERVAS','numero_quarto',function(frm,cdt,cdn){

	cur_frm.add_fetch('numero_quarto','preco','preco_quarto')
	cur_frm.refresh_fields('preco_quarto');

});


frappe.ui.form.on('RESERVAS','numero_cliente',function(frm,cdt,cdn){

//	cur_frm.add_fetch('numero_cliente','nome','nome_cliente')
//	cur_frm.refresh_fields('nome_cliente');

});

frappe.ui.form.on('RESERVAS','check_in',function(frm,cdt,cdn){

	//Check_in cannot be less than TODAYs date
	if (frm.doc.check_in < frappe.datetime.nowdate()) {
		msgprint(__("Data de Entrada nao pode ser inferior a Data de Hoje."))
		frappe.model.set_value(cdt,cdn,'check_in','')
		frappe.model.set_value(cdt,cdn,'check_out','')
		cur_frm.refresh_fields()		
		return;
	} 


});
frappe.ui.form.on('RESERVAS','check_out',function(frm,cdt,cdn){

	//Check_out cannot be less than Check_In
	if (frm.doc.check_out < frm.doc.check_in) {
		msgprint(__("Data de Saida nao pode ser inferior a Data de Entrada."))
		return;
	} 

	frappe.model.set_value(cdt,cdn,'number_days',frappe.datetime.get_day_diff(frm.doc.check_out , frm.doc.check_in))
	cur_frm.refresh_fields()

});
