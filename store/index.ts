import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import auth from "./modules/auth";

const rootReducer = combineReducers({
  auth,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;