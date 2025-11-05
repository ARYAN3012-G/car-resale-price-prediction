from flask import Flask, request, jsonify, render_template
import joblib
import numpy as np
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the LightGBM model (complete pipeline)
model_pipeline = joblib.load('lightgbm_car_price_model.pkl')

# Load dataset to get available options
df = pd.read_csv('cardataset2.csv')

# Rename columns to match the model's expected format
df = df.rename(columns={
    'Price': 'selling_price',
    'Kilometer': 'km_driven',
    'Make': 'manufacturer',
    'Model': 'model_name',
    'Fuel Type': 'fuel',
    'Transmission': 'transmission',
    'Owner': 'owner',
    'Max Power': 'max_power_raw',
    'Engine': 'engine_raw'
})

# Clean and prepare data to get unique values
df['max_power_bhp'] = df['max_power_raw'].astype(str).str.split(' ').str[0]
df['max_power_bhp'] = pd.to_numeric(df['max_power_bhp'], errors='coerce')

df['engine_cc'] = df['engine_raw'].astype(str).str.split(' ').str[0]
df['engine_cc'] = pd.to_numeric(df['engine_cc'], errors='coerce')

df['max_torque_nm'] = df['Max Torque'].astype(str).str.split(' ').str[0]
df['max_torque_nm'] = pd.to_numeric(df['max_torque_nm'], errors='coerce')

# Standardize owner labels
def standardize_owner(o):
    o = str(o)
    if 'Owner' not in o:
        return f"{o} Owner"
    return o.replace('th & Above', 'Fourth & Above')

df['owner'] = df['owner'].apply(standardize_owner)

# Drop NaN values
df_clean = df.dropna(subset=['max_power_bhp', 'engine_cc', 'max_torque_nm', 'Drivetrain'])

# Get available options
companies = sorted(df_clean['manufacturer'].unique().tolist())
fuel_types = sorted(df_clean['fuel'].unique().tolist())
transmissions = sorted(df_clean['transmission'].unique().tolist())
owners = sorted(df_clean['owner'].unique().tolist())
drivetrains = sorted(df_clean['Drivetrain'].unique().tolist())

# Create manufacturer-model mapping
manufacturer_models = {}
for manufacturer in df_clean['manufacturer'].unique():
    manufacturer_models[manufacturer] = sorted(
        df_clean[df_clean['manufacturer'] == manufacturer]['model_name'].unique().tolist()
    )

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/options', methods=['GET'])
def get_options():
    """Return all available options for dropdowns"""
    return jsonify({
        'companies': companies,
        'manufacturer_models': manufacturer_models,
        'fuel_types': fuel_types,
        'transmissions': transmissions,
        'owners': owners,
        'drivetrains': drivetrains
    })

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Extract features from request
        year = int(data['year'])
        km_driven = int(data['km_driven'])
        manufacturer = data['manufacturer']
        model_name = data['model_name']
        fuel = data['fuel']
        transmission = data['transmission']
        owner = data['owner']
        max_power_bhp = float(data['max_power_bhp'])
        engine_cc = float(data['engine_cc'])
        max_torque_nm = float(data['max_torque_nm'])
        drivetrain = data['drivetrain']
        
        # Validate ranges
        if year < 1990 or year > 2025:
            raise ValueError("Year must be between 1990 and 2025")
        if km_driven < 0 or km_driven > 500000:
            raise ValueError("Kilometers driven must be between 0 and 500,000")
        if max_power_bhp < 30 or max_power_bhp > 700:
            raise ValueError("Max Power must be between 30 and 700 bhp")
        if engine_cc < 500 or engine_cc > 7000:
            raise ValueError("Engine size must be between 500 and 7000 cc")
        if max_torque_nm < 50 or max_torque_nm > 800:
            raise ValueError("Max Torque must be between 50 and 800 Nm")
        
        # Calculate derived features
        current_year = 2025
        car_age = current_year - year
        age_km_interaction = car_age * km_driven
        
        # Create input DataFrame with correct feature order
        # Features: Year, km_driven, max_power_bhp, engine_cc, car_age, age_km_interaction, max_torque_nm,
        #           fuel, transmission, owner, Drivetrain, manufacturer, model_name
        input_data = pd.DataFrame({
            'Year': [year],
            'km_driven': [km_driven],
            'max_power_bhp': [max_power_bhp],
            'engine_cc': [engine_cc],
            'car_age': [car_age],
            'age_km_interaction': [age_km_interaction],
            'max_torque_nm': [max_torque_nm],
            'fuel': [fuel],
            'transmission': [transmission],
            'owner': [owner],
            'Drivetrain': [drivetrain],
            'manufacturer': [manufacturer],
            'model_name': [model_name]
        })
        
        # Make prediction using the complete pipeline
        prediction = model_pipeline.predict(input_data)[0]
        
        # Format prediction
        price_lakh = prediction / 100000
        
        return jsonify({
            'success': True,
            'predicted_price': round(prediction, 2),
            'price_lakh': round(price_lakh, 2),
            'formatted_price': f'₹{price_lakh:.2f} Lakh'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
