# Generated by Django 4.0.1 on 2022-07-30 13:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobsapi', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='jobtype',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='job',
            name='location',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='job',
            name='status',
            field=models.CharField(max_length=200, null=True),
        ),
    ]