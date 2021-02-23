import json
from sys import stdin

"""
json2schema.py - converts json data from stdin to yaml schema

usage: cat data.json | python json2schema.py > schema.yml
"""

YAML = ""

def gettype(type):
    for i in ['string','boolean','integer']:
        if type in i:
            return i
    return type

def parser(json_data,indent):
    yaml = ""
    if type(json_data) is dict:
        yaml += (indent + 'type: object\n')
        if len(json_data) > 0:
            yaml += (indent + 'properties:\n')
        for key in json_data:
            yaml += (indent + '  %s:\n' % key)
            yaml += parser(json_data[key], indent+'    ')
    elif type(json_data) is list:
        yaml += (indent + 'type: array\n')
        yaml += (indent + 'items:\n')
        if len(json_data) != 0:
            yaml += parser(json_data[0], indent+'  ')
        else:
            yaml += (indent + '  type: object\n')
    else:
        yaml += (indent + 'type: %s\n' % gettype(type(json_data).__name__))
    return yaml


if stdin:
    print(parser(json.load(stdin),''))
else:
    print("No input detected. Try again")