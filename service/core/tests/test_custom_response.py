import unittest
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.test import APIRequestFactory
from core.custom_response import CustomResponse


class TestCustomResponse(unittest.TestCase):
    def setUp(self):
        self.renderer = CustomResponse()

        self.factory = APIRequestFactory()
        self.request = self.factory.get("/")
        self.view = None
        self.renderer_context = {
            "request": Request(self.request),
            "view": self.view,
            "response": Response(),
        }

    def test_render_success(self):
        data = {"message": "Success"}
        response = self.renderer.render(data, renderer_context=self.renderer_context)
        self.assertEqual(response, b'{"message":"Success"}')

    def test_render_error(self):
        data = {"message": "Error"}
        self.renderer_context["response"].status_code = 400
        response = self.renderer.render(data, renderer_context=self.renderer_context)
        self.assertEqual(response, b'{"success":false,"result":{"message":"Error"}}')
