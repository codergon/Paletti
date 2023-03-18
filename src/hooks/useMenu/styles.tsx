import { padding } from "../../utils";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  menuContainer: {
    flex: 0,
    zIndex: 99,
    display: "flex",
    position: "relative",
    flexDirection: "column",
    backgroundColor: "transparent",
  },
  menuList: {
    zIndex: 99 * 99,
    position: "absolute",
    backgroundColor: "transparent",
  },
  menuListInner: {
    flex: 0,
    width: "100%",
    shadowRadius: 3,
    shadowOpacity: 0.2,
    shadowOffset: { width: -1, height: 1 },

    marginVertical: 6,
    borderRadius: 6,
    ...padding(3, 12),
    flexDirection: "column",
  },
  menuItem: {
    minWidth: 80,
    width: "100%",
    ...padding(11, 0, 13),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  menuItemLabel: {
    fontSize: 15,
    textTransform: "capitalize",
  },
});
