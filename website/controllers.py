from flask_login import login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from flask import request, jsonify, make_response
from .models import User, Goods, Contact
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
            return make_response(jsonify({"message": "Invalid input for creating User"}, 400))

        elif user_from_db is not None:
            return make_response(jsonify({"message": "User exist with such login"}, 409))

        else:
            hash_pwd = generate_password_hash(self.model_user.password)
            new_user = User(email=self.model_user.email, login=self.model_user.login, password=hash_pwd)
            db.session.add(new_user)
            db.session.commit()
            return make_response(jsonify({"message": "User was created"}, 200))

    def delete(self, current_id=None):
        return self.model_user.delete_from_db(current_id)

    def update(self, current_id=None, data=None):
        return self.model_user.update_info(current_id, data)


class GoodsController(object):

    def __init__(self, model_goods=Goods()):
        self.model_goods = model_goods

    def create(self, model_goods=None):
        self.model_goods.picture = model_goods.get('picture')
        self.model_goods.tag = model_goods.get('tag')
        self.model_goods.price = model_goods.get('price')
        current_user = model_goods.get('user_id')

        customer = User.query.filter_by(id=current_user).first()

        if not self.model_goods.picture:
            return make_response(jsonify({"message": "You miss picture"}, 400))

        elif not self.model_goods.tag:
            return make_response(jsonify({"message": "You miss tag"}, 400))
            
        elif not self.model_goods.price:
            return make_response(jsonify({"message": "You miss price"}, 400))

        elif not customer:
            return make_response(jsonify({"message": "You miss user"}, 400))

        else:
            data = Goods(self.model_goods.picture,self.model_goods.tag, self.model_goods.price, current_user)
            db.session.add(data)
            db.session.commit()
            return make_response(jsonify({"message": "Product was created"}, 200))


class ContactController(object):
    def __init__(self, model_contact=Contact()):
        self.model_contact = model_contact

    def create(self, model_contact=None):
        self.model_contact.name = model_contact.get('name')
        self.model_contact.phone = model_contact.get('phone')

        if not self.model_contact.name:
            return make_response(jsonify({"message": "You miss name"}, 400))

        elif not self.model_contact.phone:
            return make_response(jsonify({"message": "You miss phpne"}, 400))

        else:
            data = Contact(self.model_contact.name, self.model_contact.phone)
            db.session.add(data)
            db.session.commit()
            return make_response(jsonify({"message": "Contact was created"}, 200))