from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Contact
from .serializers import ContactSerializer
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

class ContactList(ListCreateAPIView):
    serializer_class = ContactSerializer
    permission_classes = (permissions.IsAuthenticated,)
    parser_classes = (MultiPartParser, FormParser)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        return Contact.objects.all().order_by('-id')
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        custom_response = {
            "success": True,
            "message": "Contact created successfully",
            "data": response.data
        }
        return Response(custom_response, status=status.HTTP_201_CREATED)
    
    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        for contact in response.data:
            contact['owner_name'] = Contact.objects.get(id=contact['id']).owner.username
        return response

class ContactDetailView(RetrieveUpdateDestroyAPIView):

    serializer_class = ContactSerializer
    permission_classes = (permissions.IsAuthenticated,)
    lookup_field = "id"
    parser_classes = (MultiPartParser, FormParser)  # Add this to handle file uploads

    def get_queryset(self):
        return Contact.objects.filter(owner=self.request.user)