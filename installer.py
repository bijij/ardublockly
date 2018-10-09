import os
import platform
import zipfile
import sys
import requests
import shutil
import io

path = 'ardublockly'
toolsSrc = 'buildingTools.zip'
innerPath = ''

if os.path.exists(os.path.join(os.getcwd(), path)):
		print("Directory called ardublockly already exists.\n")
		path = input("Please enter a new path name to install to, or enter 'N' (no quotes) to exit.\n")
		if path.lower():
			sys.exit()

if platform.system() == 'Linux':
	sys.exit("No Linux builds available.")
	#src = requests.get('https://github.com/bijij/ardublockly/archive/v0.0.1.zip', stream=True)
elif platform.system() == 'Windows':
	src = requests.get('https://github.com/NicholasStewart1998/conwaysGoL/archive/0.0.1.zip', stream=True)

elif platform.system() == 'Darwin':
	sys.exit("No Mac builds available.")
	#src = requests.get('https://github.com/bijij/ardublockly/archive/v0.0.1.zip', stream=True)
else:
	sys.exit("Unsupported system.")

if src.status_code == 200:
	os.mkdir(path)
	z = zipfile.ZipFile(io.BytesIO(src.content))
	z.extractall(path)

	dirs = os.listdir(os.path.join(os.getcwd(), path))
	innerPath = os.path.join(path, dirs[0])

	bt = zipfile.ZipFile(os.path.join(innerPath, toolsSrc))
	bt.extractall(innerPath)
else:
	sys.exit("Ardublockly download failed.")

closureLib = requests.get("https://github.com/google/closure-library/archive/v20180910.zip", stream=True)

if closureLib.status_code == 200:
	clz = zipfile.ZipFile(io.BytesIO(closureLib.content))
	clz.extractall(innerPath)
else:
	sys.exit("Closure library download failed.")
