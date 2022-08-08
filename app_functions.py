# Aspect Ratio Calculator - 2022

import re

#Support functions
def modeIndex(str, i):
    # Split URL
    str_num = re.split(r":|-", str)
    # Check items exist
    try:
        return str_num[i]
    except IndexError:
        print(f"URL arg {i} is missing.")
        return None

def modeIsValid(str):
    # Split URL
    n0 = modeIndex(str, 0)
    n1 = modeIndex(str, 1)
    # Check items exist
    if n0 == None or n1 == None:
        print("URL is not valid. Arg is missing.")
        return False
    # Check items are Numbers
    if not is_number(n0) or not is_number(n1):
        print("URL is not valid. Not number.")
        return False
    return True

def is_number(string):
    try:
        float(string)
        return True
    except ValueError:
        return False