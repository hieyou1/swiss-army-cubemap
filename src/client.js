import ZIP from "jszip";
import Image from "image-js";
import { readAsDataURL } from "promise-file-reader";

const id = document.getElementById.bind(document);

id("upload").onchange = async () => {
    // get data url
    let image = await readAsDataURL(id("upload").files[0]);
    image = await Image.load(image);

    // row based
    const zip = new ZIP();
    const folder = zip.folder("photos");
    const size = image.height / 3;
    // if it generates extra images, change i < 4, to i < 3
    for (let i = 0; i < 4; ++i) {
        let x = i * (image.width / 4);
        let newImg = image.crop({
            x,
            "y": size,
            "width": size,
            "height": size
        });
        folder.file(`middle-${i + 1}.png`, await newImg.toBlob("image/png"));
    }
    folder.file(`top.png`, await (image.crop({
        "x": image.width / 4,
        "y": 0,
        "width": size,
        "height": size
    })).toBlob("image/png"));
    folder.file(`bottom.png`, await (image.crop({
        "x": image.width / 4,
        "y": image.height / 3 * 2,
        "width": size,
        "height": size
    })).toBlob("image/png"));

    // download as zip
    let blobZip = await zip.generateAsync({
        type: "blob"
    });
    let downloader = document.createElement("a");
    downloader.download = "cubemap.zip";
    downloader.href = URL.createObjectURL(blobZip);
    downloader.click();
};