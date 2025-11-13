import { NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import Service from "@/lib/models/Service";

export async function GET() {
  await connectDB();
  const count = await Service.countDocuments();
  if (count === 0) {
    const seed = [
      {
        title: "Sunday Worship Service",
        day: "Every Sunday",
        time: "10:30 AM - 12:30 PM",
        location: "Main Sanctuary",
        description:
          "Join us for powerful worship, inspiring messages, and fellowship.",
        live: true,
        featured: true,
      },
      {
        title: "Sunday School",
        day: "Every Sunday",
        time: "9:50 AM",
        location: "Main Sanctuary",
        description:
          "Deep dive into God's Word with practical application for daily living.",
        live: false,
      },
      {
        title: "Youth Three Sixteen Sunday School",
        day: "Every Sunday",
        time: "9:30 AM",
        location: "Fellowship Hall",
        description:
          "Engaging lessons and activities tailored for our youth to grow in faith.",
        live: false,
      },
      {
        title: "Tuesday Bible Study",
        day: "Every Tuesday",
        time: "8:30 PM - 9:30 PM",
        location: "Mobile (717-251-1272)",
        description:
          "Deep dive into God's Word with practical application for daily living.",
        live: true,
      },
      {
        title: "Thursday Women Bible Study",
        day: "Every Second Thursday of the Month",
        time: "9:00 PM - 10:00 PM",
        location: "On Phone (Dial 717-251-1272)",
        description:
          "Deep dive into God's Word with practical application for daily living.",
        live: true,
      },
      {
        title: "Morning Cry",
        day: "Every Monday - Saturday",
        time: "6:00 AM - 6:15 AM",
        location: "Phone - (717-251-1272)",
        description:
          "Deep dive into God's Word with practical application for daily living.",
        live: false,
      },
      {
        title: "Solution Hour Prayers",
        day: "Every Saturday",
        time: "12:30 PM - 2:00 PM",
        location: "Main Sanctuary (Dial 717-251-1272)",
        description:
          "An evening of fervent prayer, praise, and prophetic ministry.",
        live: true,
      },
      {
        title: "Command The Month",
        day: "Every Last Day Of The Month",
        time: "11:30 PM - 12:30 AM",
        location: "Dial 717-251-1272",
        description:
          "Ushering in the new month with communion with God and speaking positivity into our expectations.",
        live: false,
      },
      {
        title: "Counseling",
        day: "Every Friday",
        time: "3:00 PM - 7:00 PM",
        location: "Main Sanctuary",
        description:
          "Providing spiritual counseling and advice to every soul that needs it.",
        live: false,
      },
    ];
    await Service.insertMany(seed);
  }
  const services = await Service.find({});
  return NextResponse.json(services);
}
