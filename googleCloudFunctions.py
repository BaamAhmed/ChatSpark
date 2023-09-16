import functions_framework
import json
from cohere import Client

co = Client('API_KEY')

def make_msg(names, intent, target, myself=''):
    target_profile_sum = get_summary(target)

    if intent == "mentorship":
        # add "names['user'] intends to ask names['target'] for mentorship and advice" to prompt
        if len(myself) == 0:
            prompt_text = f"My name is {names['user']}. I am looking for mentorship and advice. Write a short paragraph including 3 sentences greeting, introduce myself, and express interest to introduce myself based on this information, considering the target's profile: {target_profile_sum.summary}"
        else:
            prompt_text = f"Given the profile: {json.dumps(myself)}, I am looking for mentorship and advice. Write a short paragraph including 3 sentences including greeting, introduce myself, and express interest to introduce myself based on this information, considering the target's profile: {target_profile_sum.summary}"
    elif intent == "connect":
        # add "names['user'] intends to request names['target'] to connect on LinkedIn" to prompt
        if len(myself) == 0:
            prompt_text = f"My name is {names['user']}. I want to grow my network. Write a short paragraph including 3 sentences greeting, introduce myself, and express interest to introduce myself based on this information, considering the target's profile: {target_profile_sum.summary}"
        else:
            prompt_text = f"Given the profile: {json.dumps(myself)}, I want to grow my network. Write a short paragraph including 3 sentences greeting, introduce myself, and express interest to introduce myself based on this information, considering the target's profile: {target_profile_sum.summary}"
    elif intent == "inquiry":
        # add "names['user'] intends to ask names['target'] about a job posting" to prompt
        if len(myself) == 0:
            prompt_text = f"My name is {names['user']}. I want to inquiry about a job posting. Write a short paragraph including 3 sentences greeting, introduce myself, and express interest to introduce myself based on this information, considering the target's profile: {target_profile_sum.summary}"
        else:
            prompt_text = f"Given the profile: {json.dumps(myself)}, I want to inquiry about a job posting. Write a short paragraph including 3 sentences greeting, introduce myself, and express interest to introduce myself based on this information, considering the target's profile: {target_profile_sum.summary}"
    elif intent == "recruiter":
        # add "names['user'] intends to scout names['target'] for a new role in their company" to prompt
        if len(myself) == 0:
            prompt_text = f"My name is {names['user']}. I am a recruiter, and I want to connect with {names['target']} which is a potential candidate. Write a short paragraph including 3 sentences greeting, introduce myself, and express interest to introduce myself based on this information, considering the target's profile: {target_profile_sum.summary}"
        else:
            prompt_text = f"Given the profile: {json.dumps(myself)}, I am a recruiter, and I want to connect with {names['target']} which is a potential candidate. Write a short paragraph including 3 sentences greeting, introduce myself, and express interest to introduce myself based on this information, considering the target's profile: {target_profile_sum.summary}"

    response = co.generate(
        prompt=prompt_text,
        model='command-light',
        temperature=0.7, # higher value means more creative, or random
        max_tokens=120,
        k=47,
        stop_sequences=[],
        truncate='END',
    )

    return response[0].text

def create_response(conversation):
    response = co.generate(
        model='command',
        prompt=f'This is a conversation between {names["user"]} and {names["target"]}\n\n{conversation}\n\nConsider the above dialog, please generate a message that {names["user"]} should send if he wants to ask {names["target"]} for a referral.',
        max_tokens=302,
        temperature=0.9,
        k=47,
        stop_sequences=[],
        return_likelihoods='NONE')

    return response.generations[0].text

def get_summary(target):
    target_profile_sum = co.summarize(
        text=json.dumps(target),
        temperature=0.5, 
        length='long',
        extractiveness='high'
    )
    return target_profile_sum

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
