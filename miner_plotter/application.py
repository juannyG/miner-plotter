from flask import Flask
from pymodm.connection import connect

app = Flask(__name__)
connect('mongodb://127.0.0.1:27017/miner_plotter')

import views
