import { TreeItem, TreeView } from "@mui/lab";
import { List, ListItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import AddIcon from "@mui/icons-material/Add";
import DashBoard from "@mui/icons-material/Dashboard";
import { ListAlt, Person } from "@mui/icons-material";
import "./Dashboard.css";
const Sidebar = () => {
  return (
    <div>
      <div className="dashboard_left">
        <List className="listItem res-bar">
          <ListItem className="listItem">
            <DashBoard />
            <Link to="/admin/dashboard">Dashboard</Link>
          </ListItem>
          <ListItem className="listItem">
            <Link>
              <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ImportExportIcon />}
              >
                <TreeItem nodeId="1" label="Products">
                  <Link to="/admin/products">
                    <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
                  </Link>

                  <Link to="/admin/create">
                    <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
                  </Link>
                </TreeItem>
              </TreeView>
            </Link>
          </ListItem>
          <ListItem className="listItem">
            <ListAlt />
            <Link to="/admin/orders">Orders</Link>
          </ListItem>
          <ListItem className="listItem">
            <Person />
            <Link to="/admin/users">Users</Link>
          </ListItem>
        </List>
      </div>
    </div>
  );
};

export default Sidebar;
