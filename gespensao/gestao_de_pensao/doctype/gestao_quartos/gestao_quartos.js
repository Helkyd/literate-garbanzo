// Copyright (c) 2016, Helio de Jesus and contributors
// For license information, please see license.txt

frappe.ui.form.on('GESTAO_QUARTOS', {
	onload: function(frm) {

//		frappe.call({
//			method: "gespensao.gestao_de_pensao.doctype.api.empresa_load",/
//			args: null,
//			callback: function(r){}
//		})
//		frappe.db.get_value("Empresa",nome_empresa,"*")

		if (frm.doc.status=="Ocupado" && frm.doc.horas!="0"){
			cur_frm.toggle_enable("numero_quarto",false)
			cur_frm.toggle_enable("horas",false)
			cur_frm.toggle_enable("hora_entrada",false)
			cur_frm.toggle_enable("hora_saida",false)
			cur_frm.toggle_enable("pagamento_por",false)

		}else if (frm.doc.status=="Ocupado" && frm.doc.horas=="0"){
			cur_frm.toggle_enable("status",false)		
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

		alert("ol")
//		frappe.db.get_value("Empresa",{'moeda_default':'Kwanza'})
		t = frappe.db.get_values_from_single('moeda_default','Empresa')
		//msgprint(r.nome_empresa)	
//		dd=frappe.get_list("Empresa",{'moeda_default':'Kwanza'})
		msgprint(nome_empresa)


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
//	var item = frappe.get_doc(cdt,cdn)
//	var item = frappe.get_doc({"doctype":"SERVICOS","nome":d.nome_servico})

	cur_frm.add_fetch('nome_servico','preco','preco_servico')	

	cur_frm.refresh_fields('preco_servico')

	frappe.model.set_value(cdt,cdn,'total',d.preco_servico*d.quantidade)
	frappe.utils.filter_dict(frm.fields_dict["servicos"].grid.docfields, {"fieldname": "preco_servico"})[0].read_only = true;
	frappe.utils.filter_dict(frm.fields_dict["servicos"].grid.docfields, {"fieldname": "total"})[0].read_only = true;
	calculate_totals(frm, cdt, cdn);

});

frappe.ui.form.on("RESERVAS_Services","quantidade",function(frm,cdt,cdn){

	var d =locals[cdt][cdn];
//	var item = frappe.get_doc(cdt,cdn)
	cur_frm.add_fetch('nome_servico','preco','preco_servico')

	frappe.model.set_value(cdt,cdn,'total',d.preco_servico*d.quantidade)
	frappe.utils.filter_dict(frm.fields_dict["servicos"].grid.docfields, {"fieldname": "preco_servico"})[0].read_only = true;
	frappe.utils.filter_dict(frm.fields_dict["servicos"].grid.docfields, {"fieldname": "total"})[0].read_only = true;
	calculate_totals(frm, cdt, cdn);


});


var calculate_totals = function(frm, cdt,cdn) {
	var tbl1 = frm.doc.servicos || [];
	var total_valor = 0; 
	for(var i = 0; i < tbl1.length; i++){
		total_valor += flt(tbl1[i].total);
	}
	frappe.model.set_value(cdt,cdn,'total_servicos',total_valor)
	frm.doc.total_servicos = total_valor
	refresh_many(['total_servicos']);
}

var calculate_totals1 = function(frm, cdt,cdn) {
	var d = locals[cdt][cdn]
	var tbl1 = frm.servicos || [];
	var total_valor = 0; 
	for(var i = 0; i < tbl1.length; i++){
		total_valor += flt(tbl1[i].total);
	}
	frappe.model.set_value(cdt,cdn,'total_servicos',total_valor)
	frm.total_servicos = total_valor
	refresh_many(['total_servicos']);
}

cur_frm.cscript.pagar_servicos = function(frm,cdt,cdn) {

	alert("Apos pagamento dos Serviços o Quarto estará livre.");
	calculate_totals1(frm,cdt,cdn)	
	
	var d = frappe.prompt([
        	{label:__("Pagamento por:"), fieldtype:"Select",options: ["1-Cash","2-TPA", "3-Conta-corrente","4-Não Pagar"],fieldname:"priority",'reqd': 1},
        ],
        function(values){
            var c = d.get_values();
            var me = this;
            show_alert("Selecionado : " + c.priority,5)
		// Status Quarto deve mudar para Livre
		// Status da Gestao_quarto para 
		if (c.priority=="4-Não Pagar"){
			//Manter Gestao_quarto status OCUPADO
			frappe.model.set_value(cdt,cdn,'status',"Ocupado")
			cur_frm.refresh_fields("status");	

		} else if ((c.priority=="1-Cash") || (c.priority=="2-TPA")) {
			//Gestao_quarto status Fechado ... Ja nao se pode alterar.
			frappe.model.set_value(cdt,cdn,'status',"Fechado")
			frappe.model.set_value(cdt,cdn,'servico_pago_por',c.priority)
			cur_frm.refresh_fields("status");	
		} else if (c.priority=="3-Conta-corrente") {
			//Gestao_quarto status Fechado ... Ja nao se pode alterar.
			//Contas ou valores para a Conta corrente do cliente.

			//Dialog a pedir o Cliente
			frappe.model.set_value(cdt,cdn,'status',"Fechado")
			frappe.model.set_value(cdt,cdn,'servico_pago_por',c.priority)
			cur_frm.refresh_fields("status");	



		}

        },
        	'Pagamento',
	        'Fazer Pagamento'
        );
	
}


frappe.ui.form.on("GESTAO_QUARTOS","status",function(frm,cdt,cdn){

	if (frm.doc.status=="Livre"){
	// Tem que verificar se as contas estao pagas.
		alert("Verificando contas")

	}else if (frm.doc.status="Fechado"){
	// Tem que verificar os pagamentos ....
		cur_frm.toggle_display("servico_pago_por",true)

		if ((frm.doc.servico_pago_por =="1-Cash") || (frm.doc.servico_pago_por =="2-TPA")){
			// Pode prosseguir com pagamento
			alert("Pagamento de Serviços feito. Por favor salvar registo para liberar o Quarto.")	
		} else {
			// Esta vazio .....
			alert("Nao pode Fechar pois ainda nao foram feitos os pagamentos...")	
//			frappe.model.set_value(cdt,cdn,'status',"Ocupado")
//			cur_frm.refresh_fields("status");	
		}
	}

});

frappe.ui.form.on("GESTAO_QUARTOS","pagamento_por",function(frm,cdt,cdn){

	if (frm.doc.pagamento_por=="Conta-corrente"){
	// Pedir o Cliente e se o mesmo for membro e autorizado ...
 
		alert("Somente Membros podem ter Conta-corrente")

	
	}

});


