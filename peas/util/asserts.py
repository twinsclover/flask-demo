from flask.ext.assets import Bundle, Environment
from .. import app

bundles = {
    'main_js': Bundle(
        'js/data_service.js',
        'js/note_controller.js',
        'js/navi_controller.js',
        'js/app.js',
        output='gen/main.js'),
}

assets = Environment(app)
assets.register(bundles)
