# Generated by Django 5.0 on 2024-01-12 17:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hamper', '0005_alter_hamper_soldtillnow'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('email', models.CharField(max_length=100)),
                ('phoneNo', models.CharField(max_length=100)),
                ('address', models.CharField(max_length=100)),
                ('pid', models.CharField(max_length=100)),
            ],
        ),
    ]