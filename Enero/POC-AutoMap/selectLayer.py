import tkinter as tk
import tkinter.font as tkFont
from importlib.machinery import SourceFileLoader

class App:
    def __init__(self, root):
        self.root = root 
        root.title("Selección de capas")
        width=466
        height=362
        screenwidth = root.winfo_screenwidth()
        screenheight = root.winfo_screenheight()
        alignstr = '%dx%d+%d+%d' % (width, height, (screenwidth - width) / 2, (screenheight - height) / 2)
        root.geometry(alignstr)
        root.resizable(width=False, height=False)

        GLabel_567=tk.Label(root)
        ft = tkFont.Font(family='Times',size=10)
        GLabel_567["font"] = ft
        GLabel_567["fg"] = "#333333"
        GLabel_567["justify"] = "center"
        GLabel_567["text"] = "Seleccione las capas para agregar..."
        GLabel_567.place(x=20,y=20,width=217,height=30)

        GRadio_647=tk.Radiobutton(root)
        ft = tkFont.Font(family='Times',size=10)
        GRadio_647["font"] = ft
        GRadio_647["fg"] = "#333333"
        GRadio_647["justify"] = "center"
        GRadio_647["text"] = "CENAPRED"
        GRadio_647.place(x=0,y=70,width=116,height=30)
        GRadio_647["command"] = self.GRadio_647_command

        GRadio_559=tk.Radiobutton(root)
        ft = tkFont.Font(family='Times',size=10)
        GRadio_559["font"] = ft
        GRadio_559["fg"] = "#333333"
        GRadio_559["justify"] = "center"
        GRadio_559["text"] = "Analisis"
        GRadio_559.place(x=140,y=70,width=85,height=25)
        GRadio_559["command"] = self.GRadio_559_command

        GRadio_958=tk.Radiobutton(root)
        ft = tkFont.Font(family='Times',size=10)
        GRadio_958["font"] = ft
        GRadio_958["fg"] = "#333333"
        GRadio_958["justify"] = "center"
        GRadio_958["text"] = "Climas"
        GRadio_958.place(x=250,y=70,width=85,height=25)
        GRadio_958["command"] = self.GRadio_958_command

        GRadio_814=tk.Radiobutton(root)
        ft = tkFont.Font(family='Times',size=10)
        GRadio_814["font"] = ft
        GRadio_814["fg"] = "#333333"
        GRadio_814["justify"] = "center"
        GRadio_814["text"] = "Topografía"
        GRadio_814.place(x=350,y=70,width=112,height=30)
        GRadio_814["command"] = self.GRadio_814_command

        GCheckBox_647=tk.Checkbutton(root)
        ft = tkFont.Font(family='Times',size=10)
        GCheckBox_647["font"] = ft
        GCheckBox_647["fg"] = "#333333"
        GCheckBox_647["justify"] = "center"
        GCheckBox_647["text"] = "CENAPREDInfierProfTR100"
        GCheckBox_647.place(x=20,y=120,width=192,height=35)
        GCheckBox_647["offvalue"] = "0"
        GCheckBox_647["onvalue"] = "1"
        GCheckBox_647["command"] = self.GCheckBox_647_command

        GButton_877=tk.Button(root)
        GButton_877["bg"] = "#e2f0f0"
        ft = tkFont.Font(family='Times',size=10)
        GButton_877["font"] = ft
        GButton_877["fg"] = "#000000"
        GButton_877["justify"] = "center"
        GButton_877["text"] = "Continuar"
        GButton_877.place(x=100,y=250,width=245,height=64)
        GButton_877["command"] = self.GButton_877_command

        GCheckBox_220=tk.Checkbutton(root)
        ft = tkFont.Font(family='Times',size=10)
        GCheckBox_220["font"] = ft
        GCheckBox_220["fg"] = "#333333"
        GCheckBox_220["justify"] = "center"
        GCheckBox_220["text"] = "Capa de Análisis"
        GCheckBox_220.place(x=20,y=180,width=129,height=30)
        GCheckBox_220["offvalue"] = "0"
        GCheckBox_220["onvalue"] = "1"
        GCheckBox_220["command"] = self.GCheckBox_220_command

        GCheckBox_558=tk.Checkbutton(root)
        ft = tkFont.Font(family='Times',size=10)
        GCheckBox_558["font"] = ft
        GCheckBox_558["fg"] = "#333333"
        GCheckBox_558["justify"] = "center"
        GCheckBox_558["text"] = "Capa de Climas"
        GCheckBox_558.place(x=260,y=120,width=128,height=34)
        GCheckBox_558["offvalue"] = "0"
        GCheckBox_558["onvalue"] = "1"
        GCheckBox_558["command"] = self.GCheckBox_558_command

        GCheckBox_175=tk.Checkbutton(root)
        ft = tkFont.Font(family='Times',size=10)
        GCheckBox_175["font"] = ft
        GCheckBox_175["fg"] = "#333333"
        GCheckBox_175["justify"] = "center"
        GCheckBox_175["text"] = "Capa de Topografía"
        GCheckBox_175.place(x=270,y=180,width=137,height=33)
        GCheckBox_175["offvalue"] = "0"
        GCheckBox_175["onvalue"] = "1"
        GCheckBox_175["command"] = self.GCheckBox_175_command

    def GRadio_647_command(self):
        print("command")


    def GRadio_559_command(self):
        print("command")


    def GRadio_958_command(self):
        print("command")


    def GRadio_814_command(self):
        print("command")


    def GCheckBox_647_command(self):
        print("command")


    def GButton_877_command(self):
        for widget in self.root.winfo_children():  # Access root through self
            widget.destroy()
        loader = SourceFileLoader('fileProperties', 'fileProperties.py')
        module = loader.load_module()
        module.run_fileProperties(self.root)

    def run_layers(root):
        label = tk.Label(root, text="This is from fileProperties.py")
        label.pack()

    def GCheckBox_220_command(self):
        print("command")


    def GCheckBox_558_command(self):
        print("command")


    def GCheckBox_175_command(self):
        print("command")

def run_layers(root):
    app = App(root)

if __name__ == "__main__":
    root = tk.Tk()
    run_fileProperties(root)
    root.mainloop()
