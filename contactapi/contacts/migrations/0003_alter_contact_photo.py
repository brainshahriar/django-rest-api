# Generated by Django 5.1.1 on 2024-09-25 07:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contacts', '0002_alter_contact_photo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contact',
            name='photo',
            field=models.ImageField(upload_to='images/'),
        ),
    ]
