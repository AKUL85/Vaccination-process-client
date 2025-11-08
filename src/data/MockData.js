export const mockVaccines = [
  {
    id: "v1",
    name: "COVID-19 mRNA Vaccine",
    manufacturer: "Moderna",
    description:
      "Advanced mRNA technology vaccine providing robust protection against COVID-19 variants",
    dosesRequired: 2,
    ageEligibility: "12+ years",
    availabilityCount: 2500,
    efficacy: "94.1%",
    sideEffects: ["Mild fever", "Fatigue", "Injection site pain"],
    imageUrl: "/placeholder.svg",
  },
  {
    id: "v2",
    name: "Influenza Vaccine",
    manufacturer: "GSK",
    description:
      "Seasonal flu vaccine protecting against common influenza strains",
    dosesRequired: 1,
    ageEligibility: "6 months+",
    availabilityCount: 5000,
    efficacy: "60-70%",
    sideEffects: ["Soreness", "Low-grade fever"],
    imageUrl: "/placeholder.svg",
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
    imageUrl: "/placeholder.svg",
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
    imageUrl: "/placeholder.svg",
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
    imageUrl: "/placeholder.svg",
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
    imageUrl: "/placeholder.svg",
  },
];

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
      status: "completed",
    },
  ],
};

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
          vaccinations: [],
        };
        currentUser = user;
        resolve(user);
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 1000);
  });
};

export const mockSignup = (name, email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = {
        id: `u${Date.now()}`,
        name,
        email,
        age: 25,
        phone: "+1234567890",
        vaccinations: [],
      };
      currentUser = user;
      resolve(user);
    }, 1000);
  });
};

// Mock appointment slots data
export const generateAppointmentSlots = (daysAhead = 14) => {
  const slots = [];
  const timeSlots = [
    { time: "09:00 AM", capacity: 20 },
    { time: "10:00 AM", capacity: 20 },
    { time: "11:00 AM", capacity: 20 },
    { time: "12:00 PM", capacity: 15 },
    { time: "02:00 PM", capacity: 20 },
    { time: "03:00 PM", capacity: 20 },
    { time: "04:00 PM", capacity: 15 },
    { time: "05:00 PM", capacity: 10 },
  ];

  for (let i = 1; i <= daysAhead; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    slots.push({
      date: date.toISOString(),
      slots: timeSlots.map((slot, idx) => ({
        id: `${date.toDateString()}-${idx}`,
        time: slot.time,
        available: Math.floor(Math.random() * slot.capacity),
        capacity: slot.capacity,
      })),
    });
  }

  return slots;
};

export const bookAppointment = (vaccine, date, timeSlot) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const vaccination = {
        vaccineId: vaccine.id,
        vaccineName: vaccine.name,
        doseTaken: 1,
        dateAdministered: date,
        centre: "City Medical Center",
        batchNumber: `BATCH-${Math.random()
          .toString(36)
          .substring(7)
          .toUpperCase()}`,
        status: "scheduled",
      };

      if (currentUser) {
        currentUser.vaccinations.push(vaccination);
      }

      resolve(vaccination);
    }, 1500);
  });
};

export const applyForVaccine = (vaccine) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const vaccination = {
        vaccineId: vaccine.id,
        vaccineName: vaccine.name,
        doseTaken: 1,
        dateAdministered: new Date().toISOString(),
        centre: "City Medical Center",
        batchNumber: `BATCH-${Math.random()
          .toString(36)
          .substring(7)
          .toUpperCase()}`,
        status: "completed",
      };

      if (currentUser) {
        currentUser.vaccinations.push(vaccination);
      }

      resolve(vaccination);
    }, 1500);
  });
};


export const mockRegionsData = [
    {
      _id: "hub_dhaka",
      region: "Dhaka Division",
      total_centers: 12,
      population: 44000000,
      vaccine_stock: [
        {
          vaccine_id: "COVID-19-Moderna-SPIKEVAX",
          vaccine_name: "COVID-19 Moderna",
          stock: 5000,
          used: 4200,
          wasted: 100,
          remaining: 700
        },
        {
          vaccine_id: "COVID-19-Pfizer-BioNTech",
          vaccine_name: "COVID-19 Pfizer",
          stock: 4500,
          used: 3800,
          wasted: 80,
          remaining: 620
        },
        {
          vaccine_id: "BCG-Vaccine",
          vaccine_name: "BCG Vaccine",
          stock: 6000,
          used: 5600,
          wasted: 90,
          remaining: 310
        },
        {
          vaccine_id: "Measles-Rubella-Vaccine",
          vaccine_name: "MR Vaccine",
          stock: 5500,
          used: 5000,
          wasted: 70,
          remaining: 430
        }
      ],
      vaccine_centers: [
        { center_id: "center_dhaka_city", name: "Dhaka Medical College" },
        { center_id: "center_gazipur", name: "Gazipur General Hospital" },
        { center_id: "center_narayanganj", name: "Narayanganj Health Complex" }
      ]
    },
    {
      _id: "hub_chattogram",
      region: "Chattogram Division",
      total_centers: 8,
      population: 33000000,
      vaccine_stock: [
        {
          vaccine_id: "COVID-19-Moderna-SPIKEVAX",
          vaccine_name: "COVID-19 Moderna",
          stock: 3500,
          used: 2800,
          wasted: 60,
          remaining: 640
        },
        {
          vaccine_id: "COVID-19-Pfizer-BioNTech",
          vaccine_name: "COVID-19 Pfizer",
          stock: 3200,
          used: 2500,
          wasted: 45,
          remaining: 655
        },
        {
          vaccine_id: "BCG-Vaccine",
          vaccine_name: "BCG Vaccine",
          stock: 4500,
          used: 3800,
          wasted: 70,
          remaining: 630
        }
      ],
      vaccine_centers: []
    },
    {
      _id: "hub_rajshahi",
      region: "Rajshahi Division",
      total_centers: 6,
      population: 24000000,
      vaccine_stock: [
        {
          vaccine_id: "COVID-19-Moderna-SPIKEVAX",
          vaccine_name: "COVID-19 Moderna",
          stock: 2800,
          used: 2200,
          wasted: 40,
          remaining: 560
        },
        {
          vaccine_id: "BCG-Vaccine",
          vaccine_name: "BCG Vaccine",
          stock: 3800,
          used: 3200,
          wasted: 55,
          remaining: 545
        }
      ],
      vaccine_centers: []
    },
    {
      _id: "hub_khulna",
      region: "Khulna Division",
      total_centers: 5,
      population: 21000000,
      vaccine_stock: [
        {
          vaccine_id: "COVID-19-Pfizer-BioNTech",
          vaccine_name: "COVID-19 Pfizer",
          stock: 2500,
          used: 1900,
          wasted: 35,
          remaining: 565
        },
        {
          vaccine_id: "Measles-Rubella-Vaccine",
          vaccine_name: "MR Vaccine",
          stock: 3200,
          used: 2700,
          wasted: 45,
          remaining: 455
        }
      ],
      vaccine_centers: []
    },
    {
      _id: "hub_barishal",
      region: "Barishal Division",
      total_centers: 4,
      population: 12000000,
      vaccine_stock: [
        {
          vaccine_id: "COVID-19-Moderna-SPIKEVAX",
          vaccine_name: "COVID-19 Moderna",
          stock: 1800,
          used: 1400,
          wasted: 25,
          remaining: 375
        },
        {
          vaccine_id: "BCG-Vaccine",
          vaccine_name: "BCG Vaccine",
          stock: 2200,
          used: 1800,
          wasted: 30,
          remaining: 370
        }
      ],
      vaccine_centers: []
    },
    {
      _id: "hub_sylhet",
      region: "Sylhet Division",
      total_centers: 4,
      population: 15000000,
      vaccine_stock: [
        {
          vaccine_id: "COVID-19-Pfizer-BioNTech",
          vaccine_name: "COVID-19 Pfizer",
          stock: 2000,
          used: 1600,
          wasted: 30,
          remaining: 370
        },
        {
          vaccine_id: "Measles-Rubella-Vaccine",
          vaccine_name: "MR Vaccine",
          stock: 2500,
          used: 2100,
          wasted: 40,
          remaining: 360
        }
      ],
      vaccine_centers: []
    },
    {
      _id: "hub_rangpur",
      region: "Rangpur Division",
      total_centers: 5,
      population: 18000000,
      vaccine_stock: [
        {
          vaccine_id: "COVID-19-Moderna-SPIKEVAX",
          vaccine_name: "COVID-19 Moderna",
          stock: 2200,
          used: 1800,
          wasted: 35,
          remaining: 365
        },
        {
          vaccine_id: "BCG-Vaccine",
          vaccine_name: "BCG Vaccine",
          stock: 2800,
          used: 2400,
          wasted: 45,
          remaining: 355
        }
      ],
      vaccine_centers: []
    },
    {
      _id: "hub_mymensingh",
      region: "Mymensingh Division",
      total_centers: 4,
      population: 14000000,
      vaccine_stock: [
        {
          vaccine_id: "COVID-19-Pfizer-BioNTech",
          vaccine_name: "COVID-19 Pfizer",
          stock: 1900,
          used: 1500,
          wasted: 28,
          remaining: 372
        },
        {
          vaccine_id: "Measles-Rubella-Vaccine",
          vaccine_name: "MR Vaccine",
          stock: 2300,
          used: 1900,
          wasted: 35,
          remaining: 365
        }
      ],
      vaccine_centers: []
    }
  ];

  // Mock yearly supply data
 export const yearlySupplyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'COVID-19 Moderna',
        data: [1200, 1500, 1800, 2200, 2500, 2800, 3200, 3500, 3800, 4200, 4500, 5000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'COVID-19 Pfizer',
        data: [1000, 1300, 1600, 1900, 2200, 2500, 2800, 3100, 3400, 3800, 4200, 4500],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'BCG Vaccine',
        data: [2000, 2500, 3000, 3500, 4000, 4500, 5000, 5200, 5500, 5800, 5900, 6000],
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        fill: true,
      }
    ],
  };

  // data/mockData.js
export const mockCenterData = {
  _id: "690d85ce75dc128f275c31e3",
  center_name: "Dhaka Medical College Hospital",
  location: {
    division: "Dhaka",
    district: "Dhaka",
    upazila: "Ramna",
    address: "Secretariat Road, Dhaka-1000"
  },
  contact_info: {
    phone: "+8801712345678",
    email: "dmch@health.gov.bd"
  },
  vaccines: [
    {
      vaccine_id: "COVID-19-Pfizer-Comirnaty",
      vaccine_name: "Comirnaty (Pfizer)",
      dose_volume_ml: "0.3 mL",
      total_stock: 500,
      used: 125,
      wasted: 5,
      remaining: 370,
      last_updated: "2025-11-07T09:00:00.000Z"
    },
    // ... other vaccines
  ]
};

export const mockAppointments = [
  {
    id: "app1",
    patientName: "John Doe",
    patientId: "P001",
    vaccineName: "Comirnaty (Pfizer)",
    appointmentDate: "2025-01-10T09:00:00.000Z",
    status: "scheduled",
    doseNumber: 1,
    totalDoses: 2,
    contact: "+8801712345678"
  },
  // ... other appointments
];

export const vaccinationStats = {
  weekly: [45, 52, 38, 61, 55, 48, 67],
  monthly: [1200, 1350, 1100, 1250, 1400, 1300, 1450, 1500, 1350, 1400, 1550, 1600],
  byType: {
    'COVID-19': 1250,
    'BCG': 890,
    'MMR': 760,
    'HPV': 450,
    'Influenza': 680,
    'Hepatitis B': 520
  },
  monthlyCosts: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    data: [12500, 13800, 14200, 15600, 14800, 16200, 17500, 16800, 15800, 17200, 18500, 19200]
  }
};