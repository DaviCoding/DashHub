import cpu from "./cpu";
import gpu from "./gpu";
import mem from "./mem";
import si from "systeminformation";

function cpuUsage() {
  return si.currentLoad();
}

function memUsage() {
  return si.mem();
}

export default {
  cpu: {
    cpuInfo: await cpu,
    cpuUsage,
  },
  gpu: {
    gpuInfo: await gpu,
  },
  mem: {
    memInfo: await mem,
    memUsage,
  },
};
