var cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: <string>process.env.CLOUDINARY_CLOUD_NAME,
  api_key: <string>process.env.CLOUDINARY_API_KEY, 
  api_secret: <string>process.env.CLOUDINARY_API_SECRET,
  secure: true
})


export const uploadImage = async (filePath:any) => {
  return await cloudinary.uploader.upload(filePath, {
    resource_type: 'raw',
    folder: 'RUNFIXPDF'
  })
}

export const deleteImage = async (publicId:any) => {
  return await cloudinary.uploader.destroy(publicId)
}