
import Index from "views/user/login.js";
import Dashboard from "views/dashboard/";
import Dashboard1 from "views/dashboard/data";
import Profile from "views/user/Profile.js";
import Reg from "views/examples/Register.js";
import Maps from "views/examples/Maps.js";
import Register from "views/user/register-user.js";
import Login from "views/user/login.js";
import ForgotPassword from "views/user/forgot-password.js";
import ResetPassword from "views/user/reset-password.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Project from "views/project/";
import Test from "views/project/navbar";
import EditProject from "views/project/file-upload";
import DetailsProject from "./views/project/[id]";
import Timesheets from "./views/timesheets/[id]";


var routes = [
  {
    path: "/index",
    name: "Sign Out",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/auth"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Dashboard1,
    layout: "/admin"
  },
  {
    path: "/edit-project/:id",
    name: "Edit project",
    icon: "ni ni-tv-2 text-primary",
    component: EditProject,
    layout: "/admin"
  },
  {
    path: "/project/:id",
    name: "Details project",
    icon: "ni ni-tv-2 text-primary",
    component: DetailsProject,
    layout: "/admin"
  },
  {
    path: "/timesheets/:id",
    name: "Timesheets",
    icon: "ni ni-tv-2 text-primary",
    component: Timesheets,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/project",
    name: "Project",
    icon: "ni ni-bullet-list-67 text-red",
    component: Project,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "table",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout:"/auth"
  },
  {
    path: "/reg",
    name: "login",
    icon: "ni ni-key-25 text-info",
    component: Reg,
    layout:"/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  },
  {
    path: "/forgot-password",
    icon: "ni ni-tv-2 text-primary",
    component: ForgotPassword,
    layout: "/auth"
  },
  {
    path: "/reset-password",
    icon: "ni ni-tv-2 text-primary",
    component: ResetPassword,
    layout: "/auth"
  },
];
export default routes;
