import keras
import sys
from keras.layers import Dropout
from keras.layers import Dense
from keras.layers import LSTM
from keras.models import Sequential
from numpy import array
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import pymongo
from pymongo import MongoClient
import optparse


location=sys.argv[2]
print(location)
#model create

n_steps = 10
n_features = 1

model = Sequential()
model.add(LSTM(30, activation='relu', input_shape=(n_steps, n_features)))
model.add(Dense(1))
model.compile(optimizer='adam', loss='mse')

client = MongoClient('localhost', 27017)

#import time
#while 1:

def _connect_mongo(host, port, username, password, db):
    """ 指定帐户和密码建立连接 """
    if username and password:
        mongo_uri = 'mongodb://%s:%s@%s:%s/%s' % (
            username, password, host, port, db)
        conn = MongoClient(mongo_uri)
    else:
        conn = MongoClient(host, port)
    return conn[db]


def read_mongo(db, collection, query={}, host='localhost', port=27017, username=None, password=None, no_id=True):
    """ 从Mongo读取并存储到DataFrame """
    # 连接MongoDB
    db = _connect_mongo(host=host, port=port,
                        username=username, password=password, db=db)
    # 对特定的数据库和集合进行查询
    cursor = db[collection].find(query)
    # 读取数据并构造DataFrame
    df = pd.DataFrame(list(cursor))
    # 删除MongoDB中主键_id
    if no_id:
        del df['_id']
    return df

db = client.canteen
'''if location==1:
    collection = db.test1
if location==2:
    collection = db.test2
if location==3:
    collection = db.test3'''
collection = db.test1
collection.drop()
df = read_mongo(db='canteen', collection='traffic',query={"$or":[{"second":1},{"second":31}]})

dataframe = df['flow']


minute = df['minute']
minute = minute.values
minute = minute[-100]
if minute < 5 and minute >=0:
    minute = 0
elif minute < 10 and minute >=5:
    minute = 5
elif minute < 15 and minute >=10:
    minute = 10
elif minute < 20 and minute >=15:
    minute = 15
elif minute < 25 and minute >=20:
    minute = 20
elif minute < 30 and minute >=25:
    minute = 25
elif minute < 35 and minute >=30:
    minute = 30
elif minute < 40 and minute >=35:
    minute = 35
elif minute < 45 and minute >=40:
    minute = 40
elif minute < 50 and minute >=45:
    minute = 45
elif minute < 55 and minute >=50:
    minute = 50
elif minute < 60 and minute >=55:
    minute = 55



hour = df['hour']
hour = hour.values
hour = hour[-100]


dataset = dataframe.values
dataset = dataset[-100:]

a = len(dataset)
# for i in range(0,a+1,60)


# split a univariate sequence into samples

def split_sequence(sequence, n_steps):
    X, y = list(), list()
    for i in range(len(sequence)):
        # find the end of this pattern
        end_ix = i + n_steps
        # check if we are beyond the sequence
        if end_ix > len(sequence)-1:
            break
        # gather input and output parts of the pattern
        seq_x, seq_y = sequence[i:end_ix], sequence[end_ix]
        X.append(seq_x)
        y.append(seq_y)
    return array(X), array(y)


def standardization(data):
    mean = data.mean()
    deviation = data.std()
    data = (data - mean) / deviation
    return data, mean, deviation


def fstandardization(data, mean, deviation):
    data = data*deviation+mean
    return data


scaler = MinMaxScaler(feature_range=(0, 1))
raw_seq = scaler.fit_transform(dataset.reshape(-1, 1))
raw_seq, mean, deviation = standardization(raw_seq)


raw_seq = np.array(raw_seq)


# split into samples
X, y = split_sequence(raw_seq, n_steps)
# reshape from [samples, timesteps] into [samples, timesteps, features]

X = X.reshape((X.shape[0], X.shape[1], n_features))



# fit model
model.fit(X, y, epochs=20, batch_size=1, verbose=2)

#save model
model.save('%s.h5'%(location))

model = keras.models.load_model('my_model.h5')

# demonstrate prediction
for i in range(10):
    raw_seq = np.array(raw_seq)
    x_input = array([raw_seq[-10:]])
    x_input = x_input.reshape((1, n_steps, n_features))
    yhat = model.predict(x_input, verbose=0)
    yhat = yhat[0]
    yhat = yhat[0]
    a = []
    a.append(yhat)
    raw_seq = raw_seq.tolist()
    raw_seq.append(a)

raw_seq = np.ravel(raw_seq)
raw_seq = fstandardization(raw_seq, mean, deviation)

raw_seq = scaler.inverse_transform(raw_seq.reshape(-1, 1))

raw_seq=raw_seq.astype(np.int16)

raw_seq=raw_seq.flatten()

print(raw_seq)


b=[]
j = 0
for i in range(22):
    b.append(np.mean(raw_seq[j:j+10]))
    j = j+10
    s0='%02d:%02d'%(hour,minute)
    collection.insert_one({"location":location,"time":s0,"flow":np.mean(raw_seq[j:j+10])})  #write data
    minute=minute+5
    if minute==60:
        minute=0
        hour = hour + 1
print(b)



# write date
   #db.df.insert_one() 
    
# time.sleep(300)