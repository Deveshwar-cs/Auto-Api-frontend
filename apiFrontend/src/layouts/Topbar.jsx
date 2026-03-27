import {
  Search,
  Bell,
  Settings,
  LogOut,
  FolderPlus,
  Layers,
  Trash,
  Edit,
  Share2,
  AlertCircle,
} from "lucide-react";
import {useLocation, useNavigate} from "react-router-dom";
import {useState, useRef, useEffect} from "react";

import useSettingStore from "../features/project/store/useSettingStore";
import useNotificationStore from "../features/project/store/useNotificationStore";
import useProjectStore from "../features/project/store/useProjectStore";

import socket from "../socket";

const BASE_URL = "https://auto-api-backend.onrender.com";

/* notification config */
const notificationConfig = {
  PROJECT_CREATED: {
    icon: <FolderPlus size={16} />,
    color: "text-green-400",
  },
  PROJECT_DELETED: {
    icon: <Trash size={16} />,
    color: "text-red-400",
  },
  PROJECT_UPDATED: {
    icon: <Edit size={16} />,
    color: "text-blue-400",
  },

  COLLECTION_CREATED: {
    icon: <Layers size={16} />,
    color: "text-purple-400",
  },
  COLLECTION_DELETED: {
    icon: <Trash size={16} />,
    color: "text-red-400",
  },
  COLLECTION_UPDATED: {
    icon: <Edit size={16} />,
    color: "text-blue-400",
  },
  COLLECTION_SHARED: {
    icon: <Share2 size={16} />,
    color: "text-yellow-400",
  },

  ERROR: {
    icon: <AlertCircle size={16} />,
    color: "text-yellow-400",
  },
};

/* time ago helper */
const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  const intervals = [
    {label: "year", seconds: 31536000},
    {label: "month", seconds: 2592000},
    {label: "day", seconds: 86400},
    {label: "hour", seconds: 3600},
    {label: "minute", seconds: 60},
  ];

  for (let i of intervals) {
    const count = Math.floor(seconds / i.seconds);
    if (count >= 1) return `${count} ${i.label}${count > 1 ? "s" : ""} ago`;
  }

  return `${seconds} seconds ago`;
};

const Topbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const projects = useProjectStore((state) => state.projects);
  const [results, setResults] = useState([]);
  const {
    notifications = [],
    fetchNotifications,
    markAsRead,
    addNotification,
  } = useNotificationStore();

  const {name, profilePhoto, fetchProfileData, updateProfileData} =
    useSettingStore();

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [preview, setPreview] = useState(null);

  const dropdownRef = useRef(null);
  const notifyRef = useRef(null);
  const fileInputRef = useRef(null);

  /* page title */
  const getTitle = () => {
    if (location.pathname.includes("projects")) return "Projects";
    if (location.pathname.includes("collections")) return "Collections";
    if (location.pathname.includes("settings")) return "Settings";
    return "Dashboard";
  };

  /* logout */
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  /* unread notifications */
  const unreadCount = notifications.filter((n) => !n.read).length;

  /* avatar click */
  const handleAvatarClick = () => fileInputRef.current?.click();

  /* upload profile image */
  const uploadImage = async (file) => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);

    const formData = new FormData();
    formData.append("profilePhoto", file);

    try {
      await updateProfileData(formData);
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const handleImageChange = (e) => uploadImage(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    uploadImage(e.dataTransfer.files[0]);
  };

  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      return;
    }
    const filtered = projects.filter((p) =>
      p.projectName.toLowerCase().includes(search.toLowerCase()),
    );
    setResults(filtered);
  }, [search, projects]);
  /* socket notifications */
  useEffect(() => {
    const handleNewNotification = (notification) => {
      addNotification(notification);
    };

    socket.on("newNotification", handleNewNotification);

    return () => socket.off("newNotification", handleNewNotification);
  }, [addNotification]);

  /* fetch notifications */
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  /* fetch profile */
  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  /* close dropdowns */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target))
        setOpen(false);

      if (notifyRef.current && !notifyRef.current.contains(event.target))
        setNotifyOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* cleanup preview */
  useEffect(() => {
    return () => preview && URL.revokeObjectURL(preview);
  }, [preview]);

  const imageSrc = preview || profilePhoto || null;

  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  return (
    <header className="h-16 bg-[#0D0716] border-b border-purple-900/20 flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold text-gray-200">{getTitle()}</h2>

      <div className="flex items-center gap-5">
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute top-2.5 left-3 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="bg-[#151026] text-sm pl-9 pr-3 py-2 rounded-lg outline-none border border-purple-900/20 focus:border-purple-500"
          />
          {search && (
            <div className="absolute top-12 left-0 w-full bg-[#0D0716] border border-purple-900/30 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
              {results.length === 0 ? (
                <p className="text-gray-500 text-sm p-3">No projects found</p>
              ) : (
                results.map((project) => (
                  <div
                    key={project._id}
                    onClick={() => {
                      navigate(`/dashboard/projects/${project._id}`);
                      setSearch("");
                      setResults([]);
                    }}
                    className="px-4 py-2 text-sm text-gray-300 hover:bg-purple-600/10 cursor-pointer"
                  >
                    {project.projectName}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div ref={notifyRef} className="relative">
          <button
            onClick={() => setNotifyOpen(!notifyOpen)}
            className="relative text-gray-400 hover:text-white"
          >
            <Bell size={20} />

            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-purple-500 text-[10px] px-1.5 py-px rounded-full text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {notifyOpen && (
            <div className="absolute z-10 right-0 mt-3 w-80 bg-[#0D0716] border border-purple-900/30 rounded-xl shadow-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-purple-900/20 flex justify-between">
                <p className="text-sm text-gray-300">Notifications</p>
                <span className="text-xs text-purple-400">
                  {notifications.length}
                </span>
              </div>

              <div className="max-h-72 overflow-y-auto">
                {sortedNotifications.length === 0 ? (
                  <p className="text-center text-gray-500 py-6 text-sm">
                    No notifications
                  </p>
                ) : (
                  sortedNotifications.map((n) => {
                    const config = notificationConfig[n.type] || {};

                    return (
                      <div
                        key={n._id}
                        onClick={() => markAsRead(n._id)}
                        className={`px-4 py-3 text-sm cursor-pointer border-b border-purple-900/10 hover:bg-purple-600/10
                        ${
                          !n.read
                            ? "text-white bg-purple-900/10"
                            : "text-gray-400"
                        }
                        `}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`${
                              config.color || "text-gray-400"
                            } mt-1`}
                          >
                            {config.icon || <Bell size={16} />}
                          </div>

                          <div>
                            <p>{n.message}</p>
                            <span className="block text-xs mt-1 text-gray-500">
                              {timeAgo(n.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* User */}
        <div ref={dropdownRef} className="relative">
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 cursor-pointer hover:bg-purple-600/10 px-3 py-2 rounded-lg"
          >
            <div
              onClick={handleAvatarClick}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="w-8 h-8 rounded-full overflow-hidden bg-purple-600 flex items-center justify-center text-white text-sm"
            >
              {imageSrc ? (
                <img src={imageSrc} className="w-full h-full object-cover" />
              ) : (
                name?.charAt(0)
              )}
            </div>

            <span className="text-sm text-gray-300">{name}</span>
          </div>

          <input
            type="file"
            hidden
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageChange}
          />

          {open && (
            <div className="absolute right-0 mt-3 w-44 bg-[#0D0716] border border-purple-900/30 rounded-xl shadow-lg py-2">
              <button
                onClick={() => navigate("/dashboard/settings")}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-300 hover:bg-purple-600/10"
              >
                <Settings size={16} />
                Settings
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-purple-600/10"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
