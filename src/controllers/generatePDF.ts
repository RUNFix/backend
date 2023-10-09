import { Request, Response, response } from "express"
import generatePdf from "../utils/generatePdf";
import { handleHttp } from "../utils/error.handle"

const getPDF = async (req: Request, res: Response) => {
  try {
    const pdfBuffer = await generatePdf(req.body.url);
    if (!req.body.url) {
        return res.status(400).send("URL is required");
    }
    res.status(200).set({
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Credentials":true,
        "Content-Type":"application/pdf",
    })
    .end(pdfBuffer);
  } catch (e) {
    handleHttp(res,'ERROR_CREATE_PDF');
  }
};

export {getPDF};