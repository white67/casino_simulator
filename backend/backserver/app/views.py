from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from decimal import Decimal

from .models import *
from .serializer import *
import random

# roulette
from .models import RouletteBet
from .serializer import RouletteBetSerializer

# user authentication
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import generics
from django.contrib.auth.models import User


class GenerateRandomNumberView(APIView):
    def get(self, request):
        random_number = random.randint(0, 36)
        return Response({"random_number": random_number})


class BetListCreate(generics.ListCreateAPIView):
    serializer_class = RouletteBetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return RouletteBet.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()

    serializer_class = UserSerializer

    permission_classes = [AllowAny]


class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Zwrócenie danych użytkownika, w tym informacji o byciu adminem
        user = request.user
        return Response({
            'username': user.username,
            'is_admin': user.is_superuser  # Sprawdzenie, czy użytkownik jest administratorem
        })


class UserBalanceView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        balance = get_object_or_404(Balance, user=request.user)
        serializer = BalanceSerializer(balance)
        return Response(serializer.data)

    def post(self, request):
        balance = get_object_or_404(Balance, user=request.user)

        amount = request.data.get('amount')

        if amount is None:
            return Response(
                {"error": "Amount is required."},
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            amount = float(amount)
        except ValueError:
            return Response(
                {"error": "Invalid amount format."},
                status=status.HTTP_400_BAD_REQUEST
            )

        amount = Decimal(amount)
        balance.balance += amount
        balance.save()

        serializer = BalanceSerializer(balance)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AdminUserListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_superuser:
            return Response(
                {"error": "You do not have permission to perform this action."},
                status=status.HTTP_403_FORBIDDEN
            )

        users = User.objects.all()
        print(users)  # Debug log
        serializer = UserSerializer(users, many=True)
        print(serializer.data)  # Debug log
        return Response(serializer.data)
