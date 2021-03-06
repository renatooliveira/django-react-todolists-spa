from django.conf.urls import include, url
from rest_framework import routers

from .api import ListViewSet, TaskViewSet, RegistrationAPI, LoginAPI, UserAPI

router = routers.DefaultRouter()
router.register('lists', ListViewSet)
router.register('tasks', TaskViewSet)

urlpatterns = [
    url("^", include(router.urls)),
    url("^auth/register/$", RegistrationAPI.as_view()),
    url("^auth/login/$", LoginAPI.as_view()),
    url("^auth/user/$", UserAPI.as_view()),
]