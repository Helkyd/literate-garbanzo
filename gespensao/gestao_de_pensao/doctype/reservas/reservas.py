# -*- coding: utf-8 -*-
# Copyright (c) 2015, Helio de Jesus and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.model.document import Document
from frappe.model.naming import make_autoname
from frappe import utils 
import datetime

from frappe.utils import flt, time_diff_in_hours, get_datetime, getdate, cint, get_datetime_str


class RESERVAS(Document):

	def autoname(self):
		self.codigo = make_autoname('RESERVA/' + '.#####')
		self.name = make_autoname('RESERVA/' + '.#####')

	def validate(self):
		self.Validar_Numero_Dias()

	def on_update(self):
		self.Quartos_Status()


	def Validar_Numero_Dias(self):
		if self.number_days <1:
			frappe.throw(_("Verificar Datas de Entrada e Saida. Numero de Dias tem que ser 1 ou mais."))
		
		if (self.check_in < utils.today()):
			frappe.throw(_("Verificar Data de Entrada. Inferior a Data de Hoje."))

	def Quartos_Status(self):

		# Change Quarto status 
		quarto = frappe.get_doc("QUARTOS", self.numero_quarto)			
		quarto.status = "Reservado"

		quarto.save()		
	
