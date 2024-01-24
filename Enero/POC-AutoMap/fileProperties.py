import tkinter as tk
from tkinter import messagebox
import tkinter.font as tkFont
import webbrowser

class App:
    def __init__(self, root):
        #setting title
        root.title("Propiedades del visor")
        #setting window size
        width=466
        height=362
        screenwidth = root.winfo_screenwidth()
        screenheight = root.winfo_screenheight()
        alignstr = '%dx%d+%d+%d' % (width, height, (screenwidth - width) / 2, (screenheight - height) / 2)
        root.geometry(alignstr)
        root.resizable(width=False, height=False)

        GLabel_654=tk.Label(root)
        ft = tkFont.Font(family='Times',size=10)
        GLabel_654["font"] = ft
        GLabel_654["fg"] = "#333333"
        GLabel_654["justify"] = "left"
        GLabel_654["text"] = "Asigne título al visor:"
        GLabel_654.place(x=40,y=20,width=290,height=30)

        GLineEdit_134=tk.Entry(root)
        GLineEdit_134["borderwidth"] = "1px"
        ft = tkFont.Font(family='Times',size=10)
        GLineEdit_134["font"] = ft
        GLineEdit_134["fg"] = "#333333"
        GLineEdit_134["justify"] = "center"
        GLineEdit_134["text"] = ""
        GLineEdit_134.place(x=40,y=60,width=338,height=30)

        GLabel_526=tk.Label(root)
        ft = tkFont.Font(family='Times',size=10)
        GLabel_526["font"] = ft
        GLabel_526["fg"] = "#333333"
        GLabel_526["justify"] = "left"
        GLabel_526["text"] = "Directorio para el geovisor:"
        GLabel_526.place(x=40,y=180,width=260,height=30)

        GLineEdit_743=tk.Entry(root)
        GLineEdit_743["borderwidth"] = "1px"
        ft = tkFont.Font(family='Times',size=10)
        GLineEdit_743["font"] = ft
        GLineEdit_743["fg"] = "#333333"
        GLineEdit_743["justify"] = "center"
        GLineEdit_743["text"] = ""
        GLineEdit_743.place(x=40,y=220,width=257,height=30)

        GButton_406=tk.Button(root)
        GButton_406["bg"] = "#f0f0f0"
        ft = tkFont.Font(family='Times',size=10)
        GButton_406["font"] = ft
        GButton_406["fg"] = "#000000"
        GButton_406["justify"] = "center"
        GButton_406["text"] = "..."
        GButton_406.place(x=310,y=220,width=70,height=30)
        GButton_406["command"] = self.GButton_406_command

        GLabel_534=tk.Label(root)
        ft = tkFont.Font(family='Times',size=10)
        GLabel_534["font"] = ft
        GLabel_534["fg"] = "#333333"
        GLabel_534["justify"] = "left"
        GLabel_534["text"] = "Ícono para el visor:"
        GLabel_534.place(x=40,y=110,width=260,height=30)

        GLineEdit_766=tk.Entry(root)
        GLineEdit_766["borderwidth"] = "1px"
        ft = tkFont.Font(family='Times',size=10)
        GLineEdit_766["font"] = ft
        GLineEdit_766["fg"] = "#333333"
        GLineEdit_766["justify"] = "center"
        GLineEdit_766["text"] = ""
        GLineEdit_766.place(x=40,y=140,width=258,height=30)

        GButton_558=tk.Button(root)
        GButton_558["bg"] = "#f0f0f0"
        ft = tkFont.Font(family='Times',size=10)
        GButton_558["font"] = ft
        GButton_558["fg"] = "#000000"
        GButton_558["justify"] = "center"
        GButton_558["text"] = "..."
        GButton_558.place(x=310,y=140,width=69,height=30)
        GButton_558["command"] = self.GButton_558_command

        GButton_383=tk.Button(root)
        GButton_383["bg"] = "#e2f0f0"
        ft = tkFont.Font(family='Times',size=10)
        GButton_383["font"] = ft
        GButton_383["fg"] = "#000000"
        GButton_383["justify"] = "center"
        GButton_383["text"] = "Generar Visor Web"
        GButton_383.place(x=110,y=270,width=245,height=64)
        GButton_383["command"] = self.GButton_383_command

    def GButton_406_command(self):
        print("command")

    def GButton_558_command(self):
        print("command")

    def GButton_383_command(self):
        messagebox.showwarning("Aviso", "¡El Geovisor ha sido creado exitosamente!")
        webbrowser.open("http://localhost/VisorInt/")
        root.destroy() 

def run_fileProperties(root):
    app = App(root)

if __name__ == "__main__":
    root = tk.Tk()
    app = App(root)
    root.mainloop()
