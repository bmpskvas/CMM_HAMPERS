from .views import upload,getbycategory,allpost,newarrivals,bestseller,getbyid,orderdetails,filldetails,addtocart,cartdetails,delte,inc,dec,clearcart,querysubmission
from django.urls import path

urlpatterns=[
    path('upload', upload),
    path('getbycategory',getbycategory),
    path('allpost',allpost),
    path('newarrivals',newarrivals),
    path('bestseller',bestseller),
    path('getbyid',getbyid),
    path('orderdetails',orderdetails),
    path('filldetails',filldetails),
    path('addtocart',addtocart),
    path('cartdetails',cartdetails),
    path('delte',delte),
    path('inc',inc),
    path('dec',dec),
    path('clearcart',clearcart),
    path('querysubmission',querysubmission),
   
]