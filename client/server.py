import tornado.httpserver
import tornado.ioloop
import tornado.web
import os
import redis

REDIS = redis.Redis(host='api.smshlp.org')

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        # items = ["Medical", "Risk", "Disaster", "Skills"]
        total_convo = REDIS.get("totals:sessions")
        total_users = REDIS.get("totals:sessions")
        totals = {'title': 'All Users', 'convo': total_convo, 'users' : total_users}
        self.render("templates/index.html", title="SMS Help", items=[totals])

class AnotherHandler(tornado.web.RequestHandler):
    def get(self, path):
        # items = ["Medical", "Risk", "Disaster", "Skills"]
        
        self.render("templates/%s.html" % path, title="SMS About")

settings = {
    "static_path": os.path.join(os.path.dirname(__file__), 'static' ), 
}

application = tornado.web.Application([
  (r"/", MainHandler),
  (r"/([^/]*)\.html", AnotherHandler),
], **settings) 

if __name__ == "__main__":
    http_server = tornado.httpserver.HTTPServer(application)
    http_server.listen(5000)
    tornado.ioloop.IOLoop.instance().start()
