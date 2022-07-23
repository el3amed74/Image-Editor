const fileInput = document.querySelector(".file-input"),
    Img = document.querySelector(".img"),
    filters = document.querySelectorAll(".filter button"),
    rotateOptions = document.querySelectorAll(".rotate .options button"),
    filterName = document.querySelector(".info .name"),
    filterValue = document.querySelector(".info .value"),
    slider = document.querySelector(".slider input"),
    resetFilterbtn = document.querySelector(".reset-filter"),
    saveImgbtn = document.querySelector(".save-img"),
    chooseImg = document.querySelector(".choose-img");

let brightness = "100", saturation = "100", inversion = "0", grayscale = "0";
let rotate = 0, Horizontal = 1, Vertical = 1;
const loadImage = () => {
    let file = fileInput.files[0];
    if (!file) return;
    Img.src = URL.createObjectURL(file);
    Img.addEventListener("load", () => {
        resetFilterbtn.click();
        document.querySelector(".container").classList.remove("disable");
    })
}
const ApplyFilter = () => {
    Img.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    Img.style.transform = `rotate(${rotate}deg) scale(${Horizontal}, ${Vertical})`;
}
filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        btn.classList.add("active");
        filterName.innerText = btn.innerText;

        if (btn.id === "brightness") {
            slider.max = "200";
            slider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        } else if (btn.id === "saturation") {
            slider.max = "200";
            slider.value = saturation;
            filterValue.innerText = `${saturation}%`;
        } else if (btn.id === "inversion") {
            slider.max = "100";
            slider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        } else if (btn.id === "grayscale") {
            slider.max = "100";
            slider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
    });
});

const UpdateFilter = () => {
    filterValue.innerText = `${slider.value}%`;
    const activeFilter = document.querySelector(".filter .active");

    if (activeFilter.id === "brightness") {
        brightness = slider.value;
    } else if (activeFilter.id === "saturation") {
        saturation = slider.value;
    } else if (activeFilter.id === "inversion") {
        inversion = slider.value;
    } else {
        grayscale = slider.value;
    }

    ApplyFilter();
}
rotateOptions.forEach(btn => {
    btn.addEventListener("click", () => {
        if (btn.id === "left") {
            rotate -= 90;
        } else if (btn.id === "right") {
            rotate += 90;
        } else if (btn.id === "horizontal") {
            Horizontal = Horizontal === 1 ? -1 : 1;
        } else {
            Vertical = Vertical === 1 ? -1 : 1;
        }
        ApplyFilter();
    });

});

const resetFilter = () => {
    brightness = "100"; saturation = "100"; inversion = "0"; grayscale = "0";
    rotate = 0; Horizontal = 1; Vertical = 1;
    filters[0].click();
    ApplyFilter();
}

const saveImage = () => {



    const canvas = document.createElement("canvas");
    const contxt = canvas.getContext("2d");
    canvas.width = Img.naturalWidth;
    canvas.height = Img.naturalHeight;

    contxt.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    contxt.translate(canvas.width / 2, canvas.height / 2);
    if (rotate !== 0) {
        contxt.rotate(rotate * Math.PI / 180);
    }
    contxt.scale(Horizontal, Vertical);
    contxt.drawImage(Img, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height)
    
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}
slider.addEventListener("input", UpdateFilter);
resetFilterbtn.addEventListener("click", resetFilter);
saveImgbtn.addEventListener("click", saveImage);
fileInput.addEventListener("change", loadImage);
chooseImg.addEventListener("click", () => fileInput.click());