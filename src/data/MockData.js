// data/MockData.js (or wherever you keep your mock data)

export const mockVaccines = [
  {
    id: "v1",
    name: "COVID-19 mRNA Vaccine",
    manufacturer: "Moderna",
    description: "Advanced mRNA technology vaccine providing robust protection against COVID-19 variants",
    dosesRequired: 2,
    ageEligibility: "12+ years",
    availabilityCount: 2500,
    efficacy: "94.1%",
    sideEffects: ["Mild fever", "Fatigue", "Injection site pain"],
    imageUrl: "/placeholder.svg"
  },
  {
    id: "v2",
    name: "Influenza Vaccine",
    manufacturer: "GSK",
    description: "Seasonal flu vaccine protecting against common influenza strains",
    dosesRequired: 1,
    ageEligibility: "6 months+",
    availabilityCount: 5000,
    efficacy: "60-70%",
    sideEffects: ["Soreness", "Low-grade fever"],
    imageUrl: "/placeholder.svg"
  },
  {
    id: "v3",
    name: "Hepatitis B Vaccine",
    manufacturer: "Merck",
    description: "Protects against Hepatitis B virus infection",
    dosesRequired: 3,
    ageEligibility: "All ages",
    availabilityCount: 1800,
    efficacy: "95%",
    sideEffects: ["Mild fever", "Headache"],
    imageUrl: "/placeholder.svg"
  },
  {
    id: "v4",
    name: "MMR Vaccine",
    manufacturer: "Sanofi",
    description: "Combined vaccine for Measles, Mumps, and Rubella",
    dosesRequired: 2,
    ageEligibility: "12 months+",
    availabilityCount: 3200,
    efficacy: "97%",
    sideEffects: ["Rash", "Fever", "Swollen glands"],
    imageUrl: "/placeholder.svg"
  },
  {
    id: "v5",
    name: "Tetanus Vaccine",
    manufacturer: "Pfizer",
    description: "Essential protection against tetanus (lockjaw)",
    dosesRequired: 1,
    ageEligibility: "7+ years",
    availabilityCount: 4100,
    efficacy: "100%",
    sideEffects: ["Redness at site", "Body aches"],
    imageUrl: "/placeholder.svg"
  },
  {
    id: "v6",
    name: "HPV Vaccine",
    manufacturer: "GSK",
    description: "Prevents human papillomavirus infections",
    dosesRequired: 2,
    ageEligibility: "9-45 years",
    availabilityCount: 2700,
    efficacy: "90%",
    sideEffects: ["Pain at site", "Dizziness"],
    imageUrl: "/placeholder.svg"
  }
];

// Set a default currentUser with at least one vaccination for demo/testing purposes
export let currentUser = {
  id: "u1",
  name: "Akul Biswas",
  email: "akul@example.com",
  age: 25,
  phone: "+8801700000000",
  vaccinations: [
    {
      vaccineId: "v1",
      vaccineName: "COVID-19 mRNA Vaccine",
      doseTaken: 1,
      dateAdministered: "2025-10-28T00:00:00.000Z",
      centre: "Sylhet Medical Center",
      batchNumber: "BATCH-ABC123",
      status: "completed"
    }
  ]
};

// Mock login function
export const mockLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (password.length >= 6) {
        const user = {
          id: "u1",
          name: email.split("@")[0],
          email,
          age: 28,
          phone: "+1234567890",
          vaccinations: currentUser.vaccinations  // keep demo vaccination data here
        };
        currentUser = user;
        resolve(user);
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 1000);
  });
};

// Mock signup function
export const mockSignup = (name, email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = {
        id: `u${Date.now()}`,
        name,
        email,
        age: 25,
        phone: "+1234567890",
        vaccinations: []  // new user has empty vaccinations
      };
      currentUser = user;
      resolve(user);
    }, 1000);
  });
};

// Function to apply for a vaccine (adds vaccination record to currentUser)
export const applyForVaccine = (vaccine) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const vaccination = {
        vaccineId: vaccine.id,
        vaccineName: vaccine.name,
        doseTaken: 1,
        dateAdministered: new Date().toISOString(),
        centre: "City Medical Center",
        batchNumber: `BATCH-${Math.random().toString(36).substring(7).toUpperCase()}`,
        status: "completed"
      };

      if (currentUser) {
        currentUser.vaccinations.push(vaccination);
      }

      resolve(vaccination);
    }, 1500);
  });
};
