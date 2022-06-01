export const checkImage = (file) => {
    let err = "";
    if(!file) return err = "File does not exist.";
    if(file.type !== 'image/jpeg' && file.type !== 'image/png')
    err = "Image khong dung dinh dang.";
    return err;
}

export const imageUpload = async (images) => {
    let imgArr = [];
    for(const item of images) {
        const formData = new FormData();
        if(item.camera) {
            formData.append("file", item.camera);
        }
        else {
            formData.append("file", item);
        }
        
       

        formData.append("upload_preset", "kb4kzecg");
        formData.append("cloud_name", "dthuy");

        const res = await fetch('https://api.cloudinary.com/v1_1/dthuy/image/upload', {
            method: "POST",
            body: formData
        });

        const data = await res.json();
        imgArr.push({public_id: data.public_id, url: data.secure_url});
        console.log(data);
    }
    return imgArr;
    
}