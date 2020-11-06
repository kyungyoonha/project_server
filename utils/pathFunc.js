exports.getTypePath = (mimetype) => {
    const typePath =
        mimetype.indexOf("image") > -1
            ? "image"
            : mimetype.indexOf("audio") > -1
            ? "audio"
            : "etc";

    return typePath;
};

exports.getDatePath = () => {
    const day = new Date().getDate();
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;

    return `${year}_${month}_${day}`;
};
