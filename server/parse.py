import json
import protocols

def parse(json_string):
    json_dict = json.loads(json_string)

    json_type = json_dict['type']
    return protocols.JSON_TYPES[json_type], json_dict