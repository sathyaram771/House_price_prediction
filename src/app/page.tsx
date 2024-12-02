"use client"; 

import { useState } from "react";
import axios from "axios";

interface Features {
  MedInc: number | "";
  HouseAge: number | "";
  AveRooms: number | "";
  AveBedrms: number | "";
  Population: number | "";
  AveOccup: number | "";
  Latitude: number | "";
  Longitude: number | "";
}

const Home: React.FC = () => {
  const [features, setFeatures] = useState<Features>({
    MedInc: "",
    HouseAge: "",
    AveRooms: "",
    AveBedrms: "",
    Population: "",
    AveOccup: "",
    Latitude: "",
    Longitude: "",
  });

  const [prediction, setPrediction] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeatures({ ...features, [e.target.name]: Number(e.target.value) || "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setPrediction(null);

    try {
      const response = await axios.post("http://74f0-34-75-58-184.ngrok-free.app/predict", {
        features: Object.values(features),
      });
      setPrediction(response.data.prediction[0]);
    } catch (err: any) {
	 console.error("Full error object:", err);
      setError(err.response?.data?.error || "An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>House Price Prediction</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
        {Object.keys(features).map((key) => (
          <div key={key} style={{ marginBottom: "1rem" }}>
            <label htmlFor={key} style={{ display: "block", marginBottom: "0.5rem" }}>
              {key}:
            </label>
            <input
              type="number"
              id={key}
              name={key}
              value={features[key as keyof Features]}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
              required
            />
          </div>
        ))}
        <button
          type="submit"
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "5px",
            border: "none",
            background: "#0070f3",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Predict
        </button>
      </form>
      {prediction !== null && (
        <div style={{ marginTop: "2rem", fontSize: "1.25rem", color: "green" }}>
          <strong>Predicted Price:</strong> ${prediction.toFixed(2)} (in 100k USD)
        </div>
      )}
      {error && (
        <div style={{ marginTop: "2rem", fontSize: "1.25rem", color: "red" }}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default Home;


