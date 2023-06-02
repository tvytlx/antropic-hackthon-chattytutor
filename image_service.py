import requests
import base64

from flask import Flask, request, make_response

# Cloudflare Image Resizing API endpoint
API_URL = "https://api.cloudflare.com/client/v4/accounts/"
# Your Cloudflare account ID and API token
ACCOUNT_ID = ""
API_TOKEN = ""


def upload(blob):
    # Image upload parameters
    params = {
        "file": blob,
    }

    # Make API request
    response = requests.post(
        f"{API_URL}{ACCOUNT_ID}/images/v1",
        files=params,
        headers={
            "Authorization": "Bearer " + API_TOKEN,
        },
    )

    # Check response status code
    if response.status_code == 200:
        # Get image URL and metadata
        data = response.json()
        print(data["result"]["id"])
        print("Image uploaded successfully.")
        return data["result"]["id"]
    else:
        print("Image upload failed.")
        print(response.text)
        return


session = requests.Session()


def sd(payload, port=7860):
    url = "http://127.0.0.1:" + str(port)

    response = session.post(f"{url}/sdapi/v1/txt2img", json=payload)
    r = response.json()
    i = r["images"][0]
    return upload(base64.b64decode(i.split(",", 1)[0]))


app = Flask(__name__)


@app.route("/t2i", methods=["POST", "GET"])
def t2i():
    obj = sd(request.json)
    if not obj:
        return "not auth"
    resp = make_response(obj)
    resp.headers.add("Access-Control-Allow-Origin", "*")
    return resp
