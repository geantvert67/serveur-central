#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys
import os
import subprocess
import socket
import random
from tkinter import *
import tkinter.scrolledtext
#from tkmacosx import Button
import _thread
import webbrowser
import time
import platform


os.environ["port_react"] = "3000"

def is_port_in_use(port):
    """
    Check if a port is use on the machine.

    Argument:
        port (int) : the port to check
    """
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('localhost', port)) == 0

def find_port(port, name):
    """
    Find a port which is note used on the machine.
    
    Arguments:
        port (int) : The port to check. If he is used, another port number will be calculated.
        name (str) : the name of the environment variable where the value of the port will be store.
    """
    while is_port_in_use(port):
        port = random.randint(1024, 65535)
        os.environ[name] = str(port)

def run_docker(text):
    """
    Run the docker.

    Argument:
        text (ScrolledText widget) : The widget where the outputs of the subprocess will be display.
    """
    os.environ["port_node"] = "5000"

    # Check if the react port is used, if so find another.
    find_port(int(os.environ["port_react"]), "port_react")

    # Check if the node port is used, if so find another.
    find_port(int(os.environ["port_node"]), "port_node")

    # Path to the Config_python directory
    path = os.path.join(os.path.dirname(sys.executable), "..", "..", "..", "..")

    create_img = subprocess.Popen("chmod +x " + path + "/is_docker_running.sh;" \
                                 "" + path + "/is_docker_running.sh;" \
                                 "/usr/local/bin/docker-compose -f " + path + "/../Config_docker/docker-compose.yml build --no-cache;" \
                                 "/usr/local/bin/docker-compose -f " + path + "/../Config_docker/docker-compose.yml up",
                    shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    for line in iter(create_img.stdout.readline, ''):
        text.insert(END, line)
        text.see(END)
        text.update_idletasks()
    create_img.stdout.close()
    create_img.wait()

def client_available(btn, label):
    """
    Check if the client is running and then available.
    If so the button is displayed on the interface.

    Arguments:
        btn (Button widget) : Button which open the "client maitre" in a browser. Is displayed when the client is available.
        label (Label widget) : Label which says that the client is not available. Is deleted when the client is available.
    """
    while not is_port_in_use(int(os.environ["port_react"])):
        time.sleep(5)
        pass
    label.destroy()
    btn.pack(pady=15)

def main():
    root = tkinter.Tk()
    root.minsize(width="600", height="450")
    root.geometry("600x450")
    root.configure(bg='#26292F')
    root.title("CrystalZ")
    root.update_idletasks() # Pour rafraichir et afficher output console en directe

    title = Label(root, text='CrystalZ', bg='#1B1E22', fg='#68B684', width=50, font=('MS', 24, 'bold'))
    title.pack()

    # Zone pour afficher les stdout
    text = tkinter.scrolledtext.ScrolledText(root)
    text.configure(bg='#1B1E22', fg='white')
    text.pack(pady=15)

    # Thread qui lance le docker
    _thread.start_new_thread(run_docker, (text,)) 

    label = tkinter.Label(root, text='Un bouton permettant d\'ouvrir le client web maitre apparaitra une fois le client lancé !', bg = "#1B1E22", fg='white')
    label.pack(pady=15)

    #if platform.system() == "Darwin":   ### Si l'OS est macos
    #   btn = tkinterButton(root, text="Ouvrir client web maitre", bg="#68B684", fg="white", command=lambda: webbrowser.open('http://localhost:' + os.environ["port_react"], new=2))
    #else:  ### Si l'OS est windows ou linux
    btn = tkinter.Button(root, text="Ouvrir client web maitre", bg="#68B684", fg="white", command=lambda: webbrowser.open('http://localhost:' + os.environ["port_react"], new=2))
    
    # Thread qui permet d'afficher le bouton pour ouvrir le client web maitre une fois le client accesible.
    _thread.start_new_thread(client_available,(btn,label))

    root.mainloop()

if __name__ == "__main__":
    main()
