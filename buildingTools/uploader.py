import subprocess
import os

class uploader:
    # locals

    # for compiler
    #compilerParameters = {"sketchName": "", "configFilePath": ""}
    # sketchName = ""
    # hardwarePath = ""
    # toolPath = ""
    # toolPath2 = ""
    # libraryPath = ""
    # qualifiedArduinoName = ""
    # builderConfigFilePath = ""
    # outputDirectory = ""

    # for uploader
    #uploaderParameters = {"hexName": "", "arduinoType": "", "arduinoPort": ""}
    # hexName = ""
    # arduinoArchitecture  = ""
    # arduinoPort = ""
    # uploaderConfigFilePath = ""


    # constants
    uploaderName = "avrdude.exe"
    compilerName = "arduino-builder.exe"

    def __init__(self):
        print("nice")
        #pass

    def LoadSketchWithDefaults(self, sketchName, builderConfigFilePath):
        self.sketchName = sketchName
        self.builderConfigFilePath = builderConfigFilePath


    def LoadSketch(self, sketchName, hardwarePath, tools, hardwareTools, libraryPath, outputDirectory, qualifiedArduinoName = "arduino:avr:uno"):
        # self.sketchName = sketchName
        # self.hardwarePath = hardwarePath
        # self.toolPath = toolPath
        # self.toolPath2 = toolPath2
        # self.libraryPath = libraryPath
        # self.qualifiedArduinoName = qualifiedArduinoName
        # self.outputDirectory = outputDirectory

        output = subprocess.check_call([os.path.join("buildingTools",self.compilerName),
                                        "-hardware", hardwarePath,
                                        "-tools", tools,
                                        "-tools", hardwareTools,
                                        #"-tools"
                                        "-libraries", libraryPath,
                                        "-fqbn", qualifiedArduinoName,
                                        "-build-path", outputDirectory,
                                        sketchName
                                        ])

        print(output)


    def UploadSketch(self, hexName, arduinoArchitecture, arduinoPort, uploaderConfigFilePath = "buildingTools\\avrdude.conf"):
        # self.hexName = hexName
        # self.arduinoArchitecture = arduinoArchitecture
        # self.arduinoPort = arduinoPort
        hexProcessing = "flash:w:" + hexName + ":i"

        output = subprocess.check_call([os.path.join("buildingTools",self.uploaderName),
                                        "-p", arduinoArchitecture,
                                        "-c", "arduino",
                                        "-C", uploaderConfigFilePath,
                                        "-P", arduinoPort,
                                        "-U", hexProcessing
                                       ])


        print(output)














