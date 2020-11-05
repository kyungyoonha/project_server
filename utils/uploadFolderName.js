module.exports = (mimetype) => {
    return mimetype.indexOf("image") > -1
        ? "image"
        : mimetype.indexOf("audio") > -1
        ? "audio"
        : "etc";
};
