from rest_framework import viewsets
from rest_framework.response import Response

import json


class CustomModelViewSet(viewsets.ModelViewSet):
    def __init__(self, **kwargs):
        super(CustomModelViewSet, self).__init__(**kwargs)

    def list(self, request, *args, **kwargs):
        initial_queryset = self.queryset
        self.queryset = self.__update_queryset()
        resp = super(CustomModelViewSet, self).list(request, *args, **kwargs)
        count = self.__get_count_queryset(initial_queryset).count()
        response = {
            "success": self.__has_succeeded(resp.status_code),
            "result": resp.data,
            "count": count,
        }
        query_params = request.query_params

        sort = query_params.get("sort_by", None)
        limit = query_params.get("limit", None)
        skip = query_params.get("skip", None)

        if sort:
            response["sort_by"] = sort

        if limit and skip:
            response["to"] = int(limit) + int(skip)
        elif limit and not skip:
            response["to"] = int(limit)
            response["from"] = 0

        if skip:
            response["from"] = int(skip)

        return Response(response)

    def retrieve(self, request, *args, **kwargs):
        resp = super(CustomModelViewSet, self).retrieve(request, *args, **kwargs)
        return Response(self.__get_custom_response(resp.data, resp.status_code))

    def create(self, request, *args, **kwargs):
        resp = super(CustomModelViewSet, self).create(request, *args, **kwargs)
        return Response(self.__get_custom_response(resp.data, resp.status_code))

    def update(self, request, *args, **kwargs):
        resp = super(CustomModelViewSet, self).update(request, *args, **kwargs)
        return Response(self.__get_custom_response(resp.data, resp.status_code))

    def destroy(self, request, *args, **kwargs):
        resp = super(CustomModelViewSet, self).destroy(request, *args, **kwargs)
        return Response(self.__get_custom_response(resp.data, resp.status_code))

    def __update_queryset(self):
        sort = self.request.query_params.get("sort_by", None)
        limit = self.request.query_params.get("limit", None)
        skip = self.request.query_params.get("skip", None)
        filter = self.request.query_params.get("filter", None)

        queryset = self.queryset

        if filter is not None:
            filter = json.loads(filter)
            query_fields = []
            for field in filter:
                query_field = "{}__icontains".format(field)
                query_fields.append((query_field, filter[field]))
            queryset = queryset.filter(**dict(query_fields))

        if sort:
            queryset = queryset.order_by(sort)

        if limit and skip:
            queryset = queryset[int(skip) : int(skip) + int(limit)]
        elif limit:
            queryset = queryset[: int(limit)]
        elif skip:
            queryset = queryset[int(skip) :]
        return queryset

    def __get_count_queryset(self, initial_queryset):
        filter = self.request.query_params.get("filter", None)

        queryset = initial_queryset

        if filter is not None:
            filter = json.loads(filter)
            query_fields = []
            for field in filter:
                query_field = "{}__icontains".format(field)
                query_fields.append((query_field, filter[field]))
            queryset = queryset.filter(**dict(query_fields))

        return queryset

    def __get_custom_response(self, data, status_code):
        response = {
            "success": self.__has_succeeded(status_code),
            "result": data,
        }

        return response

    def __has_succeeded(self, status_code):
        if status_code >= 200 and status_code < 300:
            return True
        else:
            return False
