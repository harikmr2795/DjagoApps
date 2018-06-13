from django.conf.urls import url
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^(?P<id>[0-9]+)/', views.answer),
    url(r'^$', views.create),
    url(r'^view/(?P<pk>[0-9]+)/', views.DataAPI.as_view()),
    # url(r'^data/', views.DataList.as_view()),
    url(r'^add/', views.DataAPI.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)