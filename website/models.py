from . import db
from flask_login import UserMixin
from flask import jsonify


class User(db.Model, UserMixin):
    id = db.Column(db.Integer(), primary_key=True)
    email = db.Column(db.String(50), unique=True, nullable=False)
    login = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)

    #Relationship
    goods = db.relationship('Goods')

    def __init__(self, email=None, login=None, password=None):
        self.email = email
        self.login = login
        self.password = password

    def delete_from_db(self, current_id=None):
        if current_id:
            delete_user = User.query.get(current_id)
            db.session.delete(delete_user)
            db.session.commit()
            return jsonify({"message": "User was deleted"}, 200)

        else:
            return jsonify({"message": "User with this id is not found"}, 404)

    def update_info(self, current_id=None, update_data=None):
        if current_id:
            # get user from DB
            update_user = User.query.filter_by(id=current_id).first()

            if update_data['login'] != '':
                new_login = update_data.get('login')
                if new_login:
                    if User.query.filter_by(login=new_login).first():
                        return jsonify({"message": "User with this login already exist"}, 404)
                    else:
                        update_user.login = new_login

            if update_data['email'] != '':
                new_email = update_data.get('email')
                if new_email:
                    if User.query.filter_by(email=new_email).first():
                        return jsonify({"message": "User with this email already exist"}, 404)
                    else:
                        update_user.email = new_email
            
            db.session.commit()
            return jsonify({"message": "User was updated"}, 404)


class Goods(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    picture = db.Column(db.String(100), nullable=False)
    tag = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Integer(), nullable=False)

    #Foreign Key
    customer_id = db.Column(db.Integer(), db.ForeignKey('user.id'))

    def __init__(self, picture=None, tag=None, price=None, customer_id=None):
        self.picture = picture
        self.tag = tag
        self.price = price
        self.customer_id = customer_id

    def delete_from_db(self, current_id=None):
        if current_id:
            delete_goods = Goods.query.get(current_id)
            db.session.delete(delete_goods)
            db.session.commit()
            return jsonify({"message": "Product was deleted"}, 200)

        else:
            return jsonify({"message": "Product with this id is not found"}, 404)


class Contact(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(100), nullable=False)

    def __init__(self, name=None, phone=None):
        self.name = name
        self.phone = phone
