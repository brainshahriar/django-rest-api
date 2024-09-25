from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from .serializers import UserSerializer, LoginSerializer
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from django.contrib import auth
import jwt
import datetime
from rest_framework import permissions
from django.contrib.auth import logout
from .models import BlacklistedToken
# Create your views here.


class RegisterView(GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        data = request.data
        username = data.get('username', '')
        password = data.get('password', '')
        user = auth.authenticate(username=username, password=password)

        if user:
            # Ensure the secret key is a string
            secret_key = str(settings.JWT_SECRET_KEY)
            payload = {
                'id': user.id,  # Unique user identifier
                'username': user.username,
                'iat': datetime.datetime.utcnow(),  # Issued at
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Token expires after 24 hours
            }
            auth_token = jwt.encode(payload, secret_key, algorithm="HS256")

            serializer = UserSerializer(user)

            data = {'user': serializer.data, 'token': auth_token}

            return Response(data, status=status.HTTP_200_OK)

        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
class LogoutView(GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        # Get the token from the Authorization header
        token = request.headers.get('Authorization').split(' ')[1]

        # Blacklist the token
        BlacklistedToken.objects.create(token=token)

        # Logout the user
        logout(request)
        return Response({'message': 'Successfully logged out.'}, status=status.HTTP_200_OK)

