import { NextFunction, Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import {
  insertveh,
  deleteVeh,
  getVechls,
  getVehl,
  updateVeh,
} from "../services/vehicle";
import fileUpload, { UploadedFile } from "express-fileupload";

const getVehicle = async ({ params }: Request, res: Response) => {
  try {
    const { plate } = params;
    const response = await getVehl(plate);
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR_GET_VEHICLE");
  }
};

const getVehicles = async (req: Request, res: Response) => {
  try {
    const response = await getVechls();
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR_GET_VEHICLES");
  }
};

const updateVehicle = async ({ params, body }: Request, res: Response) => {
  try {
    const { plate } = params;
    const response = await updateVeh(plate, body);
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR_UPDATE_VEHICLE");
  }
};

const postVehicle = async (req: Request, res: Response) => {
  try {
    let tempFilePaths: string[] = [];

    if (req.files?.images) {
      const uploadedFiles = req.files.images as UploadedFile[]; // Using type assertion to indicate that it's an array of files
      tempFilePaths = uploadedFiles.map((file) => file.tempFilePath);
    }

    if (typeof req.body.parts === "string") {
      try {
        req.body.parts = JSON.parse(req.body.parts);
      } catch (e) {
        return res.status(400).send("INVALID_PARTS_FORMAT");
      }
    }

    console.log(req.body);
    console.log(req.files);

    const response = await insertveh(req.body, tempFilePaths);
    if((typeof response)==='string') {
      return res.status(400).send({message: response});
    }
    res.send(response);
  } catch (e) {
    console.error(e);
    handleHttp(res, "ERROR_POST_VEHICLE");
  }
};

const deleteVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vehicleId = req.params.id;

    if (!vehicleId) {
      return res.status(400).json({ message: "Vehicle ID is required" });
    }

    const response = await deleteVeh(vehicleId);
    res.send(response);
  } catch (error) {
    console.error(error);
    handleHttp(res, "ERROR_DELETE_VEHICLE");
  }
};

export { getVehicle, getVehicles, updateVehicle, postVehicle, deleteVehicle };
