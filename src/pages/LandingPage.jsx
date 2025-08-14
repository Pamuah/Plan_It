import React from "react";
import CustomButton from "../components/CustomButton";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-screen min-h-screen bg-background">
      <div className="flex flex-row items-center justify-between w-full h-16 px-6 py-2 bg-blue-500 shadow-lg">
        {/* Logo */}
        <div>
          <h6>*Logo*</h6>
        </div>
        {/* Routes */}
        <div className="flex flex-row items-center gap-8">
          <CustomButton
            title="Login"
            onPress={() => {
              navigate("/signIn");
            }}
          />
          <CustomButton
            title="Register"
            onPress={() => {
              navigate("/signUp");
            }}
            className="w-auto h-8 text-sm "
          />
        </div>
      </div>
      <div className="flex flex-col items-start justify-start px-6 py-8 text-start">
        <h1 className="mb-2 text-4xl font-bold text-black">
          Landing Page Title
        </h1>
        <p className="max-w-xl text-lg text-gray-600">
          Your vision, brought to life. <br />
          Seamless planning, exceptional experiences. <br />
          Let us create your unforgettable event.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-start justify-start w-full px-2 pt-1">
        {/* Image with dark overlay */}
        <div className="relative flex flex-col items-center justify-center w-full h-[32rem]">
          <img
            src="../assets/concertphoto.jpg"
            className="object-cover w-full h-full rounded-md"
          />
        </div>
      </div>

      <div className="flex flex-col items-start justify-start px-6 py-8 text-start">
        <h1 className="mb-2 text-4xl font-bold text-black">Parties</h1>
      </div>

      <div className="flex flex-row w-full h-auto gap-4 px-2 pt-1">
        {/* Birthdays */}
        <div className="flex-1 h-full">
          <img
            src="../assets/birthday photo.jpg"
            className="object-cover w-full h-64 rounded-md md:64 lg:80"
          />
          <p className="text-xl text-start text-black-700">Birthdays</p>
          <p className="max-w-xl text-lg text-gray-600">
            Make your birthdays fun with personalised themes, <br />
            fun activities, and flawless execution. <br />
            Let us handle the details while you enjoy the celebration!
          </p>
        </div>

        {/* Weddings */}
        <div className="flex-1 h-full">
          <img
            src="../assets/wedding photo.jpg"
            className="object-cover w-full h-64 rounded-md md:64 lg:80"
          />
          <p className="text-xl text-start text-black-700">Weddings</p>
          <p className="max-w-xl text-lg text-gray-600">
            Celebrate your love story with a wedding that’s as unique as you
            are. <br />
            From intimate ceremonies to grand receptions. <br />
            we craft every detail to make your special day unforgettable..
          </p>
        </div>

        {/* other events */}
        <div className="flex-1 h-full">
          <img
            src="../assets/funeral photo.jpg"
            className="object-cover w-full h-64 rounded-md md:64 lg:80"
          />
          <p className="text-xl text-start text-black-700">Other Events</p>
          <p className="max-w-xl text-lg text-gray-600">
            No matter the occasion, we bring your vision to life. <br />
            Whether it’s a corporate event, anniversary, <br />
            or any special gathering, we ensure every moment is memorable and
            seamlessly executed.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start px-6 py-8 text-start">
        <h1 className="mb-2 text-4xl font-bold text-black">Concerts</h1>
      </div>

      <div className="flex w-full h-auto px-6 py-8">
        {/* Left Side (Text) */}
        <div className="flex flex-col justify-start w-1/2 px-4">
          <div className="mb-6">
            <p className="text-xl text-start text-black-700">
              Musical Concerts
            </p>
            <p className="text-lg text-gray-600">
              Experience the thrill of live music! Our concerts bring you closer
              to your favorite artists with unforgettable performances and an
              electric atmosphere.
            </p>
          </div>

          <div className="mb-6">
            <p className="text-xl text-start text-black-700">Comedy Concerts</p>
            <p className="text-lg text-gray-600">
              Experience the thrill of live comedy! Our comedy concerts bring
              laughter, fun, and a memorable experience for everyone.
            </p>
          </div>

          <div>
            <p className="text-xl text-start text-black-700">
              Conventions and Rallies
            </p>
            <p className="text-lg text-gray-600">
              Experience the excitement of conventions and rallies! We bring
              people together to share ideas, passions, and enthusiasm.
            </p>
          </div>
          <div>
            <div className="flex flex-row items-center gap-8">
              <CustomButton
                title="Login"
                onPress={() => {}}
                className="w-auto h-8 text-sm "
              />
              <CustomButton
                title="Register"
                onPress={() => {}}
                className="w-auto h-8 text-sm "
              />
            </div>
          </div>
        </div>

        {/* Right Side (Image) */}
        <div className="flex justify-center w-1/2 px-4">
          <img
            src="../assets/rave2.jpg"
            alt="Concert"
            className="object-cover w-full rounded-md h-83"
          />
        </div>
      </div>
      {/* Traditional Events */}
      <div className="flex flex-col items-start justify-start px-6 py-8 text-start">
        <h1 className="mb-2 text-4xl font-bold text-black">
          Traditional Events
        </h1>
      </div>
      <div className="flex w-full h-auto px-6 py-8">
        {/* Naming Ceremony Image with text */}
        <div className="flex flex-col items-center w-1/2 px-4">
          <img
            src="../assets/namingceremony2.jpg"
            alt="Left Image"
            className="object-cover w-full mb-4 rounded-md h-68"
          />
          <p className="mb-2 text-xl text-black text-start">
            Naming Ceremonies
          </p>
          <p className="text-lg text-gray-600">
            Celebrate the beautiful beginning of a new life with a heartfelt
            naming ceremony. A special gathering of family and friends to bless
            and welcome your little one with love, joy, and cherished
            traditions.
          </p>
        </div>

        {/* Funeral Image with text */}
        <div className="flex flex-col items-center w-1/2 px-4">
          <img
            src="../assets/funeral2.JPG"
            alt="Right Image"
            className="object-cover w-full mb-4 rounded-md h-68"
          />
          <p className="mb-2 text-xl text-black text-start">Funerals</p>
          <p className="text-lg text-gray-600">
            We provide compassionate and respectful funeral services to help you
            honor your loved ones. Our team is here to support you with
            personalized arrangements that reflect the life and memory of those
            you cherish.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
