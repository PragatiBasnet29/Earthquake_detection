import React from 'react';
import arduinoImage from "../assets/images/arduino.png"
import gsmImage from "../assets/images/gsm.png"
import adxl from "../assets/images/adxl.jpg"
import esp from "../assets/images/ESP.jpg"
import lcd from "../assets/images/lcd.jpg"

const About = () => {
  const components = [
    {
      num: 1, title: "Arduino Nano", img: arduinoImage, figureLabel: "Figure 1: Arduino Nano",
      description: "The Arduino Nano is a small, complete, and breadboard-friendly board based on the ATmega328 (Arduino Nano 3.x). It has more or less the same functionality of the Arduino Duemilanove, but in a different package. It lacks only a DC power jack, and works with a Mini-B USB cable instead of a standard one."
    },
    {
      num: 2, title: "GSM Module", img: gsmImage, figureLabel: "Figure 2: SIM 800L (GSM Module)",
      description: "The GSM (Global System for Mobile Communications) module facilitates communication via mobile networks, enabling the project to send and receive information remotely. The GSM module allows the project to send SMS messages, make phone calls, or establish a GPRS (General Packet Radio Service) connection for data transfer."
    },
    {
      num: 3, title: "ADXL335 3-AXIS Accelerometer", img: adxl, figureLabel: "Figure 3: ADXL335 3-AXIS Accelerometer",
      description: "The ADXL335 three-axis analog accelerometer IC reads the X, Y, and Z acceleration as analog voltages. The accelerometer determines how quickly and in which direction the system is going by detecting the amount of dynamic acceleration. It connects to an Arduino Microcontroller through three analog input pins."
    },
    {
      num: 4, title: "ESP8266 Wi-Fi Module", img: esp, figureLabel: "Figure 4: ESP8266 Wi-Fi Module",
      description: "The ESP8266 is a low-cost, Wi-Fi-enabled microcontroller module that allows the project to connect to local wireless networks and facilitates communication with the backend. It enables the project to access the internet, communicate with cloud services, and send/receive data to/from the backend server."
    },
    {
      num: 5, title: "LCD Display", img: lcd, figureLabel: "Figure 5: LCD Display",
      description: "The LCD (Liquid Crystal Display) provides a visual interface for the project, allowing users to view real-time data, system status, or any relevant information in a user-friendly format. It can show sensor readings, status messages, or prompts for user interaction."
    },
  ];

  const textComponents = [
    { num: 6, title: "Buzzer", description: "Buzzers provide auditory feedback, alerting users to specific events or conditions within the project. They can be programmed to produce different tones or patterns, serving as alarms, notifications, or indicators, making the project more interactive and accessible." },
    { num: 7, title: "User Interface with React.js", description: "React.js is used to develop the user interface, providing a dynamic and responsive frontend for the project. It allows the creation of interactive and visually appealing user interfaces with real-time data, user controls, and system status." },
    { num: 8, title: "Communication with Backend (Node.js) using ESP8266", description: "The ESP8266 module facilitates communication between the Arduino Nano and the Node.js backend. It acts as a bridge, facilitating data transfer over Wi-Fi, allowing real-time exchange and interaction with external servers and services." },
    { num: 9, title: "Arduino IDE", description: "The Arduino IDE is the software platform used to program and upload code to the Arduino Nano. Developers use it to write, compile, and upload sketches (code), providing a user-friendly environment for programming and debugging." },
    { num: 10, title: "Processing IDE", description: "The Processing IDE is a software environment designed for creative coding and visual arts projects. It includes a built-in editor, a sketchbook for organizing projects, and a simplified set of libraries for graphics, sound, and interactivity." },
  ];

  return (
    <div className="px-6 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0492c2] mb-10">Components Used in Our Project</h2>

        {/* Image Components */}
        {components.map((comp) => (
          <div key={comp.num} className="flex flex-col md:flex-row gap-8 bg-gray-50 rounded-2xl p-6 mb-8 items-start">
            <div className="md:w-1/3 shrink-0">
              <div className="overflow-hidden rounded-xl">
                <img src={comp.img} alt={comp.title} className="w-full h-56 object-contain bg-white" />
              </div>
              <p className="text-center text-sm text-gray-500 mt-2 font-medium">{comp.figureLabel}</p>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-[#0492c2] mb-3">{comp.num}. {comp.title}</h3>
              <p className="text-gray-600 leading-relaxed">{comp.description}</p>
            </div>
          </div>
        ))}

        {/* Text-only Components */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {textComponents.map((comp) => (
            <div key={comp.num} className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-[#0492c2] mb-2">{comp.num}. {comp.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{comp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
