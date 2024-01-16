from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import User
from django.db import IntegrityError
import jwt
# Create your views here.

@api_view(['POST'])
def checkuser(request):
    email=request.data['email']
    encoded = jwt.encode({"email": email}, "secret", algorithm="HS256")
    try:
        User.objects.create(email=email)
        return Response({'message' : 'account created','data' : encoded})
    except IntegrityError as e:
        return Response({'message' : 'user exists','data' : encoded})
    except:
        return Response({'message' : 'Error occurred'})
    
    
