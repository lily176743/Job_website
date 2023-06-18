from rest_framework.serializers import ModelSerializer
from .models import CustomUser, Job

class JobSerializer(ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'

class UserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'