import { Outlet } from "react-router-dom";
import { useNotifications } from "@usedapp/core";
import Header from "components/Header";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";

const App = () => {
  const { notifications } = useNotifications();
  const toast = useToast();
  useEffect(() => {
    if (notifications.length === 0) return;
    notifications.forEach((notification) => {
      toast({
        title: notification.type,
        description: new Date(notification.submittedAt).toDateString(),
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    });
  }, [notifications]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default App;
