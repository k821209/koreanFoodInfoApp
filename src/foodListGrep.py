import json
import requests 
from tqdm import tqdm
dicMain = {'body':[]}
for i in tqdm(range(353)):
    page = i + 1
    URL = 'https://tradifood.net/api/service/TradFoodInfoService/getFoodCateogryList?serviceKey=lLjoGCVK2fzZyHfHUXBIhIbHxQ8GhCmNpnKeFx4m4cfeUuneSaQMdhnxVeAcbN9CtEcRBnmMphI7zSwJL%2BJ7sg%3D%3D&pageNo={page}&numOfRows=10&type=JSON&SG_APIM=2ug8Dm9qNBfD32JLZGPN64f3EoTlkpD8kSOHWfXpyrY'.format(page=page)
    response  = requests.get(URL) 
    # print(response.status_code)
    # print(response.text)
    jsonParse = json.loads(response.text)
    item      = jsonParse['response']['body']['items']['item']
    for each in item:
        dic = {}
        dic['foodCd'] = each['foodCd']
        dic['foodNm'] = each['foodNm']
        dicMain['body'].append(dic) 
with open('foddListGrep.json','w') as f:
    print(json.dumps(dicMain,ensure_ascii = False),file=f)


