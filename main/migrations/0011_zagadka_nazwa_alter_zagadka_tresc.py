# Generated by Django 4.2.4 on 2023-12-04 17:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0010_plik_submit_kod'),
    ]

    operations = [
        migrations.AddField(
            model_name='zagadka',
            name='nazwa',
            field=models.CharField(default='brak_nazwy', max_length=50),
        ),
        migrations.AlterField(
            model_name='zagadka',
            name='tresc',
            field=models.CharField(max_length=100),
        ),
    ]
