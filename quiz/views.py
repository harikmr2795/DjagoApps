from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader


def create(request):
    template = loader.get_template('quiz/create.html')
    return HttpResponse(template.render(request))