# Generated by Django 2.0.7 on 2018-07-16 19:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todoapp', '0002_auto_20180716_1911'),
    ]

    operations = [
        migrations.RenameField(
            model_name='task',
            old_name='task_text',
            new_name='text',
        ),
    ]
