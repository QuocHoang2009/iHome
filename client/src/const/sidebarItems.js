import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import ChartsPage from "../pages/chartsPage";
import DevicesPage from "../pages/devicesPage";
import HomePage from "../pages/homePage";
import MembersPage from "../pages/membersPage";
import RoomsPage from "../pages/roomsPage";

const sidebarItems = [
  {
    title: "Home",
    path: "/home",
    icon: <HomeOutlinedIcon />,
    component: <HomePage />,
  },
  {
    title: "Members",
    path: "/members",
    icon: <PeopleOutlinedIcon />,
    component: <MembersPage />,
  },
  {
    title: "Rooms",
    path: "/rooms",
    icon: <PeopleOutlinedIcon />,
    component: <RoomsPage />,
  },
  {
    title: "Devices",
    path: "/devices",
    icon: <PeopleOutlinedIcon />,
    component: <DevicesPage />,
  },
  {
    title: "Charts",
    path: "/charts",
    icon: <TimelineOutlinedIcon />,
    component: <ChartsPage />,
  },
];

export default sidebarItems;
