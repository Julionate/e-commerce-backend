import { spawn } from "child_process";

export function startPHPServer() {
  const phpServer = spawn("php", [
    "-S",
    "localhost:8000",
    "-t",
    "./src/models",
  ]);

  console.log("Servidor PHP iniciado.");

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
