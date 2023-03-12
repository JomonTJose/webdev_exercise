from faker import Faker
from flask import Flask, request
from flask_cors import CORS

from models import db, User, UsersResponse, Skill, SkillsResponse

fake = Faker()

def create_app():
    _app = Flask(__name__)
    _app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
    _app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(_app)
    with _app.app_context():
        db.drop_all()
        db.create_all()
    return _app


app = create_app()
CORS(app)


@app.route("/users", methods=["POST"])
def create_users_batch():
    """
    Add a list of users
    """
    with app.app_context():
        for x in range(10):
            db.session.add(User(name=fake.name()))
        db.session.commit()
    return "Users created", 201


@app.route("/users", methods=["DELETE"])
def delete_all_users():
    with app.app_context():
        User.query.delete()
        Skill.query.delete()
        db.session.commit()
    return "Users deleted"


@app.route("/users", methods=["GET"])
def users():
    """
        Check is the request parameters contain skills 
        Return all users with the specific skill, if skills is present
        Return all users with all skills, if skills is present
    """
    with app.app_context():
        try:
            skills = validate_skills(request.args.getlist("skill"))
            if not skills:
                users = UsersResponse(
                    users=[
                        {
                            "id": user.id,
                            "name": user.name,
                            "skills": [skill.name for skill in user.skills]
                        }
                        for user in User.query.all()
                    ]
                )
                return users.json(),200
            else: 
                users = UsersResponse(
                    users=[
                        {
                            "id": user.id,
                            "name": user.name,
                            "skills": [skill.name for skill in user.skills]
                        }
                        
                        for user in User.query.filter(User.skills.any(Skill.name.in_(skills))).all()
                    ]
                )
                return users.json(),200
        except Exception as e:
            return str(e), 500

@app.route("/users/<int:user_id>/skills", methods=["PUT"])
def update_user_skills(user_id):
    """
        Api to Update user with skills
        Check if the user exists in users table
        check if the skill exists in skills table
            if not add to skills table
        Map the skill to the user skills table
    """
    with app.app_context():
        try:
            user = User.query.get(user_id)
            if user is None:
                return "User Not Found", 404
            
            skills= validate_skills(request.get_json().get("skills"))
            if not skills:
                return "Invalid Skills", 400
            
            for skill in skills:
                skillset= Skill.query.filter_by(name=skill).first()
                if skillset is None:
                    skillset= Skill(name=skill)
                    db.session.add(skillset)
            
            user.skills= [
                skill for skill in Skill.query.filter(Skill.name.in_(skills)).all()
            ]
            usersResponse = UsersResponse(
                users=[
                    {
                        "id": user.id,
                        "name": user.name,
                        "skills": [skill.name for skill in user.skills]
                    }
                ]
            )
            db.session.commit()
            return usersResponse.json(), 200
        
        except Exception as e:
            return str(e), 500
        

@app.route("/skills", methods=["GET"])
def skills():
    """
        Gets a list of skills
    """
    with app.app_context():
        skillset= Skill.query.all()
    return SkillsResponse(skills=skillset).json(), 200
    
def validate_skills(skills):
    if skills == []:
        return False
    if type(skills) != list:
        return False
    for skill in skills: 
        if skill == "":
            return False
    return skills

if __name__ == "__main__":
    app.run()
