import { spawn } from "child_process";

export function startPHPServer() {
  const phpServer = spawn("php", [
    "-S",
    "localhost:8000",
    "-t",
    "./src/models",
  ]);

  console.log("Servidor PHP iniciado.");

  // // Capturar la salida estándar
  // phpServer.stdout.on("data", (data) => {
  //   console.log(`Salida PHP: ${data}`);
  // });

  // // Capturar la salida de error
  // phpServer.stderr.on("data", (data) => {
  //   console.error(`Error PHP: ${data}`);
  // });

  // Escuchar el evento de interrupción (Ctrl+C)
  process.on("SIGINT", () => {
    console.log("Deteniendo el servidor PHP...");

    // Matar el proceso del servidor PHP
    phpServer.kill("SIGINT");

    // Salir del proceso de Node.js
    process.exit();
  });

  phpServer.on("close", (code) => {
    console.log(`Servidor PHP cerrado con código ${code}`);
  });

  return phpServer;
}
