from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from .serializers import SuppliesSerializer, ApartmentSupplySerializer
from .models import Apartment

class SupplyViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Apartment.objects.filter(cleaner=request.user).all()
        serializer = SuppliesSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Apartment.objects.filter(cleaner=request.user).all()
        items = get_object_or_404(queryset, pk=pk)
        serializer = SuppliesSerializer(items)
        return Response(serializer.data)

    @action(detail=True, methods=['PATCH'])
    def update_supply(self, request, pk=None):
        queryset = Apartment.objects.filter(cleaner=request.user).all()
        instance = get_object_or_404(queryset, pk=pk)
        serializer = ApartmentSupplySerializer(
            instance=instance.apartment_supply, data=request.data, many=True)

        if serializer.is_valid():
            serializer.update(instance=instance, validated_data=serializer.validated_data)
            return Response({"status": "ok", "message": "Supplies have been update"})

        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)
