from django.contrib import admin
from django.urls import path, re_path
from main.views import Main_view, Pobierz_zagadke, Logowanie, Administracja, Logout, Nowa_Grafika, Edytuj_zagadke, Usun_zagadke
#from main.views import Zaktualizuj_numer

urlpatterns = [
    path('', Main_view.as_view()),
    path('pobierz_zagadke/', Pobierz_zagadke.as_view()),
    path('pobierz_zagadke/edit', Edytuj_zagadke.as_view()),
    path('pobierz_zagadke/remove', Usun_zagadke.as_view()),
    #path('increment/', Zaktualizuj_numer.as_view()),
    path('logowanie/', Logowanie.as_view()),
    path('administracja/', Administracja.as_view()),
    re_path(r'^administracja/nowa_graf/(?P<buttype>[a-z]+[0-9]?)/$', Nowa_Grafika.as_view()),
    path('logout/', Logout.as_view())
]