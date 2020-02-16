from rest_framework import serializers
from .models import ApartmentSupply, Apartment, Supply


class SupplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Supply
        fields = '__all__'


class ApartmentSupplyListSerializer(serializers.ListSerializer):
    def update(self, instance, validated_data):
        supply_mapping = {supply.id: supply for supply in instance.apartment_supply.all()}
        data_mapping = {item['id']: item for item in validated_data}
        for id, item in data_mapping.items():
            supply = supply_mapping.get(id, None)
            if supply:
                supply.in_use = item["in_use"]
                supply.stock = item["stock"]
                supply.save()
        return

class ApartmentSupplySerializer(serializers.ModelSerializer):
    supply = SupplySerializer(read_only=True)
    id = serializers.IntegerField(required=True)
    stock = serializers.IntegerField(required=True)
    in_use = serializers.IntegerField(required=True)

    class Meta:
        model = ApartmentSupply
        list_serializer_class = ApartmentSupplyListSerializer
        fields = '__all__'

class SuppliesSerializer(serializers.ModelSerializer):
    apartment_supply = ApartmentSupplySerializer(many=True)

    class Meta:
        model = Apartment
        fields = ['id', 'name', 'apartment_supply', 'cleaner', 'supervisor']
