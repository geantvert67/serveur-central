#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import tkinter
from cx_Freeze import setup, Executable

#os.environ['TCL_LIBRARY'] = "/Library/Frameworks/Python.framework/Versions/3.7/lib/tcl8.6"
#os.environ['TK_LIBRARY'] = "/Library/Frameworks/Python.framework/Versions/3.7/lib/tk8.6"

# Path to the Config_python directory
#path = os.path.join(os.path.dirname(sys.executable), "..", "..", "..", "..")

# Dependencies are automatically detected, but it might need
# fine tuning.
buildOptions = dict(packages = ["os", "tkinter"], 
            includes = ["tkinter"], 
            excludes = ["numpy", "scipy", "matplotlib", "PyQt5"],
            optimize = 2
    )

import sys
base = 'Win32GUI' if sys.platform=='win32' else None

executables = [
    Executable('gui.py', base=base)
]

setup(name='CrystalZ',
      version = '1.0',
      description = '',
      options = dict(build_exe = buildOptions),
      executables = executables)
