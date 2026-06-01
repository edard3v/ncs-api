import { v2 as cloudinary } from "cloudinary";
import { ResCloudinary } from "./types.ts";
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from "@/app/config.ts";
import { CloudinaryUrlErr } from "@/errors/CloudinaryUrlErr.ts";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export class Cloudinary {
  static async upload(file: File, folder: string) {
    // 1. Extraemos los bytes a memoria
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // 2. Subimos directamente el buffer al stream de Cloudinary
    const upload_result = await new Promise((resolve, reject) => {
      const upload_stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          public_id: `${folder}/${Date.now()}_${crypto.randomUUID()}`,
          folder,
          unique_filename: true,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );

      // Enviamos el buffer completo y cerramos el stream en un solo paso
      upload_stream.end(buffer);
    });

    return upload_result as ResCloudinary;
  }

  // si la url ya incluye el puclic_id
  static async destroy(url: string) {
    const new_url = new URL(url);
    const public_id = new_url.searchParams.get("public_id");

    if (!public_id) throw new CloudinaryUrlErr();

    return await cloudinary.uploader.destroy(public_id, {
      resource_type: "auto",
    });
  }

  // si la url no incluye el puclic_id
  static async destroy_by_url(url: string, folder: string) {
    const name = url.split("/").at(-1)?.split(".")[0];
    const public_id = `${folder}/${name}`;

    return await cloudinary.uploader.destroy(public_id, {
      resource_type: "auto",
    });
  }
}
