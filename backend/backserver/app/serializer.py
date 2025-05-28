from rest_framework import serializers
from django.contrib.auth.models import User
from .models import RouletteBet
from .models import Balance
from decimal import Decimal


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'is_active', 'is_superuser', 'date_joined']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)  # Pobierz hasło
        user = User(**validated_data)
        if password:
            user.set_password(password)  # Hashuj hasło
        user.save()

        # Stwórz związany rekord Balance z początkowym stanem 1000
        Balance.objects.create(user=user, balance=Decimal('1000.00'))

        return user


class RouletteBetSerializer(serializers.ModelSerializer):
    class Meta:
        model = RouletteBet
        fields = ['id', 'bet_amount', 'bet_type', 'created_at', 'author']
        extra_kwargs = {"author": {"read_only": True}}


class BalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Balance
        fields = ['balance']
