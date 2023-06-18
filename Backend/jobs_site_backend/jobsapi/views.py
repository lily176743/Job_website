
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import CustomUser, Job
from .serializers import JobSerializer, UserSerializer
from django.contrib.auth import authenticate,login
# Create your views here.
import jwt
SECRET_KEY = 'python_jwt_key'

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Route No'      :   '0',
            'Endpoint'      :   '/api/registerUser',
            'Description'   :   'Registers user',
            'Body'          :   'email,password',
            'Method'        :   'POST'
        },
        {
            'Route No'      :   '1',
            'Endpoint'      :   '/api/loginUser',
            'Description'   :   'Logins user',
            'Body'          :   'email, password',
            'Method'        :   'POST'
        },
        {
            'Route No'      :   '2',
            'Endpoint'      :   '/api/',
            'Description'   :   'Give List Of Routes',
            'Body'          :   'None',
            'Method'        :   'GET'
        },
        {
            'Route No'      :   '3',
            'Endpoint'      :   '/api/createJob',
            'Description'   :   'Creates Job',
            'Body'          :   'company, position',
            'Method'        :   'POST'
        },
        {
            'Route No'      :   '4',
            'Endpoint'      :   '/api/readJob/:id',
            'Description'   :   'Retrives Job By Id',
            'Body'          :   'None',
            'Method'        :   'GET'
        },
        {
            'Route No'      :   '5',
            'Endpoint'      :   '/api/updateJob/:id',
            'Description'   :   'Finds Job and Updates It',
            'Body'          :   'company, position',
            'Method'        :   'PUT'
        },
        {
            'Route No'      :   '6',
            'Endpoint'      :   '/api/deleteJob/:id',
            'Description'   :   'Finds Job and Deletes It',
            'Body'          :   'None',
            'Method'        :   'DELETE'
        },
        {
            'Route No'      :   '7',
            'Endpoint'      :   '/api/readAllJobs',
            'Description'   :   'Give List Of Jobs',
            'Body'          :   'None',
            'Method'        :   'GET'
        },
        {
            'Route No'      :   '8',
            'Endpoint'      :   '/api/getProfile',
            'Description'   :   'Gives user profile',
            'Body'          :   'None',
            'Method'        :   'GET'
        },
        {
            'Route No'      :   '9',
            'Endpoint'      :   '/api/changePassword',
            'Description'   :   'Changes password',
            'Body'          :   'password',
            'Method'        :   'POST'
        }
    ]
    return Response(routes,status = status.HTTP_200_OK)


@api_view(['POST'])
def RegisterUser(request):
    
    useremail = request.data['useremail']
    password = request.data['password']


    #NOTE -> HERE, PASSED THE PASSWORD IN ARGUMENT AS WE ARE USING MANAGER
    # AS IN MANAGER WE DO USER.SET_PASSWORD -> THATS THE CORRECT WAY AS NEEDED TO SAVE ENCRYPTED
    # BY DOING SETPASSWORD WE SAVE IT IN HASHED  KEY FORM
    
    try:
        user = CustomUser.objects.create_user(email = useremail,password=password)
        userSerializer = UserSerializer(user,many=False).data
        json_data = {
            "email":useremail,
            "password":password
        }
        token = jwt.encode(payload=json_data,key=SECRET_KEY,algorithm='HS256')
        return Response({
            "user":userSerializer,
            "token":token
        },status = status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'errorMsg':str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def LoginUser(request):
    
    useremail = request.data['useremail']
    password = request.data['password']

    try:
        user = authenticate(email = useremail,password = password)
        if(user):
            userSerializer = UserSerializer(user,many=False).data['email']
            json_data = {
                "email":useremail,
                "password":password
            }
            
            
            token = jwt.encode(payload=json_data,key=SECRET_KEY,algorithm='HS256')
            
            
            login(request,user)


            return Response({
                "user":userSerializer,
                "token":token
            },status=status.HTTP_200_OK)
        else:
            return Response({
                "errorMsg":"Invalid Credentials.!!"
            },status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        return Response({"errorMsg":str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def changePassword(request):
    auth_token = request.headers['Authorization'].split(' ')
    data = request.data
    if(not (auth_token[0] == 'Bearer')):
        return Response({'errorMsg':'Invalid Authorization Header..Try again.!!'},status=status.HTTP_400_BAD_REQUEST)
    else:
        decode_data = jwt.decode(jwt = auth_token[1],key=SECRET_KEY,algorithms='HS256')
        email = decode_data['email']
        password = decode_data['password']
        try:
            user = CustomUser.objects.get(email = email)
            updatedUser = user.change_password(data['email'],data['password'])
            updatedUser.save()
            json_data = {
                "email":updatedUser.email,
                "password":data['password']
            }
            userSerializer = UserSerializer(updatedUser,many=False)
            token = jwt.encode(payload=json_data,key=SECRET_KEY,algorithm='HS256')
            return Response({'msg':'User details updated.!!!','token':token,'user':userSerializer.data},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'errorMsg':str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def createJob(request):
    auth_token = request.headers['Authorization'].split(' ')
    data = request.data
    if(not (auth_token[0] == 'Bearer')):
        return Response({'errorMsg':'Invalid Authorization Header..Try again.!!'},status=status.HTTP_400_BAD_REQUEST)
    else:
        decode_data = jwt.decode(jwt=auth_token[1],key=SECRET_KEY,algorithms='HS256')
        email = decode_data['email']
        password = decode_data['password']
        try:
            user = authenticate(email = email,password=password)
            try:
                job = Job.objects.get(
                    position = data['position'],
                    location = data['location'],
                    company = data['company'],
                    status = data['status'],
                    jobtype = data['jobtype'],
                    createdBy = user
                )
                return Response({'msg':'Job Already Exists.!!!'},status=status.HTTP_208_ALREADY_REPORTED)
            except:
                job = Job.objects.create(
                    position = data['position'],
                    location = data['location'],
                    company = data['company'],
                    status = data['status'],
                    jobtype = data['jobtype'],
                    createdBy = user
                )
            return Response({'msg':'Job Created.!!!'},status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'errorMsg':str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
@api_view(['GET'])
def readJob(request,pk):
    auth_token = request.headers['Authorization'].split(' ')
    if(not (auth_token[0] == 'Bearer')):
        return Response({'errorMsg':'Invalid Authorization Header..Try again.!!'},status=status.HTTP_400_BAD_REQUEST)
    else:
        decode_data = jwt.decode(jwt=auth_token[1],key=SECRET_KEY,algorithms='HS256')
        email = decode_data['email']
        password = decode_data['password']
        try:
            user = authenticate(email = email,password=password)
            job = Job.objects.get(id = pk)
            jobSerializer = JobSerializer(job,many=False)
            return Response({'Job':jobSerializer.data},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error':str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PATCH'])
def updateJob(request,pk):
    try:
        job = Job.objects.get(id = pk)
        jobSerializer = JobSerializer(job,data = request.data)
        if jobSerializer.is_valid():
            jobSerializer.save()
            return Response({'Jobs':jobSerializer.data},status=status.HTTP_200_OK)
        else:
            return Response({'Error':'Error in updating job'},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except:
        return Response({'Error':'Error in updating Job'},status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['DELETE'])
def deleteJob(request,pk):
    auth_token = request.headers['Authorization'].split(' ')
    if(not (auth_token[0] == 'Bearer')):
        return Response({'errorMsg':'Invalid Authorization Header..Try again.!!'},status=status.HTTP_400_BAD_REQUEST)
    else:
        decode_data = jwt.decode(jwt=auth_token[1],key=SECRET_KEY,algorithms='HS256')
        email = decode_data['email']
        password = decode_data['password']
        try:
            user = authenticate(email = email,password=password)    
            job = Job.objects.get(id = pk)
            job.delete()
            return Response({'Msg':'Job deleted successfully'},status=status.HTTP_200_OK)
        except:
            return Response({'Error':'Error in deleting Job'},status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def readAllJobs(request):
    auth_token = request.headers['Authorization'].split(' ')
    if(not (auth_token[0] == 'Bearer')):
        return Response({'errorMsg':'Invalid Authorization Header..Try again.!!'},status=status.HTTP_400_BAD_REQUEST)
    else:
        decode_data = jwt.decode(jwt=auth_token[1],key=SECRET_KEY,algorithms='HS256')
        email = decode_data['email']
        password = decode_data['password']
        try:
            user = authenticate(email = email,password=password)    
            jobs = Job.objects.filter(createdBy = user).order_by('-createdAt')
            jobSerializer = JobSerializer(jobs,many=True)
            return Response({'jobs':jobSerializer.data},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'errorMsg':str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def getProfile(request):
    auth_token = request.headers['Authorization'].split(' ')
    if(not (auth_token[0] == 'Bearer')):
        return Response({'errorMsg':'Invalid Authorization Header..Try again.!!'},status=status.HTTP_400_BAD_REQUEST)
    else:
        decode_data = jwt.decode(jwt=auth_token[1],key=SECRET_KEY,algorithms='HS256')
        email = decode_data['email']
        password = decode_data['password']
        try:
            user = authenticate(email = email,password=password) 
            return Response({'user':{'email':email,'password':password}},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'errorMsg':str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)