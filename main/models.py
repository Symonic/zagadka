from django.db import models

# Create your models here.

class Zagadka(models.Model):
    tresc = models.CharField(max_length=50)
    odpowiedz = models.CharField(max_length=50)
    podp1 = models.CharField(max_length=50)
    podp2 = models.CharField(max_length=50)
    klucz_wejsciowy = models.CharField(max_length=50, default='brak')
    klucz_wynikowy = models.CharField(max_length=50, default='brak')
    grafika = models.FileField(upload_to='images/zagadki', default='none')
    numer = models.IntegerField(default=0)

class Plik_podp1(models.Model):
    dokument = models.FileField(upload_to='images/podp1')

class Plik_podp2(models.Model):
    dokument = models.FileField(upload_to='images/podp2')

class Plik_submit(models.Model):
    dokument = models.FileField(upload_to='images/submit')

class Plik_graf_tyt(models.Model):
    dokument = models.FileField(upload_to='images/tytulowa')

class Plik_rozpocznij(models.Model):
    dokument = models.FileField(upload_to='images/rozpocznij')