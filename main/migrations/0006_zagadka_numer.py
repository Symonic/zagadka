# Generated by Django 4.2.4 on 2023-09-01 11:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_plik_graf_tyt_plik_rozpocznij'),
    ]

    operations = [
        migrations.AddField(
            model_name='zagadka',
            name='numer',
            field=models.IntegerField(default=0),
        ),
    ]
