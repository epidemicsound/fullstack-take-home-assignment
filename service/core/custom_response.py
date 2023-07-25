from rest_framework.renderers import JSONRenderer


class CustomResponse(JSONRenderer):
    def render(self, data, accepted_media_type=None, renderer_context=None):
        status_code = renderer_context["response"].status_code
        if status_code < 200 or status_code >= 300:
            data = {"success": False, "result": data}
            return super(CustomResponse, self).render(
                data, accepted_media_type, renderer_context
            )
        else:
            return super(CustomResponse, self).render(
                data, accepted_media_type, renderer_context
            )
