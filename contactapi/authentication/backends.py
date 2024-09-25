from rest_framework import authentication
import jwt
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.models import User
from .models import BlacklistedToken

class JWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_data = authentication.get_authorization_header(request)

        if not auth_data:
            return None
        
        try:
            prefix, token = auth_data.decode('utf-8').split(' ')
        except ValueError:
            raise AuthenticationFailed('Invalid token header. No credentials provided.')

        if prefix.lower() != 'bearer':
            raise AuthenticationFailed('Authorization header must start with "Bearer".')

        # Check if token is blacklisted
        if BlacklistedToken.objects.filter(token=token).exists():
            raise AuthenticationFailed('This token has been blacklisted, please log in again.')

        try:
            # Ensure the secret key is passed as a string
            payload = jwt.decode(token, str(settings.JWT_SECRET_KEY), algorithms=['HS256'])

            user = User.objects.get(username=payload['username'])
            return (user, token)

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Your token has expired, please log in again.')
        
        except jwt.DecodeError:
            raise AuthenticationFailed('Your token is invalid, please log in again.')
        
        except User.DoesNotExist:
            raise AuthenticationFailed('No user matching this token was found.')
