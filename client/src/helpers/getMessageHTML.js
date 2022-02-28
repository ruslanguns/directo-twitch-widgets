/**
 * Get message HTML with emogis
 *
 * @param {string} message Message from the message server
 * @param {Object} object Object from the chat server
 * @returns
 */
export function getMessageHTML(message, { emotes }) {
  if (!emotes) return message;

  // store all emote keywords
  // ! you have to first scan through
  // the message string and replace later
  const stringReplacements = [];

  // iterate of emotes to access ids and positions
  Object.entries(emotes).forEach(([id, positions]) => {
    // use only the first position to find out the emote key word
    const position = positions[0];
    const [start, end] = position.split('-');
    const stringToReplace = message.substring(
      parseInt(start, 10),
      parseInt(end, 10) + 1,
    );

    stringReplacements.push({
      stringToReplace: stringToReplace,
      replacement: `<img width="25px" src="https://static-cdn.jtvnw.net/emoticons/v1/${id}/3.0">`,
    });
  });

  // generate HTML and replace all emote keywords with image elements
  const messageHTML = stringReplacements.reduce(
    (acc, { stringToReplace, replacement }) => {
      // obs browser doesn't seam to know about replaceAll
      return acc.split(stringToReplace).join(replacement);
    },
    message,
  );

  return messageHTML;
}
