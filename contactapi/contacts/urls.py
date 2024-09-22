from .views import ContactList, ContactDetailView
from django.urls import path

urlpatterns = [
    path('', ContactList.as_view(), name='contact-list'),
    path('<int:id>/', ContactDetailView.as_view(), name='contact-detail'),
]

