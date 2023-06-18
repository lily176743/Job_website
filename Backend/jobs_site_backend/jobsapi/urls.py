from django.urls import path
from . import views
urlpatterns = [
    path('',views.getRoutes,name='getRoutes'),
    path('registerUser',views.RegisterUser,name='RegisterUser'),
    path('loginUser',views.LoginUser,name='loginUser'),
    path('createJob',views.createJob,name='createJob'),
    path('readJob/<str:pk>',views.readJob,name='readJob'),
    path('updateJob/<str:pk>',views.updateJob,name='updateJob'),
    path('deleteJob/<str:pk>',views.deleteJob,name='deleteJob'),
    path('readAllJobs',views.readAllJobs,name='readAllJobs'),
    path('getProfile',views.getProfile,name='getProfile'),
    path('changePassword',views.changePassword,name='changePassword'),
]