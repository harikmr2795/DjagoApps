# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2018-06-18 04:56
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0005_auto_20180618_0454'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='score',
            name='data',
        ),
        migrations.DeleteModel(
            name='Score',
        ),
    ]
