#!/bin/bash
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py runserver 0.0.0.0:8000
#exec /opt/conda/envs/app/bin/uwsgi --ini /scripts/uwsgi.ini
#/opt/conda/envs/app/bin/flask db upgrade
#exec /opt/conda/envs/app/bin/gunicorn -w 4 -b 0.0.0.0:8000 app:app