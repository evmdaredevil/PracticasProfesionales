import tkinter as tk
import tkinter.font as tkFont

class App:
    def __init__(self, root):
        #setting title
        root.title("Generación de Geovisores")
        #setting window size
        width=600
        height=500
        screenwidth = root.winfo_screenwidth()
        screenheight = root.winfo_screenheight()
        alignstr = '%dx%d+%d+%d' % (width, height, (screenwidth - width) / 2, (screenheight - height) / 2)
        root.geometry(alignstr)
        root.resizable(width=False, height=False)

        GLabel_471=tk.Label(root)
        ft = tkFont.Font(family='Times',size=23)
        GLabel_471["font"] = ft
        GLabel_471["fg"] = "#333333"
        GLabel_471["justify"] = "center"
        GLabel_471["text"] = "Prueba inicial"
        GLabel_471.place(x=30,y=40,width=133,height=87)

        GButton_615=tk.Button(root)
        GButton_615["bg"] = "#f0f0f0"
        ft = tkFont.Font(family='Times',size=10)
        GButton_615["font"] = ft
        GButton_615["fg"] = "#000000"
        GButton_615["justify"] = "center"
        GButton_615["text"] = "Button"
        GButton_615.place(x=50,y=110,width=104,height=43)
        GButton_615["command"] = self.GButton_615_command

        GLineEdit_279=tk.Entry(root)
        GLineEdit_279["borderwidth"] = "1px"
        GLineEdit_279["cursor"] = "spider"
        ft = tkFont.Font(family='Times',size=10)
        GLineEdit_279["font"] = ft
        GLineEdit_279["fg"] = "#333333"
        GLineEdit_279["justify"] = "center"
        GLineEdit_279["text"] = "ingrese texto..."
        GLineEdit_279.place(x=180,y=60,width=232,height=41)

        GListBox_192=tk.Listbox(root)
        GListBox_192["borderwidth"] = "1px"
        ft = tkFont.Font(family='Times',size=10)
        GListBox_192["font"] = ft
        GListBox_192["fg"] = "#333333"
        GListBox_192["justify"] = "center"
        GListBox_192.place(x=290,y=220,width=80,height=25)

        GCheckBox_7=tk.Checkbutton(root)
        ft = tkFont.Font(family='Times',size=10)
        GCheckBox_7["font"] = ft
        GCheckBox_7["fg"] = "#333333"
        GCheckBox_7["justify"] = "center"
        GCheckBox_7["text"] = "Capa 1"
        GCheckBox_7.place(x=380,y=220,width=70,height=25)
        GCheckBox_7["offvalue"] = "0"
        GCheckBox_7["onvalue"] = "1"
        GCheckBox_7["command"] = self.GCheckBox_7_command

    def GButton_615_command(self):
        print("command")


    def GCheckBox_7_command(self):
        print("command")

if __name__ == "__main__":
    root = tk.Tk()
    app = App(root)
    root.mainloop()
