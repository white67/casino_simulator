from django.urls import path
from . import views

urlpatterns = [
    path('roulette/generate-number/', views.GenerateRandomNumberView.as_view(), name='generate_random_number'),
    path('roulette/create-new-bet/', views.BetListCreate.as_view(), name='bet-create'),
    path('balance/', views.UserBalanceView.as_view(), name='user-balance'),
]
