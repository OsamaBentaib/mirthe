const storeUpload = require("./store");
module.exports = async (upload, isImage) => {
  const { createReadStream, filename, mimetype } = await upload;
  const stream = createReadStream();
  // send this file to store it
  const file = await storeUpload({ stream, filename, mimetype }, isImage);
  return file;
};
