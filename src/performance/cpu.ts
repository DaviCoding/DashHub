import si from "systeminformation";

export default (async function () {
  try {
    return await si.cpu();
  } catch (error) {
    console.log(`New Error: ${error}`);
  }
})();
