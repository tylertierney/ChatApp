export const readableErrorMessage = (msg: string) => {
  switch (msg) {
    case "auth/user-not-found":
      return "A user wasn't found at that email address";
    case "auth/wrong-password":
      return "Incorrect password";
    case "auth/email-already-in-use":
      return "A user already exists with that email address";
    default:
      return "Something went wrong";
  }
};

export const getRandomColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + randomColor;
};

export const formatDate = (isoString: string, difference: number) => {
  let parsedDate;
  if (difference < 10) {
    parsedDate = "Just now";
  } else if (difference < 60) {
    parsedDate = difference + "s ago";
  } else if (difference < 600) {
    parsedDate = Math.floor(difference / 60) + "m ago";
  } else if (difference < 86400) {
    parsedDate = new Date(isoString).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  } else if (difference < 604800) {
    const time = new Date(isoString).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
    const weekday = new Date(isoString).toLocaleDateString([], {
      weekday: "short",
    });
    parsedDate = weekday + " " + time;
  } else {
    parsedDate = new Date(isoString).toLocaleDateString([], {
      day: "numeric",
      month: "short",
    });
  }
  return parsedDate;
};
