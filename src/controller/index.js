import { v4 as uuid } from "uuid";
import AWS from "aws-sdk";
import path from "path";

import { config } from "dotenv";
config();

export const imageUpload = (req, res) => {
  try {
    const fileName = req.file.originalname;

    const awsS3 =
      process.env.NODE_ENV === "development"
        ? new AWS.S3({
            credentials: {                                            // pickup credentials from aws config automattically
              // accessKeyId: process.env.ACCESS_KEY,  
              // secretAccessKey: process.env.SECRET_ACCESS_KEY,
            },
          })
        : new AWS.S3();

    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: `${uuid()}${path.extname(fileName)}`,
      Body: req.file.buffer,
    };

    awsS3.upload(params, (err, data) => {
      if (err) return res.status(500).json({ error: err });
      console.log("data==>>", data);
      res.json(data);
    });

    const preSignedUrl = awsS3.getSignedUrl("getObject", {
      Bucket: process.env.BUCKET_NAME,
      Key: `${uuid()}${path.extname(fileName)}`,
      Expires: 10000,
    });

    console.log(preSignedUrl);

  } catch (error) {
    console.log("error ==>>> ", error);
    res.status(500).json(error);
  }
};
