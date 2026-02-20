import React, { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

const TerminalComponent = ({ socket, containerId }) => {
  const terminalRef = useRef(null);
  const term = useRef(null);
  const fitAddon = useRef(new FitAddon());

  useEffect(() => {
    if (!terminalRef.current || !containerId) {
      console.error("Terminal ref or containerId not found, aborting initialization.");
      return;
    }

    // Initialize terminal
    term.current = new Terminal({
      cursorBlink: true,
      theme: {
        background: "#1e1e1e",
        foreground: "#ffffff",
      },
    });

    // Attach terminal to DOM
    term.current.loadAddon(fitAddon.current);
    term.current.open(terminalRef.current);
    fitAddon.current.fit();

    // Display welcome message
    term.current.write(`Welcome to the Web Terminal for container ${containerId}!\r\n$ `);

    // Listen for terminal output from the server
    socket.on("terminalOutput", (data) => {
      term.current.write(data);
    });

    // Handle terminal errors
    socket.on("terminalError", (error) => {
      term.current.write(`\r\nError: ${error}\r\n`);
    });

    // Send user input to the server
    term.current.onData((input) => {
      if (socket) {
        socket.emit("terminalInput", { containerId, input });
      }
    });

    // Cleanup terminal on component unmount
    return () => {
      if (term.current) {
        term.current.dispose();
      }
    };
  }, [socket, containerId]);

  return (
    <div
      style={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#1e1e1e",
        padding: "10px",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        ref={terminalRef}
        style={{
          flexGrow: 1,
          backgroundColor: "#1e1e1e",
          width: "100%",
        }}
      />
    </div>
  );
};

export default TerminalComponent;
