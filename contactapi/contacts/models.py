from django.db import models
from django.contrib.auth.models import User
import os
from datetime import datetime

def rename_image(instance, filename):
    ext = filename.split('.')[-1]
    new_filename = f"{instance.owner.username}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.{ext}"
    return os.path.join('images', new_filename)

class Contact(models.Model):
    owner = models.ForeignKey(to=User, on_delete=models.CASCADE)
    country_code = models.CharField(max_length=5)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=15)
    photo = models.ImageField(upload_to=rename_image, default='images/default.jpg')
    is_favorite = models.BooleanField(default=False)

    def __str__(self):
        return self.first_name

    def delete(self, *args, **kwargs):
        if self.photo and self.photo.name != 'images/default.jpg':
            if os.path.isfile(self.photo.path):
                os.remove(self.photo.path)
                print(f"Deleted image at: {self.photo.path}")
        super().delete(*args, **kwargs)
