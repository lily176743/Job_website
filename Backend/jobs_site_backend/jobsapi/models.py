from django.db import models
from django.contrib.auth.models import User,AbstractUser
from .managers import UserManager
# Create your models here.
class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(unique=True)

    objects = UserManager()
    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS= []

    def change_password(self,newemail,newpassword):
        self.email = newemail
        self.set_password(newpassword)
        self.save()
        return self



class Job(models.Model):
    id = models.BigAutoField(primary_key=True)
    company = models.CharField(max_length=100,null=True,blank=False)
    position = models.CharField(max_length=100, null=True, blank=False)
    location = models.CharField(max_length=200,null=True,blank=False)    
    status = models.CharField(max_length=200,null=True,blank=False)
    jobtype = models.CharField(max_length=200,null=True,blank=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    createdBy = models.ForeignKey(CustomUser,on_delete=models.CASCADE,null=True)
