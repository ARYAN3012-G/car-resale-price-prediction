# 🚗 Car Resale Price Prediction - LightGBM Model

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-brightgreen?style=for-the-badge)](https://car-resale-price-prediction.onrender.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/ARYAN3012-G/car-resale-price-prediction)

An advanced car resale price prediction web application using state-of-the-art LightGBM machine learning model for accurate price estimation.

## 🌐 Live Application

**🔗 [Try the App Live](https://car-resale-price-prediction.onrender.com/)**

Experience the power of machine learning in predicting car resale values with our intuitive web interface.

## ✨ Features

- **🤖 LightGBM Algorithm**: State-of-the-art gradient boosting model with 84% R² score
- **⚡ Enhanced Features**: Includes max torque and drivetrain analysis
- **🔍 Real-time Predictions**: Get instant car valuation estimates
- **🎨 Modern UI**: Beautiful, responsive interface with smooth animations
- **📊 Comprehensive Analysis**: Uses 13 key features for accurate predictions
- **📱 Mobile Responsive**: Works seamlessly on all device sizes
- **🔥 High Performance**: Optimized for speed and accuracy

## 📈 Model Performance

| Metric | Value |
|--------|-------|
| **R² Score** | 84.40% |
| **Mean Absolute Error (MAE)** | ₹2.32 Lakh |
| **Root Mean Squared Error (RMSE)** | ₹9.76 Lakh |
| **Training Data** | 1,800+ real car transactions |
| **Model Type** | LightGBM Gradient Boosting |

## 🔧 Features Used

| # | Feature | Type | Description |
|---|---------|------|-------------|
| 1 | Year of Purchase | Numerical | Manufacturing year of the vehicle |
| 2 | Kilometers Driven | Numerical | Total distance covered by the car |
| 3 | Max Power (bhp) | Numerical | Engine's maximum power output |
| 4 | Engine Size (cc) | Numerical | Engine displacement in cubic centimeters |
| 5 | Car Age | Numerical | Age of the car (derived feature) |
| 6 | Age-Km Interaction | Numerical | Interaction between age and kilometers |
| 7 | Max Torque (Nm) | Numerical | Engine's maximum torque output |
| 8 | Fuel Type | Categorical | Petrol, Diesel, CNG, LPG |
| 9 | Transmission | Categorical | Manual or Automatic |
| 10 | Owner Type | Categorical | First, Second, Third, Fourth & Above |
| 11 | Drivetrain | Categorical | FWD, RWD, AWD |
| 12 | Manufacturer | Categorical | Car brand/manufacturer |
| 13 | Model Name | Categorical | Specific car model |

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- pip package manager

### Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ARYAN3012-G/car-resale-price-prediction.git
   cd car-resale-price-prediction
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
   Navigate to `http://localhost:5000`

## 📦 Deployment

### Live Deployment
This application is currently deployed on **Render**: [car-resale-price-prediction.onrender.com](https://car-resale-price-prediction.onrender.com/)

### Deployment Platforms
Ready to deploy on various platforms:

| Platform | Status | Notes |
|----------|--------|-------|
| ✅ **Render** | Live | Current deployment |
| 🔧 **Heroku** | Ready | Include `Procfile` |
| 🔧 **Railway** | Ready | Zero-config deployment |
| 🔧 **Google Cloud Platform** | Ready | Use App Engine |
| 🔧 **Vercel** | Ready | For serverless deployment |

### Deployment Files Included
- `Procfile` - For Heroku/Render deployment
- `runtime.txt` - Python version specification
- `requirements.txt` - Dependencies list

## 🛠️ Technology Stack

### Backend
- **🌐 Flask** - Web framework
- **🤖 LightGBM** - Machine learning model
- **🐍 Python 3.8+** - Programming language

### Frontend
- **📄 HTML5** - Structure
- **🎨 CSS3** - Styling with animations
- **⚡ JavaScript** - Interactive functionality
- **📱 Responsive Design** - Mobile-first approach

### Data Processing
- **🐼 Pandas** - Data manipulation
- **🔢 NumPy** - Numerical computations
- **🧠 Scikit-learn** - Data preprocessing and model utilities
- **📊 Pickle** - Model serialization

## Model Details

The LightGBM model was trained using:
- **n_estimators**: 400
- **learning_rate**: 0.1
- **max_depth**: 9
- **Log transformation** on target variable for better predictions
- **StandardScaler** for numerical features
- **OneHotEncoder** for categorical features (fuel, transmission, owner, drivetrain)
- **OrdinalEncoder** for manufacturer and model names

## API Endpoints

### GET `/api/options`
Returns available options for all dropdown fields.

### POST `/api/predict`
Accepts car details and returns predicted resale price.

**Request Body:**
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

## 📸 Screenshots

### Home Page
The main interface where users can input car details and get instant price predictions.

### Prediction Results
Real-time prediction results with formatted price display in Indian Rupees.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### How to Contribute
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

- **GitHub**: [@ARYAN3012-G](https://github.com/ARYAN3012-G)
- **Project Link**: [https://github.com/ARYAN3012-G/car-resale-price-prediction](https://github.com/ARYAN3012-G/car-resale-price-prediction)
- **Live Demo**: [https://car-resale-price-prediction.onrender.com/](https://car-resale-price-prediction.onrender.com/)

## 🙏 Acknowledgments

- Dataset source for training the machine learning model
- LightGBM library for providing excellent gradient boosting framework
- Flask community for the amazing web framework
- Render platform for free deployment hosting

## 📜 License

This project is for educational and demonstration purposes. Feel free to use it for learning and non-commercial purposes.

---

⭐ **Star this repository if you found it helpful!** ⭐
