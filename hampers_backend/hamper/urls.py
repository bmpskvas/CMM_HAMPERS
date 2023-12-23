from .views import upload,getbycategory,allpost
from django.urls import path

urlpatterns=[
    path('upload', upload),
    path('getbycategory',getbycategory),
    path('allpost',allpost),
   
]