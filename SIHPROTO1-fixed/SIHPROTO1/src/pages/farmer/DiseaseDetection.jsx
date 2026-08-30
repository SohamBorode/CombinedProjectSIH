import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUpload } from "../../services/api";
import { getFarmerId, getStoredLocation, requestLocationPermission, shouldAskForLocation } from "../../services/auth";

const fallbackResult = {
  diseaseName: "Leaf Blight",
  confidence: 92,
  severity: "Moderate",
  crop: "Cotton",
  cropStage: "Vegetative",
  warning: "Symptoms may spread if not monitored.",
};

function DiseaseDetection() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [crop, setCrop] = useState("Tomato");
  const [cropStage, setCropStage] = useState("Vegetative");
  const [locationText, setLocationText] = useState("Detecting location...");
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationText("Location access is not supported on this device.");
      return;
    }

    const storedLocation = getStoredLocation();
    if (storedLocation) {
      setCoordinates(storedLocation);
      setLocationText(`${storedLocation.latitude.toFixed(4)}, ${storedLocation.longitude.toFixed(4)}`);
      return;
    }

    if (!shouldAskForLocation()) {
      setLocationText("Location access denied. Please allow GPS access.");
      return;
    }

    requestLocationPermission()
      .then(({ latitude, longitude }) => {
        setCoordinates({ latitude, longitude });
        setLocationText(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
      })
      .catch(() => {
        setLocationText("Location access denied. Please allow GPS access.");
      });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleAnalyze = async () => {
    if (!image) {
      alert("Please upload a crop image.");
      return;
    }

    let finalLatitude = coordinates.latitude;
    let finalLongitude = coordinates.longitude;

    if (
      finalLatitude === null ||
      finalLatitude === undefined ||
      finalLongitude === null ||
      finalLongitude === undefined ||
      !Number.isFinite(finalLatitude) ||
      !Number.isFinite(finalLongitude) ||
      finalLatitude < -90 ||
      finalLatitude > 90 ||
      finalLongitude < -180 ||
      finalLongitude > 180
    ) {
      try {
        const freshLocation = await requestLocationPermission();
        finalLatitude = freshLocation.latitude;
        finalLongitude = freshLocation.longitude;
        setCoordinates({ latitude: finalLatitude, longitude: finalLongitude });
        setLocationText(`${finalLatitude.toFixed(4)}, ${finalLongitude.toFixed(4)}`);
      } catch (error) {
        alert("Please allow valid location access before analyzing the crop.");
        return;
      }
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("crop", crop);
    formData.append("cropStage", cropStage);
    formData.append("latitude", String(finalLatitude));
    formData.append("longitude", String(finalLongitude));
    formData.append("farmerId", String(getFarmerId()));

    try {
      const result = await apiUpload("/detect", formData);
      const normalizedResult = result?.result || result?.data || result || fallbackResult;
      navigate("/farmer/detection/result", {
        state: {
          ...fallbackResult,
          ...normalizedResult,
          crop,
          cropStage,
        },
      });
    } catch (error) {
      navigate("/farmer/detection/result", {
        state: {
          ...fallbackResult,
          crop,
          cropStage,
          warning: error.message || fallbackResult.warning,
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Crop Health Check</h1>
          <p>Upload a clear image of your crop for analysis.</p>
        </div>
      </div>

      <div className="detection-grid">
        <div className="content-card">
          <h2>Upload Crop Image</h2>

          {!preview ? (
            <label className="upload-area">
              <div className="upload-icon">📷</div>
              <h3>Upload a crop image</h3>
              <p>Click here or drag and drop</p>
              <small>JPG, PNG • Maximum 10MB</small>
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </label>
          ) : (
            <div className="image-preview">
              <img src={preview} alt="Crop preview" />
              <button
                type="button"
                onClick={() => {
                  setImage(null);
                  setPreview(null);
                }}
              >
                Remove Image
              </button>
            </div>
          )}
        </div>

        <div className="content-card">
          <h2>Crop Information</h2>

          <div className="form-group">
            <label>Crop</label>
            <select value={crop} onChange={(e) => setCrop(e.target.value)}>
              <option>Tomato</option>
              <option>Potato</option>
            </select>
          </div>

          <div className="form-group">
            <label>Crop Stage</label>
            <select
              value={cropStage}
              onChange={(e) => setCropStage(e.target.value)}
            >
              <option>Seedling</option>
              <option>Vegetative</option>
              <option>Flowering</option>
              <option>Fruiting</option>
              <option>Maturity</option>
            </select>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input type="text" value={locationText} readOnly />
          </div>

          <button
            className="primary-btn full"
            onClick={handleAnalyze}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Analyzing..." : "🔍 Analyze Crop"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DiseaseDetection;