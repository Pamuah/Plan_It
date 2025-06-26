import React from "react";
import CustomButton from "../components/CustomButton";
import Footer from "../components/footer";


const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen w-screen bg-background">
      <div className="h-16 w-full items-center justify-between bg-blue-500 shadow-lg px-6 py-2 flex flex-row">
        {/* Logo */}
        <div>
          <h6>*Logo*</h6>
        </div>
        {/* Routes */}
        <div className="gap-8 flex flex-row items-center">
          <CustomButton
            title="Login"
            onPress={() => {}}

          />
          <CustomButton
            title="Register"
            onPress={() => {}}
            className="h-8 w-auto text-sm "
          />
        </div>
      </div>
      <div className="flex flex-col items-start justify-start px-6 py-8 text-start">

        <h1 className="text-4xl font-bold text-black mb-2">
          Landing Page Title
        </h1>
        <p className="text-lg text-gray-600 max-w-xl">
          Your vision, brought to life. <br />
          Seamless planning, exceptional experiences. <br />
          Let us create your unforgettable event.
        </p>
      </div>

      {/* Main Content */}
      <div className="w-full flex flex-col justify-start items-start px-2 pt-1">
        {/* Image with dark overlay */}
        <div className="relative flex flex-col items-center justify-center w-full h-[32rem]">
          <img
            src="../assets/concertphoto.jpg"
            className="h-full w-full object-cover rounded-md"
          />
        </div>
      </div>

      <div className="flex flex-col items-start justify-start px-6 py-8 text-start">
        <h1 className="text-4xl font-bold text-black mb-2">Parties</h1>
      </div>

      <div className="flex flex-row w-full h-auto px-2 pt-1 gap-4">
        {/* Birthdays */}
        <div className="flex-1 h-full">
          <img
            src="../assets/birthday photo.jpg"
            className="h-64 w-full md:64 lg:80 object-cover rounded-md"
          />
          <p className="text-start text-xl text-black-700">Birthdays</p>
          <p className="text-lg text-gray-600 max-w-xl">
            Make your birthdays fun with personalised themes, <br />
            fun activities, and flawless execution. <br />
            Let us handle the details while you enjoy the celebration!
          </p>
        </div>

        {/* Weddings */}
        <div className="flex-1 h-full">
          <img
            src="../assets/wedding photo.jpg"
            className="h-64 w-full md:64 lg:80 object-cover rounded-md"
          />
          <p className="text-start text-xl text-black-700">Weddings</p>
          <p className="text-lg text-gray-600 max-w-xl">
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
            className="h-64 w-full md:64 lg:80 object-cover rounded-md"
          />
          <p className="text-start text-xl text-black-700">Other Events</p>
          <p className="text-lg text-gray-600 max-w-xl">
            No matter the occasion, we bring your vision to life. <br />
            Whether it’s a corporate event, anniversary, <br />
            or any special gathering, we ensure every moment is memorable and
            seamlessly executed.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start px-6 py-8 text-start">
        <h1 className="text-4xl font-bold text-black mb-2">Concerts</h1>
      </div>

      <div className="flex w-full h-auto px-6 py-8">
        {/* Left Side (Text) */}
        <div className="w-1/2 flex flex-col justify-start px-4">
          <div className="mb-6">
            <p className="text-start text-xl text-black-700">
              Musical Concerts
            </p>
            <p className="text-lg text-gray-600">
              Experience the thrill of live music! Our concerts bring you closer
              to your favorite artists with unforgettable performances and an
              electric atmosphere.
            </p>
          </div>

          <div className="mb-6">
            <p className="text-start text-xl text-black-700">Comedy Concerts</p>
            <p className="text-lg text-gray-600">
              Experience the thrill of live comedy! Our comedy concerts bring
              laughter, fun, and a memorable experience for everyone.
            </p>
          </div>

          <div>
            <p className="text-start text-xl text-black-700">
              Conventions and Rallies
            </p>
            <p className="text-lg text-gray-600">
              Experience the excitement of conventions and rallies! We bring
              people together to share ideas, passions, and enthusiasm.
            </p>
          </div>
          <div>
            <div className="gap-8 flex flex-row items-center">
              <CustomButton
                title="Login"
                onPress={() => {}}
                className="h-8 w-auto text-sm "
              />
              <CustomButton
                title="Register"
                onPress={() => {}}
                className="h-8 w-auto text-sm "
              />
            </div>
          </div>
        </div>

        {/* Right Side (Image) */}
        <div className="w-1/2 flex justify-center px-4">
          <img
            src="../assets/rave2.jpg"
            alt="Concert"
            className="w-full h-83 object-cover rounded-md"
          />
        </div>
      </div>
      {/* Traditional Events */}
      <div className="flex flex-col items-start justify-start px-6 py-8 text-start">
        <h1 className="text-4xl font-bold text-black mb-2">
          Traditional Events
        </h1>
      </div>
      <div className="flex w-full h-auto px-6 py-8">
        {/* Naming Ceremony Image with text */}
        <div className="w-1/2 flex flex-col items-center px-4">
          <img
            src="../assets/namingceremony2.jpg"
            alt="Left Image"
            className="w-full h-68 object-cover rounded-md mb-4"
          />
          <p className="text-start text-xl text-black mb-2">
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
        <div className="w-1/2 flex flex-col items-center px-4">
          <img
            src="../assets/funeral2.JPG"
            alt="Right Image"
            className="w-full h-68 object-cover rounded-md mb-4"
          />
          <p className="text-start text-xl text-black mb-2">Funerals</p>
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
