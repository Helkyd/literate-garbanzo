// Copyright (c) 2016, Helio de Jesus and contributors
// For license information, please see license.txt


frappe.ui.form.on('RESERVAS', {
	refresh: function(frm) {

		cur_frm.fields_dict['numero_quarto'].get_query = function(doc){
			return{
				filters:{
					"status":"Livre"
				}
			}
		}
		

	}
});


frappe.ui.form.on('RESERVAS','numero_quarto',function(frm,cdt,cdn){

	cur_frm.add_fetch('numero_quarto','preco','preco_quarto')
	frappe.model.set_value(cdt,cdn,'total_reserva',(frm.doc.preco_quarto*frm.doc.number_days))
	cur_frm.refresh_fields('preco_quarto');



});

frappe.ui.form.on('RESERVAS','check_in',function(frm,cdt,cdn){

	//Check_in cannot be less than TODAYs date
	if (frm.doc.check_in < frappe.datetime.nowdate()) {
		msgprint(__("Data de Entrada nao pode ser inferior a Data de Hoje."))
		frappe.model.set_value(cdt,cdn,'check_in','')
		frappe.model.set_value(cdt,cdn,'check_out','')
		frappe.model.set_value(cdt,cdn,'total_reserva',(frm.doc.preco_quarto*frm.doc.number_days))
		cur_frm.refresh_fields()		
		return;
	}else{
		frappe.model.set_value(cdt,cdn,'check_out',frappe.datetime.add_days(frm.doc.check_in, 2))
		frappe.model.set_value(cdt,cdn,'number_days',frappe.datetime.get_day_diff(frm.doc.check_out , frm.doc.check_in))
		frappe.model.set_value(cdt,cdn,'total_reserva',(frm.doc.preco_quarto*frm.doc.number_days))
		cur_frm.refresh_fields()

	} 


});
frappe.ui.form.on('RESERVAS','check_out',function(frm,cdt,cdn){

	//Check_out cannot be less than Check_In
	if (frm.doc.check_out < frm.doc.check_in) {
		msgprint(__("Data de Saida nao pode ser inferior a Data de Entrada."))
		return;
	} 

	frappe.model.set_value(cdt,cdn,'number_days',frappe.datetime.get_day_diff(frm.doc.check_out , frm.doc.check_in))
	frappe.model.set_value(cdt,cdn,'total_reserva',(frm.doc.preco_quarto*frm.doc.number_days))
	cur_frm.refresh_fields()

});

frappe.ui.form.on('RESERVAS','reservation_status',function(frm,cdt,cdn){


	if (frm.doc.reservation_status =="Cancelada") {
		show_alert("Verificando se pode ser cancelado a Reserva!!!",3)
		frappe.call({
			method: "gespensao.gestao_de_pensao.doctype.api.get_gestao_quartos_check",
			args: {
				"quarto":frm.doc.numero_quarto,
				
			},
			callback: function(r) {
//				msgprint(r.message)
				if (r.message){
					alert("Ocupado ou Ativo")
				}else{
					alert("Pode ser Cancelado")
				}

			}
		});

	}else if (frm.doc.reservation_status =="Ativo") {
	//Cria na Gestao_quartos...
		 msgprint("Mudando o status do Quarto para Ocupado depois de SALVAR O REGISTO")

	}	
});
