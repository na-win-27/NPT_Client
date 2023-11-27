import { userReducer } from "./reducers/user";
import { customerReducer } from "./reducers/customer";
import { hangerReducer } from "./reducers/hanger";
import { configureStore } from "@reduxjs/toolkit";
import {oppurtunityReducer} from "./reducers/oppurtunity";
import {rawMaterialReducer} from "./reducers/rawMaterial";
import { quoteReducer } from "./reducers/quote";
import {orderReducer} from "./reducers/order";
import {sampleReducer} from "./reducers/sample";
import { taskReducer } from "./reducers/task";

const Store = configureStore({
  reducer: {
    user: userReducer,
    customer:customerReducer,
    hanger:hangerReducer,
    oppurtunity:oppurtunityReducer,
    rawMaterial:rawMaterialReducer,
    quote:quoteReducer,
    order:orderReducer,
    sample:sampleReducer,
    task:taskReducer
  },
});

export default Store;