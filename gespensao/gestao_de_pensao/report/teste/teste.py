# Copyright (c) 2013, Helio de Jesus and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.utils import flt
from frappe import msgprint, _


def execute(filters=None):
	if not filters: filters = {}

data = [] 
11 	conditions = get_columns(filters, "Sales Invoice") 
12 	data = get_data(filters, conditions) 
13 
 
14 	return conditions["columns"], data 

