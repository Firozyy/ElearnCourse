import DataUriParser from "datauri/parser.js";
import path from "path";


const getDataUri = (file) => {
  const parser = new DataUriParser();
  const x = toString(file.orginalName)
  const extName =  path.extname(x)
  return parser.format(extName, file.buffer);
};

export default getDataUri;
