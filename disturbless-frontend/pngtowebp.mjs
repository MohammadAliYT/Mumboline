import imagemin from "imagemin";
import webp from "imagemin-webp";

const outputFolder = "./src/Assets";
const produceWebP = async () => {
  await imagemin(["src/Assets/*.png"], {
    destination: outputFolder,
    plugins: [
      webp({
        lossless: true
      })
    ]
  });

  console.log("PNGs processed");
  await imagemin(["src/Assets/*.{jpg,jpeg}"], {
    destination: outputFolder,
    plugins: [
      webp({
        quality: 75
      })
    ]
  });
  console.log("JPGs and JPEGs processed");
};

produceWebP();