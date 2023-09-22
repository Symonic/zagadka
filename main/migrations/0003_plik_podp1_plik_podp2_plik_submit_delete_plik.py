# Generated by Django 4.2.4 on 2023-08-27 13:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_plik'),
    ]

    operations = [
        migrations.CreateModel(
            name='Plik_podp1',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dokument', models.FileField(upload_to='images/podp1')),
            ],
        ),
        migrations.CreateModel(
            name='Plik_podp2',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dokument', models.FileField(upload_to='images/podp2')),
            ],
        ),
        migrations.CreateModel(
            name='Plik_submit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dokument', models.FileField(upload_to='images/submit')),
            ],
        ),
        migrations.DeleteModel(
            name='Plik',
        ),
    ]