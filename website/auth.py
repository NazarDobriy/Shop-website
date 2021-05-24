from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify, make_response, json
from flask_login import login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from .controllers import GoodsController, UserController, ContactController
from .models import User, Goods, Contact
from . import db

auth = Blueprint("auth", __name__)


@auth.route('/login', methods=['GET','POST'])
def login():
    if request.method == 'POST':
        user_data = request.get_json()
        current_user_login = user_data.get('login')
        current_user_password = user_data.get('password')

        user = User.query.filter_by(login=current_user_login).first()

        if user:
            if check_password_hash(user.password, current_user_password):
                print(current_user_password)
                login_user(user, remember=True)
                return redirect(url_for('views.home'))

    return render_template("login.html", user=current_user)


@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))


@auth.route('/sign-up', methods=['GET','POST'])
def sign_up():
    if request.method == 'POST':
        user_data = request.form
        UserController().create(user_data)
        return redirect(url_for('auth.login'))

    return render_template("sign_up.html", user=current_user)


@auth.route('/account', methods=['GET','DELETE','PUT'])
@login_required
def account():
    if request.method == 'DELETE':
        return UserController().delete(current_user.id)

    elif request.method == 'PUT':
        user_data = request.get_json()
        return UserController().update(current_user.id, user_data)

    return render_template("account.html", user=current_user)


@auth.route('/payment/<int:id>')
@login_required
def payment(id):
    product = Goods.query.get(id)

    from cloudipsp import Api, Checkout
    api = Api(merchant_id=1396424,
            secret_key='test')
    checkout = Checkout(api=api)
    data = {
        "currency": "USD",
        "amount": str(product.price) + "00"
    }
    url = checkout.url(data).get('checkout_url')
    return redirect(url)


@auth.route('/contact-us', methods=['GET','POST'])
def contact_us():
    if request.method == 'POST':
        contact_data = request.get_json()
        return ContactController().create(contact_data)

    return render_template("contact_us.html", user=current_user)


@auth.route('/FAQ')
def FAQ():
    return render_template("FAQ.html", user=current_user)


@auth.route('/basket', methods=['GET','POST', 'DELETE'])
@login_required
def basket():
    if request.method == 'DELETE':
        goods_data = request.get_json()
        current_goods_id = goods_data.get('id')
        return GoodsController().delete(current_goods_id)

    goods = Goods.query.all()
    return render_template("basket.html", user=current_user, goods=goods)


@auth.route('/password-reset')
def password_reset():
    return render_template("/password_reset.html", user=current_user)


@auth.route('/chatroom')
def chatroom():
    return render_template("/chatroom.html", user=current_user)
