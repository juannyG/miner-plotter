import sys
sys.path.insert(0, '/var/www/miner-plotter-env/miner-plotter/miner_plotter')
activate_this = '/var/www/miner-plotter-env/bin/activate_this.py'
execfile(activate_this, dict(__file__=activate_this))
from application import app as application
