import redis
import os
import simplejson
import twilio


APIVERSION = "2008-08-01"
ACCOUNT_SID = "ACca7ce03367db8cef4d084532d0fd78f1"
ACCOUNT_TOKEN = "6b37a8f9cb1703e01f9c131327e8eab1"
URL = APIVERSION + "/Accounts/" + ACCOUNT_SID +"/SMS/Messages"

r = redis.Redis()
twil = twilio.Account(ACCOUNT_SID, ACCOUNT_TOKEN)
r.subscribe("outbound.foo")
for (message_type, channel, message) in r.listen():
    print ("Got %s | %s |%s" % (message_type, channel, message))
    if message != 1:
      d = simplejson.loads(str(message))
      call = {'To': d['to'], 'From' : d['from'], 'Body' : d['body']}
      twil.request(URL, 'POST', call)
