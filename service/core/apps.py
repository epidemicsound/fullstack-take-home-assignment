from django.apps import AppConfig

from core.custom_response import CustomResponse


class CoreConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "core"
    renderes = [CustomResponse]
