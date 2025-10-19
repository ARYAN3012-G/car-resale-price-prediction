# Test Examples for Car Resale Price Prediction

Use these real examples from the dataset to test your prediction website.

---

## 🚗 Example 1: Honda Amaze (Budget Sedan)

**Vehicle Details:**
- **Manufacturer:** Honda
- **Model:** Amaze 1.2 VX i-VTEC
- **Year of Purchase:** 2017
- **Kilometers Driven:** 87,150
- **Fuel Type:** Petrol
- **Transmission:** Manual
- **Owner Type:** First Owner
- **Max Power (bhp):** 87
- **Engine Size (cc):** 1198

**Actual Selling Price:** ₹5,05,000  
**Expected Prediction:** ~₹5.22 Lakh

---

## 🚗 Example 2: Maruti Suzuki Swift DZire (Popular Sedan)

**Vehicle Details:**
- **Manufacturer:** Maruti Suzuki
- **Model:** Swift DZire VDI
- **Year of Purchase:** 2014
- **Kilometers Driven:** 75,000
- **Fuel Type:** Diesel
- **Transmission:** Manual
- **Owner Type:** Second Owner
- **Max Power (bhp):** 74
- **Engine Size (cc):** 1248

**Actual Selling Price:** ₹4,50,000  
**Expected Prediction:** ~₹4.50 Lakh

---

## 🚗 Example 3: Hyundai Creta (Compact SUV)

**Vehicle Details:**
- **Manufacturer:** Hyundai
- **Model:** Creta 1.6 SX Plus Petrol
- **Year of Purchase:** 2019
- **Kilometers Driven:** 36,313
- **Fuel Type:** Petrol
- **Transmission:** Manual
- **Owner Type:** First Owner
- **Max Power (bhp):** 122
- **Engine Size (cc):** 1591

**Actual Selling Price:** ₹11,75,000  
**Expected Prediction:** ~₹11.75 Lakh

---

## 🚗 Example 4: Toyota Innova (Premium MPV)

**Vehicle Details:**
- **Manufacturer:** Toyota
- **Model:** Innova 2.4 VX 7 STR [2016-2020]
- **Year of Purchase:** 2018
- **Kilometers Driven:** 69,000
- **Fuel Type:** Diesel
- **Transmission:** Manual
- **Owner Type:** First Owner
- **Max Power (bhp):** 148
- **Engine Size (cc):** 2393

**Actual Selling Price:** ₹19,50,000  
**Expected Prediction:** ~₹19.50 Lakh

---

## 🚗 Example 5: BMW X1 (Luxury SUV)

**Vehicle Details:**
- **Manufacturer:** BMW
- **Model:** X1 xDrive20d M Sport
- **Year of Purchase:** 2017
- **Kilometers Driven:** 75,000
- **Fuel Type:** Diesel
- **Transmission:** Automatic
- **Owner Type:** Second Owner
- **Max Power (bhp):** 188
- **Engine Size (cc):** 1995

**Actual Selling Price:** ₹26,50,000  
**Expected Prediction:** ~₹26.50 Lakh

---

## 🚗 Example 6: Maruti Suzuki Alto (Entry Hatchback)

**Vehicle Details:**
- **Manufacturer:** Maruti Suzuki
- **Model:** Alto 800 LXi (O)
- **Year of Purchase:** 2019
- **Kilometers Driven:** 3,583
- **Fuel Type:** Petrol
- **Transmission:** Manual
- **Owner Type:** First Owner
- **Max Power (bhp):** 47
- **Engine Size (cc):** 796

**Actual Selling Price:** ₹4,49,000  
**Expected Prediction:** ~₹4.49 Lakh

---

## 📝 Testing Checklist

When testing each example, verify:

- [ ] Manufacturer dropdown loads correctly
- [ ] Model dropdown filters based on manufacturer
- [ ] All input fields accept values without issues
- [ ] Kilometer input formats with commas (e.g., 87,150)
- [ ] Max Power and Engine Size inputs allow editing
- [ ] Form submits successfully
- [ ] Prediction displays in red theme
- [ ] Price is within reasonable range
- [ ] "Reset" button clears the form

---

## 🎯 Expected Behavior

### Input Formatting:
- **Kilometers:** Auto-formats with commas when you tab out (e.g., 45000 → 45,000)
- **Max Power:** Decimal values allowed (e.g., 87.5)
- **Engine Size:** Integer values only (e.g., 1198)

### Dropdown Behavior:
- **Manufacturer:** Shows all brands alphabetically
- **Model:** Disabled until manufacturer selected, then shows only that brand's models

### Validation:
- Year: 1990-2025
- Kilometers: 0-500,000
- Max Power: 30-700 bhp
- Engine Size: 500-7,000 cc

---

## 💡 Tips for Accurate Predictions

1. **Use realistic values** - The model is trained on real market data
2. **Match year and kilometers** - Lower km with older year may seem odd
3. **Owner type matters** - First owner cars typically valued higher
4. **Transmission** - Automatic usually priced higher than manual
5. **Brand value** - Premium brands (BMW, Mercedes) hold value better

---

## 🐛 Known Issues (Fixed)

✅ Model dropdown now filters by manufacturer  
✅ Kilometer input formatting works correctly  
✅ Footer updated to 2025  
✅ Max Power and Engine Size inputs allow editing  
✅ Website performance optimized
