from msilib.schema import CustomAction
from django.contrib import admin
from .models import CustomUser, Job
# Register your models here.

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ['position', 'location', 'status', 'jobtype']
admin.site.register(CustomUser)
