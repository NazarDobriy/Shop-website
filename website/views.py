from flask import Blueprint, render_template, request, redirect, url_for, make_response, jsonify
from flask_login import current_user
from .models import Goods
from .controllers import GoodsController

views = Blueprint("views", __name__)


@views.route('/', methods=['GET','POST'])
def home():
    if request.method == 'POST':
        goods_data = request.get_json()
        goods_data['user_id'] = current_user.id
        return GoodsController().create(goods_data)

    return render_template("home.html", user=current_user)