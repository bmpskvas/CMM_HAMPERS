from django.db import models

# Create your models here.

class Hamper(models.Model):
    category=models.CharField(max_length=100)
    price=models.CharField(max_length=100)
    image = models.FileField(upload_to="hamper_images/")
    uploaded_at = models.DateTimeField()
