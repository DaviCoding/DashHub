import chalk from "chalk";
import figlet from "figlet";

export default (print: string, color: string) => {
  figlet(
    print,
    {
      font: "Big Money-ne",
      horizontalLayout: "full",
      verticalLayout: "full",
      width: 80,
      whitespaceBreak: true,
    },
    (err, data) => {
      if (err) return console.error(`Ops... ${err}`);
      return console.log(chalk.hex(color)(data));
    }
  );
};
