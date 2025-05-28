from django.db import models
from django.contrib.auth.models import User


class RouletteBet(models.Model):
    bet_type = models.CharField(max_length=30)
    bet_amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically set timestamp
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bets")

    def __str__(self):
        return f"{self.author} bet {self.bet_amount} on {self.bet_type}"


class Balance(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='balance')
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=1000.00)

    def __str__(self):
        return f"{self.user.username} - {self.balance}"
