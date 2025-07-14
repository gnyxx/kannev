import pickle
import cv2
import mediapipe as mp
import numpy as np

# Load the model
model_dict = pickle.load(open('./model.p', 'rb'))
model = model_dict['model']

# MediaPipe hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=True, min_detection_confidence=0.3)

# Label mapping (adjust based on your training labels)
labels_dict = {0: 'A', 1: 'B'}

def classify_sign(image_path):
    data_aux = []
    x_ = []
    y_ = []

    # Load and process the image
    img = cv2.imread(image_path)
    if img is None:
        return "Invalid image"
    
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    results = hands.process(img_rgb)

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            for lm in hand_landmarks.landmark:
                x_.append(lm.x)
                y_.append(lm.y)
            for lm in hand_landmarks.landmark:
                data_aux.append(lm.x - min(x_))
                data_aux.append(lm.y - min(y_))
        
        prediction = model.predict([np.asarray(data_aux)])
        return labels_dict[int(prediction[0])]
    else:
        return "No hand detected"
    