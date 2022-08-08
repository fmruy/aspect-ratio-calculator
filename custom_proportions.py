# Aspect Ratio Calculator - 2022

# Import Librarys

DEBUG_PRINT = False

# Set the list with the basic data
placeholder_data = { 
    "16:9" : { "width":"1920", "height":"1080" },
    "4:3"  : { "width":"1920", "height":"1440" },
    "3:2"  : { "width":"2880", "height":"1920" },
    "2:3"  : { "width":"1920", "height":"2880" },
    "1:1"  : { "width":"1920", "height":"1920" },
}

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

# Print for debugging
if DEBUG_PRINT: 
    for element in placeholder_data.items(): print(element)

# Set the default placeholder
placeholder_default = placeholder_data.get("16:9")