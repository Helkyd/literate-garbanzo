# -*- coding: utf-8 -*-
# Copyright (c) 2015, Helio de Jesus and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class QUARTOS_TIPO(Document):

	def autoname(self):
		
		self.name = self.descricao
		self.nome_empresa= frappe.db.get_value("Empresa",None,"nome_empresa")

