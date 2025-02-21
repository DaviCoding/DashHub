import si from "systeminformation";

export default (async function () {
  try {
    return await si.mem();
  } catch (error) {
    console.log(`New Error: ${error}`);
  }
})();
