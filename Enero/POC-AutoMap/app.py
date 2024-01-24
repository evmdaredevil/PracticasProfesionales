import tkinter as tk
import tkinter.font as tkFont
from importlib.machinery import SourceFileLoader

class App:
    def __init__(self, root):
        root.title("Creación de visor temático")
        width=466
        height=362
        screenwidth = root.winfo_screenwidth()
        screenheight = root.winfo_screenheight()
        alignstr = '%dx%d+%d+%d' % (width, height, (screenwidth - width) / 2, (screenheight - height) / 2)
        root.geometry(alignstr)
        root.resizable(width=False, height=False)

        GLabel_169=tk.Label(root)
        ft = tkFont.Font(family='Times',size=10)
        GLabel_169["font"] = ft
        GLabel_169["fg"] = "#333333"
        GLabel_169["justify"] = "center"
        GLabel_169["text"] = "Instancia de Geoserver detectada en:"
        GLabel_169["relief"] = "raised"
        GLabel_169.place(x=20,y=20,width=227,height=32)

        GLineEdit_386=tk.Entry(root)
        GLineEdit_386["borderwidth"] = "1px"
        ft = tkFont.Font(family='Times',size=10)
        GLineEdit_386["font"] = ft
        GLineEdit_386["fg"] = "#333333"
        GLineEdit_386["justify"] = "center"
        GLineEdit_386.insert(0, "http://localhost:8080/geoserver/web/")
        GLineEdit_386.place(x=20,y=50,width=225,height=30)

        GButton_839=tk.Button(root)
        GButton_839["bg"] = "#f0f0f0"
        ft = tkFont.Font(family='Times',size=10)
        GButton_839["font"] = ft
        GButton_839["fg"] = "#000000"
        GButton_839["justify"] = "center"
        GButton_839["text"] = "¿Cambiar de instancia?"
        GButton_839.place(x=290,y=50,width=148,height=37)
        GButton_839["command"] = self.GButton_839_command

        GLabel_313=tk.Label(root)
        ft = tkFont.Font(family='Times',size=10)
        GLabel_313["font"] = ft
        GLabel_313["fg"] = "#333333"
        GLabel_313["justify"] = "center"
        GLabel_313["text"] = "4 Espacios de trabajo encontrados"
        GLabel_313["relief"] = "sunken"
        GLabel_313.place(x=20,y=80,width=225,height=35)

        GLabel_296=tk.Label(root)
        ft = tkFont.Font(family='Times',size=10)
        GLabel_296["font"] = ft
        GLabel_296["fg"] = "#333333"
        GLabel_296["justify"] = "center"
        GLabel_296["text"] = "Seleccione los espacios de trabajo para añadir"
        GLabel_296.place(x=20,y=170,width=265,height=30)

        GCheckBox_649=tk.Checkbutton(root)
        ft = tkFont.Font(family='Times',size=10)
        GCheckBox_649["font"] = ft
        GCheckBox_649["fg"] = "#333333"
        GCheckBox_649["justify"] = "center"
        GCheckBox_649["text"] = "CENAPRED"
        GCheckBox_649.place(x=0,y=210,width=116,height=30)
        GCheckBox_649["offvalue"] = "0"
        GCheckBox_649["onvalue"] = "1"
        GCheckBox_649["command"] = self.GCheckBox_649_command

        GCheckBox_555=tk.Checkbutton(root)
        ft = tkFont.Font(family='Times',size=10)
        GCheckBox_555["font"] = ft
        GCheckBox_555["fg"] = "#333333"
        GCheckBox_555["justify"] = "center"
        GCheckBox_555["text"] = "Análisis"
        GCheckBox_555.place(x=130,y=210,width=70,height=25)
        GCheckBox_555["offvalue"] = "0"
        GCheckBox_555["onvalue"] = "1"
        GCheckBox_555["command"] = self.GCheckBox_555_command

        GCheckBox_703=tk.Checkbutton(root)
        ft = tkFont.Font(family='Times',size=10)
        GCheckBox_703["font"] = ft
        GCheckBox_703["fg"] = "#333333"
        GCheckBox_703["justify"] = "center"
        GCheckBox_703["text"] = "Climas"
        GCheckBox_703.place(x=210,y=210,width=70,height=25)
        GCheckBox_703["offvalue"] = "0"
        GCheckBox_703["onvalue"] = "1"
        GCheckBox_703["command"] = self.GCheckBox_703_command

        GCheckBox_536=tk.Checkbutton(root)
        ft = tkFont.Font(family='Times',size=10)
        GCheckBox_536["font"] = ft
        GCheckBox_536["fg"] = "#333333"
        GCheckBox_536["justify"] = "center"
        GCheckBox_536["text"] = "Topografía"
        GCheckBox_536.place(x=300,y=210,width=75,height=25)
        GCheckBox_536["offvalue"] = "0"
        GCheckBox_536["onvalue"] = "1"
        GCheckBox_536["command"] = self.GCheckBox_536_command

        GButton_176=tk.Button(root)
        GButton_176["bg"] = "#e2f0f0"
        ft = tkFont.Font(family='Times',size=10)
        GButton_176["font"] = ft
        GButton_176["fg"] = "#000000"
        GButton_176["justify"] = "center"
        GButton_176["text"] = "Continuar"
        GButton_176.place(x=80,y=270,width=245,height=64)
        GButton_176["command"] = self.GButton_176_command

    def GButton_839_command(self):
        print("command")


    def GCheckBox_649_command(self):
        print("command")


    def GCheckBox_555_command(self):
        print("command")


    def GCheckBox_703_command(self):
        print("command")


    def GCheckBox_536_command(self):
        print("command")


    def GButton_176_command(self):
        for widget in root.winfo_children():
            widget.destroy()
        loader = SourceFileLoader('selectLayer', 'selectLayer.py')
        module = loader.load_module()
        module.run_layers(root)

    def run_layers(root):
        label = tk.Label(root, text="This is from selectLayer.py")
        label.pack()

if __name__ == "__main__":
    root = tk.Tk()
    app = App(root)
    root.mainloop()
