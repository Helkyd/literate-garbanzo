import frappe

@frappe.whitelist()
def get_quartos(start, end):
	
	if not frappe.has_permission("GESTAO_QUARTOS","read"):
		raise frappe.PermissionError

	return frappe.db.sql("""select
		hora_entrada, hora_saida,
		nome, nome_quarto, status,
		0 as all_day
	from `tabGESTAO_QUARTOS`
	where hora_entrada >= %(start)s and hora_saida <= %(end)s """, {
		"start": start,
		"end": end
	}, as_dict=True)
		

