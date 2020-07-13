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

#model create
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


df = read_mongo(db='canteen', collection='created_data')

dataframe = df['name']

'''from datetime import datetime
for dataframe in db["name"].find({"time":{"$gte":datetime(2016,9,26),"$lt":datetime(2016,9,27)}}):'''

dataset = dataframe.values
dataset = dataset[:25]

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

n_steps = 5
# split into samples
X, y = split_sequence(raw_seq, n_steps)
# reshape from [samples, timesteps] into [samples, timesteps, features]
n_features = 1
X = X.reshape((X.shape[0], X.shape[1], n_features))



# fit model
model.fit(X, y, epochs=10, batch_size=1, verbose=2)

'''#save model
model.save('my_model.h5')

#model = keras.load_model('my_model.h5')'''

# demonstrate prediction
for i in range(5):
    raw_seq = np.array(raw_seq)
    x_input = array([raw_seq[-5:]])
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



raw_seq = np.array(raw_seq,dtype = np.int32)

raw_seq=raw_seq.flatten()

raw_seq=raw_seq.flatten()

print(raw_seq)


'''b=[]
while True:
    j = 0
    try:
        b.append(np.mean(raw_seq[j:j+5][0]))
        j += 5
        print(b)
    except:
        break'''

'''for i in range (k,k+300):
    mylist.append(raw_seq(i))
#write date
mycol.insert_many(mylist)'''
    
    # time.sleep(300)
