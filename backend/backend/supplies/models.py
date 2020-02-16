from django.utils.translation import gettext_lazy as _
from django.conf import settings
from django.db import models


class Apartment(models.Model):
    name = models.CharField(max_length=120)
    supervisor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='supervisor',
        null=True,
        blank=True,
    )
    cleaner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name='cleaner',
        blank=True,
        null=True
    )

    def __str__(self):
        return self.name


class Supply(models.Model):
    CAT = [
        ('kitchen', 'Kitchen'),
        ('laundry', 'Laundry'),
        ('house-keeping', 'House Keeping'),
        ('room', 'Room'),
    ]
    TYPE = [
        ('lt', _('Liter')),
        ('pcs', _('PCS')),
        ('kg', _('KG')),
    ]
    description = models.CharField(max_length=150)
    name = models.CharField(max_length=50)
    brand = models.CharField(max_length=50)
    type = models.CharField(verbose_name=('Item Type'), choices=TYPE, max_length=3)
    category = models.CharField(verbose_name=('Category'), choices=CAT, max_length=20)

    def __str__(self):
        return "{} - {}".format(self.name, self.description)


class ApartmentSupply(models.Model):
    in_use = models.PositiveIntegerField(verbose_name=_('In Use'), blank=True, null=True)
    stock = models.PositiveIntegerField(verbose_name=_('In Stock'), blank=True, null=True)
    standard = models.PositiveIntegerField(verbose_name=_('STD'))
    supply = models.ForeignKey(Supply, on_delete=models.SET_NULL, null=True)
    apartment = models.ForeignKey(Apartment, on_delete=models.SET_NULL,
                                  null=True, related_name='apartment_supply')

    def __str__(self):
        return "{} - {} - {}".format(self.apartment.name, self.supply.category, self.supply.name)
