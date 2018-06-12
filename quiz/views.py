from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.http import Http404
from django.shortcuts import  get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Data
from .serializers import DataSerializer

def create(request):
    template = loader.get_template('quiz/create.html')
    return HttpResponse(template.render(request))

# class DataList(APIView):
#     def get(self, request):
#         datas = Data.objects.all()
#         serializer = DataSerializer(datas, many=True)
#         return Response(serializer.data)

class DataAPI(APIView):
    def post(self, request):
        serializer = DataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_object(self, pk):
        try:
            return Data.objects.get(pk=pk)
        except Data.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        snippet = self.get_object(pk)
        serializer = DataSerializer(snippet)
        return Response(serializer.data)