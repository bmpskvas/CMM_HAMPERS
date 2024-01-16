from django.urls import path
from .views import checkuser

urlpatterns=[
   path('checkuser', checkuser),
]