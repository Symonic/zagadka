from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.views.generic import CreateView
from main.models import Zagadka, Plik_podp1, Plik_podp2, Plik_submit, Plik_graf_tyt, Plik_rozpocznij
from main.forms import DokumentForm
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import redirect
import json

# Create your views here.


class Main_view(CreateView):
    def get(self, request, *args, **kwargs):

        #print(request.session['id_zagadki'])
        if('id_zagadki' not in request.session ):
            request.session['id_zagadki'] = 0
            plik = Plik_graf_tyt.objects.first()
            plik2 = Plik_rozpocznij.objects.first()
            plik3 = Plik_submit.objects.first()
            return render(request, 'start.html', {"tyt": plik, "rozp": plik2, "submit": plik3})

        elif(request.session['id_zagadki'] == 0):
            plik = Plik_graf_tyt.objects.first()
            plik2 = Plik_rozpocznij.objects.first()
            plik3 = Plik_submit.objects.first()
            return render(request, 'start.html', {"tyt": plik, "rozp": plik2, "submit": plik3})
        
        else:
            plik = Plik_podp1.objects.first()
            plik2 = Plik_podp2.objects.first()
            plik3 = Plik_submit.objects.first()
            return render(request, 'index.html', {"podp1": plik, "podp2": plik2, "submit": plik3})
        

class Pobierz_zagadke(CreateView):
    #def get(self, request, *args, **kwargs):

        
    
    def post(self, request, *args, **kwargs):

        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        up = body['up']

        print(up)

        if(up == 1):
            try:
                zagadka = Zagadka.objects.filter(id__gt=request.session['id_zagadki']).order_by('id').first()
                request.session['id_zagadki'] = zagadka.id
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
        
        tresc = zagadka.tresc
        print(tresc)
        odpowiedz = zagadka.odpowiedz
        podp1 = zagadka.podp1
        podp2 = zagadka.podp2

        context = {
            "tresc" : tresc,
            "odpowiedz" : odpowiedz,
            "podp1" : podp1,
            "podp2" : podp2,
            "koniec": False
        }
        return JsonResponse(context)


        if(request.user.is_authenticated):
            tresc = request.POST['pole-tresc']
            odpowiedz = request.POST['pole-odpowiedz']
            podp1 = request.POST['pole-podp1']
            podp2 = request.POST['pole-podp2']
            kl_wej = request.POST['pole-kluczWe']
            kl_wyj = request.POST['pole-kluczWy']
            grafika = request.FILES['pole-grafika']

            zagadka = Zagadka(tresc = tresc, odpowiedz = odpowiedz, podp1 = podp1,
                               podp2 = podp2, klucz_wejsciowy = kl_wej, klucz_wynikowy = kl_wyj, grafika = grafika)
            zagadka.save()

        
            return HttpResponse(status=200)

class Edytuj_zagadke(CreateView):
    def post(self, request, *args, **kwargs):
        if(request.user.is_authenticated):
            id = request.POST['pole-id']
            zagadka = Zagadka.objects.get(id=id)

            zagadka.tresc = request.POST['pole-tresc']
            zagadka.odpowiedz = request.POST['pole-odpowiedz']
            zagadka.podp1 = request.POST['pole-podp1']
            zagadka.podp2 = request.POST['pole-podp2']
            zagadka.klucz_wejsciowy = request.POST['pole-kluczWe']
            zagadka.klucz_wynikowy = request.POST['pole-kluczWy']
            #zagadka.grafika = request.FILES['pole-grafika']

            zagadka.save()
            return JsonResponse({"odpowiedz" : "Pomyślnie edytowano!"})

        return JsonResponse({"odpowiedz" : "Nie udało się edytować!"})
    
class Usun_zagadke(CreateView):
    def post(self, request, *args, **kwargs):
        if(request.user.is_authenticated):
            id = request.POST['pole-id']
            zagadka = Zagadka.objects.get(id=id)
            zagadka.delete()
            Zagadka.objects.raw("DBCC CHECKIDENT('main_zagadka', RESEED, 0)")
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
            return render(request, 'administracja.html', {'zagadki': lista_zagadek})
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
        
        
       