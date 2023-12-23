from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
import os 
from django.core.files import File
from .models import Hamper
# Create your views here.
@api_view(['GET'])
def upload(request):
  folder_path = 'D:/Hampers/hampers_backend/Tray'
  
  for filename in os.listdir(folder_path):
    with open("Tray/" + filename, 'rb') as file_content:
      django_file = File(file_content)

      Hamper.objects.create(category="Tray Hampers", image=django_file,price="500")

  return Response({'message': 'Files uploaded successfully'})

@api_view(['POST'])
def getbycategory(request):
  category=request.data['category']
  hampers= Hamper.objects.filter(category=category).values()
  return Response({'message': 'category displayed', 'data': hampers})

@api_view(['GET'])
def allpost(request):
   all_obj=list(Hamper.objects.all().values())
   return Response({'message': 'all hampers dispalyed', 'data' : all_obj})

