from django.db import models

# Create your models here.
class Message(models.Model):
    sender=models.CharField(max_length=10)
    text=models.TextField()
    created_at=models.DateTimeField(auto_now_add=True)
    
    
#     python manage.py makemigrations
# python manage.py migrate
