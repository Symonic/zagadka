from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.views.generic import CreateView
from main.models import Zagadka, Plik_podp1, Plik_podp2, Plik_submit, Plik_graf_tyt, Plik_rozpocznij, Napisy, LosoweHasla, Plik_odp, Plik_submit_kod
from main.forms import DokumentForm
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import redirect
import json
from django.core.serializers import serialize


# Funkcje/Zmienne pomocnicze


# Create your views here.


class Main_view(CreateView):
    def get(self, request, *args, **kwargs):

        #print(request.session['id_zagadki'])
        if('id_zagadki' not in request.session ):
            request.session['id_zagadki'] = 0
            plik = Plik_graf_tyt.objects.last()
            plik2 = Plik_rozpocznij.objects.last()
            plik3 = Plik_submit_kod.objects.last()
            napis_startowy = Napisy.objects.get(nazwa = "text_start")
            ile_zagadek = Zagadka.objects.all().count()
            return render(request, 'start.html', {"tyt": plik, "rozp": plik2, "submit": plik3, "napis_start" : napis_startowy.tresc, "ile_zagadek" : ile_zagadek})

        elif(request.session['id_zagadki'] == 0):
            plik = Plik_graf_tyt.objects.last()
            plik2 = Plik_rozpocznij.objects.last()
            plik3 = Plik_submit_kod.objects.last()
            napis_startowy = Napisy.objects.get(nazwa = "text_start")
            ile_zagadek = Zagadka.objects.all().count()
            return render(request, 'start.html', {"tyt": plik, "rozp": plik2, "submit": plik3, "napis_start": napis_startowy.tresc, "ile_zagadek": ile_zagadek})
        
        else:
            plik = Plik_podp1.objects.last()
            plik2 = Plik_podp2.objects.last()
            plik3 = Plik_submit.objects.last()
            plik4 = Plik_odp.objects.last()
            napis_gratulacyjny = Napisy.objects.get(nazwa = "text_gratulacje")
            print(napis_gratulacyjny.tresc, "to jest to")
            return render(request, 'index.html', {"podp1": plik, "podp2": plik2, "submit": plik3, "odp": plik4, "napis_gratulacje" : napis_gratulacyjny, "zagnazwa" : "brak" })




class Main_view_specified(CreateView):
    def get(self, request, zagnazwa, *args, **kwargs):

        #print(request.session['id_zagadki'])
        if('id_zagadki' not in request.session ):
            request.session['id_zagadki'] = 0
            plik = Plik_graf_tyt.objects.last()
            plik2 = Plik_rozpocznij.objects.last()
            plik3 = Plik_submit_kod.objects.last()
            napis_startowy = Napisy.objects.get(nazwa = "text_start")
            return render(request, 'start.html', {"tyt": plik, "rozp": plik2, "submit": plik3, "napis_start" : napis_startowy.tresc})

        elif(request.session['id_zagadki'] == 0):
            plik = Plik_graf_tyt.objects.last()
            plik2 = Plik_rozpocznij.objects.last()
            plik3 = Plik_submit_kod.objects.last()
            napis_startowy = Napisy.objects.get(nazwa = "text_start")
            return render(request, 'start.html', {"tyt": plik, "rozp": plik2, "submit": plik3, "napis_start": napis_startowy.tresc})
        
        else:
            plik = Plik_podp1.objects.last()
            plik2 = Plik_podp2.objects.last()
            plik3 = Plik_submit.objects.last()
            plik4 = Plik_odp.objects.last()
            napis_gratulacyjny = Napisy.objects.get(nazwa = "text_gratulacje")
            print(napis_gratulacyjny.tresc, "to jest to")
            return render(request, 'index.html', {"podp1": plik, "podp2": plik2, "submit": plik3, "odp": plik4, "napis_gratulacje" : napis_gratulacyjny, "zagnazwa" : zagnazwa })
   
            

class Pobierz_zagadke(CreateView):
    #def get(self, request, *args, **kwargs):

        
    
    def post(self, request, *args, **kwargs):

        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        print(body)
        up = body['up']

        print(up)

        if(up == 1):
            try:
                zagadka = Zagadka.objects.filter(id__gt=request.session['id_zagadki']).order_by('id').first()
                request.session['id_zagadki'] = zagadka.id
                ostatnia_zagadka = Zagadka.objects.last()
                if(zagadka.id == ostatnia_zagadka.id):
                    request.session['czy_ostatnia'] = 1
                    print("ZMIENNA UTWORZONA")
                else:
                    request.session['czy_ostatnia'] = 0
                    print("ZMIENNA UTWORZONA")
                request.session.modified = True
            except Exception as e:
                print(e)
                request.session['id_zagadki'] = -1
                context = {
                    "tresc" : "Ukończyłeś/aś wszystkie zagadki",
                    "odpowiedz" : "brak",
                    "podp1" : "brak",
                    "podp2" : "brak",
                    "koniec": True
                }
                return JsonResponse(context)
        elif(up == 0):
            try:
                zagadka = Zagadka.objects.last()
                request.session['id_zagadki'] = zagadka.id
                request.session.modified = True
            except Exception as e:
                print(e)
                context = {
                    "tresc" : "Ukończyłeś/aś wszystkie zagadki",
                    "odpowiedz" : "brak",
                    "podp1" : "brak",
                    "podp2" : "brak",
                    "koniec": True
                }
                return JsonResponse(context)
        elif(up == "restart"):
            request.session['id_zagadki'] = 0
            request.session.modified = True
            return HttpResponse(status = 200)
        elif(up == "first"):
            try:
                zagadka = Zagadka.objects.first()
                request.session['id_zagadki'] = zagadka.id
                ostatnia_zagadka = Zagadka.objects.last()
                if(zagadka.id == ostatnia_zagadka.id):
                    request.session['czy_ostatnia'] = True
                else:
                    request.session['czy_ostatnia'] = False
            except:
                request.session['id_zagadki'] = -1
                context = {
                    "tresc" : "Ukończyłeś/aś wszystkie zagadki",
                    "odpowiedz" : "brak",
                    "podp1" : "brak",
                    "podp2" : "brak",
                    "koniec": True
                }
                return JsonResponse(context)
        elif(up == 10):
            try:
                zagadka = Zagadka.objects.get(id=request.session['id_zagadki'])
                
            except:
                request.session['id_zagadki'] = -1
                context = {
                    "tresc" : "Ukończyłeś/aś wszystkie zagadki",
                    "odpowiedz" : "brak",
                    "podp1" : "brak",
                    "podp2" : "brak",
                    "koniec": True
                }
                return JsonResponse(context)
        else:
            try:
                zagadka = Zagadka.objects.get(klucz_wejsciowy = up)
                request.session['id_zagadki'] = zagadka.id
                ostatnia_zagadka = Zagadka.objects.last()
                if(zagadka.id == ostatnia_zagadka.id):
                    request.session['czy_ostatnia'] = 1
                    print("ZMIENNA UTWORZONA")
                else:
                    request.session['czy_ostatnia'] = 0
                    print("ZMIENNA UTWORZONA")
            except:
                context = {
                    "serverresp" : "niepowodzenie",
                }
                return JsonResponse(context)
        tresc = zagadka.tresc
        print(tresc)
        odpowiedz = zagadka.odpowiedz
        podp1 = zagadka.podp1
        podp2 = zagadka.podp2
        kl_wyn = zagadka.klucz_wynikowy
        grafika = str(zagadka.grafika)
        numer_zag = zagadka.numer
        
        if(request.session['czy_ostatnia']):
            koniec = True
        else:
            koniec = False

        print(grafika)

        context = {
            "tresc" : tresc,
            "odpowiedz" : odpowiedz,
            "podp1" : podp1,
            "podp2" : podp2,
            "koniec": koniec,
            "serverresp" : "powodzenie",
            "klucz_wynikowy" : kl_wyn,
            "grafika" : grafika, 
            "numer_zag": numer_zag
        }
        return JsonResponse(context)

class Utworz_zagadke(CreateView):
    def post(self, request, *args, **kwargs):
        if(request.user.is_authenticated):
                nazwa = request.POST['pole-nazwa']
                tresc = request.POST['pole-tresc']
                odpowiedz = request.POST['pole-odpowiedz']
                podp1 = request.POST['pole-podp1']
                podp2 = request.POST['pole-podp2']
                kl_wej = request.POST['pole-kluczWe']
                kl_wyj = request.POST['pole-kluczWy']
                grafika = request.FILES['pole-grafika']

                zagadka = Zagadka(nazwa = nazwa, tresc = tresc, odpowiedz = odpowiedz, podp1 = podp1,
                               podp2 = podp2, klucz_wejsciowy = kl_wej, klucz_wynikowy = kl_wyj, grafika = grafika)
                zagadka.save()

                wszystkie_zagadki = Zagadka.objects.all()
                for i, zagadka in enumerate(wszystkie_zagadki):
                    zagadka.numer = i+1
                    zagadka.save()

        
                return HttpResponse(status=200)

class Edytuj_zagadke(CreateView):
    def post(self, request, *args, **kwargs):
        if(request.user.is_authenticated):
            id = request.POST['pole-id']
            zagadka = Zagadka.objects.get(id=id)

            zagadka.nazwa = request.POST['pole-nazwa']
            zagadka.tresc = request.POST['pole-tresc']
            zagadka.odpowiedz = request.POST['pole-odpowiedz']
            zagadka.podp1 = request.POST['pole-podp1']
            zagadka.podp2 = request.POST['pole-podp2']
            zagadka.klucz_wejsciowy = request.POST['pole-kluczWe']
            zagadka.klucz_wynikowy = request.POST['pole-kluczWy']
            if('pole-grafika' in request.FILES):
                zagadka.grafika = request.FILES['pole-grafika']

            zagadka.save()

            wszystkie_zagadki = Zagadka.objects.all()
            for i, zagadka in enumerate(wszystkie_zagadki):
                zagadka.numer = i+1
                zagadka.save()

            return JsonResponse({"odpowiedz" : "Pomyślnie edytowano!"})

        return JsonResponse({"odpowiedz" : "Nie udało się edytować!"})
    
class Usun_zagadke(CreateView):
    def post(self, request, *args, **kwargs):
        if(request.user.is_authenticated):
            id = request.POST['pole-id']
            zagadka = Zagadka.objects.get(id=id)
            zagadka.delete()
            
            wszystkie_zagadki = Zagadka.objects.all()
            for i, zagadka in enumerate(wszystkie_zagadki):
                zagadka.numer = i+1
                zagadka.save()

            return JsonResponse({'odpowiedz' : 'Usunięto pomyślnie'})
        
        return JsonResponse({'odpowiedz' : 'Nie udało się usunąć!'})

#class Zaktualizuj_numer(CreateView):
#    def post(self, request, *args, **kwargs):
#        body_unicode = request.body.decode('utf-8')
#        body = json.loads(body_unicode)
#        up = body['up']
        

#        if(up == 1):
#            request.session['id_zagadki'] += 1
#            request.session.modified = True
#        elif(up == 0):
#            request.session['id_zagadki'] -= 1
#            request.session.modified = True
#        else:
#            request.session['id_zagadki'] = 0
#            request.session.modified = True

#        print(request.session['id_zagadki'])
#        return HttpResponse(status = 200)
    
class Administracja(CreateView):
    def get(self, request, *args, **kwargs):
        if(request.user.is_authenticated):
            lista_zagadek = Zagadka.objects.all()
            lista_hasel = LosoweHasla.objects.all()

            #grafiki do podgladu
            Grafika_tytulowa = Plik_graf_tyt.objects.last()
            Grafika_rozpocznij = Plik_rozpocznij.objects.last()
            Grafika_podp1 = Plik_podp1.objects.last()
            Grafika_podp2 = Plik_podp2.objects.last()
            Grafika_odp = Plik_odp.objects.last()
            Grafika_zgadnij = Plik_submit.objects.last()
            Grafika_sumbit_kod = Plik_submit_kod.objects.last()

            #napis gratulacyjny do podgladu
            Napis_gratulacje = Napisy.objects.get(nazwa = 'text_gratulacje')
            Napis_start = Napisy.objects.get(nazwa = "text_start")

            return render(request, 'administracja.html', {'zagadki': lista_zagadek, 
                                                          'hasla': lista_hasel,
                                                          'graf_tyt' : Grafika_tytulowa,
                                                          'graf_rozp': Grafika_rozpocznij,
                                                          'graf_podp1': Grafika_podp1,
                                                          'graf_podp2': Grafika_podp2,
                                                          'graf_odp': Grafika_odp,
                                                          'graf_zgadnij': Grafika_zgadnij,
                                                          'text_gratulacje': Napis_gratulacje,
                                                          'text_start': Napis_start,
                                                          'graf_submit_kod': Grafika_sumbit_kod})
        else:
            return HttpResponse(status = 403)

class Logowanie(CreateView):
    def get(self, request, *args, **kwargs):
        
        if(request.user.is_authenticated):
            return redirect('/')
        return render(request, 'login.html')

    def post(self, request, *args, **kwargs):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        username = body["login"]
        print(username)
        password = body["haslo"]
        user = authenticate(request, username = username, password = password)
        
        if user is not None:
            login(request, user)
            context = { "odpowiedz" : "zalogowano" }
            return JsonResponse(context)
        else:
            context = { "odpowiedz" : "nie udało się zalogować" }
        

        return JsonResponse(context)
    
class Logout (CreateView):
    def get(self, request, *args, **kwargs):
        if(request.user.is_authenticated):
            logout(request)
            context = {"odpowiedz" : "wylogowano"}
            return JsonResponse(context)
        else:
            return redirect('/')
        
class Nowa_Grafika(CreateView):
    def post(self, request, buttype, *args, **kwargs):
        print(buttype)
        if(buttype == "podp1"):
            try:
                nowy_plik = Plik_podp1(dokument = request.FILES['docfile'])
                print(nowy_plik)
                nowy_plik.save()
                return HttpResponse(status = 201)
            except:
                return HttpResponse(status = 409)
            
        elif(buttype == "podp2"):
            try:
                nowy_plik = Plik_podp2(dokument = request.FILES['docfile'])
                print(nowy_plik)
                nowy_plik.save()
                return HttpResponse(status = 201)
            except:
                return HttpResponse(status = 409)
        
        elif(buttype == "submit"):
            try:
                nowy_plik = Plik_submit(dokument = request.FILES['docfile'])
                print(nowy_plik)
                nowy_plik.save()
                return HttpResponse(status = 201)
            except:
                return HttpResponse(status = 409)
            
        elif(buttype == "tyt"):
            try:
                nowy_plik = Plik_graf_tyt(dokument = request.FILES['docfile'])
                print(nowy_plik)
                nowy_plik.save()
                return HttpResponse(status = 201)
            except:
                return HttpResponse(status = 409)
        
        elif(buttype == "rozp"):
            try:
                nowy_plik = Plik_rozpocznij(dokument = request.FILES['docfile'])
                print(nowy_plik)
                nowy_plik.save()
                return HttpResponse(status = 201)
            except:
                return HttpResponse(status = 409)
        
        elif(buttype == "grat"):
            try:
                stary_napis = Napisy.objects.get(nazwa = request.POST['tytul'])
                stary_napis.delete()
                nowy_napis = Napisy(nazwa = request.POST['tytul'], tresc = request.POST['tresc'])
                nowy_napis.save()
                return HttpResponse(status = 201)
            except:
                return HttpResponse(status = 409)
            
        elif(buttype == "odp"):
            try:
                nowy_plik = Plik_odp(dokument = request.FILES['docfile'])
                print(nowy_plik)
                nowy_plik.save()
                return HttpResponse(status = 201)
            except:
                return HttpResponse(status = 409)
        
        elif(buttype == "starty"):
            try:
                Napisy.objects.get(nazwa = request.POST['tytul']).delete()
                nowy_napis = Napisy(nazwa = request.POST['tytul'], tresc = request.POST['tresc'])
                nowy_napis.save()
                return HttpResponse(status = 201)
            except:
                return HttpResponse(status = 409)
            
        elif(buttype == 'submitnext'):
            try:
                nowy_plik = Plik_submit_kod(dokument = request.FILES['docfile'])
                print(nowy_plik)
                nowy_plik.save()
                return HttpResponse(status = 201)
            except:
                return HttpResponse(status = 409)
        
        

class Gratulacje(CreateView):
    def get(self, request, *args, **kwargs):
        ile_zagadek = Zagadka.objects.all().count()
        return render(request, 'gratulacje.html', {"ile_zagadek" : ile_zagadek})
    
class Pobierz_hasla(CreateView):
    def get(self, request, *args, **kwargs):
        Hasla = LosoweHasla.objects.all()
        serialized_data = serialize("json", Hasla)
        serialized_data = json.loads(serialized_data)

        return JsonResponse(serialized_data, safe=False, status=200)
        


class Dodaj_haslo(CreateView):
    def post(self, request, *args, **kwargs):
        try:
            nowe_haslo = LosoweHasla(tresc = request.POST['tresc'])
            nowe_haslo.save()
            return HttpResponse(status = 201)
        except:
            return HttpResponse(status = 409)

class Usun_haslo(CreateView):
    def post(self, request, *args, **kwargs):
        id = request.POST['pole-id']
        try:
            Haslo = LosoweHasla.objects.get(id = id)
            Haslo.delete()
            return HttpResponse(status = 201)
        except:
            return HttpResponse(status = 409)