# Generated by Django 4.2.4 on 2023-08-26 11:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Plik',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dokument', models.FileField(upload_to='documents/%Y/%m/%d')),
            ],
        ),
    ]