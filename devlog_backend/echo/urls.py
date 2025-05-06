from rest_framework.routers import DefaultRouter
from .views import MemoryAPI, JournalAPI, GalleryAPI

router = DefaultRouter()
router.register(r'memories', MemoryAPI)
router.register(r'journals', JournalAPI)
router.register(r'gallery', GalleryAPI)

urlpatterns = router.urls