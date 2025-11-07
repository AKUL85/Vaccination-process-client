import React from "react";
import { format } from "date-fns";
import { CheckCircle, Download, ShieldCheck } from "lucide-react";

const InfoField = ({ label, value }) => (
  <div className="bg-gray-50 p-2 rounded-md border border-gray-200">
    <span className="text-xs text-gray-500 block">{label}</span>
    <p className="font-semibold text-gray-900 break-words">{value || "N/A"}</p>
  </div>
);

const TikaCard = ({ userData }) => {
  if (!userData) {
    return <div>Loading Tika Card...</div>;
  }

  const verificationUrl = `https://surokkha.gov.bd/verify?reg_no=${userData.regNo}`;

  const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=${encodeURIComponent(
    verificationUrl
  )}`;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden border-4 border-green-800 my-10 font-sans">
      <header className="p-4 relative">
        <div className="flex justify-between items-center">
          <div className="w-16 h-16 flex items-center justify-center">
            {/* Red Lotus for Mujib 100 */}
            <svg
              className="w-14 h-14"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 30C40 35 30 50 30 60C30 70 40 80 50 80C60 80 70 70 70 60C70 50 60 35 50 30Z"
                fill="#DC2626"
              />
              <path
                d="M50 30C50 20 45 10 40 5C35 10 30 20 30 30C30 40 40 45 50 45C60 45 70 40 70 30C70 20 65 10 60 5C55 10 50 20 50 30Z"
                fill="#DC2626"
              />
              <path
                d="M30 30C20 30 10 35 5 40C10 45 20 50 30 50C40 50 45 40 45 30C45 20 40 10 30 10C20 10 10 20 10 30C10 40 20 45 30 45C40 45 40 40 30 30Z"
                fill="#DC2626"
                transform="rotate(-30 30 30)"
              />
              <path
                d="M70 30C80 30 90 35 95 40C90 45 80 50 70 50C60 50 55 40 55 30C55 20 60 10 70 10C80 10 90 20 90 30C90 40 80 45 70 45C60 45 60 40 70 30Z"
                fill="#DC2626"
                transform="rotate(30 70 30)"
              />
              <path
                d="M35 65C30 70 25 80 25 85C25 90 30 95 35 95C40 95 45 90 45 85C45 80 40 70 35 65Z"
                fill="#166534"
              />
              <path
                d="M65 65C70 70 75 80 75 85C75 90 70 95 65 95C60 95 55 90 55 85C55 80 60 70 65 65Z"
                fill="#166534"
              />
            </svg>
          </div>

          <div className="text-center">
            <p className="font-bold text-gray-900 text-sm">
              Government of the People's Republic of Bangladesh
            </p>
            <p className="text-xs text-gray-600">
              Ministry of Health and Family Welfare
            </p>
            <p className="font-bold text-gray-600 text-lg mt-2">
              গণপ্রজাতন্ত্রী বাংলাদেশ সরকার
            </p>
            <p className="text-sm text-gray-600">
              স্বাস্থ্য ও পরিবার কল্যাণ মন্ত্রণালয়
            </p>
          </div>

          <div className="w-20 h-20 bg-gray-100 flex items-center justify-center rounded-full border-2 border-green-700">
            <span className="text-green-700 font-bold text-sm">সুরক্ষা</span>
          </div>
        </div>

        <div className="bg-green-700 text-white text-center p-2 mt-4 rounded">
          <h1 className="text-xl font-bold">
            COVID-19 Vaccination Card / কোভিড-১৯ ভ্যাকসিনেশন কার্ড
          </h1>
        </div>
      </header>

      <main className="p-6">
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-green-800 border-b-2 border-green-800 pb-1 mb-4">
            Personal Information / ব্যক্তিগত তথ্য
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
            <InfoField
              label="Name (English) / নাম (ইংরেজি)"
              value={userData.name}
            />
            <InfoField
              label="Name (Bangla) / নাম (বাংলা)"
              value={userData.nameBangla}
            />
            <InfoField
              label="Date of Birth / জন্ম তারিখ"
              value={format(new Date(userData.dob), "dd MMMM yyyy")}
            />
            <InfoField
              label="NID No. / জাতীয় পরিচয়পত্র নম্বর"
              value={userData.nid}
            />
            <InfoField
              label="Registration No. / রেজিষ্ট্রেশন নম্বর"
              value={userData.regNo}
            />
            <InfoField
              label="Vaccination Center / টিকার কেন্দ্র"
              value={userData.centerName}
            />
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold text-green-800 border-b-2 border-green-800 pb-1 mb-4">
            Vaccination Details / টিকার বিবরণ
          </h2>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-gray-700  text-left font-semibold">
                    Dose / ডোজ
                  </th>
                  <th className="p-3 text-gray-700 text-left font-semibold">
                    Date / তারিখ
                  </th>
                  <th className="p-3 text-gray-700 text-left font-semibold">
                    Name of Vaccine / টিকার নাম
                  </th>
                  <th className="p-3 text-gray-700 text-left font-semibold">
                    Center / কেন্দ্র
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {userData.doses.map((dose, index) => (
                  <tr key={index}>
                    <td className=" text-gray-600 p-3 font-medium">
                      {dose.doseName}
                    </td>
                    <td className=" text-gray-600 p-3">{dose.date}</td>
                    <td className=" text-gray-600 p-3">{dose.vaccineName}</td>
                    <td className=" text-gray-600 p-3">{dose.center}</td>
                  </tr>
                ))}

                {[...Array(Math.max(0, 4 - userData.doses.length))].map(
                  (_, i) => (
                    <tr key={`empty-${i}`} className="h-12">
                      <td className="p-3 text-gray-600">
                        {i === 0 ? "Booster" : `Dose ${i + 3}`}
                      </td>
                      <td className="p-3"></td>
                      <td className="p-3"></td>
                      <td className="p-3"></td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold text-green-800 border-b-2 border-green-800 pb-1 mb-4">
            Instructions / নির্দেশাবলী
          </h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span>
                টিকাগ্রহণের জন্য নির্দিষ্ট তারিখে এই কার্ডটি সাথে নিয়ে আসুন। /
                Bring this card on the specified date of vaccination.
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span>
                টিকা দেওয়ার পর ৩০ মিনিট টিকা কেন্দ্রে অবস্থান করুন। / Wait at
                the vaccination center for 30 minutes after vaccination.
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span>
                নির্ধারিত তারিখ অনুযায়ী ২য় ও বুস্টার ডোজ গ্রহণ করুন। / Receive
                the 2nd and Booster dose on the scheduled date.
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span>
                কার্ডটি যত্ন সহকারে সংরক্ষণ করুন। / Keep the vaccination card
                safe.
              </span>
            </li>
          </ul>
        </section>

        <section className="pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* QR Code Image */}
            <div className="flex-shrink-0">
              <img
                src={qrCodeApiUrl}
                alt="Vaccination Verification QR Code"
                className="w-32 h-32 border-4 border-gray-200 rounded-lg shadow-md"
                onError={(e) => {
                  e.target.onerror = null;

                  e.target.style.display = "none";
                }}
              />
            </div>

            <div className="text-sm text-gray-700 space-y-2 text-center md:text-left">
              <h2 className="text-lg font-semibold text-green-800 pb-1 mb-2 flex items-center gap-2 justify-center md:justify-start">
                <ShieldCheck className="w-5 h-5" />
                Verification / যাচাইকরণ
              </h2>
              <p>
                স্ক্যান করুন এবং আপনার টিকার তথ্য যাচাই করুন। / Scan the QR code
                to verify your vaccination status.
              </p>
              <p className="mt-2 font-semibold text-gray-800">
                Directorate General of Health Services (DGHS)
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="p-4 bg-gray-50 text-center text-xs text-gray-500 border-t">
        This card is proof of vaccination. | এই কার্ডটি টিকাগ্রহণের
        প্রমাণস্বরুপ।
      </footer>
    </div>
  );
};

export default function App() {
  const mockUserData = {
    name: "Ismail Hossain",
    nameBangla: "ইসমাইল হোসেন",
    dob: "1990-01-15",
    nid: "1234567890",
    regNo: "1029384756102938",
    centerName: "Dhaka Medical College Hospital, Dhaka",
    doses: [
      {
        doseName: "Dose 1 / ডোজ ১",
        date: "10 Aug 2021",
        vaccineName: "AstraZeneca (Covishield)",
        center: "DMCH, Dhaka",
      },
      {
        doseName: "Dose 2 / ডোজ ২",
        date: "10 Oct 2021",
        vaccineName: "AstraZeneca (Covishield)",
        center: "DMCH, Dhaka",
      },
      {
        doseName: "Booster / বুস্টার",
        date: "15 Apr 2022",
        vaccineName: "Pfizer",
        center: "DMCH, Dhaka",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10">
      {/* Download Button */}
      <div className="max-w-3xl mx-auto text-right mb-4">
        <button
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded-lg shadow-md hover:bg-green-800 transition-colors"
          onClick={() => window.print()}
        >
          <Download className="w-5 h-5" />
          Download Card
        </button>
      </div>

      <TikaCard userData={mockUserData} />
    </div>
  );
}
