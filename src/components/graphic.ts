import blessed from "blessed";
import contrib from "blessed-contrib";
import figlet_text from "../components/figlet_text";

const gerarCorAleatoria = (): string => {
  const letras = "0123456789ABCDEF";
  let cor = "#";
  for (let i = 0; i < 6; i++) {
    cor += letras[Math.floor(Math.random() * 16)];
  }
  return cor;
};

// Criando a tela
const screen = blessed.screen({
  smartCSR: true,
  title: "DashHub",
  dockBorders: true,
  fullUnicode: true,
});
const grid = new contrib.grid({
  rows: 100,
  cols: 100,
  screen: screen,
});
/* 
var logger = grid.set(0, 0, 100, 19.5, contrib.log, {
  fg: "white",
  selectedFg: "green",
  label: "Server Log",
  Animations: true,
});

const log = function (message: string, color: string = "green") {
  console.log(logger.fg);
  logger.log(message);
}; */
function welcome() {
  figlet_text(
    "                                          DashHub",
    `${gerarCorAleatoria()}`
  );
}

welcome();

export default {
  graphics: class Graphics {
    data: any;
    label: string;
    x: number;
    y: number;
    w: number;
    h: number;
    max: number;

    constructor(
      data: any,
      label: string = "Sem label",
      type: string,
      x: number = 0,
      y: number = 0,
      w: number = 0,
      h: number = 0,
      max: number = 0
    ) {
      this.data = data;
      this.label = label;
      // Inverte os valores de x e y para melhor leitura de código
      this.x = y;
      this.y = x;
      // Inverte os valores de width e height para melhor leitura de código
      this.w = h;
      this.h = w;
      this.max = max;

      type == undefined ? console.error("Sem tipo definido") : (type = type);

      switch (type) {
        case "barchart":
          this.BarChart();
          break;
        default:
          console.error("Tipo de gráfico não encontrado");
          break;
      }
    }

    BarChart() {
      return grid
        .set(this.x, this.y, this.w, this.h, contrib.bar, {
          barWidth: 12,
          barSpacing: 0,
          label: this.label,
          xOffset: 2,
          maxHeight: this.max,
          barBgColor:
            this.data.data[0] > this.max / 2
              ? this.data.data[0] > this.max / 1.25
                ? "red"
                : "yellow"
              : "green",
        })
        .setData(this.data);
    }

    static Logger(
      x: number,
      y: number,
      w: number,
      h: number,
      label: string,
      color: string,
      border: string = "cyan"
    ) {
      return grid.set(y, x, h, w, contrib.log, {
        style: {
          border: {
            fg: border, // Cor da borda
          },
          label: {
            fg: color == "red" ? "red" : "white", // Cor do texto
          },
          fg: color,
          bg: "black",
        },
        selectedFg: "green",
        label: label,
        Animations: true,
      });
    }
  },
  screen,
};
