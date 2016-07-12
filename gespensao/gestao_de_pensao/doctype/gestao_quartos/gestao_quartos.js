// Copyright (c) 2016, Helio de Jesus and contributors
// For license information, please see license.txt

frappe.ui.form.on('GESTAO_QUARTOS', {
	onload: function(frm) {

		if (frm.doc.status=="Ocupado" && frm.doc.horas!="0"){
			cur_frm.toggle_enable("numero_quarto",false)
			cur_frm.toggle_enable("horas",false)
			cur_frm.toggle_enable("hora_entrada",false)
			cur_frm.toggle_enable("hora_saida",false)



		}


	}
});

frappe.ui.form.on('GESTAO_QUARTOS', {
	refresh: function(frm) {
		cur_frm.fields_dict['numero_quarto'].get_query = function(doc){
			return{
				filters:{
					"status":"Livre"
				}
			}
		}
		calculate_totals(frm);

//    cur_frm.fields_dict["expense"].grid.grid_rows_by_docname[cdn].fields_dict["claim_amount"].refresh();


//		frappe.meta.get_docfield("servicos","preco",frm.docname).read_only=0
//		frm.fields_dict['servicos'].grid.fieldinfo["preco"].read_only = 1
//		cur_frm.get_field("servicos").grid.fieldinfo["preco"].read_only = 1
		//frm.fields_dict['servicos'].grid.set_column_disp("descricao", false);
		//frm.fields_dict['servicos'].grid.set_column_disp("preco", false);
	}
});


frappe.ui.form.on('GESTAO_QUARTOS','numero_quarto',function(frm,cdt,cdn){

	cur_frm.add_fetch('numero_quarto','preco','preco')
	cur_frm.add_fetch('numero_quarto','nome_quarto','tipo_quarto')
	cur_frm.refresh_fields('tipo_quarto');
	



});

frappe.ui.form.on('GESTAO_QUARTOS','horas',function(frm,cdt,cdn){

	
	frappe.model.set_value(cdt,cdn,'hora_saida',moment(cur_frm.doc.hora_entrada).add(cur_frm.doc.horas,'hours'))
	frappe.model.set_value(cdt,cdn,'total',frm.doc.preco*frm.doc.horas)
	cur_frm.refresh_fields();	

});


frappe.ui.form.on("RESERVAS_Services","nome_servico",function(frm,cdt,cdn){

	var d =locals[cdt][cdn];
	var item = frappe.get_doc(cdt,cdn)
	cur_frm.add_fetch('nome_servico','preco','preco')	
	frappe.model.set_value(cdt,cdn,'total',d.preco*d.quantidade)
//	frm.fields_dict['total'].grid.grid_rows_by_docname[cdn].area.refresh()
	calculate_totals(frm, cdt, cdn);
//    	frappe.utils.filter_dict(frm.fields_dict["servicos"].grid.grid_rows_by_docname[cdn].docfields, {"fieldname": "preco"})[0].read_only = true;


});

frappe.ui.form.on("RESERVAS_Services","quantidade",function(frm,cdt,cdn){

	var d =locals[cdt][cdn];
	var item = frappe.get_doc(cdt,cdn)
	frappe.model.set_value(cdt,cdn,'total',d.preco*d.quantidade)
//	frm.fields_dict['total'].grid.grid_rows_by_docname[cdn].area.refresh()
	calculate_totals(frm, cdt, cdn);
 //   	frappe.utils.filter_dict(frm.fields_dict["servicos"].grid.grid_rows_by_docname[cdn].docfields, {"fieldname": "preco"})[0].read_only = true;


});


var calculate_totals = function(frm, cdt,cdn) {
//	var d = locals[cdt][cdn]
	var tbl1 = frm.doc.servicos || [];
//	msgprint(tbl1.length)
	var total_valor = 0; 
	for(var i = 0; i < tbl1.length; i++){
		total_valor += flt(tbl1[i].total);
	}
	frappe.model.set_value(cdt,cdn,'total_servicos',total_valor)
//	msgprint(total_valor)
	frm.doc.total_servicos = total_valor
//	frm.total_servicos = total_valor;
	refresh_many(['total_servicos']);
}
