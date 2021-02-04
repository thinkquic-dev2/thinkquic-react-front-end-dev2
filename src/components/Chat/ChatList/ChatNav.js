import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import ContactsIcon from "@material-ui/icons/Contacts";
import ChatIcon from "@material-ui/icons/Chat";
import GroupIcon from "@material-ui/icons/Group";
import "./ChatNav.css";

// const useStyles = makeStyles({
//   root: {
//     flexGrow: 1,
//     maxWidth: 500,
//   },
// });
const useStyles = makeStyles({
  overrides: {
    MuiTab: {
      root: {
        flexGrow: 1,
        minWidth: 112,
        //backgroundColor: theme.palette.background.paper,
      },
    },
  },
});

const ChatNav = (props) => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();

  return (
    // <Paper square className="tabs">
    //   <Tabs
    //     value={value}
    //     onChange={handleChange}
    //     variant="fullWidth"
    //     indicatorColor="secondary"
    //     textColor="secondary"
    //     aria-label="icon label tabs example"
    //   >
    //     <Tab icon={<ContactsIcon />} label="CONTACTS">
    //       <div>
    //         <Users username={username} />
    //       </div>
    //     </Tab>
    //     <Tab icon={<ChatIcon />} label="PEOPLE CHAT" />
    //     <Tab icon={<GroupIcon />} label="GROUP CHAT" />
    //   </Tabs>
    // </Paper>
    <div className="tabs">
      <TabContext value={value}>
        <AppBar position="static">
          <TabList onChange={handleChange} aria-label="simple tabs example">
            <Tab icon={<ContactsIcon />} label="Contacts" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </AppBar>
        <TabPanel value="1">Item One</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </div>
  );
};

export default ChatNav;
