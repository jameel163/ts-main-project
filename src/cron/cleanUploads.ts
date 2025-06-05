import cron from 'node-cron'
import fs from 'fs'
import path from 'path'
import e from 'express'

cron.schedule('0 0 * * 0',()=>{
    const uploadPath=path.join(__dirname,'uploads')
    fs.readdir(uploadPath,(err,files)=>{
        if(err){
            return console.log(err)
        }
        files.forEach((file)=>{
            const ext=path.extname(file).toLocaleLowerCase();
            if(ext==='.html'||ext==='.txt'){
                const filePath = path.join(uploadPath, file);
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(`Failed to delete ${file}:`, err);
                    } else {
                        console.log(`Deleted: ${file}`);
                    }
                });
            }
        })
    })
})