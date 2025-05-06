from django.contrib import admin

from echo.models import Memory, Gallery, Journal

# Register your models here.
admin.site.register(Memory)
admin.site.register(Gallery)
admin.site.register(Journal)