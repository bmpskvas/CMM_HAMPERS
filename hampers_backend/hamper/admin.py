from django.contrib import admin
from .models import Hamper,Order,Cart,Query

# Register your models here.
admin.site.register(Hamper)
admin.site.register(Order)
admin.site.register(Cart)
admin.site.register(Query)