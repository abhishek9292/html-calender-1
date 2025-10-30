# -*- coding: utf-8 -*-
"""
भारत कैलेंडर - Python Flask Backend
Hindi Calendar Application Backend API
"""

from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import json
from datetime import datetime, timedelta
import os

app = Flask(__name__, static_folder='../src')
CORS(app)  # Enable CORS for frontend

# Data file paths
DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')

# ========== API ROUTES ==========

@app.route('/')
def serve_frontend():
    """Serve the main HTML file"""
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    """Serve static files"""
    return send_from_directory(app.static_folder, path)

@app.route('/api/panchang/<date>')
def get_panchang(date):
    """
    Get Panchang data for a specific date
    Format: YYYY-MM-DD
    """
    try:
        panchang_file = os.path.join(DATA_DIR, f'panchang_{date}.json')
        if os.path.exists(panchang_file):
            with open(panchang_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
            return jsonify(data)
        else:
            return jsonify({'error': 'Data not found for this date'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/calendar/<year>/<month>')
def get_month_calendar(year, month):
    """
    Get complete calendar data for a month
    Format: /api/calendar/2025/10
    """
    try:
        calendar_file = os.path.join(DATA_DIR, f'calendar_{year}_{month}.json')
        if os.path.exists(calendar_file):
            with open(calendar_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
            return jsonify(data)
        else:
            return jsonify({'error': f'Calendar data not found for {year}-{month}'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/festivals/<year>/<month>')
def get_festivals(year, month):
    """Get all festivals for a month"""
    try:
        festivals_file = os.path.join(DATA_DIR, f'festivals_{year}_{month}.json')
        if os.path.exists(festivals_file):
            with open(festivals_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
            return jsonify(data)
        else:
            return jsonify({'error': 'Festivals data not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/muhurat/<year>/<month>')
def get_muhurat(year, month):
    """Get Shubh Muhurat for a month"""
    try:
        muhurat_file = os.path.join(DATA_DIR, f'muhurat_{year}_{month}.json')
        if os.path.exists(muhurat_file):
            with open(muhurat_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
            return jsonify(data)
        else:
            return jsonify({'error': 'Muhurat data not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/rashifal/<date>')
def get_rashifal(date):
    """Get Rashifal (Horoscope) for all signs on a date"""
    try:
        rashifal_file = os.path.join(DATA_DIR, f'rashifal_{date}.json')
        if os.path.exists(rashifal_file):
            with open(rashifal_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
            return jsonify(data)
        else:
            return jsonify({'error': 'Rashifal data not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/vrat/<year>/<month>')
def get_vrat(year, month):
    """Get Vrat (Fasting) days for a month"""
    try:
        vrat_file = os.path.join(DATA_DIR, f'vrat_{year}_{month}.json')
        if os.path.exists(vrat_file):
            with open(vrat_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
            return jsonify(data)
        else:
            return jsonify({'error': 'Vrat data not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/today')
def get_today_data():
    """Get complete data for today"""
    today = datetime.now().strftime('%Y-%m-%d')
    year = datetime.now().strftime('%Y')
    month = datetime.now().strftime('%m')

    result = {
        'date': today,
        'panchang': load_data_file(f'panchang_{today}.json'),
        'festivals': load_data_file(f'festivals_{year}_{month}.json'),
        'rashifal': load_data_file(f'rashifal_{today}.json'),
        'vrat': load_data_file(f'vrat_{year}_{month}.json')
    }

    return jsonify(result)

# Helper Functions
def load_data_file(filename):
    """Helper to load JSON data file"""
    try:
        filepath = os.path.join(DATA_DIR, filename)
        if os.path.exists(filepath):
            with open(filepath, 'r', encoding='utf-8') as f:
                return json.load(f)
        return None
    except:
        return None

if __name__ == '__main__':
    # Create data directory if it doesn't exist
    os.makedirs(DATA_DIR, exist_ok=True)

    # Run Flask app
    print("🚀 भारत कैलेंडर Backend Starting...")
    print("📡 Server: http://localhost:4000")
    print("📂 Data Directory:", DATA_DIR)
    app.run(debug=True, host='0.0.0.0', port=4000)
