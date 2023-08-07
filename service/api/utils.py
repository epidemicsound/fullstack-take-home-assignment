import uuid


def hex_generator():
    unique_id = uuid.uuid4().hex
    return f"{unique_id[:10]}"