from werkzeug.security import generate_password_hash, check_password_hash
from flask import request, jsonify
from .models import User, Goods
from . import db


class UserController(object):
    
    def __init__(self, model_user=User()):
        self.model_user = model_user
    
    def create(self, user_data=None):
        self.model_user.email = user_data.get('email')
        self.model_user.login = user_data.get('login')
        self.model_user.password = user_data.get('password')

        #Take user from db to check unique
        user_from_db = User.query.filter_by(login=self.model_user.login).first()

        if not self.model_user.email or not self.model_user.login or not self.model_user.password:
            return jsonify({"message": "Invalid input"}, 400)

        elif user_from_db is not None:
            return jsonify({"message": "User exist with such login"}, 409)

        else:
            hash_pwd = generate_password_hash(self.model_user.password)
            new_user = User(email=self.model_user.email, login=self.model_user.login, password=hash_pwd)
            db.session.add(new_user)
            db.session.commit()
            return jsonify({"message": "User was created"}, 200)