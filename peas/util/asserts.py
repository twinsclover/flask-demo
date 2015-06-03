from flask.ext.assets import Bundle, Environment
from .. import app

bundles = {
    'note_js': Bundle(
        'js/app.js',
        'js/note.js',
        output='gen/note.js'),
}

assets = Environment(app)
assets.register(bundles)
