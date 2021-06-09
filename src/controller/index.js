import { v4 as uuid } from "uuid";
import AWS from "aws-sdk";

export const imageUpload = (req, res) => {
  try {
    const awsS3 = new AWS.S3();

    const params = {
        Bucket: process.env.BUCKET_NAME
    }

    awsS3.upload(params, (err, data) => {
      if (err) return res.status(500).json({ error: err });

    });

    res.json(obj);
  } catch (error) {
    console.log("error ==>>> ", error);
    res.status(500).json(error);
  }
};
