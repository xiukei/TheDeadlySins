import indicoio


KEY_LIST = ['8b233bbd79e30e64e3a0a62041889ccc',
            '3015fef9a704020d70e9c503a3f2763c',
            '4cb029ab44f24303e345498e3c66359c',
            'bd0a57f162ad6119efc22947948107f5',
            '86547684249ef030c7d6875d3f8faf15',
            'a0138a8c8aca1090f285c174da538006']


def anger_analyser(data_dic):

    #access the text:
    if data_dic['truncated'] is True: #the tweet's root level text is truncated, need to access full text feild
        text = data_dic['extended_tweet']['full_text'] #string
    else:  # the tweet's root level text is not truncated
        text = data_dic['text']


    #access API:
    try:
        res = indicoio.emotion(text, api_key = KEY_LIST[0])
    except:
        KEY_LIST.pop(0)
        res = indicoio.emotion(text, api_key = KEY_LIST[0])


    #modify data_dic:
    data_dic['ANGER_PROB'] = res['anger']
    if res['anger']> res['joy'] and res['anger']> res['fear'] and res['anger']> res['surprise'] and res['anger']> res['sadness']:
        data_dic['ANGER'] = True
    else:
        data_dic['ANGER'] = False
