"use strict"


const config = require('@strapi/strapi/lib/core/registries/config');
// 引入obs库
// 使用npm安装
const ObsClient = require('esdk-obs-nodejs');

// 创建ObsClient实例

module.exports = {
    init(providerOptions) {
        // init your provider if necessary
        var obsClient = new ObsClient({
            access_key_id: providerOptions.accessKeyId,
            secret_access_key: providerOptions.secretAccessKey,
            server: providerOptions.server
        });

        

        function getPath(file) {
            let prefix = config.prefix || "";
        prefix = prefix.trim() === "/" ? "" : prefix.trim(); // prefix only if not root
        const path = file.path ? `${file.path}/` : "";
            return `${prefix}${path}${file.hash}${file.ext}`;
        }


        return {
            upload(file) {
                // upload the file in the provider
                
        const uploadParams = {
          Bucket: config.params.bucket,
          Key: getPath(file),
          Body: Buffer.from(file.buffer, "binary"),
          // TODO(fix): this currently breaks uploads
          // ACL: 'public-read',
          ContentType: file.mime,
          ...customParams,
        };
            },
            delete(file) {
                // delete the file in the provider
                obsClient.deleteObject({
                    Bucket : config.params.bucket,
                    Key : getPath(file)
             }, (err, result) => {
                    if(err){
                           console.error('Error-->' + err);
                    }else{
                           console.log('Status-->' + result.CommonMsg.Status);
                    }
             });

            },
        };
    },
};

// 使用访问OBS

// 关闭obsClient
// obsClient.close();