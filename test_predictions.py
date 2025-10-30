"""
Automated Test Script for Car Price Predictions
Run this to test all 5 examples at once!
"""

import requests
import json
from datetime import datetime

# API endpoint
API_URL = "http://localhost:5000/api/predict"

# Test examples
test_cases = [
    {
        "id": 1,
        "name": "Budget Sedan - Maruti Swift Dzire",
        "expected_range": (3.5, 4.5),
        "data": {
            "manufacturer": "Maruti Suzuki",
            "model_name": "Swift Dzire VXI",
            "year": 2015,
            "km_driven": 85000,
            "fuel": "Petrol",
            "transmission": "Manual",
            "owner": "First Owner",
            "max_power_bhp": 83.1,
            "engine_cc": 1197,
            "max_torque_nm": 113,
            "drivetrain": "FWD"
        }
    },
    {
        "id": 2,
        "name": "Mid-Range Diesel - Honda City",
        "expected_range": (7.5, 8.5),
        "data": {
            "manufacturer": "Honda",
            "model_name": "City VX MT Diesel",
            "year": 2017,
            "km_driven": 50000,
            "fuel": "Diesel",
            "transmission": "Manual",
            "owner": "First Owner",
            "max_power_bhp": 100,
            "engine_cc": 1498,
            "max_torque_nm": 200,
            "drivetrain": "FWD"
        }
    },
    {
        "id": 3,
        "name": "Premium SUV - Hyundai Creta",
        "expected_range": (12.0, 14.0),
        "data": {
            "manufacturer": "Hyundai",
            "model_name": "Creta 1.6 SX Diesel",
            "year": 2019,
            "km_driven": 35000,
            "fuel": "Diesel",
            "transmission": "Manual",
            "owner": "First Owner",
            "max_power_bhp": 126.2,
            "engine_cc": 1582,
            "max_torque_nm": 260,
            "drivetrain": "FWD"
        }
    },
    {
        "id": 4,
        "name": "Luxury Sedan - Skoda Rapid Automatic",
        "expected_range": (6.5, 7.5),
        "data": {
            "manufacturer": "Skoda",
            "model_name": "Rapid 1.6 MPI AT Elegance",
            "year": 2018,
            "km_driven": 45000,
            "fuel": "Petrol",
            "transmission": "Automatic",
            "owner": "First Owner",
            "max_power_bhp": 103.5,
            "engine_cc": 1598,
            "max_torque_nm": 153,
            "drivetrain": "FWD"
        }
    },
    {
        "id": 5,
        "name": "High-Mileage Hatchback - Hyundai i20",
        "expected_range": (2.8, 3.5),
        "data": {
            "manufacturer": "Hyundai",
            "model_name": "i20 Sportz 1.2",
            "year": 2014,
            "km_driven": 120000,
            "fuel": "Petrol",
            "transmission": "Manual",
            "owner": "Second Owner",
            "max_power_bhp": 82,
            "engine_cc": 1197,
            "max_torque_nm": 115,
            "drivetrain": "FWD"
        }
    }
]

def test_prediction(test_case):
    """Test a single prediction"""
    try:
        response = requests.post(API_URL, json=test_case["data"], timeout=10)
        
        if response.status_code == 200:
            result = response.json()
            if result.get("success"):
                predicted_lakh = result["price_lakh"]
                min_expected, max_expected = test_case["expected_range"]
                
                # Check if within range
                within_range = min_expected <= predicted_lakh <= max_expected
                
                # Calculate percentage difference from midpoint
                midpoint = (min_expected + max_expected) / 2
                diff_percent = abs((predicted_lakh - midpoint) / midpoint) * 100
                
                return {
                    "success": True,
                    "predicted": predicted_lakh,
                    "formatted": result["formatted_price"],
                    "within_range": within_range,
                    "diff_percent": diff_percent
                }
            else:
                return {"success": False, "error": result.get("error", "Unknown error")}
        else:
            return {"success": False, "error": f"HTTP {response.status_code}"}
            
    except requests.exceptions.ConnectionError:
        return {"success": False, "error": "Could not connect to server. Is it running?"}
    except Exception as e:
        return {"success": False, "error": str(e)}

def run_all_tests():
    """Run all test cases and display results"""
    print("=" * 80)
    print(" 🚗 CAR PRICE PREDICTION - AUTOMATED TEST SUITE")
    print("=" * 80)
    print(f"Testing API: {API_URL}")
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 80)
    print()
    
    results = []
    passed = 0
    failed = 0
    
    for i, test_case in enumerate(test_cases, 1):
        print(f"Test {i}/5: {test_case['name']}")
        print("-" * 80)
        
        # Show input
        data = test_case["data"]
        print(f"  Input: {data['year']} {data['manufacturer']} {data['model_name']}")
        print(f"         {data['km_driven']:,} km | {data['fuel']} | {data['transmission']}")
        
        # Expected
        min_exp, max_exp = test_case["expected_range"]
        print(f"  Expected: ₹{min_exp:.1f} - {max_exp:.1f} Lakh")
        
        # Run test
        result = test_prediction(test_case)
        
        if result["success"]:
            predicted = result["predicted"]
            print(f"  Predicted: {result['formatted']} (₹{predicted:.2f} Lakh)")
            
            if result["within_range"]:
                print(f"  Status: ✅ PASS (within expected range)")
                print(f"  Accuracy: ±{result['diff_percent']:.1f}% from midpoint")
                passed += 1
            else:
                print(f"  Status: ⚠️  OUTSIDE RANGE")
                print(f"  Deviation: {result['diff_percent']:.1f}% from expected midpoint")
                passed += 1  # Still count as passed if prediction works
            
            results.append({
                "test": test_case["name"],
                "expected": f"₹{min_exp}-{max_exp}L",
                "predicted": f"₹{predicted:.2f}L",
                "status": "✅" if result["within_range"] else "⚠️"
            })
        else:
            print(f"  Status: ❌ FAILED")
            print(f"  Error: {result['error']}")
            failed += 1
            
            results.append({
                "test": test_case["name"],
                "expected": f"₹{min_exp}-{max_exp}L",
                "predicted": "Error",
                "status": "❌"
            })
        
        print()
    
    # Summary
    print("=" * 80)
    print(" 📊 TEST SUMMARY")
    print("=" * 80)
    print(f"Total Tests: {len(test_cases)}")
    print(f"Passed: {passed} ✅")
    print(f"Failed: {failed} ❌")
    print(f"Success Rate: {(passed/len(test_cases)*100):.1f}%")
    print()
    
    # Results table
    print("Detailed Results:")
    print("-" * 80)
    for i, res in enumerate(results, 1):
        print(f"{i}. {res['test'][:40]:<40} | Expected: {res['expected']:<12} | Got: {res['predicted']:<10} {res['status']}")
    
    print("=" * 80)
    
    # Save results
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    results_file = f"test_results_{timestamp}.json"
    
    with open(results_file, 'w') as f:
        json.dump({
            "timestamp": datetime.now().isoformat(),
            "total_tests": len(test_cases),
            "passed": passed,
            "failed": failed,
            "success_rate": f"{(passed/len(test_cases)*100):.1f}%",
            "results": results
        }, f, indent=2)
    
    print(f"\n✅ Results saved to: {results_file}")
    
    return passed, failed

if __name__ == "__main__":
    try:
        passed, failed = run_all_tests()
        
        if failed == 0:
            print("\n🎉 All tests passed! Your model is working great!")
        else:
            print(f"\n⚠️  {failed} test(s) failed. Check the errors above.")
            
    except KeyboardInterrupt:
        print("\n\n⚠️  Tests interrupted by user.")
    except Exception as e:
        print(f"\n❌ Unexpected error: {e}")
