from django.contrib import admin
from main.models import Zagadka, Plik_podp1, Plik_podp2, Plik_submit, Napisy
from main.models import LosoweHasla, Plik_odp, Plik_rozpocznij, Plik_graf_tyt, Plik_submit_kod
# Register your models here.

admin.site.register(Zagadka)
admin.site.register(Plik_podp1)
admin.site.register(Plik_podp2)
admin.site.register(Plik_submit)
admin.site.register(Napisy)
admin.site.register(LosoweHasla)
admin.site.register(Plik_odp)
admin.site.register(Plik_rozpocznij)
admin.site.register(Plik_graf_tyt)
admin.site.register(Plik_submit_kod)