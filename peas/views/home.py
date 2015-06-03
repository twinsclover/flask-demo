from flask import render_template, flash, redirect, request, make_response, \
     g, url_for, session, escape, jsonify
from functools import wraps
from peas import app
from wtforms import TextField
from peas.forms import LoginForm
from peas.database import connect_db

import random

@app.before_request
def before_request():
  g.db = connect_db()

@app.teardown_request
def teardown_request(exception):
  db = getattr(g, 'db', None)
  if db is not None:
    db.close()

@app.route('/')
def show_entries():
    if not session.get('logged_in'):
      form = LoginForm()
      return render_template('login.html', form=form)
    return render_template('layout.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    print request.form
    if request.form['id'] != app.config['USERNAME']:
        error = 'Invalid Username'
    elif request.form['password'] != app.config['PASSWORD']:
        error = 'Invalid Password'
    else:
        session['logged_in'] = True
        flash('You were logged in')
        return redirect(url_for('show_entries'))
    return error

@app.route('/logout', methods=['GET', 'POST'])
def logout():
    session['logged_in'] = False
    flash('You were logged out')
    return redirect(url_for('show_entries'))
