import { Request, Response } from "express";
import generatePdf from "../utils/generatePDF";
import { handleHttp } from "../utils/error.handle";
import { uploadImage, deleteImage } from "../config/cloudinaryPDF";
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

const getPDF = async (req: Request, res: Response) => {
  try {
    if (!req.body.url) {
        return res.status(400).send("URL is required");
    }

    const pdfBuffer = await generatePdf(req.body.url);

    // Crear un archivo temporal para el PDF
    const tempFileName = 'tempPdf-' + Date.now() + '.pdf';
    const tempFilePath = path.join(os.tmpdir(), tempFileName);
    fs.writeFileSync(tempFilePath, pdfBuffer);

    const uploadResult = await uploadImage(tempFilePath);
    fs.unlinkSync(tempFilePath);  // Eliminar el archivo temporal después de cargarlo

    if (!uploadResult || !uploadResult.url) {
      throw new Error("Failed to upload PDF to Cloudinary");
    }

    // Responder con la URL del PDF en Cloudinary
    res.status(200).json({
      message: "PDF uploaded successfully!",
      url: uploadResult.url
    });

  } catch (e) {
    handleHttp(res,'ERROR_CREATE_PDF');
  }
};

export { getPDF };
