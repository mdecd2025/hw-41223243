from flask import Flask, send_from_directory
import ssl
from threading import Thread

app = Flask(__name__)

# Route to serve the index.html file
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

# Route to serve static files from the ./cmsimde/static directory
@app.route('/cmsimde/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('cmsimde/static', filename)

# Route to serve other HTML files from the root directory
@app.route('/<path:filename>')
def serve_html(filename):
    return send_from_directory('.', filename)

def run_http():
    # 啟動 HTTP 伺服器 (端口 8000)
    app.run(host='2001:288:6004:17:fff1:cd25:0:b053', port=8000, debug=True, use_reloader=False)

def run_https():
    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    context.load_cert_chain(certfile='cert.pem', keyfile='key.pem')
    # 啟動 HTTPS 伺服器 (端口 8443)
    app.run(host='2001:288:6004:17:fff1:cd25:0:b053', port=8443, debug=True, ssl_context=context, use_reloader=False)

if __name__ == '__main__':
    # 分別在不同的線程上啟動 HTTP 和 HTTPS 服務
    http_thread = Thread(target=run_http)
    https_thread = Thread(target=run_https)

    http_thread.start()
    https_thread.start()
