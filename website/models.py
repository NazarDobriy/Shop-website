from . import db


class User(db.Model):
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


class Goods(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    tag = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(400), nullable=False)
    price = db.Column(db.Float(), nullable=False)
    amount = db.Column(db.Integer(), nullable=False)

    #Foreign Key
    customer_id = db.Column(db.Integer(), db.ForeignKey('user.id'))

    def __init__(self, tag=None, description=None, price=None, amount=None):
        self.tag = tag
        self.description = description
        self.price = price
        self.amount = amount