from django.db import models

# Create your models here.

class Hamper(models.Model):
    category=models.CharField(max_length=100)
    price=models.CharField(max_length=100)
    image = models.FileField(upload_to="hamper_images/")
    uploaded_at = models.DateTimeField()
    soldtillnow=models.IntegerField()

class Order(models.Model):
    name=models.CharField(max_length=100)
    email=models.CharField(max_length=100)
    phoneNo=models.CharField(max_length=100)
    address=models.CharField(max_length=100)
    pid=models.CharField(max_length=100) 

class Cart(models.Model):
    pid = models.ForeignKey(Hamper, to_field='id', on_delete=models.CASCADE)
    email=models.CharField(max_length=100)
    quantity=models.CharField(max_length=100)

class Query(models.Model):
    name=models.CharField(max_length=100)
    email=models.CharField(max_length=100)
    message=models.CharField(max_length=500)
    
