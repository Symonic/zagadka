from django.contrib import admin
from django.urls import path, re_path
from main.views import Main_view, Pobierz_zagadke, Logowanie, Administracja
from main.views import Logout, Nowa_Grafika, Edytuj_zagadke, Usun_zagadke
from main.views import Utworz_zagadke, Gratulacje, Dodaj_haslo, Usun_haslo, Pobierz_hasla
from main.views import Main_view_specified, Przekieruj_glowne
#from main.views import Zaktualizuj_numer

urlpatterns = [
    path('', Main_view.as_view()),
    re_path(r'^zagadka/(?P<zagnazwa>[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9]+)$',Main_view_specified.as_view()),
    path('pobierz_zagadke/', Pobierz_zagadke.as_view()),
    path('pobierz_zagadke/edit', Edytuj_zagadke.as_view()),
    path('pobierz_zagadke/remove', Usun_zagadke.as_view()),
    path('pobierz_zagadke/utworz', Utworz_zagadke.as_view()),
    #path('increment/', Zaktualizuj_numer.as_view()),
    path('login/', Logowanie.as_view()),
    path('administracja/', Administracja.as_view()),
    re_path(r'^administracja/nowa_graf/(?P<buttype>[a-z]+[0-9]?)/$', Nowa_Grafika.as_view()),
    path('logout/', Logout.as_view()),
    path('gratulacje/', Gratulacje.as_view()),
    path('haslo/pobierz/', Pobierz_hasla.as_view()),
    path('haslo/dodaj/', Dodaj_haslo.as_view()),
    path('haslo/usun/', Usun_haslo.as_view()),
    re_path(r'^(?!media\/|login\/).*$', Przekieruj_glowne.as_view())
]