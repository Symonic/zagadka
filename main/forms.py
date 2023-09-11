from django import forms

class DokumentForm(forms.Form):
    docfile = forms.FileField(label = "wybierz plik", help_text= 'text_pomoc')