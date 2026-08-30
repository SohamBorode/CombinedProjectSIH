export const farmer = {
  name: "Rahul Patil",
  village: "Darwha",
  district: "Yavatmal",
  crop: "Cotton",
  area: "3.5 Acres",
  cropStage: "Vegetative"
};

export const reports = [

  {
    id: 1,
    farmer: "Rahul Patil",
    crop: "Cotton",
    disease: "Leaf Blight",
    confidence: 92,
    severity: "Moderate",
    status: "Pending",
    date: "28 Aug 2026"
  },

  {
    id: 2,
    farmer: "Amit Sharma",
    crop: "Soybean",
    disease: "Pest Infestation",
    confidence: 88,
    severity: "High",
    status: "Verified",
    date: "25 Aug 2026"
  },

  {
    id: 3,
    farmer: "Suresh Pawar",
    crop: "Cotton",
    disease: "Leaf Spot",
    confidence: 91,
    severity: "Low",
    status: "Verified",
    date: "20 Aug 2026"
  }

];

export const alerts = [

  {
    id: 1,
    title: "Cotton Pest Risk",
    message: "Increased pest activity detected in your area.",
    risk: "Medium",
    time: "2 hours ago",
    icon: "⚠️"
  },

  {
    id: 2,
    title: "Disease Risk",
    message: "Weather conditions may increase fungal disease risk.",
    risk: "High",
    time: "5 hours ago",
    icon: "🔴"
  }

];