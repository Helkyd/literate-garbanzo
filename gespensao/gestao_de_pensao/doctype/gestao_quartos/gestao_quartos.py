# -*- coding: utf-8 -*-
# Copyright (c) 2015, Helio de Jesus and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.model.document import Document
from frappe.model.naming import make_autoname

class GESTAO_QUARTOS(Document):

	def autoname(self):
		self.name = make_autoname(self.numero_quarto + '-' + '.#####')

	def validate(self):
		self.Validar_Numero_Dias()


	def Validar_Numero_Dias(self):
		if self.horas == "0":
			frappe.throw(_("Horas tem que ser 1 ou mais."))

		elif self.hora_entrada == self.hora_saida:
			frappe.throw(_("Hora de Saida tem que sair diferente que Hora de Entrada."))


	def on_update(self):
		self.Quartos_Status()


	def Quartos_Status(self):

		# Change Quarto status 
		quarto = frappe.get_doc("QUARTOS", self.numero_quarto)
		
		if self.status == "Ocupado":
			quarto.status = "Ocupado"
		elif self.status == "Ativo":
			quarto.status = "Ativo"
		elif self.status == "Livre":
			quarto.status = "Livre"

		quarto.save()		


