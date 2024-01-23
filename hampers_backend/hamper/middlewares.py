import os
from rest_framework.response import Response
from rest_framework import status
import jwt


def check(request):
  data = request.data
  try:
    token = data['token']
    decoded = jwt.decode(token, "secret", algorithms=['HS256'])
    return True
  except Exception:
    return False


def is_authenticated(view_func):
  def wrapper(request, *args, **kwargs):
    if check(request):
      return view_func(request, *args, **kwargs)
    return Response({'message': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
  return wrapper
