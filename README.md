# 🚗 Car Resale Price Prediction

A machine learning-powered web application that predicts the resale price of used cars based on various features like manufacturer, model, year, kilometers driven, fuel type, and more.

## 🌐 Live Demo
**Try it now:** [https://car-resale-price-prediction.onrender.com/](https://car-resale-price-prediction.onrender.com/)

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-3.0.0-green.svg)
![scikit-learn](https://img.shields.io/badge/scikit--learn-1.6.1-orange.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)
![Live](https://img.shields.io/badge/Status-Live-brightgreen.svg)

## 🌟 Features

- **AI-Powered Predictions**: Uses RandomForest Regressor with 73% accuracy (R² Score)
- **Smart Model Filtering**: Dynamic dropdown that filters car models based on manufacturer
- **Modern Red Theme UI**: Beautiful, responsive design with smooth animations
- **Real-time Validation**: Client-side input validation with proper formatting
- **Comprehensive Dataset**: Trained on 2,059+ real car transactions
- **High Accuracy**: Mean error of just ₹2.98 Lakh

## 📊 Model Performance

- **R² Score**: 73.40%
- **Mean Absolute Error (MAE)**: ₹2.98 Lakh
- **Root Mean Squared Error (RMSE)**: ₹12.67 Lakh
- **Algorithm**: RandomForest Regressor (100 trees)
- **Features Used**: 9 features including manufacturer, model, year, km driven, fuel type, etc.

## 🛠️ Tech Stack

**Backend:**
- Flask (Python web framework)
- scikit-learn (Machine Learning)
- pandas & numpy (Data processing)
- joblib (Model serialization)

**Frontend:**
- HTML5, CSS3, JavaScript
- Font Awesome (Icons)
- Google Fonts (Poppins)

## 📁 Project Structure

```
CAR_RESALE_PRICE_PREDICTION/
│
├── app.py                          # Flask application
├── requirements.txt                # Python dependencies
├── .gitignore                     # Git ignore rules
├── README.md                       # Project documentation
├── EXAMPLES.md                     # Test examples
│
├── rf_model_v2 (1).joblib         # Trained ML model
├── preprocessor_v2 (1).joblib     # Feature preprocessors
├── cardataset2.csv                # Training dataset
│
├── static/
│   ├── script.js                  # Frontend JavaScript
│   └── style.css                  # Styling (Red theme)
│
└── templates/
    └── index.html                 # Main HTML template
```

## 🚀 Installation & Setup

### Prerequisites
- Python 3.8 or higher
- pip package manager

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/car-resale-price-prediction.git
cd car-resale-price-prediction
```

2. **Create virtual environment** (recommended)
```bash
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Run the application**
```bash
python app.py
```

5. **Open in browser**
```
http://localhost:5000
```

## 📝 Usage

1. **Select Manufacturer**: Choose the car brand from the dropdown
2. **Select Model**: Pick the specific car model (filtered by manufacturer)
3. **Enter Details**: Fill in year, kilometers, fuel type, transmission, owner type
4. **Add Specifications**: Enter max power (bhp) and engine size (cc)
5. **Get Prediction**: Click "Predict Price" to see the estimated resale value

See [EXAMPLES.md](EXAMPLES.md) for sample test cases.

## 🎯 Model Features

The prediction model considers the following features:

1. **Manufacturer** - Car brand (e.g., Honda, Maruti Suzuki, BMW)
2. **Model Name** - Specific car model (e.g., Amaze 1.2 VX i-VTEC)
3. **Year** - Year of purchase (1990-2025)
4. **Kilometers Driven** - Total distance driven (0-500,000 km)
5. **Fuel Type** - Petrol, Diesel, CNG, Electric
6. **Transmission** - Manual or Automatic
7. **Owner Type** - First, Second, Third, or UnRegistered
8. **Max Power** - Engine power in bhp (30-700)
9. **Engine Size** - Engine capacity in cc (500-7000)

## 🧪 Testing

Sample test data is available in `EXAMPLES.md`. Try these examples:

- **Budget Sedan**: Honda Amaze 2017 - Expected: ₹5.22 Lakh
- **Popular Hatchback**: Maruti Swift 2014 - Expected: ₹4.50 Lakh
- **Compact SUV**: Hyundai Creta 2019 - Expected: ₹11.75 Lakh
- **Luxury SUV**: BMW X1 2017 - Expected: ₹26.50 Lakh

## 🎨 UI Features

- **Red Theme**: Modern red gradient design
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Smart Dropdowns**: Model filter based on manufacturer selection
- **Input Formatting**: Auto-formats kilometers with commas
- **Smooth Animations**: GPU-accelerated transitions
- **Form Validation**: Real-time validation with helpful error messages

## 🔧 Configuration

### Environment Variables
Create a `.env` file (optional):
```
FLASK_APP=app.py
FLASK_ENV=production
PORT=5000
```

### Model Retraining
To retrain with new data, update `cardataset2.csv` and run the training notebook.

## 📈 Deployment

### Deploy to Render
1. Create account on [Render.com](https://render.com)
2. Connect GitHub repository
3. Create new Web Service
4. Configure:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `python app.py`

### Deploy to Railway
1. Create account on [Railway.app](https://railway.app)
2. Import GitHub repository
3. Railway auto-detects Python and deploys

### Deploy to Heroku
1. Create `Procfile`:
```
web: python app.py
```
2. Deploy via Heroku CLI or GitHub integration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**ARYAN**
- GitHub: [@ARYAN3012-G](https://github.com/ARYAN3012-G)
- Live App: [car-resale-price-prediction.onrender.com](https://car-resale-price-prediction.onrender.com/)

## 🙏 Acknowledgments

- Dataset: CarDataset2 (2,059 car transactions)
- ML Library: scikit-learn
- Web Framework: Flask
- UI Inspiration: Modern gradient designs

## 📞 Contact

For questions or support, please open an issue on GitHub.

---

Made with ❤️ and Machine Learning
