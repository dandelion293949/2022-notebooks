import './App.css'
import { createMachine, assign } from "xstate";
import { useMachine } from "@xstate/react";

interface ToggleContext {
  count: number;
}

const toggleMachine = createMachine<ToggleContext>({
  context: { count: 0 },
  id: "toggle",
  initial: "inactive",
  states: {
    inactive: {
      on: {
        TOGGLE: {
          target: "active",
        },
      },
    },
    active: {
      entry: assign({ count: (ctx) => ctx.count + 1 }),
      on: {
        TOGGLE: {
          target: "inactive",
        },
        PAUSE: {
          target: "pause",
        },
      },
    },
    pause: {
      on: {
        PAUSE: {
          target: "inactive",
        },
      },
    },
  },
});

function App() {
  const [current, send] = useMachine(toggleMachine);
  const active = current.matches("active");
  const { count } = current.context;

  return (
    <div className="App">
      <h1>XState React Template</h1>
      <h2>Fork this template!</h2>
      <button onClick={() => send("ON")}>
        Click me ({active ? "✅" : "❌"})
      </button>{" "}
      <code>
        Toggled <strong>{count}</strong> times
      </code>
    </div>
  );
}

export default App
