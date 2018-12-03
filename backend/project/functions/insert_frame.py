#!/usr/bin/env python
# -*- coding: utf-8 -*-

from . import config

import odo
import os


def insert_gbq(data, table, gbq_schema):
    data = data.applymap(
        lambda x: x.replace(u'\r', u' ').replace(u'\n', u' ') if isinstance(x, str) or isinstance(x, unicode) else x)
    # data = data.applymap(lambda x: x if isinstance(x, str) or isinstance(x, unicode) else x)

    # for col in list(data.columns):
    #	data[col] = data[col].apply(lambda x: x.replace(u'\r', u' ') if isinstance(x, str) or isinstance(x, unicode) else x)

    #  generic df to google bigquery writer
    data.to_gbq(gbq_schema + '.' + table, config.goog_project, chunksize=config.chunk, if_exists='append',
                private_key=config.goog_private_key)
    print('INFO: gbq wrote', len(data), 'rows to', gbq_schema + '.' + table)

    return


def insert_sql(data, table, sql_schema):
    #  https://stackoverflow.com/questions/2987433/how-to-import-csv-file-data-into-a-postgresql-table

    # first run this for each new team report
    # CREATE DATABASE fcrj;;

    db_uri = config.db_uri + sql_schema + '::' + table

    # don't drop table in this case
    if False:
        try:  # drop first, since we always have all the data
            # odo.drop(db_uri, schema=sql_schema)
            odo.drop(db_uri)
        except:
            pass  # table doesn't exist, nothing to drop

    # insert all data next
    # t = odo.odo(data, db_uri, schema=sql_schema)
    t = odo.odo(data, db_uri)
    # t = odo.odo('data/speed_profile_t',db_uri)
    print('INFO: sql wrote', len(data), 'rows to', sql_schema + '/' + table)

    return


def insert_csv(data, filename, prefix):
    # generic df to csv writer
    file_path = set_csv_path(filename, prefix)
    data.to_csv(file_path, header=True, index=False, encoding='utf-8')
    print('INFO: csv wrote', len(data), 'rows to', file_path)

    return


def set_csv_path(file_name, prefix):
    file_dir = config.csv_path + os.sep + prefix
    file_path = file_dir + os.sep + file_name

    if not os.path.exists(file_dir):
        os.makedirs(file_dir)

    return file_path
