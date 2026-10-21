const originalError = console.error;

console.error = (...args) => {
    if (
        typeof args[0] === "string" &&
        args[0].includes("Accessing element.ref was removed in React 19")
    ) {
        return; // ignore
    }
    originalError(...args);
};
