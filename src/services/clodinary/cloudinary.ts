import { v2 as cloudinary } from "cloudinary";
import { ResCloudinary } from "./types.ts";
import { CloudinaryUrlErr } from "../../errors/CloudinaryUrlErr.ts";

cloudinary.config({
  cloud_name: Deno.env.get("CLOUDINARY_CLOUD_NAME")!,
  api_key: Deno.env.get("CLOUDINARY_API_KEY")!,
  api_secret: Deno.env.get("CLOUDINARY_API_SECRET")!,
});

export class Cloudinary {
  static async upload(file: File, folder: string) {
    const array_buffer = await file.arrayBuffer();
    const uint8_array = new Uint8Array(array_buffer);

    // Subir el archivo usando el stream uploader de Cloudinary
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

      // Enviar el buffer al stream (reemplazando Buffer por Deno.Reader)
      const readable = new ReadableStream({
        start(controller) {
          controller.enqueue(uint8_array);
          controller.close();
        },
      });

      // Esto crea un "reader" tipo Node desde el ReadableStream
      const reader = readable.getReader();

      function push() {
        reader.read().then(({ done, value }) => {
          if (done) {
            upload_stream.end();
            return;
          }
          upload_stream.write(value);
          push();
        });
      }

      push();
    });

    return upload_result as ResCloudinary;
  }

  static async destroy(url: string) {
    const new_url = new URL(url);
    const public_id = new_url.searchParams.get("public_id");
    if (!public_id) throw new CloudinaryUrlErr();

    return await cloudinary.uploader.destroy(public_id, {
      resource_type: "image",
    });
  }

  static async destroy_by_url(url: string, folder: string) {
    const name = url.split("/").at(-1)?.split(".")[0];
    const public_id = `${folder}/${name}`;

    const result = await cloudinary.uploader.destroy(public_id, {
      resource_type: "image",
    });

    return result;
  }
}
