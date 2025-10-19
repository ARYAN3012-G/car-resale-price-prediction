from flask import Flask, request, jsonify, render_template
import joblib
import numpy as np
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load model and preprocessors
model = joblib.load('rf_model_v2 (1).joblib')
preprocessors = joblib.load('preprocessor_v2 (1).joblib')
encoders = preprocessors['encoders']
scaler = preprocessors['scaler']
FINAL_FEATURES = preprocessors['feature_order']

le_make = encoders['manufacturer']
le_model = encoders['model_name']
le_fuel = encoders['fuel']
le_trans = encoders['transmission']
le_owner = encoders['owner']

# Get available options from encoders
companies = list(le_make.classes_)
models = list(le_model.classes_)
fuel_types = list(le_fuel.classes_)
transmissions = list(le_trans.classes_)
owners = list(le_owner.classes_)

# Create manufacturer-model mapping from the dataset
df = pd.read_csv('cardataset2.csv')
manufacturer_models = {}
for manufacturer in df['Make'].unique():
    manufacturer_models[manufacturer] = sorted(df[df['Make'] == manufacturer]['Model'].unique().tolist())

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/options', methods=['GET'])
def get_options():
    """Return all available options for dropdowns"""
    return jsonify({
        'companies': companies,
        'models': models,
        'manufacturer_models': manufacturer_models,
        'fuel_types': fuel_types,
        'transmissions': transmissions,
        'owners': owners
    })

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Extract features
        year = int(data['year'])
        km_driven = int(data['km_driven'])
        company = data['company']
        model_name = data['model_name']
        fuel = data['fuel']
        transmission = data['transmission']
        owner = data['owner']
        max_power_bhp = float(data['max_power_bhp'])
        engine_cc = float(data['engine_cc'])
        
        # Validate ranges
        if year < 1990 or year > 2025:
            raise ValueError("Year must be between 1990 and 2025")
        if km_driven < 0 or km_driven > 500000:
            raise ValueError("Kilometers driven must be between 0 and 500,000")
        if max_power_bhp < 30 or max_power_bhp > 700:
            raise ValueError("Max Power must be between 30 and 700 bhp")
        if engine_cc < 500 or engine_cc > 7000:
            raise ValueError("Engine size must be between 500 and 7000 cc")
        
        # Encode categorical variables
        make_enc = le_make.transform([company])[0]
        model_enc = le_model.transform([model_name])[0]
        fuel_enc = le_fuel.transform([fuel])[0]
        trans_enc = le_trans.transform([transmission])[0]
        owner_enc = le_owner.transform([owner])[0]
        
        # Prepare numerical features for scaling
        num_values = [year, km_driven, max_power_bhp, engine_cc]
        
        # Scale numerical features
        scaled_features = scaler.transform([num_values])[0]
        
        # Construct final feature vector in correct order
        # Order: Year, km_driven, max_power_bhp, engine_cc, manufacturer_enc, model_name_enc, fuel_enc, transmission_enc, owner_enc
        final_features_vector = np.concatenate([
            scaled_features,
            [make_enc, model_enc, fuel_enc, trans_enc, owner_enc]
        ]).reshape(1, -1)
        
        # Predict
        prediction = model.predict(final_features_vector)[0]
        
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
    app.run(host='0.0.0.0', port=port, debug=False)
