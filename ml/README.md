# 🚗 Car Resale Price Prediction - Machine Learning Project

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-brightgreen?style=for-the-badge)](https://car-resale-price-prediction.onrender.com/)
[![Python](https://img.shields.io/badge/Python-3.8+-blue?style=for-the-badge&logo=python)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-Web%20App-black?style=for-the-badge&logo=flask)](https://flask.palletsprojects.com/)
[![LightGBM](https://img.shields.io/badge/LightGBM-ML%20Model-orange?style=for-the-badge)](https://lightgbm.readthedocs.io/)

> An advanced machine learning project for predicting car resale prices using state-of-the-art **LightGBM** algorithm with **84% R² accuracy**.

## 📋 Project Overview

This repository contains a comprehensive machine learning project that predicts car resale prices based on various vehicle features. The project includes data analysis, model training, deployment, and a fully functional web application.

## 🌐 Live Application

**🔗 [Try the App Live](https://car-resale-price-prediction.onrender.com/)**

Experience real-time car price predictions with our intuitive web interface!

## ✨ Key Features

- **🤖 LightGBM Algorithm** - State-of-the-art gradient boosting model with 84% R² score
- **📊 Comprehensive Analysis** - Uses 13 key features including max torque and drivetrain
- **🎨 Modern Web Interface** - Beautiful, responsive Flask application
- **📱 Mobile Responsive** - Works seamlessly on all device sizes
- **⚡ Real-time Predictions** - Get instant car valuation estimates
- **🔥 High Performance** - Optimized for speed and accuracy

## 📈 Model Performance

| Metric | Value |
|--------|-------|
| **R² Score** | 84.40% |
| **Mean Absolute Error (MAE)** | ₹2.32 Lakh |
| **Root Mean Squared Error (RMSE)** | ₹9.76 Lakh |
| **Training Data** | 1,800+ real car transactions |
| **Algorithm** | LightGBM Gradient Boosting |

## 📂 Repository Structure

```
📦 car-resale-price-prediction
├── 📁 CAR_PRICE_PREDICTION_LGBM/     # Main application folder
│   ├── 📄 app.py                      # Flask web application
│   ├── 📄 README.md                   # Detailed app documentation
│   ├── 📊 cardataset2.csv             # Training dataset
│   ├── 🤖 lightgbm_car_price_model.pkl # Trained LightGBM model
│   ├── 🤖 rf_model_v2.joblib          # Random Forest model (backup)
│   ├── ⚙️ preprocessor_v2.joblib      # Data preprocessing pipeline
│   ├── 📁 static/                     # CSS and JavaScript files
│   ├── 📁 templates/                  # HTML templates
│   ├── 📄 requirements.txt            # Python dependencies
│   ├── 📄 Procfile                    # Deployment configuration
│   ├── 📄 runtime.txt                 # Python version
│   ├── 📄 test_predictions.py         # Testing script
│   └── 📄 test_examples.json          # Test data examples
│
├── 📁 files/                          # Visualization outputs
│   ├── 📊 lgbm_feature_importance.png
│   ├── 📊 lgbm_residuals_plot.png
│   ├── 📊 price_distribution.png
│   ├── 📊 price_vs_power_engine.png
│   ├── 📊 rf_feature_importance.png
│   ├── 📊 rf_residuals_plot.png
│   ├── 📊 xgb_feature_importance.png
│   └── 📊 xgb_residuals_plot.png
│
├── 📁 sourcecode/
│   └── 📓 notebook.ipynb              # Jupyter notebook with full analysis
│
├── 📄 final_ml1.pptx                  # Project presentation
├── 📄 report_ml_final_ml.pdf          # Detailed project report
└── 📄 README.md                       # This file
```

## 🔧 Features Used for Prediction

| # | Feature | Type | Description |
|---|---------|------|-------------|
| 1 | Year of Purchase | Numerical | Manufacturing year |
| 2 | Kilometers Driven | Numerical | Total distance covered |
| 3 | Max Power (bhp) | Numerical | Engine's maximum power output |
| 4 | Engine Size (cc) | Numerical | Engine displacement |
| 5 | Car Age | Numerical | Age of the vehicle |
| 6 | Age-Km Interaction | Numerical | Interaction feature |
| 7 | Max Torque (Nm) | Numerical | Engine's maximum torque |
| 8 | Fuel Type | Categorical | Petrol, Diesel, CNG, LPG |
| 9 | Transmission | Categorical | Manual or Automatic |
| 10 | Owner Type | Categorical | First, Second, Third, etc. |
| 11 | Drivetrain | Categorical | FWD, RWD, AWD |
| 12 | Manufacturer | Categorical | Car brand |
| 13 | Model Name | Categorical | Specific car model |

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- pip package manager

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ARYAN3012-G/car-resale-price-prediction.git
   cd car-resale-price-prediction/CAR_PRICE_PREDICTION_LGBM
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**
   ```bash
   python app.py
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5000`
   - Enter car details and get instant price predictions!

## 🛠️ Technology Stack

### Backend
- **Flask** - Lightweight web framework
- **LightGBM** - Gradient boosting model
- **Scikit-learn** - Data preprocessing
- **Pandas & NumPy** - Data manipulation

### Frontend
- **HTML5 & CSS3** - Modern, responsive design
- **JavaScript** - Interactive functionality
- **Custom CSS** - Beautiful animations and styling

### Deployment
- **Render** - Cloud platform (currently deployed)
- **Heroku-ready** - Includes Procfile
- **Railway-ready** - Zero-config deployment

## 📊 Project Components

### 1. Data Analysis & Visualization
- Comprehensive exploratory data analysis
- Feature importance analysis
- Residual plots and distribution charts
- All visualizations available in `files/` folder

### 2. Model Training
- Multiple algorithms tested (LightGBM, Random Forest, XGBoost)
- Hyperparameter tuning
- Cross-validation
- Feature engineering
- Full notebook available: `sourcecode/notebook.ipynb`

### 3. Web Application
- User-friendly interface
- Real-time predictions
- RESTful API endpoints
- Responsive design

### 4. Documentation
- **PowerPoint Presentation**: `final_ml1.pptx`
- **Detailed Report**: `report_ml_final_ml.pdf`
- **Code Documentation**: In `CAR_PRICE_PREDICTION_LGBM/README.md`

## 🌐 API Endpoints

### GET `/api/options`
Returns available options for all dropdown fields.

**Response:**
```json
{
  "manufacturers": ["Maruti", "Honda", "Hyundai", ...],
  "fuel_types": ["Petrol", "Diesel", "CNG", "LPG"],
  "transmissions": ["Manual", "Automatic"],
  "owners": ["First Owner", "Second Owner", ...],
  "drivetrains": ["FWD", "RWD", "AWD"]
}
```

### POST `/api/predict`
Accepts car details and returns predicted resale price.

**Request:**
```json
{
  "manufacturer": "Honda",
  "model_name": "City",
  "year": 2018,
  "km_driven": 45000,
  "fuel": "Petrol",
  "transmission": "Manual",
  "owner": "First Owner",
  "max_power_bhp": 118,
  "engine_cc": 1498,
  "max_torque_nm": 145,
  "drivetrain": "FWD"
}
```

**Response:**
```json
{
  "success": true,
  "predicted_price": 725000.50,
  "price_lakh": 7.25,
  "formatted_price": "₹7.25 Lakh"
}
```

## 📦 Deployment

### Current Deployment
✅ **Live on Render**: [car-resale-price-prediction.onrender.com](https://car-resale-price-prediction.onrender.com/)

### Deploy Your Own

#### Option 1: Render
1. Fork this repository
2. Connect to Render
3. Deploy automatically!

#### Option 2: Heroku
```bash
heroku create your-app-name
git push heroku main
heroku open
```

#### Option 3: Railway
```bash
railway login
railway init
railway up
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

## 📧 Contact & Links

- **GitHub**: [@ARYAN3012-G](https://github.com/ARYAN3012-G)
- **Live Demo**: [car-resale-price-prediction.onrender.com](https://car-resale-price-prediction.onrender.com/)
- **Repository**: [github.com/ARYAN3012-G/car-resale-price-prediction](https://github.com/ARYAN3012-G/car-resale-price-prediction)

## 🙏 Acknowledgments

- Dataset source for training the machine learning model
- LightGBM library for providing excellent gradient boosting framework
- Flask community for the amazing web framework
- Render platform for deployment hosting
- Open-source community for various tools and libraries

## 📜 License

This project is for **educational and demonstration purposes**. Feel free to use it for learning and non-commercial purposes.

## 📸 Screenshots

### Web Application Interface
The application features a modern, intuitive interface where users can:
- Select car manufacturer and model
- Input vehicle specifications
- Get instant price predictions
- View results in formatted Indian currency

### Model Performance Visualizations
Check the `files/` folder for:
- Feature importance charts
- Residual plots
- Price distribution graphs
- Model comparison charts

---

## 🌟 Project Highlights

- ✅ **Production-Ready**: Deployed and accessible online
- ✅ **Well-Documented**: Comprehensive documentation and reports
- ✅ **High Accuracy**: 84% R² score on test data
- ✅ **Modern Stack**: Latest ML and web technologies
- ✅ **Responsive Design**: Works on all devices
- ✅ **Open Source**: Available for learning and contribution

---

⭐ **If you found this project helpful, please consider starring the repository!** ⭐

---

**Made with ❤️ by Aryan**
