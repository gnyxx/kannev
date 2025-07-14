# Kannv 

Kannv is a web application that helps both **deaf** and **visually impaired** individuals. It includes modules for **sign language recognition**, **speech-to-text**, **text-to-speech**, and **Braille-based voice interaction**.

---

## 🔧 Features

### 🧏 Sign Language to Text/Speech
- Detects hand signs from webcam
- Converts sign language to **text**
- Optionally speaks the translated word (text-to-speech)

### 🗣 Voice and Text Input
- Accepts input through voice or text
- Converts to sign language using image-based display

### 🧑‍🦯 Braille and Conversation Tests
- Braille quizzes (voice-based answers)
- Sign language conversations (multi-letter response validation)

---

## 🧠 Model Info
- Uses MediaPipe for hand landmark detection
- Classifier: RandomForestClassifier from Scikit-learn
- Trained on webcam-captured letter signs
- Supports multi-capture, level-based quizzes

## 🧪 Testing Modules
- Sign Language Quiz: User performs hand signs to match prompts
- Braille Voice Quiz: Voice input answers questions about Braille
- Conversation Practice: Answer prompts using sign sequences
