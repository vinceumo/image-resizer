const { src, dest, task } = require("gulp");
const imageResize = require("gulp-image-resize");
const renameFile = require("gulp-rename");

const files = {
  image: {
    src: "./input/**/*.+(jpg|jpeg|gif|png)",
    dist: "./output"
  }
};

const imageSizes = [
  {name: "xs", width: 320},
  {name: "xsLg", width: 400},
  {name: "sm", width: 630},
  {name: "md", width: 740},
  {name: "lg", width: 1024},
  {name: "xl", width: 1280},
  {name: "xxl", width: 1800},
  {name: "xxxl", width: 2050},
];


const imageTask = (name, size) => {
  return src(files.image.src)
    .pipe(
      imageResize({
        width: size,
        quality: 0.7
      })
    )
    .pipe(renameFile(function (path) {
      path.basename += `-${name}`;
     }))
    .pipe(dest(files.image.dist));
};

task("image", async function() {
  imageSizes.forEach(el => imageTask(el.name, el.width))
});
