import frappe

@frappe.whitelist()
def get_quartos(start, end):
	
	if not frappe.has_permission("Quartos","read"):
		raise frappe.PermissionError

	return frappe.db.sql("""select
		from_time, to_time,
		name, subject, status,
		0 as all_day
	from `tabMeeting`
	where from_time >= %(start)s and to_time <= %(end)s """, {
		"start": start,
		"end": end
	}, as_dict=True)
		


