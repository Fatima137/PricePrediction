from flask import Flask, request, jsonify
import pickle
import json
import numpy as np
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score, accuracy_score, precision_score, recall_score, f1_score, confusion_matrix, silhouette_score
from sklearn.cluster import KMeans
import util

app = Flask(__name__)

@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/predict_home_price', methods=['GET', 'POST'])
def predict_home_price():
    total_sqft = float(request.form['total_sqft'])
    location = request.form['location']
    bhk = int(request.form['bhk'])
    bath = int(request.form['bath'])

    response = jsonify({
        'estimated_price': util.get_estimated_price(location,total_sqft,bhk,bath)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/evaluate_model', methods=['GET'])
def evaluate_model():
    # Load data and model
    util.load_saved_artifacts()
    X_test = [...]  
    y_test = [...]  

    # Regression metrics
    y_pred_reg = [...]  
    mae = mean_absolute_error(y_test, y_pred_reg)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred_reg))
    r2 = r2_score(y_test, y_pred_reg)

    # Classification metrics
    y_pred_cls = [...] 
    accuracy = accuracy_score(y_test, y_pred_cls)
    precision = precision_score(y_test, y_pred_cls)
    recall = recall_score(y_test, y_pred_cls)
    f1 = f1_score(y_test, y_pred_cls)
    cm = confusion_matrix(y_test, y_pred_cls)

    # Clustering metric
    X_clustering = [...]  # Data for clustering
    kmeans = KMeans(n_clusters=3)  # Example clustering algorithm
    cluster_labels = kmeans.fit_predict(X_clustering)
    silhouette = silhouette_score(X_clustering, cluster_labels)

    response = {
        'Regression': {'MAE': mae, 'RMSE': rmse, 'R2': r2},
        'Classification': {'Accuracy': accuracy, 'Precision': precision, 'Recall': recall, 'F1': f1, 'Confusion Matrix': cm.tolist()},
        'Clustering': {'Silhouette Score': silhouette}
    }

    return jsonify(response)

if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    util.load_saved_artifacts()
    app.run()