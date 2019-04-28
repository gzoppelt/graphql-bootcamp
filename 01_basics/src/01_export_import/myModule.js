const message = 'Some message from myModule.js';
const name = 'Guenther';

const location = 'Hemel';

const getGreeting = (name) => {
    return `Welcome to the course ${name}`;
}

// named export - has name(s)
export { message, name, getGreeting };

// default export - just one object
export default location;