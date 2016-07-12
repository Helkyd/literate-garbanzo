import frappe

@frappe.whitelist()
def get_quartos(start, end):
	
	if not frappe.has_permission("GESTAO_QUARTOS","read"):
		raise frappe.PermissionError

	return frappe.db.sql("""select
		hora_entrada, hora_saida,
		nome_quarto, tipo_quarto, status		
	from `tabGESTAO_QUARTOS`
	where hora_entrada >= %(start)s and hora_saida <= %(end)s """, {
		"start": start,
		"end": end
	}, as_dict=True)
		


