# Aspect Ratio Calculator - 2022

# Import Librarys

DEBUG_PRINT = False

# Set the list with the basic data
placeholder_data = { 
    "16:9"  : { "width":"1920", "height":"1080", "name":"SVGA / XGA / 4K / HD / FHD" },
    "16:10" : { "width":"1920", "height":"1080", "name":"WXGA+ / WSXGA+" },
    "5:4"   : { "width":"1920", "height":"1000", "name":"SXGA" },
    "5:3"   : { "width":"1920", "height":"1000", "name":"WXGA" },
    "4:3"   : { "width":"1920", "height":"1440", "name":None },
    "3:2"   : { "width":"1920", "height":"1280", "name":None },
    "2:3"   : { "width":"1920", "height":"2880", "name":None },
    "1:2"   : { "width":"1920", "height":"3840", "name":None },
    "1:1"   : { "width":"1920", "height":"1920", "name":None },
}

# Text custom data
descriptions = {
    "16:9" : {"customDescription":"A 16:9 ratio (also pronounced “16 9”, “16 to 9”, or “16 by 9” and sometimes written as “16x9”) is an aspect ratio, where for every 16 units of width, there are 9 corresponding units of height. Examples of 16:9 ratios are 16 inches wide by 9 inches high, 32 widgets wide by 18 widgets high, and 1920 pixels wide by 1080 pixels high. An image has a 16:9 ratio if its width-to-height ratio is equal to 16/9, or 1.78. A 16:9 ratio can also be represented as 1.78:1. 16:9 is significant because it is today’s standard ratio for film and display. The 16:9 ratio replaced the old 4:3 ratio in the early 2,000s. You may have heard terms such as 1080p HD, 720p HD, and 4K UHD. These terms all refer to 16×9 ratios. For example, a 1080p HD display refers to a screen resolution of 1920x1080p (1920/1080 = 1.78)."},
    "4:3" : {"customDescription":"A 4:3 ratio (also pronounced “4 3”, “4 to 3”, or “4 by 3”, and sometimes written as “4x3”) is an aspect ratio, where for every 4 units of width, there are 3 corresponding units of height."},
}

# Add preset sizes
preset_sizes = {}
for key, data in placeholder_data.items():
    preset_sizes[key] = placeholder_data[key]['name']

# Auto calculate and populate remaining fields of data
for key, data in placeholder_data.items():
    add_dict = {}
    for sub_key, sub_data in data.items():
        w = placeholder_data[key]['width']
        h = placeholder_data[key]['height']
        
        fraction = str(round(int(w) / int(h), 2))

        if w < h: textMode = "Portrait"
        if w == h: textMode = "Square"
        if w > h: textMode = "Landscape"

        add_dict["ratio"] = key
        add_dict["size"] = placeholder_data[key]['width'] + "x" + placeholder_data[key]['height']
        add_dict["fraction"] = fraction
        add_dict["textMode"] = textMode
    
    placeholder_data[key].update(add_dict)


# Add descriptions
for key, data in placeholder_data.items():
    for sub_key, sub_data in descriptions.items():
        placeholder_data[sub_key].update(descriptions[sub_key])
        

# Print for debugging
if DEBUG_PRINT: 
    for element in placeholder_data.items(): print(element)


# Defaults
placeholder_default = placeholder_data.get("16:9")