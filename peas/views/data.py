from flask import g, jsonify, request
from functools import wraps
from peas import app
from peas.database import connect_db

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

@app.route('/add', methods=['POST'])
@only_json_request
def add_note():
    json = request.json;
    if not 'title' in json or not 'content' in json:
        return jsonify(error = 'Invalid request');
    g.db.execute('insert into notes (username, title, content) values (?, ?, ?)',
            ('lala', json['title'], json['content']))
    g.db.commit();
    return jsonify(code = 200)

@app.route('/get', methods=['GET'])
def get_notes():
    cur = g.db.execute('select id, username, title, content from notes '
        'order by id desc')
    notes = [dict(id=row[0], username=row[1], title=row[2], content=row[3]) for row in cur.fetchall()]
    return jsonify(notes=notes)

@app.route('/delete', methods=['POST'])
@only_json_request
def delete_note():
  if not ('id' in request.json or request.json['id'] > 0):
    return jsonify('Invalid request')
  id = request.json['id']
  g.db.execute('delete from notes where id=?', (id,))
  g.db.commit();
  return jsonify(code = 200)
