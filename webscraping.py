from bs4 import BeautifulSoup as soup
import datetime as dt
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import requests
from pymongo import MongoClient
import config

buildings_dict = config.get()["bdict"]
apiKey = config.get()["apiKey"]
mongoUrl = config.get()["mongoUrl"]
my_url = "https://viterbi.usc.edu/calendar/"

## Database Setup
client = MongoClient(mongoUrl)
db = client.FOMO_REACT
collection = db.devCollection


# Selenium setup
browser = webdriver.Chrome()
browser.get(my_url)

eventCount = 0
eventData = []

## Click on todayDate+0 all the way to todayDate+7
for i in range(8):
    currDate = (dt.datetime.today()+dt.timedelta(days=i)).strftime('%m/%d/%Y')
    print(currDate)
    eventElements = browser.find_elements_by_xpath('//a[@href="?date='+currDate+'&"]')
    url = "https://viterbi.usc.edu/calendar/?date="+currDate+"&"
    if eventElements:
        eventElements[0].click()
    else:
        continue

    page_soup = soup(browser.page_source, "html.parser")
    events = page_soup.find('div', id='events')

    # Find li tags that are children of ul
    eventList = events.ul.find_all('li', recursive=False)

    for j in range(len(eventList)):
        location = eventList[j].find_all("p")[-3].text.strip()
        # Do not add the record if event does not have location
        if location[:8].lower() != "location":
            print("Current record has no location data.")
            continue
        else:
            location = location[10:].replace(" -", "")
            ## abbr lies between '(' and ')'
            abbr = location[location.find("(")+1:location.find(")")]
            if abbr in buildings_dict.keys():
                address = buildings_dict[abbr]
            else:
                print("Current record has no abbr.")
                continue
            ## LocationStr is abbr + room number ie. OHE 205
            locationStr = abbr + " " + location[location.find(")")+2:]
            resp = requests.get(
                "https://maps.googleapis.com/maps/api/geocode/json?address="
                + address + ", Los Angeles, CA&key=" + apiKey
            )
            resp = resp.json()
            ## If API did not return any result
            if len(resp['results']) == 0:
                print(resp['error_message'])
                continue
            lat = resp['results'][0]['geometry']['location']['lat']
            lng = resp['results'][0]['geometry']['location']['lng']

            ## addressStr is google map address
            addressStr = "https://maps.google.com/?q=" + resp['results'][0]['formatted_address'] 

            title = eventList[j].h3.text.strip()
            time = eventList[j].find('div', class_="event_stats").p.text.strip()
            if time.find("@") != -1:
                time = time[time.find("@")+2:]
            else:
                time = None
            eventDate = dt.datetime.strptime(currDate, "%m/%d/%Y").strftime("%a, %b %d %Y")
            descript = eventList[j].blockquote.text.strip()
            # Get last p tag and filter out previous 10 words
            channelName = eventList[j].find_all("p")[-1].text.strip()[11:]
            
            audience = eventList[j].find_all("p")[-2].text.strip()
            if audience[:9].lower()=="audiences":
                audience = audience[11:]
            else:
                audience = None

            eventDict = {
                "id": eventCount,
                "title": title,
                "time": time,
                "date": eventDate,
                "address": addressStr,
                "location": locationStr,
                "audience": audience,
                "descript": descript,
                "thumbNailImageName": "img1",
                "url": url,
                "lat": lat,
                "lng": lng,
                "channel": {
                    "channelName": channelName,
                    "channelImageName": "pf1.jpg",
                }
            }
            eventData.append(eventDict)
            eventCount+=1

collection.delete_many({})
data = collection.insert_many(eventData).acknowledged
print("Success: "+str(data))
browser.quit()       



