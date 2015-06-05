from flask import Flask, request, session, g, redirect, url_for, \
     abort, render_template, flash

app = Flask(__name__)
app.config.from_object('peas.config')

from peas.views import data_view, home_view
from .util import asserts
