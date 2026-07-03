from django.db import connection
from django.db.utils import OperationalError
from django.http import HttpResponse
from django.views.decorators.http import require_http_methods


@require_http_methods(["GET", "HEAD"])
def health_check(request):
    try:
        # Perform a quick database connection check to ensure the backend is fully functional
        connection.ensure_connection()
    except OperationalError:
        return HttpResponse(
            "Database Unavailable",
            content_type="text/plain",
            status=503,
        )

    if request.method == "HEAD":
        # HEAD requests must not return a message body
        return HttpResponse(status=200)

    return HttpResponse("OK", content_type="text/plain", status=200)
