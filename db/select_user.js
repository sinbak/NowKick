import selectAsFieldFrom from "./select_as_field_from.js";

 const selectUserByUid = async (fieldValue) =>
    await selectAsFieldFrom('user', 'uid', fieldValue);
 
export {selectUserByUid}