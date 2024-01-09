const getShortTime = (time) => {
  return new Date(time).toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getProfileName = (chat, currUser) => {
  let otherUserProfile = null;

  if (!chat?.isGroupChat) {
    let otherUser = chat?.users?.find((user) => user?._id !== currUser?.userId);
    otherUserProfile = otherUser?.name;
  }
  return otherUserProfile || chat?.chatName;
};

const getProfilePic = (chat, currUser) => {
  let otherUserProfile = null;

  if (!chat?.isGroupChat) {
    let otherUser = chat?.users?.find((user) => user?._id !== currUser?.userId);
    otherUserProfile = otherUser?.avatar;
  }
  return otherUserProfile || chat?.profile;
};

export { getShortTime, getProfileName, getProfilePic };
