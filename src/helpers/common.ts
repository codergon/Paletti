import AsyncStorage from '@react-native-async-storage/async-storage';

const getAllAsync = async (storage_Keys: string[]) => {
  const qArray = await AsyncStorage.multiGet(storage_Keys);

  const dataObj: {[key: string]: any} = {};
  qArray.map(([key, value]) => {
    dataObj[key] = value;
  });
  return dataObj;
};

//
const doubleDigit = (val: string | number) =>
  Number(val) >= 10 ? Number(val) : '0' + Number(val);

const roundMinutes = (hrs = 2) => {
  const date = new Date();
  date.setHours(date.getHours() + hrs);
  date.setMinutes(0, 0, 0);
  return date;
};

export {getAllAsync, doubleDigit, roundMinutes};
