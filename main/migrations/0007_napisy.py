# Generated by Django 4.2.4 on 2023-10-09 17:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_zagadka_numer'),
    ]

    operations = [
        migrations.CreateModel(
            name='Napisy',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nazwa', models.CharField(max_length=50)),
                ('tresc', models.CharField(max_length=200)),
            ],
        ),
    ]
