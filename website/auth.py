from flask import Blueprint, render_template, request, redirect, url_for, flash
from werkzeug.security import generate_password_hash, check_password_hash
from .controllers import UserController
from .models import User, Goods
from . import db

auth = Blueprint("auth", __name__)


@auth.route('/login', methods=['GET','POST'])
def login():
    if request.method == 'POST':
        current_user_login = request.form.get('login')
        current_user_password = request.form.get('password')

        user = User.query.filter_by(login=current_user_login).first()

        if user:
            if check_password_hash(user.password, current_user_password):
                return redirect(url_for('views.home'))

    return render_template("login.html")


@auth.route('/logout')
def logout():
    return redirect(url_for('auth.login'))


@auth.route('/sign-up', methods=['GET','POST'])
def sign_up():
    if request.method == 'POST':
        user_data = request.form
        UserController().create(user_data)
        return redirect(url_for('views.home'))

    return render_template("sign_up.html")


@auth.route('/payment')
def payment():
    from cloudipsp import Api, Checkout
    api = Api(merchant_id=1396424,
            secret_key='test')
    checkout = Checkout(api=api)
    data = {
        "currency": "USD",
        "amount": 10000
    }
    url = checkout.url(data).get('checkout_url')
    return redirect(url)


@auth.route('/contact-us')
def contact_us():
    return render_template("contact_us.html")


@auth.route('/FAQ')
def FAQ():
    return render_template("FAQ.html")


@auth.route('/basket')
def basket():
    return render_template("basket.html")


@auth.route('/password-reset')
def password_reset():
    return render_template("/password_reset.html")