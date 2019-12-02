from rest_framework.test import APITestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from django.contrib.auth import get_user_model
from gallery.models import Gallery, Comments
import os


# Create your tests here.
class Test_gallery(APITestCase):
    login = "alex"
    password = "qwerty12345"

    def setUp(self):
        User = get_user_model()
        self.user = User.objects.create_user('alex', 'neurotrendalexander@gmail.com', 'qwerty12345')
        self.image = Gallery.objects.create(
            user=self.user,
            image="/home/alexander/Загрузки/image.png"
        )

        if not self.image:
            raise Exception("Нет изображения")
        self.comment = Comments.objects.create(
            user=self.user,
            image=self.image,
            text="Temp text"
        )

    # тестирование registration
    def test_registration(self):
        username = "alex_new"
        email = "neurotrendalexander@gmail.com"
        password = "qwerty12345"
        register_url = reverse("register")
        result = self.client.post(register_url,
                                  {"username": username, "email": email, "password": password,
                                   "password_confirm": password})
        self.assertEqual(result.status_code, 201)

    # тестирование login
    def test_login(self):
        login_url = reverse("login")
        result = self.client.post(login_url,
                                  {"login": self.login, "password": self.password})
        self.assertEqual(result.status_code, 200)

    # тестирование logout
    def test_logout(self):
        logout_url = reverse("logout")
        self.client.login(username=self.login, password=self.password)
        result = self.client.post(logout_url)
        self.assertEqual(result.status_code, 200)

    # тестируем получение из gallery
    def test_get_gallery(self):
        self.client.login(username=self.login, password=self.password)
        gallery_url = reverse("gallery-list")
        result = self.client.get(gallery_url)
        self.assertGreater(len(result.data["results"]), 0)
        self.assertEqual(result.status_code, 200)

    # тестируем добавление в gallery
    def test_post_gallery(self):
        if not os.path.isfile("/home/alexander/Загрузки/image.png"):
            raise Exception("Нет такого изображения")
        with open("/home/alexander/Загрузки/image.png", "rb") as f:
            image = SimpleUploadedFile("image.png", f.read(), content_type="image/png")
            self.client.login(username=self.login, password=self.password)
            gallery_url = reverse("gallery-list")
            result = self.client.post(gallery_url, {"user": self.user.id, "image": image})
            self.assertEqual(result.status_code, 201)

    # тестируем изменение в gallery
    def test_put_gallery(self):
        if not os.path.isfile("/home/alexander/Загрузки/image.png"):
            raise Exception("Нет такого изображения")
        with open("/home/alexander/Загрузки/image.png", "rb") as f:
            image = SimpleUploadedFile("image.png", f.read(), content_type="image/png")
            self.client.login(username=self.login, password=self.password)
            gallery_url = reverse("gallery-detail", kwargs={"pk": self.image.pk})
            result = self.client.put(gallery_url, {"user": self.user.id, "image": image})
            self.assertEqual(result.status_code, 200)

    # тестируем удаление в gallery
    def test_delete_gallery(self):
        self.client.login(username=self.login, password=self.password)
        gallery_url = reverse("gallery-detail", kwargs={"pk": self.image.pk})
        result = self.client.delete(gallery_url)
        self.assertEqual(result.status_code, 204)

    # тестируем получение из comments
    def test_get_comment(self):
        self.client.login(username=self.login, password=self.password)
        comments_url = reverse("comments-list")
        result = self.client.get(comments_url)
        self.assertGreater(len(result.data), 0)
        self.assertEqual(result.status_code, 200)

    # тестируем добавление в comments
    def test_post_comments(self):
        self.client.login(username=self.login, password=self.password)
        comments_url = reverse("comments-list")
        result = self.client.post(comments_url,
                                  {"user": self.user.id, "image": self.image.pk, "text": " New temp text"})
        self.assertEqual(result.status_code, 201)

    # тестируем изменение в comments
    def test_put_comments(self):
        self.client.login(username=self.login, password=self.password)
        comments_url = reverse("comments-detail", kwargs={"pk": self.comment.pk})
        result = self.client.put(comments_url,
                                 {"user": self.user.id, "image": self.image.pk, "text": "Change temp text"})
        self.assertEqual(result.status_code, 200)

    # тестируем удаление в comments
    def test_delete_comments(self):
        self.client.login(username=self.login, password=self.password)
        comments_url = reverse("comments-detail", kwargs={"pk": self.comment.pk})
        result = self.client.delete(comments_url)
        self.assertEqual(result.status_code, 204)
