import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft, Download, Share2, CheckCircle } from "lucide-react";


import { Button } from "../ui/Button";
import { Card, CardContent } from "../ui/Card";

import { Badge } from "../ui/Badge";
import { currentUser } from "../data/MockData";

const VaccineCard= () => {
  const navigate = useNavigate();

  if (!currentUser || currentUser.vaccinations.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">No vaccination records found</p>
          <Button onClick={() => navigate("/")}>Browse Vaccines</Button>
        </Card>
      </div>
    );
  }

  const latestVaccination = currentUser.vaccinations[currentUser.vaccinations.length - 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-background p-4">
      <div className="container mx-auto max-w-2xl py-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        >
          <Card className="overflow-hidden border-2 border-primary/20 shadow-xl">
           
            <div className="bg-gradient-to-r from-primary to-secondary p-6 text-primary-foreground">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-between mb-4"
              >
                <div>
                  <h1 className="text-2xl font-bold">Digital Vaccine Certificate</h1>
                  <p className="text-primary-foreground/80 text-sm">VaxTrack System</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <CheckCircle className="w-8 h-8" />
                </div>
              </motion.div>
              
              <Badge variant="secondary" className="bg-white/90 text-primary hover:bg-white">
                {latestVaccination.status === "completed" ? "Verified" : "Pending"}
              </Badge>
            </div>

            <CardContent className="p-6 space-y-6">
            
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-3"
              >
                <h2 className="text-lg font-semibold border-b pb-2">Citizen Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Full Name</p>
                    <p className="font-semibold">{currentUser.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Citizen ID</p>
                    <p className="font-semibold">{currentUser.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Age</p>
                    <p className="font-semibold">{currentUser.age} years</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Contact</p>
                    <p className="font-semibold">{currentUser.phone}</p>
                  </div>
                </div>
              </motion.div>

            
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-3"
              >
                <h2 className="text-lg font-semibold border-b pb-2">Vaccination Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Vaccine Name</p>
                    <p className="font-semibold">{latestVaccination.vaccineName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Dose</p>
                    <p className="font-semibold">Dose {latestVaccination.doseTaken}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Date</p>
                    <p className="font-semibold">
                      {new Date(latestVaccination.dateAdministered).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Batch Number</p>
                    <p className="font-semibold">{latestVaccination.batchNumber}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-muted-foreground uppercase">Vaccination Centre</p>
                    <p className="font-semibold">{latestVaccination.centre}</p>
                  </div>
                </div>
              </motion.div>

            
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: "spring" }}
                className="flex flex-col items-center pt-4 pb-2"
              >
                <div className="bg-white p-4 rounded-lg shadow-inner">
                  <QRCodeSVG
                    value={JSON.stringify({
                      id: currentUser.id,
                      name: currentUser.name,
                      vaccine: latestVaccination.vaccineName,
                      date: latestVaccination.dateAdministered,
                      batch: latestVaccination.batchNumber
                    })}
                    size={180}
                    level="H"
                    includeMargin
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  Scan QR code to verify certificate authenticity
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex gap-3 pt-4"
              >
                <Button variant="outline" className="flex-1 gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default VaccineCard;