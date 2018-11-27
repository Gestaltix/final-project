#!/usr/bin/env python
# -*- coding: utf-8 -*-

import glob
import pandas as pd
import numpy as np
import statsmodels.api as sm
import warnings
warnings.simplefilter(action='ignore', category=FutureWarning)

# reload(sys)
# sys.setdefaultencoding('utf-8')

from .insert_frame import insert_gbq, insert_csv


# get datetime of event (truncate to 4 hour block)
# generate export_time timestamp
# 

# GPSports
# OpenField Export : 29.07.2018 08:43:09;;;;;;;;
# Reference time : 28.07.2018 17:02:40 UTC;;;;;;;;
# CentisecTime : 153279736000;;;;;;;;
# DeviceId : 64906;;;;;;;;
# Speed Units : Kilometers Per Hour;;;;;;;;
# Distance Units : Meters;;;;;;;;
#"# Period: ""20180728 Spiel Xamax - FCB""";;;;;;;;
#"# Athlete: ""Ajeti""";;;;;;;;
#Timestamp;Seconds;Velocity;Acceleration;Odometer;Latitude;Longitude;Heart Rate;Player Load
#28.07.2018 19:02;0;2.91;0.06;0;46.995111;6.9442046;0;0

def calc_power(df, player_name, export_time):

    # Load file and prepare energy measurement
    k = 0.01 # wind resistance constant
    C_0 = 2.55 # J / (kg * m) -> how much energy is used per kilo when walking on a flat surface

    #df = pd.read_csv("/01.csv", skiprows=5, sep=',')

    df = df.resample("1s").mean() #Group in 1s steps

    # ----------------------------------------------------
    """
    Formula taken from 
    'The energy cost of sprint running and the role of metabolic power in setting top performances'
    by 
    Pietro E. di Prampero · Alberto Botter · Cristian Osgnach
    """
    df[u"EM"] = np.sqrt((np.power(df.Acceleration,2) / np.power(9.81,2)) + 1)
    df[u"ES"] = df.Acceleration / 9.81
    df[u"Watt_kg"] = ((155.4*np.power(
        df[u"ES"],5) - 30.4 * np.power(
        df[u"ES"],4) - 43.3 * np.power(
        df[u"ES"],3) + 46.3 * np.power(
        df[u"ES"],2) + 19.5 * df[u"ES"] + C_0) * df[u"EM"] + k *  np.power(df.Velocity,2) ) * df.Velocity #W/kg
    # ----------------------------------------------------

    df["power_category"] = pd.cut(df.Watt_kg,[-1,10,20,35,55,100],
                                   labels=[u"Low Power \n < 10 W/kg",
                                           u"Intermediate Power\n 10 < x < 20 W/kg",
                                           u"High Power\n 20 < x < 35 W/kg",
                                           u"Enormous Power\n 35 < x < 55 W/kg",
                                           u"Maximum Power\n  55 W/kg < "])
    window_size = set(list(map(lambda time_second: str(int(time_second)) + "s",
                           np.logspace(4,10,50,base=2))))

    x = []
    y = []
    perc = .99 #Which percentile should we take
    weight = 77 #weight of the athlete
    for window in window_size:#tqdm_notebook(window_size):
        # Mean over the window and then the nth quantile of the windows
        rolling_add = np.array([df.Watt_kg.rolling(window).mean().quantile(perc)])
        time = float(window[:-1])
        x += [time] * len(rolling_add)
        y.extend(rolling_add * time * weight) #Convert to J by W/kg * weight * time sustained

    x = np.array(x).astype(float).reshape(-1,1)
    y = np.array(y)
    results = sm.OLS(y,sm.add_constant(x),M=sm.robust.norms.HuberT()).fit() #Robust Regression Line Fit

    W_ = results.params[0] # Anareobic reserve
    CP = results.params[1] # Critical Power
    # ------------------------- plot linear relationship of work done in a time window

    #print W_, CP

    load = df.Acceleration.abs().cumsum().iloc[-1]
    #print 'Load',load

    agg_df = df.groupby(u"power_category").agg(["sum","count"]).Watt_kg

    agg_df.columns = [u"total_energy_kj_per_kg",u"total_time_sec"]
    agg_df.index.name = u"power_category"
    agg_df[u"total_energy_kj_per_kg"] = agg_df[u"total_energy_kj_per_kg"] / 1000

    agg_df.reset_index(inplace=True)
    agg_df[u'power_category'] = agg_df.power_category.astype(str)

    #print agg_df
    agg_df[u'player_name'] = player_name
    agg_df[u'export_time'] = export_time
    agg_df[u'anareobic_reserve'] = W_
    agg_df[u'critical_power'] = CP
    agg_df[u'total_player_load'] = load

    insert_csv(agg_df, "abc.csv", "prefix")

    table = 'test_power_t'
    sql_schema = 'postgres'

    #print agg_df.dtypes
    #exit(0)

    #print agg_df.dtypes
    #insert_sql(agg_df, table, sql_schema)

    insert_gbq(agg_df, table, "sample_team")

    return agg_df


def get_files(folder_path):

    files = glob.glob(folder_path+'20180728 Spiel Xamax - FCB Export for Albian Ajeti 64906.csv')
    #files = glob.glob(folder_path+'*Spiel Xamax*.csv')
    #files = glob.glob(folder_path+'*.csv')
    #files = glob.glob(folder_path+'*.gpx')

    return files


def make_df(file_path, file_type):

    print('running make_df...')
    if file_type in ('fieldwiz'):
        df = pd.read_csv(file_path, skiprows=5, sep=',')

        #print df.dtypes
        #print df.columns
        df[u'Velocity'] = df[u'speed[km/h]'] / 3.6
        #print df.Velocity
        df[u'ts_seconds'] = pd.to_datetime(df[u'time[ISO-UTC]'], format='%Y%m%dT%H%M%S%f') # 20180802T182947000
        #print pd.to_timedelta(df[u'ts'] - df[u'ts'].shift(1), unit='s').dt.total_seconds()
        #df[u'time[ISO-UTC]'] = df[u'time[ISO-UTC]'].str.replace('T','').astype(float)
        df[u'Acceleration'] = (df[u'Velocity'] - df[u'Velocity'].shift(1)) / pd.to_timedelta(df[u'ts_seconds'] - df[u'ts_seconds'].shift(1), unit='s').dt.total_seconds()
        df.set_index("ts_seconds",inplace = True)

        df.drop([u'time[ISO-UTC]',u'xPos[m]',u'yPos[m]',u'hr[bpm]',u'speed[km/h]', u'Latitude[deg]',u'Longitude[deg]',u'numSatFix[-]',u'hdop[-]',u'speed[km/h]'], axis=1, inplace=True)

        df[u'load'] = df[u'Acceleration'].abs().cumsum()/9.81 # why g?
        print(file_path, df.load.tail(1))

        print('This is what it returns(if statement IF)', df, player_name, export_time)
        return df, player_name, export_time

    elif file_type in ('gpsports'): #gpsports
        with open(file_path) as f:
            lines=f.readlines()

        #print lines[0:7]
        player_name = lines[7].split(';')[0].replace(u'# Athlete: ','').replace(u'"','').strip()
        export_time = lines[2].split(';')[0].replace(u'# CentisecTime : ','').replace(u'"','').strip()
        print(player_name)
        print(export_time)

        df = pd.read_csv(file_path, skiprows=8, sep=';')

        df[u'player_name'] = player_name
        df[u'export_time'] = export_time

        df.drop(['Timestamp', 'Heart Rate','Odometer','Latitude','Longitude','Player Load'], axis=1, inplace=True)

        df.Velocity /= 3.6 # We have to convert to meters / second
        df.drop_duplicates("Seconds",inplace = True)
        df["ts_seconds"] = pd.to_timedelta(df.Seconds, unit='s')
        df.drop(['Seconds'], axis=1, inplace=True)

        # correct for moving average acceleration calculated by gpsports
        # http://gpsports.com/gpsports-101/
        df[u'Acceleration'] = (df[u'Velocity'] - df[u'Velocity'].shift(1)) / pd.to_timedelta(df[u'ts_seconds'] - df[u'ts_seconds'].shift(1), unit='s').dt.total_seconds()
        #df[u'Acceleration'] = pd.rolling_mean(df[u'Acceleration'],10)

        df.set_index("ts_seconds",inplace = True)
        #df = df.resample("1s").mean() #Group in 1s steps

        #print df
        print('This is what it returns...', df, player_name, export_time)
        return df, player_name, export_time

    elif file_type in ('gpx'):
        from convert_gpx import convert_gpx
        data = convert_gpx(file_path)
        df = pd.DataFrame(data)
        df.drop(['distance', 'latitude','longitude','x_abs','y_abs'], axis=1, inplace=True)
        df.rename(columns = {'speed':u'Velocity', 'acceleration' : u'Acceleration', 'ts_utc' : u'ts_seconds'}, inplace = True)

        df[u'Acceleration'] = (df[u'Velocity'] - df[u'Velocity'].shift(1)) / pd.to_timedelta(df[u'ts_seconds'] - df[u'ts_seconds'].shift(1), unit='s').dt.total_seconds()

        df.set_index("ts_seconds",inplace = True)

    #exit(0)
        print('this is the gpx one', df, player_name, export_time)
        return calc_power(df, player_name, export_time)

if __name__ == '__main__':

	if False:
		file_type = u'fieldwiz'
		folder_path = u'../../data/nkdomzale/fieldwiz_test/'
	if True:
		file_type = u'gpsports'
		folder_path = u'../../data/fcb/data/'
	if False:
		file_type = u'gpx'
		folder_path = u'../../data/fcrj/'
	#file_path_list = get_files(data_path)

	#file_list = glob.glob(folder_path+'20180728 Spiel Xamax - FCB Export for Albian Ajeti 64906.csv')
	file_list = glob.glob(folder_path+u'*.csv')

	#file_path = '../../data/fcb/data/'+'20180728 Spiel Xamax - FCB Export for Albian Ajeti 64906.csv'
	agg_list = []
	for f in file_list:
		print(f)
		df, player_name, export_time = make_df(f,file_type)
		agg_list.append(calc_power(df, player_name, export_time))

	#print agg_list
