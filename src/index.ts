import Graphics from "./components/graphic";
import performance_info from "./performance/index";
import { graphics } from "systeminformation";

var loggerGPU = Graphics.graphics.Logger(
  39,
  0,
  30.2,
  20,
  "GPU Information",
  "cyan"
);

var loggerCPU = Graphics.graphics.Logger(
  69.4,
  0,
  30.8,
  20,
  "CPU Information",
  "cyan"
);

var loggerDisplay = Graphics.graphics.Logger(
  39,
  20,
  61.5,
  20,
  "Monitor Information",
  "cyan"
);

var log = Graphics.graphics.Logger(
  0,
  0,
  19.5,
  39.5,
  "Debug server",
  "green",
  "cyan"
);
var err = Graphics.graphics.Logger(
  0,
  39.5,
  19.5,
  35.5,
  "Error server",
  "red",
  "red"
);

(async function () {
  performance_info.gpu.gpuInfo?.controllers.forEach((gpu, index) => {
    loggerGPU.log(`GPU ${index + 1}:`);
    loggerGPU.log(`  Modelo: ${gpu.model}`);
    loggerGPU.log(`  Fabricante: ${gpu.vendor}`);
    loggerGPU.log(`  VRAM: ${gpu.vram} MB`);
    loggerGPU.log(`  Driver: ${gpu.driverVersion}`);
    loggerGPU.log(`  Fan speed: ${gpu.fanSpeed}%`);
  });

  performance_info.gpu.gpuInfo?.displays.forEach((display, index) => {
    loggerDisplay.log(`Monitor ${index + 1}:`);
    loggerDisplay.log(`  Modelo: ${display.model}`);
    loggerDisplay.log(
      `  Resolução: ${display.resolutionX}x${display.resolutionY}`
    );
    loggerDisplay.log(
      `  Taxa de Atualização: ${display.currentRefreshRate} Hz`
    );
  });

  if (performance_info.cpu.cpuInfo) {
    loggerCPU.log(`CPU Information:`);
    loggerCPU.log(`  Modelo: ${performance_info.cpu.cpuInfo.brand}`);
    loggerCPU.log(
      `  Manufacturer: ${performance_info.cpu.cpuInfo.manufacturer}`
    );
    loggerCPU.log(`  Cores: ${performance_info.cpu.cpuInfo.cores}`);
    loggerCPU.log(
      `  Physical Cores: ${performance_info.cpu.cpuInfo.physicalCores}`
    );
  }
})();
log.style.fg = "red";
log.log("Starting server...");
err.log(`Sem erros..............................`);

async function update() {
  try {
    new Graphics.graphics(
      {
        titles: [" "],
        data: [
          Number(
            (await performance_info.cpu.cpuUsage()).currentLoad.toFixed(0)
          ),
        ],
      },
      "CPU Monitoring (Global)",
      "barchart",
      20,
      0,
      9.5,
      40,
      100
    );

    new Graphics.graphics(
      {
        titles: [" "],
        data: [
          Number(
            Number((await performance_info.mem.memUsage()).used) / 1000000000 /// Convert to GB
          ).toFixed(0),
        ],
      },
      `Memory Monitoring in GB (${(await performance_info.mem.memUsage()).total
        .toString()
        .slice(0, 2)}gb Global)`,
      "barchart",
      29.5, //X
      0, // Y
      9.5, // Width
      40, // Height,
      Number(
        Number(
          (await performance_info.mem.memUsage()).total / 1000000000 /// Convert to GB
        ).toFixed(3)
      )
    );

    // Atualiza a tela depois de modificar os gráficos
    Graphics.screen.render();
  } catch (error) {
    err.log(`*********${error}*********`);
  }
} // Chama a função a cada 500ms sem criar múltiplos
setInterval(update, 1000);

setTimeout(() => {
  update();
  Graphics.screen.render();
}, 4000);
