from flask import g, jsonify, request
from functools import wraps
from peas import app
from peas.database import connect_db
import time

@app.before_request
def before_request():
  g.db = connect_db()

@app.teardown_request
def teardown_request(exception):
  db = getattr(g, 'db', None)
  if db is not None:
    db.close()

def only_json_request(f):
    @wraps(f)
    def decorator_function(*arg, **kwargs):
        if not 'application/json' in request.headers['Content-Type'].split(';'):
            return 'unaccepted content type'
        return f(*arg, **kwargs)

    return decorator_function

###
# Note Table related operations.
###
@app.route('/note/add', methods=['POST'])
@only_json_request
def add_note():
    json = request.json;
    if not 'title' in json or not 'content' in json:
        return jsonify('Invalid request');
    book_id = 0
    if 'book_id' in json:
        book_id = json['book_id']
    g.db.execute('insert into notes '
            '(book_id, user_id, title, content, creation_ts) '
            'values (?, ?, ?, ?, ?)',
            (book_id, 0, json['title'], json['content'], time.time()))
    g.db.commit();
    return jsonify(code = 200)

@app.route('/note/list', methods=['GET'])
def list_notes():
    cur = g.db.execute('select id, book_id, user_id, title, content, creation_ts'
        ' from notes order by id desc')
    notes = [dict(id=row[0], book_id=row[1], user_id=row[2], title=row[3], content=row[4], creation_ts=row[5]) for row in cur.fetchall()]
    return jsonify(notes=notes)

@app.route('/note/delete', methods=['POST'])
@only_json_request
def delete_note():
  if not ('id' in request.json or request.json['id'] > 0):
    return jsonify('Invalid request')
  id = request.json['id']
  g.db.execute('delete from notes where id=?', (id,))
  g.db.commit();
  return jsonify(code = 200)

###
# Book Table related operations.
###
@app.route('/book/add', methods=['POST'])
@only_json_request
def add_book():
    json = request.json;
    if not 'name' in json:
        return jsonify('Invalid request');
    g.db.execute('insert into books (user_id, name, creation_ts) '
            'values (?, ?, ?)',
            (0, json['name'], time.time()))
    g.db.commit();
    return jsonify(code = 200)

@app.route('/book/list', methods=['GET'])
def list_books():
    cur = g.db.execute('select id, user_id, name from books '
        'order by id desc')
    books = [dict(id=row[0], user_id=row[1], name=row[2]) for row in cur.fetchall()]
    return jsonify(books=books)

@app.route('/book/delete', methods=['POST'])
@only_json_request
def delete_book():
  if not ('id' in request.json or request.json['id'] > 0):
    return jsonify('Invalid request')
  id = request.json['id']
  g.db.execute('delete from books where id=?', (id,))
  g.db.commit();
  return jsonify(code = 200)
