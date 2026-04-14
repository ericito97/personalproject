#!/usr/bin/env python3
from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# Archivo para guardar el estado
STATE_FILE = 'estado.json'

def cargar_estado():
    """Carga el estado de los platos desde el archivo."""
    if os.path.exists(STATE_FILE):
        with open(STATE_FILE, 'r') as f:
            return json.load(f)
    return {
        'plato1': False,
        'plato2': False,
        'plato3': False,
        'plato4': False
    }

def guardar_estado(estado):
    """Guarda el estado de los platos en un archivo."""
    with open(STATE_FILE, 'w') as f:
        json.dump(estado, f)

@app.route('/api/estado', methods=['GET'])
def get_estado():
    """Devuelve el estado actual de los platos."""
    estado = cargar_estado()
    return jsonify(estado)

@app.route('/api/revelar/<int:numero>', methods=['POST'])
def revelar_plato(numero):
    """Revela un plato específico."""
    if numero < 1 or numero > 4:
        return jsonify({'error': 'Número de plato inválido'}), 400
    
    estado = cargar_estado()
    estado[f'plato{numero}'] = True
    guardar_estado(estado)
    
    return jsonify(estado)

@app.route('/api/reset', methods=['POST'])
def reset_platos():
    """Reinicia todos los platos (ocultos)."""
    estado = {
        'plato1': False,
        'plato2': False,
        'plato3': False,
        'plato4': False
    }
    guardar_estado(estado)
    return jsonify(estado)

if __name__ == '__main__':
    # Buscar la IP local
    import socket
    hostname = socket.gethostname()
    local_ip = socket.gethostbyname(hostname)
    
    print(f"🍽️  Servidor de Cena Romántica corriendo")
    print(f"Local: http://localhost:5000")
    print(f"Red local: http://{local_ip}:5000")
    print(f"Abre esto en tu móvil si estás en la misma wifi")
    
    app.run(debug=False, host='0.0.0.0', port=5000)