import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  headTable: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopColor: "#FFFFFF",
    height: 40,
    borderBottomColor: "#EBEBEB",
    borderBottomWidth: 1,

  },
  tableTitle: {
    height: 40,
    color: "#666666",
    alignItems: "center",
    justifyContent: "center"
  },
  tableTitleSelect: {
    height: 40,
    color: "#FF1F4E",
    borderBottomWidth: 1,
    borderBottomColor: "#FF1F4E",
    alignItems: "center",
    justifyContent: "center",

  },
  item: {
    color: "#666666",
    fontSize: 12
  },
  itemSelect: {
    color: "#FF1F4E",
    fontSize: 12
  },
  list: {
    height: 99,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#666666",
  },
  listLeft: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8
  },
  img: {
    width: 80,
    height: 80,
  },
  listRightDetail: {

  },
  specification: {
    flexDirection: "row",
  },
  specificationText: {
    color: "#EBEBEB",
    paddingTop: 10

  },
  btnView: {
    justifyContent: "flex-end"
  },
  evaluateBtn: {
    width: 81,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  a: {


  }

})


export default styles;