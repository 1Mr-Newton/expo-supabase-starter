import { StyleSheet } from "react-native";

export const chatStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: "#fff",
  },
  mainbox: {
    flex: 1,
    flexDirection: "column",
  },
  sendbox: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingVertical: 10,
    gap: 5,
    // marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: "#e9ecfa",
    borderRadius: 10,
    minHeight: 20,
    borderColor: "#d4dcf6",
    borderWidth: 1,
    marginHorizontal: 5,
  },

  image: {
    width: 15,
    height: 15,
    marginRight: 5,
    tintColor: "#4a6ff9",
  },
  smallBtn: {},
  smallBTNContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  cancelRecord: {
    color: "red",
    fontWeight: "500",
  },
  extras: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 10,
  },
});

export const messageHolderStyle = StyleSheet.create({
  messageContainer: {
    padding: 10,
    marginHorizontal: 5,
    marginBottom: 2,
    maxWidth: "80%",
  },
  alignLeft: {
    alignSelf: "flex-start",
    backgroundColor: "#6d8bf8",
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  alignRight: {
    alignSelf: "flex-end",
    backgroundColor: "#f5f5f6",
    borderColor: "#eaeaeb",
    borderWidth: 1,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  image: {
    width: 15,
    height: 15,
    marginRight: 5,
    tintColor: "#4a6ff9",
  },
  followUp: {
    width: "80%",
    marginHorizontal: 5,
    borderRadius: 8,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
