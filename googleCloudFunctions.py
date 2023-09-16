import functions_framework
from cohere import Client
import json


def make_msg(target, myself=''):
    co = Client('') # INSTERT API KEY HERE
    target_profile_sum = co.summarize(
        text=json.dumps(target),
        temperature=0.5, 
        length='long',
        extractiveness='high'
    )
    # print(target_profile_res)
    if len(myself) == 0:
        prompt_text = "Please create a concise introduction message (under 40 words) to introduce myself to the following individual: " + target_profile_sum.summary
    else:
        prompt_text = (
        "Given the profile: " + json.dumps(myself) + 
        ", I am seeking a job opportunity. Please create a concise introduction message (under 40 words) to introduce myself based on this information, considering the target's profile: " 
        + target_profile_sum.summary
        )
    
    response = co.generate(
        prompt=prompt_text,
        model='command',
        temperature=0.9, # higher value means more creative, or random
        max_tokens=120,
        k=47,
        stop_sequences=[],
        truncate='END',
    )

    return response[0].text

@functions_framework.http
def hello_http(request):
    """HTTP Cloud Function.
    Args:
        request (flask.Request): The request object.
        <https://flask.palletsprojects.com/en/1.1.x/api/#incoming-request-data>
    Returns:
        The response text, or any set of values that can be turned into a
        Response object using `make_response`
        <https://flask.palletsprojects.com/en/1.1.x/api/#flask.make_response>.
    """
    # Set CORS headers for the preflight request
    if request.method == "OPTIONS":
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "3600",
        }

        return ("", 204, headers)

    # Set CORS headers for the main request
    headers = {"Access-Control-Allow-Origin": "*"}

    request_json = request.get_json(silent=True)
    request_args = request.args
    print(request_args)
    print(request_json)

    final_msg = make_msg(request_json)
    
    headers = {"Access-Control-Allow-Origin": "*"}
    print(final_msg)
    return (final_msg, 200, headers)
