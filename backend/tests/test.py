import json
from flask_testing import TestCase
from app import app
from models import db, Skill

class TestApp(TestCase):
    TESTING = True
    SQL_DB_URI = "sqllite://"

    def create_app(self):
        app.config.from_object(self)
        return app
    
    def setUp(self):
        db.create_all()
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    # test list users with userresponse
    def test_list_nousers(self):
        # self.client.post("/users")
        response = self.client.get("/users")
        # is response.json().users length equal to 1
        data = response.data.decode("utf-8")
        data = json.loads(data)
        self.assertEqual(len(data['users']), 0)

    # test list users with userresponse
    def test_list_users(self):
        self.client.post("/users")
        response = self.client.get("/users")
        # is response.json().users length equal to 1
        data = response.data.decode("utf-8")
        data = json.loads(data)
        self.assertEqual(len(data['users']), 10)
    
    # test fetch users list with skills parameters
    def test_list_users_skills_params(self):
        self.client.post("/users")
        self.client.put("/users/1/skills",  json={"skills": ["react"]})
        response = self.client.get("/users?skill=react")
        data = response.data.decode("utf-8")
        data = json.loads(data)
        self.assertEqual((data['users'][0]['skills'][0]),"react")

     # test delete users list
    def test_delete_users(self):
        self.client.post("/users")
        response = self.client.delete("/users")
        self.assertEqual(response.status_code, 200)
    
    # test delete users list
    def test_fetch_skillslist(self):
        response = self.client.get("/skills")
        data = response.data.decode("utf-8")
        data = json.loads(data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(data['skills']), 0)
    
    # test save skills with user id
    def test_saveskills_userid(self):
        self.client.post("/users")
        response = self.client.put("/users/1/skills",  json={"skills": ["react"]})
        data = response.data.decode("utf-8")
        data = json.loads(data)
        self.assertEqual(len(data['users'][0]['skills']), 1)

