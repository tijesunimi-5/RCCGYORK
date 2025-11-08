"use client"
import { FaArrowRight, FaCalendar, FaClock, FaMapPin, FaVideo } from "react-icons/fa";
import { Button } from "../UI/Button";
import { Card, CardContent, CardHeader } from "../UI/Card";
import { Badge } from "../UI/Badge";
import { useRouter } from "next/navigation";

export function ServiceTimes() {
  const router = useRouter()

  const services = [

    {
      title: 'Sunday Worship Service',
      day: 'Every Sunday',
      time: '10:30 AM - 12:30 PM',
      location: 'Main Sanctuary',
      description: 'Join us for powerful worship, inspiring messages, and fellowship.',
      live: true,
      featured: true,
    },
    {
      title: "Sunday School",
      day: "Every Sunday",
      time: "9:50 AM",
      description: 'Deep dive into God\'s Word with practical application for daily living.',
      location: "Main Sanctuary ",
      live: false,
      // featured: true
    },
    {
      title: "Youth Three Sixteen Sunday School",
      day: "Every Sunday",
      time: "9:30 AM",
      description: "Engaging lessons and activities tailored for our youth to grow in faith.",
      location: "Fellowship Hall",
    },
    {
      title: 'Tuesday Bible Study',
      day: 'Every Tuesday',
      time: '8:30 PM - 9:30 PM',
      location: 'Mobile (717-251-1272)',
      description: 'Deep dive into God\'s Word with practical application for daily living.',
      live: true,
    },
    {
      title: "Thursday Women Bible Study",
      day: "Every Second Thursday of the Month",
      time: "9:00 PM - 10:00 PM",
      description: 'Deep dive into God\'s Word with practical application for daily living.',
      location: "On Phone (Dial 717-251-1272)",
      live: true,
      // featured: true
    },
    {
      title: 'Morning Cry',
      day: 'Every Monday - Saturday',
      time: '6:00 AM - 6:15 AM',
      location: 'Phone - (717-251-1272)',
      description: 'Deep dive into God\'s Word with practical application for daily living.',
      live: false,
    },
    {
      title: 'Solution Hour Prayers',
      day: 'Every Saturday',
      time: '12:30 PM - 2:00 PM',
      location: 'Main Sanctuary',
      description: 'An evening of fervent prayer, praise, and prophetic ministry.',
      live: true,
    },
    {
      title: 'Command The Month',
      day: 'Every Last Day Of The Month',
      time: '11:30 PM - 12:30 AM',
      location: 'Dial 717-251-1272',
      description: 'Ushering in the new month with communion with God and speaking positivity into our expectations.',
      live: false,
    },
    {
      title: 'Counseling',
      day: 'Every Friday',
      time: '3:00 PM - 7:00 PM',
      location: 'Main Sanctuary',
      description: 'Providing spiritual counseling and advice to every soul that needs it.',
      live: false,
    },
  ];

  return (
    <section id="service-times" className="py-24 bg-linear-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-red-100 to-red-50 text-red-700 rounded-full mb-6">
            <FaCalendar className="w-4 h-4" />
            <span>Join Us</span>
          </div>
          <h2 className="text-5xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Service Times
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience God's presence with us. All services are open to everyone!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0 overflow-hidden ${service.featured
                ? 'ring-2 ring-red-700 shadow-xl bg-linear-to-br from-white to-red-50'
                : 'bg-white shadow-lg'
                }`}
            >
              {service.featured && (
                <div className="h-1 w-full bg-linear-to-r from-red-700 via-red-500 to-red-700" />
              )}
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start gap-4 mb-3">
                  <CardHeader className="text-2xl group-hover:text-red-700 transition-colors">
                    {service.title}
                  </CardHeader>
                  {service.live && (
                    <Badge className="bg-red-700 hover:bg-red-800 shadow-lg flex items-center gap-1.5 px-3 py-1">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </span>
                      <FaVideo className="w-3 h-3" />
                      Live
                    </Badge>
                  )}
                </div>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 group-hover:bg-red-50 transition-colors">
                    <div className="p-2 rounded-lg bg-white shadow-sm">
                      <FaCalendar className="h-4 w-4 text-red-700" />
                    </div>
                    <span className="text-gray-700">{service.day}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 group-hover:bg-red-50 transition-colors">
                    <div className="p-2 rounded-lg bg-white shadow-sm">
                      <FaClock className="h-4 w-4 text-red-700" />
                    </div>
                    <span className="text-gray-700">{service.time}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 group-hover:bg-red-50 transition-colors">
                    <div className="p-2 rounded-lg bg-white shadow-sm">
                      <FaMapPin className="h-4 w-4 text-red-700" />
                    </div>
                    <span className="text-gray-700">{service.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="relative bg-linear-to-br from-red-700 via-red-800 to-red-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden shadow-2xl">
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="relative z-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <FaVideo className="w-8 h-8" />
            </div>
            <h3 className="text-3xl md:text-4xl mb-4">Can't Make It In Person?</h3>
            <p className="text-xl mb-8 text-red-100 max-w-2xl mx-auto leading-relaxed">
              Join us online! All our services are streamed live on YouTube and Facebook.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-red-700 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all hover:scale-105 group"
                onClick={() => router.push("https://youtube.com/@rccglivingspringyork9998?si=0Dgjg1NPHD5i49fa")}
              >
                Watch on YouTube
                <FaArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-700 shadow-xl hover:shadow-2xl transition-all hover:scale-105 group"
                onClick={() => router.push('https://facebook.com/share/19MTnpMvoe')}
              >
                Watch on Facebook
                <FaArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}