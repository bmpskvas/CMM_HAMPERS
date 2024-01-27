from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.utils import timezone
from django.db import models
import os
from django.core.files import File
from .models import Hamper, Order, Cart , Query
import jwt
from .middlewares import is_authenticated
from django.core.cache import cache
from datetime import datetime
# Create your views here.

@api_view(['GET'])
def upload(request):
  folder_path = 'D:/Hampers/hampers_backend/Tray'

  for filename in os.listdir(folder_path):
    with open("Tray/" + filename, 'rb') as file_content:
      django_file = File(file_content)

      Hamper.objects.create(category="Tray Hampers",
                            image=django_file, price="500")

  return Response({'message': 'Files uploaded successfully'})


@api_view(['POST'])
def getbycategory(request):
  category = request.data['category']
  cached=cache.get(category)
  if cached:
    return Response({'message': 'category displayed', 'data': cached})
  hampers = Hamper.objects.filter(category=category).values()
  cache.set(category,hampers,timeout=None)
  return Response({'message': 'category displayed', 'data': hampers})


@api_view(['GET'])
def allpost(request):
  cached=cache.get("allpost")
  if cached:
    return Response({'message': 'all hampers dispalyed', 'data': cached})
  all_obj = list(Hamper.objects.all().values())
  cache.set("allpost",all_obj,timeout=None)
  return Response({'message': 'all hampers dispalyed', 'data': all_obj})



@api_view(['GET'])
def newarrivals(request):
  seven_days_ago = timezone.now() - timezone.timedelta(days=7)
  cached=cache.get("newarrivals")
  now=datetime.now()
  midnight = datetime(now.year, now.month, now.day, 23, 59, 59)
  time_until_midnight = midnight - now
  if cached:
    return Response({'message': 'all hampers within 7 days displayed', 'data': cached})
  hampers = Hamper.objects.filter(uploaded_at__gte=seven_days_ago).values()
  if not hampers:
    hampers = list(Hamper.objects.all().values())
    cache.set("newarrivals",hampers,timeout=int(time_until_midnight.total_seconds()))
  cache.set("newarrivals",hampers,timeout=int(time_until_midnight.total_seconds()))
  return Response({'message': 'all hampers within 7 days displayed', 'data': hampers})


@api_view(['GET'])
def bestseller(request):
  hampers = Hamper.objects.filter(soldtillnow__gte=5).values()
  cached=cache.get("bestseller")
  if cached:
    return Response({'message': 'all bestseller hampers displayed', 'data': cached})
  cache.set("bestseller",hampers,timeout=86400)
  return Response({'message': 'all bestseller hampers displayed', 'data': hampers})


@api_view(['POST'])
def getbyid(request):
  id = request.data['id']
  hampers = Hamper.objects.filter(id=id).values()
  cached=cache.get(id)
  if cached:
    return Response({'message': 'id displayed', 'data': cached})
  cache.set(id,hampers)
  return Response({'message': 'id displayed', 'data': hampers})



@api_view(['POST'])
@is_authenticated
def orderdetails(request):
  data = request.data
  token = data['token']
  email = data['email']
  try:
      Order.objects.create(name=data['name'], email=data['email'],
                           phoneNo=data['phoneNum'], address=data['address'], pid=data['productId'])
      hamper=Hamper.objects.filter(id=data['productId']).values()
      print(hamper)
      inc_sell=hamper[0]['soldtillnow']+1
      Hamper.objects.filter(id=data['productId']).update(soldtillnow=inc_sell)
      return Response({'message': 'order placed'})
  except Exception as e:
      print(e)
      return Response({'message': 'Error occurred'})
 

@api_view(['POST'])
def filldetails(request):
  email = request.data['email']
  details = Order.objects.filter(email=email).values()
  if len(details)==0:
    return Response({'message': 'no details exist'})
  return Response({'message': 'details displayed', 'details': details[0]})


@api_view(['POST'])
def addtocart(request):
  data = request.data['productInfo']
  token = request.data['token']
  id = data['_id']
  hamper = Hamper.objects.get(id=id)
  try:
    payload = jwt.decode(token, "secret", algorithms=["HS256"])
    email = payload['email']
    details = Cart.objects.filter(email=email, pid=hamper).values()
    if details:
      new_quantity = int(details[0]['quantity']) + 1
      Cart.objects.filter(email=email, pid=hamper).update(
          quantity=new_quantity)
      return Response({'message': 'quantity increased'})
    else:
      Cart.objects.create(pid=hamper, email=email, quantity=1)
      return Response({'message': 'created'})

  except:
    return Response({'message': 'authentication error'})


@api_view(['POST'])
def cartdetails(request):
  email = request.data['email'] 
  details = Cart.objects.select_related('pid').filter(email=email)
  res = [] 
  for i in details:
    dct={
      'image':"https://cmmhampers-production.up.railway.app/" + i.pid.image.url,
      'name':i.pid.category,
      'price':i.pid.price,
      'quantity':i.quantity,
      '_id':i.pid_id,
    }
    res.append(dct)
    # print(res)
  return Response({'message': 'details provided', 'data': res }) 

@api_view(['POST'])
def delte(request):
  id=request.data['id']
  email=request.data['email']
  Cart.objects.filter(pid=id,email=email).delete()
  return Response({'message': 'hamper deleted'})

@api_view(['POST'])
def inc(request):
  id=request.data['id']
  email=request.data['email']
  detail=Cart.objects.filter(pid=id,email=email).values()
  new_quantity = int(detail[0]['quantity']) + 1
  Cart.objects.filter(email=email, pid=id).update(quantity=new_quantity)
  return Response({'message': 'hamper quantity incrased'})

@api_view(['POST'])
def dec(request):
  id=request.data['id']
  email=request.data['email']
  detail=Cart.objects.filter(pid=id,email=email).values()
  new_quantity = int(detail[0]['quantity']) -1
  Cart.objects.filter(email=email, pid=id).update(quantity=new_quantity)
  return Response({'message': 'hamper quantity decreased'})

@api_view(['POST'])
def clearcart(request):
  email=request.data['email']
  Cart.objects.filter(email=email).delete()
  return Response({'message': 'cart cleared'})

@api_view(['POST'])
def querysubmission(request):
  data=request.data
  print(data)
  Query.objects.create(name=data['name'],email=data['email'],message=data['message'])
  return Response({'message': 'query raised'})


# @api_view(['POST'])
# @is_authenticated
# def hello(request):
#   return Response({'message': 'hello'})