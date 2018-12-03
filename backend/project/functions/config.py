#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os

# LIVE
goog_project = 'skunksports-app-prod-5582817'
goog_private_key = '../auth/skunksports-app-live.json'

# TEST
# goog_project = 'skunksports-app-8777217'
# goog_private_key = '../auth/skunksports-app-test.json'

# update manually with new team customer
# valid_prefix_list = ['fcrj','rocktion','staefa','skunk','muotathal']

# target_users = [] # uncomment to export all
# target_users = [u'te8yNmjUxGb06IgTqSvWNs37PNK2',u'8ZgCCRgDsXUmvqb5RpO3QpUhHjf2']

# read this data
usr = 'raw' + os.sep + 'users_list.json'
db = 'raw' + os.sep + 'db.export.json'

# not used at moment
# make_visible_to_scouts = True
# make_visible_to_others = True

# write local csv
tf_csv = True
csv_path = 'data'
csv_user_info = 'user_info.csv'
csv_sessions_previews = 'sessions_previews.csv'
csv_sessions_stats = 'sessions_stats.csv'
csv_maxspeed_overdist_profile = 'maxspeed_overdist_profile.csv'
csv_speed_profile = 'speed_profile.csv'
csv_heatmaps = 'heatmaps.csv'

# write to sql (postgres)
tf_sql = True
db_uri = 'postgresql://postgres:postgres@localhost/'  # +postgres'+'::' # +table

# sql_schema = prefix

# insert to bigquery
tf_gbq = True
chunk = 10000

sql_user_info = 'user_info_t'
sql_sessions_previews = 'sessions_previews_t'
sql_sessions_stats = 'sessions_stats_t'
sql_maxspeed_overdist_profile = 'maxspeed_overdist_profile_t'
sql_speed_profile = 'speed_profile_t'
sql_heatmaps = 'heatmaps_t'
