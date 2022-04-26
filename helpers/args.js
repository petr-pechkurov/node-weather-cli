function getArgs(argv) {
  const [executor, file, ...rest] = argv;
  const parsedArgs = {};

  rest.forEach((value, index, array) => {
    if (!isCommand(value)) return;

    const nextValue = array[index + 1];

    if (nextValue && !isCommand(nextValue)) {
      parsedArgs[getAlias(value)] = nextValue;
    } else {
      parsedArgs[getAlias(value)] = true;
    }
  });

  return parsedArgs;
}

function isCommand(input) {
  return input.startsWith('-');
}
function getAlias(command) {
  return command.substring(1);
}

export { getArgs };