export const errorHandles = (fn: Function) => {
    return function (...args: unknown[]) {
        try {
            return fn(...args);
        } catch (error) {
            console.log(error);
            throw error.message;
        }
    }
};
