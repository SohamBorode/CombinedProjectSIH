import io
import numpy as np
from fastapi import FastAPI, File, Form, UploadFile, HTTPException
from PIL import Image
import tensorflow as tf

app = FastAPI()

# 1. Load the pre-trained model
MODEL_PATH = "ML model/sish_nightshade_model.h5"
try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

# 2. Define the exact classes from your training notebook
CLASS_NAMES = {
    0: 'Tomato___healthy',
    1: 'Tomato___Early_blight',
    2: 'Tomato___Late_blight',
    3: 'Potato___healthy',
    4: 'Potato___Early_blight',
    5: 'Potato___Late_blight',
    6: 'Unknown_Crop'
}

# 3. Helper to determine severity and agronomic warning
def get_severity_and_warning(predicted_class: str):
    if 'healthy' in predicted_class:
        return "Low", "Crop appears healthy. Continue normal maintenance."
    elif 'Early_blight' in predicted_class:
        return "Medium", "Early blight detected. Consider applying fungicides and monitor closely."
    elif 'Late_blight' in predicted_class:
        return "High", "CRITICAL: Late blight detected! Immediate fungicide application required."
    else:
        return "Unknown", "Could not confidently identify a specific disease."


@app.post("/predict")
async def predict(
    image: UploadFile = File(...),
    crop: str = Form(""),
    cropStage: str = Form(""),
    latitude: str = Form(""),
    longitude: str = Form("")
):
    if model is None:
        raise HTTPException(status_code=500, detail="ML model is not loaded.")

    try:
        contents = await image.read()
        img = Image.open(io.BytesIO(contents)).convert("RGB")
        img = img.resize((224, 224))
        
        img_array = tf.keras.preprocessing.image.img_to_array(img)
        img_array = img_array / 255.0
        img_batch = np.expand_dims(img_array, axis=0)

        # Get raw probabilities for all 7 classes
        predictions = model.predict(img_batch)[0]
        
        # We want to filter predictions based on what crop the user selected in the UI.
        # If they chose "Tomato", we only look at Tomato classes (0, 1, 2). 
        # If "Potato", we look at Potato classes (3, 4, 5).
        selected_crop = crop.strip().lower()
        
        valid_indices = []
        if selected_crop == "tomato":
            valid_indices = [0, 1, 2, 6] # Include Unknown just in case
        elif selected_crop == "potato":
            valid_indices = [3, 4, 5, 6]
        else:
            valid_indices = [0, 1, 2, 3, 4, 5, 6] # Check all if crop isn't specified

        subset_sum = sum(predictions[i] for i in valid_indices)

        # Find the highest probability ONLY among the valid crop indices
        best_index = valid_indices[0]
        best_normalized_prob = -1.0
        
        for idx in valid_indices:
            normalized_prob = (predictions[idx] / subset_sum) if subset_sum > 0 else 0
            if normalized_prob > best_normalized_prob:
                best_normalized_prob = normalized_prob
                best_index = idx

        # Calculate confidence and round to 2 decimal places for a clean UI
        confidence = round(float(best_normalized_prob) * 100, 2)

        predicted_class = CLASS_NAMES.get(best_index, "Unknown_Crop")

        # Format output
        if predicted_class == "Unknown_Crop":
            disease_name = "Unknown Crop / Object"
            severity = "Unknown"
            warning = "Please upload a clear image of a Tomato or Potato leaf."
        else:
            disease_name = predicted_class.replace("___", " - ").replace("_", " ")
            severity, warning = get_severity_and_warning(predicted_class)

        return {
            "diseaseName": disease_name,
            "confidence": confidence,
            "severity": severity,
            "warning": warning
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
# @app.post("/predict")
# async def predict(
#     image: UploadFile = File(...),
#     crop: str = Form(""),
#     cropStage: str = Form(""),
#     latitude: str = Form(""),
#     longitude: str = Form("")
# ):
#     if model is None:
#         raise HTTPException(status_code=500, detail="ML model is not loaded.")

#     try:
#         # Read and preprocess the image exactly as done during training
#         contents = await image.read()
#         img = Image.open(io.BytesIO(contents)).convert("RGB")
#         img = img.resize((224, 224))
        
#         img_array = tf.keras.preprocessing.image.img_to_array(img)
#         img_array = img_array / 255.0
#         img_batch = np.expand_dims(img_array, axis=0)

#         # Run inference
#         predictions = model.predict(img_batch)
#         predicted_index = int(np.argmax(predictions[0]))
#         confidence = float(np.max(predictions[0])) * 100

#         predicted_class = CLASS_NAMES.get(predicted_index, "Unknown_Crop")

#         # Format output
#         if predicted_class == "Unknown_Crop":
#             disease_name = "Unknown Crop / Object"
#             severity = "Unknown"
#             warning = "Please upload a clear image of a Tomato or Potato leaf."
#         else:
#             disease_name = predicted_class.replace("___", " - ").replace("_", " ")
#             severity, warning = get_severity_and_warning(predicted_class)

#         return {
#             "diseaseName": disease_name,
#             "confidence": confidence,
#             "severity": severity,
#             "warning": warning
#         }

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    # The Spring boot backend expects the ML server to run on port 8000
    uvicorn.run(app, host="0.0.0.0", port=8000)