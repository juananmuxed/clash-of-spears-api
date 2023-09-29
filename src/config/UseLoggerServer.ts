/* eslint-disable no-console */
import { ServerUrl } from "../models/Server"
import { useColors } from "./UseColors";

export const useLoggerServer = ()=> {
  const colors = useColors();
  const serverStart = (server: ServerUrl) => {
    console.log(
      colors.green +
      "💻 Server Start ===> " +
      colors.reset +
      colors.green +
      server.host +
      colors.reset +
      colors.magenta +
      ":" +
      server.port +
      colors.reset
    );
  }

  const dbConnected = (url: string) => {
    console.log(
      colors.green +
      "💡 DB Connected ===> " +
      colors.reset +
      colors.cyan +
      url
    );
  }

  return {
    serverStart,
    dbConnected,
  }
} 