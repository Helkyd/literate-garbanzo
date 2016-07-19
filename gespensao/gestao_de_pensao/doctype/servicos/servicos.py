# -*- coding: utf-8 -*-
# Copyright (c) 2015, Helio de Jesus and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.model.naming import make_autoname


class SERVICOS(Document):


	def autoname(self):
		
		self.name = self.descricao_servico
		self.nome_empresa= frappe.db.get_value("Empresa",None,"nome_empresa")

