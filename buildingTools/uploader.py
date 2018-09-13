import subprocess
import os

class uploader:
    # constants
    uploaderName = "avrdude.exe"
    compilerName = "arduino-builder.exe"

    #def __init__(self):

    def LoadSketchWithDefaults(self, sketchName, builderConfigFilePath):
        self.sketchName = sketchName
        self.builderConfigFilePath = builderConfigFilePath

    def LoadSketch(self, sketchName, hardwarePath, tools, hardwareTools, libraryPath, outputDirectory, qualifiedArduinoName = "arduino:avr:uno"):

        output = subprocess.check_output([os.path.join("buildingTools",self.compilerName),
                                        "-hardware", os.path.join("buildingTools",hardwarePath),
                                        "-tools", os.path.join("buildingTools",tools),
                                        "-tools", os.path.join("buildingTools",hardwareTools),
                                        "-libraries", os.path.join("buildingTools",libraryPath),
                                        "-fqbn", qualifiedArduinoName,
                                        "-build-path", outputDirectory,
                                        sketchName
                                        ])

        return(output)


    def UploadSketch(self, hexName, arduinoArchitecture, arduinoPort, uploaderConfigFilePath = "avrdude.conf", verbosity = 0):
        hexProcessing = "flash:w:" + hexName + ":i"
        
        path = os.path.join("buildingTools", self.uploaderName)

        for i in range(verbosity):
        	path += " -v"

        output = subprocess.check_output([path,										
                                        "-p", arduinoArchitecture,
                                        "-c", "arduino",
                                        "-C", os.path.join("buildingTools",uploaderConfigFilePath),
                                        "-P", arduinoPort,
                                        "-U", hexProcessing
                                       ])


        return(output)














