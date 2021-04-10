from flask.app import Flask
from flask import request
from flask_cors import CORS, cross_origin
from flask import jsonify
# from usrp_tx import usrp_tx
import os

app = Flask(__name__, static_folder='./client/build', static_url_path='/')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.config.from_object(__name__)


@app.errorhandler(404)
def page_not_found(e):
    return app.send_static_file('index.html')


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route("/getNoiseFiles", methods=['GET'])
@cross_origin()
def getFiles():
    filesList = os.listdir("files")
    return jsonify(filesList)


@app.route("/startTransmit", methods=['POST'])
@cross_origin()
def startTransmit():
    response = request.get_json()
    gain = float(response['gain'])
    cFreg = float(response['cFreg'])
    sampleRate = float(response['sampleRate'])
    selectedFile = response['selectedFile']

    print("iPerf parameter")
    print(gain)
    print(cFreg)
    print(sampleRate)
    print(selectedFile)

    # usrp_tx(cFreg, sampleRate, gain, selectedFile)
    return jsonify({"success": "true"})


@app.route("/startSession", methods=['POST'])
@cross_origin()
def startSession():
    response = request.get_json()
    clientIP = response['clientIP']
    outputInterval = response['outputInterval']
    time = response['time']
    UDP = response['UDP']

    print("iPerf parameter")
    print(clientIP)
    print(outputInterval)
    print(time)
    print(UDP)

    return jsonify({"success": "true"})
