import {useState} from "react";
import ProfileTab from "../components/ProfileTab";
import AppearanceTab from "../components/AppearanceTab";
import SecurityTab from "../components/SecurityTab";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabClass = (tab) =>
    `px-4 py-2 text-sm font-medium rounded-lg transition
     ${
       activeTab === tab
         ? "bg-purple-600/20 text-purple-400"
         : "text-gray-400 hover:text-white hover:bg-purple-600/10"
     }`;

  return (
    <div className="p-6 text-gray-200">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-purple-400">Settings</h1>
        <p className="text-sm text-gray-400 mt-1">
          Manage your account preferences and security.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-purple-900/30 pb-4 mb-6">
        <button
          className={tabClass("profile")}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>

        <button
          className={tabClass("appearance")}
          onClick={() => setActiveTab("appearance")}
        >
          Appearance
        </button>

        <button
          className={tabClass("security")}
          onClick={() => setActiveTab("security")}
        >
          Security
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "profile" && <ProfileTab />}
        {activeTab === "appearance" && <AppearanceTab />}
        {activeTab === "security" && <SecurityTab />}
      </div>
    </div>
  );
};

export default SettingsPage;
