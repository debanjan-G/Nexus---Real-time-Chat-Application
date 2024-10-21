import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Login from "./AuthForms/Login";
import Signup from "./AuthForms/Signup";

const AuthPage = () => {
  return (
    <div className="bg-[url(chat-app-bg.jpg)] bg-cover bg-center h-screen w-full p-8">
      <div className=" p-4 rounded-md flex items-center justify-center bg-white w-1/3 mx-auto">
        <p className=" text-4xl font-light">Nexus</p>
      </div>
      <div className="mt-4 p-4 rounded-md flex flex-col items-center justify-center bg-white w-1/3 mx-auto">
        <TabGroup className="w-full my-4">
          <TabList className="flex">
            <Tab
              className={({ selected }) =>
                `w-full py-2.5 text-sm leading-5 font-medium  rounded-full outline-none
                 ${
                   selected
                     ? "bg-sky-200 text-blue-600 "
                     : "bg-white text-slate-800 "
                 }`
              }
            >
              Login
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full py-2.5 text-sm leading-5 font-medium rounded-full outline-none
                 ${
                   selected
                     ? "bg-sky-200 text-blue-600"
                     : "bg-white text-slate-800"
                 }`
              }
            >
              Signup
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};

export default AuthPage;
