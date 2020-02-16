from django.contrib import admin
from .models import (
    Apartment,
    Supply,
    ApartmentSupply,
)

admin.site.register(Apartment)
admin.site.register(Supply)
admin.site.register(ApartmentSupply)
